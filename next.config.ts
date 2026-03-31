import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* 여기에 추가 옵션을 넣을 수 있습니다 */
};

export default withNextIntl(nextConfig);
