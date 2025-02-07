"use client";

import Hero from "@/components/pieces/hero";
import Header from "@/components/pieces/header";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Hero />
    </div>
  );
}
