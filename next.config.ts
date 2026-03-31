import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// إعداد Plugin اللغات
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* خيارات الإعداد الخاصة بك */
  reactCompiler: true,
};

// بنلف الـ nextConfig بـ withNextIntl
export default withNextIntl(nextConfig);