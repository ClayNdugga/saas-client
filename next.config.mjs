/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: "http://localhost:5000/login",
      },
      {
        source: "/api/sign-up",
        destination: "http://localhost:5000/sign-up",
      },
      {
        source: "/api/create-checkout-session",
        destination: "http://localhost:5000/create-checkout-session",
      },
      {
        source: "/api/upload",
        destination: "http://localhost:5000/upload",
      },
      {
        source: "/api/file/:path*",  
        destination: "http://localhost:5000/file/:path*",  
      },
    ];
  },
};

export default nextConfig;
