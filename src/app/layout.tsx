import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import ExcludedWrapper from "@/components/ExcludedWrapper";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Henry Commerce",
  description: "We offer premium products just for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
      >
        <div className="bg-gray-900 text-black">
          <AuthProvider>
            <CartProvider>
              <ExcludedWrapper>
                <Nav/>
              </ExcludedWrapper>
              {children}
            </CartProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
