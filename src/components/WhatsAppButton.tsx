"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923402715205"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={24} />
    </a>
  );
}
