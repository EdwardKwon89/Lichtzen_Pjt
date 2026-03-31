import { db } from "./firebase";
import { 
  doc, 
  updateDoc, 
  arrayUnion, 
  Timestamp, 
  getDoc 
} from "firebase/firestore";

/**
 * 문의 사항에 답변 메시지를 추가하고 상태를 업데이트합니다.
 * @param inquiryId 문의 ID
 * @param text 메시지 내용
 * @param sender 발신자 (user | admin)
 */
export const addInquiryMessage = async (
  inquiryId: string, 
  text: string, 
  sender: "user" | "admin"
) => {
  try {
    const inquiryRef = doc(db, "inquiries", inquiryId);
    
    await updateDoc(inquiryRef, {
      messages: arrayUnion({
        text,
        sender,
        timestamp: Timestamp.now()
      }),
      status: sender === "admin" ? "responded" : "unread"
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error adding inquiry message:", error);
    return { success: false, error: error.message };
  }
};

/**
 * 문의 사항의 읽음 상태를 업데이트합니다.
 */
export const updateInquiryStatus = async (
  inquiryId: string, 
  status: "unread" | "responded"
) => {
  try {
    const inquiryRef = doc(db, "inquiries", inquiryId);
    await updateDoc(inquiryRef, { status });
    return { success: true };
  } catch (error: any) {
    console.error("Error updating inquiry status:", error);
    return { success: false, error: error.message };
  }
};
