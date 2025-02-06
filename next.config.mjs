/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: "http://localhost:8080/login",
      },
      {
        source: "/api/sign-up",
        destination: "http://localhost:8080/sign-up",
      },
      {
        source: "/api/create-checkout-session",
        destination: "http://localhost:8080/create-checkout-session",
      },
      {
        source: "/api/upload",
        destination: "http://localhost:8080/upload",
      },
      //begin new
      {
        source: "/api/files/:path*",
        destination: "http://localhost:8080/files/:path*",
      },
      {
        source: "/api/users/:path*",
        destination: "http://localhost:8080/users/:path*",
      },
      {
        source: "/api/chats/:path*",
        destination: "http://localhost:8080/chats/:path*",
      },
      {
        source: "/api/auth/:path*",
        destination: "http://localhost:8080/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
