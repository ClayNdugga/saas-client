import Image from "next/image";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="bg-background text-foreground flex items-center justify-center flex-1">
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_3fr] lg:gap-16 items-center">
        {/* Text Section (25%) */}
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Chat with your PDFs</h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Upload your PDFs and get instant answers. Interact with your documents like never before, making research
            and reading effortless.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" onClick={() => router.push("/login")}>Login</Button>
            <Button variant="outline" size="lg" onClick={() => router.push("/sign-up")}>Sign Up</Button>
          </div>
        </div>
  
        {/* Image Section (75%) */}
        <div className="relative h-80 sm:h-96 lg:h-full w-full">
          {/* <Image
            src="/heross3.png"
            alt="Hero image"
            layout="fill"
            objectFit="cover"
            priority
            className="rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
          /> */}
          <Image
  src="/heross3.png"
  alt="Hero image"
  layout="intrinsic"
  width={1200}
  height={800} 
  priority
  className="rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
/>
        </div>
      </div>
    </div>
  </section>
  
  );
}
