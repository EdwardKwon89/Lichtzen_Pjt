"use server";

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const ADMIN_SECRET = "admin-session-id";
const DEFAULT_ID = "admin";
const DEFAULT_PW = "admin";

/**
 * 관리자 로그인을 시도합니다. (ID/PW 인증)
 */
export async function loginAdmin(id: string, pw: string) {
  try {
    // 1. Firestore에서 관리자 정보를 가져옵니다. (없으면 기본값 생성)
    const configRef = doc(db, "config", "admin_auth");
    let adminSnap = await getDoc(configRef);

    let validId = DEFAULT_ID;
    let validPw = DEFAULT_PW;

    if (!adminSnap.exists()) {
      // 초기 설정이 없으면 admin/admin으로 생성
      await setDoc(configRef, { id: DEFAULT_ID, pw: DEFAULT_PW });
    } else {
      const data = adminSnap.data();
      validId = data.id;
      validPw = data.pw;
    }

    // 2. 인증 시도
    if (id === validId && pw === validPw) {
      // 세션 쿠키 설정 (보안상 실제로는 암호화된 토큰 권장)
      (await cookies()).set(ADMIN_SECRET, "authorized", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24시간 유지
        path: "/",
      });
      
      return { success: true };
    } else {
      return { error: "ID 또는 비밀번호가 일치하지 않습니다." };
    }
  } catch (error: any) {
    return { error: "로그인 처리 중 오류 발생: " + error.message };
  }
}

/**
 * 관리자 정보를 변경합니다. (ID/PW 동시 변경)
 */
export async function updateAdminProfile(newId: string, newPw: string) {
  try {
    // 세션 확인 (간이 미들웨어 기능)
    const session = (await cookies()).get(ADMIN_SECRET);
    if (!session || session.value !== "authorized") {
      return { error: "권한이 없습니다. 다시 로그인해 주세요." };
    }

    const configRef = doc(db, "config", "admin_auth");
    await updateDoc(configRef, {
      id: newId,
      pw: newPw,
      updatedAt: new Date(),
    });

    // 정보 변경 후 세션 갱신을 위해 로그아웃 유도 또는 재로그인 필요
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error: any) {
    return { error: "정보 변경 중 오류 발생: " + error.message };
  }
}

/**
 * 관리자 로그아웃
 */
export async function logoutAdmin() {
  (await cookies()).delete(ADMIN_SECRET);
  revalidatePath("/admin");
  return { success: true };
}

/**
 * 현재 관리자 로그인 여부를 서버 사이드에서 체크합니다.
 */
export async function checkAdminAuth() {
  const session = (await cookies()).get(ADMIN_SECRET);
  return session?.value === "authorized";
}
