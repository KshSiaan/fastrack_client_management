import { LoginForm } from "@/components/login-form";
import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function Home() {
  return (
    <main className="h-screen w-screen bg-background">
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="font-la_belle text-2xl">
              <Image
                src="/logo.webp"
                height="1588"
                width="2112"
                alt="logo"
                className="w-[64px] select-none"
              />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="bg-background hidden lg:flex relative h-full w-full  flex-col justify-center items-center bg-custom-bg bg-cover bg-right">
          <div className="absolute h-full w-1/3 z-20 left-0 top-0  bg-gradient-to-r from-background to-transparent"></div>
        </div>
      </div>
    </main>
  );
}
