import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/provider"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Portal App",
  description: "Developed by Tinkal",
};

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AppProvider>{children}</AppProvider>
        </body>
      </html>

  );
}
