import Image from "next/image";
import SignUp from "@/components/pieces/signup";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Right half - Signup component */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-6">
          <SignUp />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Left half - Image */}
      <div className="w-1/2 relative">
        <Image src="/sign-up.jpg" alt="Signup background" fill className="object-cover" priority />
      </div>

    </div>
  );
}
