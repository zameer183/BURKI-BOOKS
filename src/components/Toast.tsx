"use client";

import { useCart } from "@/context/CartContext";

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-teal text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in text-sm font-medium">
      {toastMessage}
    </div>
  );
}
