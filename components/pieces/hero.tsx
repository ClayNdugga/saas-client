import Image from "next/image";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center min-h-[70vh]">
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Welcome to Our Website</h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Discover amazing features and services that will transform your experience. Were here to help you achieve
              your goals and reach new heights.
              </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button variant="outline" size="lg" onClick={() => router.push("/sign-up")}>
                Sign Up
              </Button>
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-lg sm:h-96 lg:h-full">
            <Image
              src="/hero1.jpg"
              alt="Hero image"
              layout="fill"
              objectFit="cover"
              priority
              className="transition-transform duration-300 ease-in-out hover:scale-105"
              quality={65}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
