/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // {
      //   source: "/:path*",
      //   destination: "http://0.0.0.0:8080/:path*",
      // },
      // {
      //   source: "/api/files/:path*",
      //   destination: "https://prod-backend-service-666458574194.us-central1.run.app:8080/files/:path*",
      // },
      // {
      //   source: "/api/users/:path*",
      //   destination: "https://prod-backend-service-666458574194.us-central1.run.app:8080/users/:path*",
      // },
      // {
      //   source: "/api/chats/:path*",
      //   destination: "https://prod-backend-service-666458574194.us-central1.run.app:8080/chats/:path*",
      // },
      // {
      //   source: "/api/auth/:path*",
      //   destination: "https://prod-backend-service-666458574194.us-central1.run.app:8080/auth/:path*",
      // },
    ];
  },
};

export default nextConfig;
