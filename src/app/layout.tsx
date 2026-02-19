import type { Metadata } from "next";
import { Raleway, Prata } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";
import Toast from "@/components/Toast";
import Navbar from "@/components/Navbar";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Burki Books - From Classics to Curiosity – We Have It All",
  description:
    "Burki Books is a growing online bookstore dedicated to offering a diverse and rich collection of new and old books across Fiction, History, Politics, and much more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${raleway.variable} ${prata.variable} antialiased`} suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <div className="pt-28 md:pt-36">{children}</div>
          <CartSidebar />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
