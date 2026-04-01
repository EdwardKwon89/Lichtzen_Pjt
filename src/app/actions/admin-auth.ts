"use server";

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, limit, query, where } from "firebase/firestore";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const ADMIN_SESSION_KEY = "admin-session-id";
const DEFAULT_ID = "admin";
const DEFAULT_PW = "admin";

/**
 * 아이디 정규화 (공백 제거 및 소문자 변환)
 */
function normalizeId(id: string) {
  return id.trim().toLowerCase();
}

/**
 * 관리자 로그인을 시도합니다. (ID/PW 인증)
 */
export async function loginAdmin(id: string, pw: string) {
  try {
    const nid = normalizeId(id);
    
    // 1. admins 컬렉션에서 ID 조회
    const adminRef = doc(db, "admins", nid);
    let adminSnap = await getDoc(adminRef);

    let validPw = "";

    if (!adminSnap.exists()) {
      // 2. 레거시 단일 문서(admin_auth) 체크 및 자동 마이그레이션
      const configRef = doc(db, "config", "admin_auth");
      const configSnap = await getDoc(configRef);
      
      const legacyData = configSnap.data();
      const legacyId = normalizeId(legacyData?.id || DEFAULT_ID);
      const legacyPw = legacyData?.pw || DEFAULT_PW;

      if (nid === legacyId) {
        validPw = legacyPw;
        // 로그인 시도 패스워드와 일치할 때만 마이그레이션 시도 (백그라운드 격리)
        if (pw === legacyPw) {
          try {
            await setDoc(adminRef, { id: nid, pw: legacyPw, createdAt: new Date() });
          } catch (e) {
            console.warn("Migration failed but continuing login:", e);
          }
        }
      } else if (nid === DEFAULT_ID) {
        validPw = DEFAULT_PW;
      } else {
        return { error: "존재하지 않는 관리자 계정입니다." };
      }
    } else {
      validPw = adminSnap.data().pw;
    }

    // 3. 비밀번호 검증 및 세션 부여
    if (pw === validPw) {
      const cookieStore = await cookies();
      cookieStore.set(ADMIN_SESSION_KEY, nid, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24시간
        path: "/",
      });
      
      // revalidatePath 제거: 클라이언트측 강제 새로고침(window.location.href)으로 대체하여 데드락 방지
      
      return { success: true };
    } else {
      return { error: "비밀번호가 일치하지 않습니다." };
    }
  } catch (error: any) {
    console.error("Login Error:", error);
    return { error: "로그인 처리 중 오류 발생" };
  }
}

/**
 * 신규 관리자 계정을 생성합니다. (중복 방지)
 */
export async function createAdminAccount(id: string, pw: string) {
  try {
    const nid = normalizeId(id);
    if (!nid || !pw) return { error: "ID와 비밀번호를 입력해 주세요." };

    const adminRef = doc(db, "admins", nid);
    const adminSnap = await getDoc(adminRef);

    if (adminSnap.exists()) {
      return { error: "이미 존재하는 관리자 ID입니다." };
    }

    await setDoc(adminRef, {
      id: nid,
      pw: pw,
      createdAt: new Date()
    });

    return { success: true };
  } catch (error: any) {
    return { error: "계정 생성 중 오류 발생: " + error.message };
  }
}

/**
 * 본인의 정보를 변경합니다. (ID/PW 중 본인의 것만 허용)
 */
export async function updateAdminProfile(targetId: string, newPw: string) {
  try {
    const session = (await cookies()).get(ADMIN_SESSION_KEY);
    const currentAdminId = session?.value;

    if (!currentAdminId) {
      return { error: "권한이 없습니다. 다시 로그인해 주세요." };
    }

    const nTargetId = normalizeId(targetId);

    // 본인 확인: 세션의 ID와 변경하려는 대상 ID가 일치해야 함
    if (currentAdminId !== nTargetId) {
      return { error: "본인의 계정 정보만 변경할 수 있습니다." };
    }

    const adminRef = doc(db, "admins", nTargetId);
    await updateDoc(adminRef, {
      pw: newPw,
      updatedAt: new Date(),
    });

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
  (await cookies()).delete(ADMIN_SESSION_KEY);
  revalidatePath("/admin");
  return { success: true };
}

/**
 * 현재 관리자 로그인 여부를 체크하고 로그인된 ID를 반환합니다.
 */
export async function checkAdminAuth() {
  const session = (await cookies()).get(ADMIN_SESSION_KEY);
  return session?.value || null;
}
