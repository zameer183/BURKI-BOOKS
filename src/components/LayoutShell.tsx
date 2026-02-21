"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import Toast from "@/components/Toast";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="pt-14 sm:pt-[5.75rem]">{children}</div>
      <CartSidebar />
      <Toast />
      <WhatsAppButton />
    </>
  );
}
