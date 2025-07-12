import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { FavoritesProvider } from "@/context/FavoritesProvider";
import { HistoryProvider } from "@/context/HistoryProvider";
import Header from "@/components/common/Header";

import FloatingChat from "@/components/chat/FloatingChat";
import { Toaster } from "sonner";
import Footer from "@/components/common/Footer";
import { CartProvider } from "@/context/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Course24h - Khóa học trực tuyến",
  description: "Khám phá các khóa học trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-gray-50`}>
        <CartProvider>
          <FavoritesProvider>
            <HistoryProvider>
              <Toaster
                position="top-right"
                richColors
                closeButton
                duration={1000}
              />
              <Header />
              {children}
              <FloatingChat />
              <Footer />
            </HistoryProvider>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
