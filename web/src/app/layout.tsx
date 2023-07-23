import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";

import { Hero } from "@/components/Hero";
import { Signin } from "@/components/Signin";
import { Profile } from "@/components/Profile";
import { Copyright } from "@/components/Copyright";

import "./globals.css";
const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });
const bai = Bai_Jamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai",
});

export const metadata: Metadata = {
  title: "NLW Spacetime",
  description:
    "Uma cápsula do tempo construída com React, Next.js, Typescript e TailwindCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has("token");
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${bai.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* Left */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            {/* Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full " />

            {/* Stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <Signin />}
            <Hero />
            <Copyright />
          </div>

          {/* Right */}
          <div className="flex overflow-y-scroll max-h-screen flex-col bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
