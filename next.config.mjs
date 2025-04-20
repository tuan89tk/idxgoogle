/** @type {import('next').NextConfig} */
const nextConfig = {
  // Các config Next.js khác nếu có
  reactStrictMode: true,

  // Custom config của bạn
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
};

export default nextConfig;