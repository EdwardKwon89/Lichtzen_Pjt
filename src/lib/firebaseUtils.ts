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

/**
 * Firestore 데이터를 Plain Object로 변환 (Timestamp -> String)
 * 서버 액션 외 클라이언트에서도 공통으로 사용하기 위해 유틸리티로 분리
 */
export function serializeInquiryData(data: any): any {
  if (data === null || data === undefined) return data;

  // Firestore Timestamp 처리
  if (data && typeof data.toDate === "function") {
    return data.toDate().toISOString();
  }

  // 표준 Date 객체 처리
  if (data instanceof Date) {
    return data.toISOString();
  }

  // 배열 처리 (재귀)
  if (Array.isArray(data)) {
    return data.map(item => serializeInquiryData(item));
  }

  // 객체 처리 (재귀)
  if (data !== null && typeof data === "object") {
    const result: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result[key] = serializeInquiryData(data[key]);
      }
    }
    return result;
  }

  return data;
}
