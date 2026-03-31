"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export interface Message {
  role: "user" | "admin";
  content: string;
  createdAt: any;
}

/**
 * 고객이 새로운 문의를 제출합니다. (비밀번호 포함)
 */
export async function submitInquiry(formData: {
  name: string;
  email: string;
  phone: string;
  title: string;
  topic: string;
  message: string;
  password?: string;
}) {
  if (!formData.name || !formData.email || !formData.title || !formData.topic || !formData.message || !formData.password) {
    return { error: "모든 필드를 입력해주세요. (비밀번호 포함)" };
  }

  try {
    const inquiryData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "",
      title: formData.title,
      topic: formData.topic,
      password: String(formData.password).trim(),
      status: "waiting",
      messages: [
        {
          role: "user",
          content: formData.message,
          createdAt: new Date(),
        }
      ],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "inquiries"), inquiryData);
    revalidatePath("/support");
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Firestore Error:", error);
    return { error: error.message || "문의 제출 중 오류가 발생했습니다." };
  }
}

/**
 * 문의 비밀번호를 검증합니다.
 */
export async function verifyInquiryPassword(id: string, password: string) {
  try {
    const docRef = doc(db, "inquiries", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return { error: "존재하지 않는 문의입니다." };
    
    const data = docSnap.data();
    const storedPassword = data.password ? String(data.password).trim() : null;
    const inputPassword = password ? String(password).trim() : "";

    if (storedPassword === null) {
      return { error: "비밀번호가 설정되지 않은 데이터입니다." };
    }

    if (storedPassword === inputPassword) {
      return { success: true };
    } else {
      return { error: "비밀번호가 일치하지 않습니다." };
    }
  } catch (error: any) {
    return { error: "검증 중 오류가 발생했습니다." };
  }
}

/**
 * 특정 문의 내역을 가져옵니다.
 */
export async function getInquiry(id: string) {
  try {
    const docRef = doc(db, "inquiries", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return { error: "존재하지 않는 문의입니다." };

    const data = docSnap.data();
    return {
      success: true,
      data: {
        id: docSnap.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        title: data.title,
        topic: data.topic,
        status: data.status,
        message: data.messages?.[0]?.content || "",
      }
    };
  } catch (error: any) {
    return { error: "데이터를 가져오는 중 오류가 발생했습니다." };
  }
}

/**
 * 기존 문의 내용을 수정합니다. (문서 관리 방식)
 */
export async function updateInquiry(id: string, updateData: {
  title: string;
  topic: string;
  phone: string;
  message: string;
}) {
  if (!id) return { error: "ID가 필요합니다." };

  try {
    const docRef = doc(db, "inquiries", id);
    
    // 원본 질의 내용(message)은 첫 번째 메시지 객체에 저장되어 있으므로 이를 업데이트함
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const messages = [...(data.messages || [])];
      
      // 첫 번째 user 메시지를 찾아 내용 업데이트
      if (messages.length > 0 && messages[0].role === "user") {
        messages[0].content = updateData.message;
      }

      await updateDoc(docRef, {
        title: updateData.title,
        topic: updateData.topic,
        phone: updateData.phone,
        messages: messages,
        updatedAt: serverTimestamp(),
      });
    }

    revalidatePath(`/support/${id}`);
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error: any) {
    console.error("Update Inquiry Error:", error);
    return { error: error.message || "수정 중 오류가 발생했습니다." };
  }
}

/**
 * 기존 문의에 새로운 메시지(재질의/재응답)를 추가합니다.
 */
export async function addInquiryMessage(id: string, content: string, role: "user" | "admin") {
  if (!id || !content) return { error: "ID와 내용이 필요합니다." };

  try {
    const docRef = doc(db, "inquiries", id);
    const newMessage: Message = {
      role,
      content,
      createdAt: new Date(),
    };

    await updateDoc(docRef, {
      messages: arrayUnion(newMessage),
      updatedAt: serverTimestamp(),
      status: role === "admin" ? "responded" : "waiting",
    });

    revalidatePath("/admin/inquiries");
    revalidatePath(`/support/${id}`);
    return { success: true };
  } catch (error: any) {
    console.error("Add Message Error:", error);
    return { error: error.message || "메시지 추가 중 오류가 발생했습니다." };
  }
}

/**
 * 관리자가 문의에 답변을 남깁니다.
 */
export async function updateInquiryResponse(id: string, reply: string) {
  return addInquiryMessage(id, reply, "admin");
}
