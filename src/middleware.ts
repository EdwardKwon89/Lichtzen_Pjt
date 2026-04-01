import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('admin-session-id')?.value;

  // 1. 관리자 페이지 접근 제어 (/admin으로 시작하는 경로)
  const isAdminPath = pathname.match(/\/(ko|en)\/admin/);
  const isLoginPath = pathname.match(/\/(ko|en)\/admin\/login/);

  if (isAdminPath && !isLoginPath) {
    const segments = pathname.split('/');
    const locale = segments[1];
    
    // 1-1. 관리자 화면은 /en으로 고정
    // 중첩 방지: pathname이 이미 '/en/admin'으로 시작하는지 확인
    if (locale === 'en' && segments[2] === 'admin') {
      // 이미 올바른 경로이므로 세션 체크만 진행
    } else if (locale === 'ko' && segments[2] === 'admin') {
      // /ko/admin -> /en/admin 리다이렉트
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace('/ko/admin', '/en/admin');
      return NextResponse.redirect(url);
    } else if (!pathname.startsWith('/en/admin')) {
      // 로케일이 없거나 잘못된 경우 /en/admin으로 강제 리다이렉트
      const url = request.nextUrl.clone();
      url.pathname = `/en${pathname.startsWith('/admin') ? pathname : '/admin'}`;
      return NextResponse.redirect(url);
    }

    // 1-2. 세션 체크
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = `/en/admin/login`;
      return NextResponse.redirect(url);
    }
  }

  // 2. 다국어 처리를 위한 i18n 미들웨어 실행
  return intlMiddleware(request);
}

export const config = {
  // 모든 비즈니스 경로를 감지하되, _next, api, 정적 파일은 제외
  matcher: [
    '/',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};
