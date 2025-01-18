import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgroAid",
  description: "An end to end app for farmers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <head>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </head>
        <html lang="en" className="custom-scrollbar">
          <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
