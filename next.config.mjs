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
      //begin new 
      {
        source: "/api/files/:path*",  
        destination: "http://localhost:5000/files/:path*",  
      },
      {
        source: "/api/users/:path*",  
        destination: "http://localhost:5000/users/:path*",  
      },
      {
        source: "/api/chats/:path*",  
        destination: "http://localhost:5000/chats/:path*",  
      },
      {
        source: "/api/auth/:path*",  
        destination: "http://localhost:5000/auth/:path*",  
      },
    ];
  },
};

export default nextConfig;
