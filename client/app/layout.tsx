import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GlobalSetterProvider } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twogether | Connect, Explore, Experience",
  description:
    "Twogether is where you discover meaningful connections and shared experiences. Join us to connect, explore, and create memories together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalSetterProvider>
        <body className={inter.className}>{children}</body>
      </GlobalSetterProvider>
    </html>
  );
}
