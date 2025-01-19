"Use client";
import type { Metadata } from "next";
import { Open_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/authContext";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "fronteer",
  description: "Captura de leads para empresas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${openSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
