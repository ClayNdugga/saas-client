import Image from "next/image";
import Login from "@/components/pieces/login";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Left half - Image */}
      <div className="w-1/2 relative">
        <Image src="/login.jpg" alt="Login Background" fill className="object-cover"               quality={65}
 priority />
      </div>

      {/* Right half - Login component and Sign up link */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-6">
          <Login />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Dont have an account?{" "}
              <Link href="/sign-up" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
