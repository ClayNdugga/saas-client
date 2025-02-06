/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: "https://prod-backend-service-666458574194.us-central1.run.app:8080/login",
      },
      {
        source: "/api/sign-up",
        destination: "https://prod-backend-service-666458574194.us-central1.run.app:8080/sign-up",
      },
      {
        source: "/api/create-checkout-session",
        destination: "https://prod-backend-service-666458574194.us-central1.run.app:8080/create-checkout-session",
      },
      {
        source: "/api/upload",
        destination: "https://prod-backend-service-666458574194.us-central1.run.app:8080/upload",
      },
      //begin new
      {
        source: "/api/files/:path*",
        destination: "https://prod-backend-service-666458574194.us-central1.run.app:8080/files/:path*",
      },
      {
        source: "/api/users/:path*",
        destination: "https://prod-backend-service-666458574194.us-central1.run.app:8080/users/:path*",
      },
      {
        source: "/api/chats/:path*",
        destination: "https://prod-backend-service-666458574194.us-central1.run.app:8080/chats/:path*",
      },
      {
        source: "/api/auth/:path*",
        destination: "https://prod-backend-service-666458574194.us-central1.run.app:8080/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
