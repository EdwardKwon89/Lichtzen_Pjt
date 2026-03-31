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
    if (!session || session !== 'authorized') {
      // 권한이 없으면 로그인 페이지로 리다이렉트 (로케일 감안)
      const locale = pathname.split('/')[1] || 'ko';
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/admin/login`;
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
    '/(ko|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};
