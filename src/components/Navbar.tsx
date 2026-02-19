"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "FEATURED", href: "/featured" },
  { name: "POPULAR", href: "/popular" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "https://www.facebook.com/share/12K9YxFJztb/" },
  { icon: FaInstagram, href: "https://www.instagram.com/burkibooks/profilecard/?igsh=MW05aGt2c3R6eWFwZA==" },
  { icon: FaWhatsapp, href: "https://wa.me/message/HUW2DFBLWKKLI1" },
];

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const lastScroll = useRef(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScroll.current;

      if (currentY < 80) {
        setIsHidden(false);
      } else if (delta > 10) {
        setIsHidden(true);
        setMobileOpen(false);
      } else if (delta < -10) {
        setIsHidden(false);
      }

      lastScroll.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="bg-[#0E7E8B] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 h-11 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href }) => (
              <Link key={href} href={href} target="_blank" rel="noreferrer" className="hover:text-gray-200">
                <Icon />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/account" className="flex items-center gap-2 hover:text-gray-200">
              <span>Account</span>
            </Link>
            <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 hover:text-gray-200">
              <span>Cart ({totalItems})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo/logo.png"
              alt="Burki Books Logo"
              width={200}
              height={60}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-3 text-sm font-semibold uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-full text-[#2f2f2f] tracking-[0.3em] hover:text-white hover:bg-[#0E7E8B] transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2" ref={searchRef}>
            <div className="relative">
              <button
                onClick={() => { setSearchOpen((prev) => !prev); setMobileOpen(false); }}
                className="w-9 h-9 rounded-full bg-[#f7f7f7] text-gray-500 hover:bg-[#0E7E8B] hover:text-white flex items-center justify-center transition-colors duration-300 text-sm"
              >
                {searchOpen ? <FaTimes size={12} /> : <FaSearch size={12} />}
              </button>
              {searchOpen && (
                <div className="absolute top-full right-0 mt-2 w-[280px] sm:w-80 bg-white shadow-xl rounded-xl p-3 border border-gray-100 z-50">
                  <form
                    onSubmit={(e) => { e.preventDefault(); setSearchOpen(false); }}
                    className="flex items-center bg-[#f7f7f7] rounded-lg px-3 py-2"
                  >
                    <FaSearch className="text-gray-400 text-xs flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search books..."
                      className="flex-1 bg-transparent text-sm text-[#2f2f2f] focus:outline-none ml-2"
                      autoFocus
                    />
                    <button type="submit" className="text-xs font-semibold text-white bg-[#0E7E8B] px-3 py-1.5 rounded-md hover:bg-[#0a6b76] transition flex-shrink-0">
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>
            <button
              className="md:hidden w-9 h-9 rounded-full bg-[#f7f7f7] text-gray-600 flex items-center justify-center hover:bg-gray-200 transition text-sm"
              onClick={() => { setMobileOpen((prev) => !prev); setSearchOpen(false); }}
            >
              {mobileOpen ? <FaTimes size={12} /> : <FaBars size={14} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-[#0E7E8B] uppercase tracking-[0.2em] text-xs py-1.5"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsCartOpen(true);
                setMobileOpen(false);
              }}
              className="block text-[#0E7E8B] uppercase tracking-[0.2em] text-xs py-1.5"
            >
              Cart ({totalItems})
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
