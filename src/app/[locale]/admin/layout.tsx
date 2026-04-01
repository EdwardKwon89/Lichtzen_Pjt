"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { cn } from "@/lib/utils";
import { checkAdminAuth } from "@/app/actions/admin-auth";
import { useRouter, useParams, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;

  useEffect(() => {
    // 1. 로그인 페이지(/admin/login) 자체인 경우에는 체크를 스킵
    if (pathname.includes('/admin/login')) {
      setIsChecking(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const loggedInId = await checkAdminAuth();
        if (!loggedInId) {
          router.push(`/${locale}/admin/login`);
        } else {
          setIsChecking(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push(`/${locale}/admin/login`);
        setIsChecking(false); 
      }
    };
    
    // 초기 로드 시 1회 수행. 인터벌은 제거하여 내비게이션 꼬임 방지.
    checkAuth();
  }, [locale, router, pathname]);

  // 페이지 이동 중이거나 체크 중일 때, 혹은 로그인 페이지가 아닌데 인증이 안 된 경우 아무것도 렌더링하지 않음
  const isLoginPage = pathname.endsWith('/admin/login');

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0C10]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-cyan"></div>
      </div>
    );
  }

  // 로그인 페이지는 인증 체크와 상관없이 렌더링
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex bg-[#0A0C10] min-h-screen text-slate-300">
      <AdminSidebar collapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <main className={cn(
        "flex-1 p-6 overflow-auto transition-all duration-300"
      )}>
        {children}
      </main>
    </div>
  );
}
