"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Featured", href: "/featured" },
  { name: "Popular", href: "/popular" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash === "#about") {
      router.replace("/about");
    } else if (hash === "#contact") {
      router.replace("/contact");
    } else if (hash === "#featured-books") {
      router.replace("/featured");
    } else if (hash === "#popular-books") {
      router.replace("/popular");
    }
  }, [router]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div id="home">
      {/* Top Bar */}
      <div className="bg-teal text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/share/1C6TLz4jCG/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-200 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/burkibooks/profilecard/?igsh=MW05aGt2c3R6eWFwZA=="
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-200 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/message/HUW2DFBLWKKLI1"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-200 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="flex items-center gap-1 hover:text-gray-200">
              <FaUser /> <span className="hidden sm:inline">Account</span>
            </a>
            <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-1 hover:text-gray-200 relative">
              <FaShoppingCart />
              <span className="hidden sm:inline">Cart ({totalItems})</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold sm:hidden">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm transition-transform duration-300 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo/logo.png"
              alt="Burki Books Logo"
              width={240}
              height={80}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-dark uppercase text-sm font-semibold tracking-wider hover:text-teal transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => { setSearchOpen(!searchOpen); setMobileOpen(false); }}
                className="w-9 h-9 rounded-full bg-[#f7f7f7] text-gray-500 hover:bg-teal hover:text-white flex items-center justify-center transition-colors duration-300"
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
                      className="flex-1 bg-transparent text-sm text-dark focus:outline-none ml-2"
                      autoFocus
                    />
                    <button type="submit" className="text-xs font-semibold text-white bg-teal px-3 py-1.5 rounded-md hover:bg-teal-dark transition flex-shrink-0">
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>
            <button
              className="md:hidden w-9 h-9 rounded-full bg-[#f7f7f7] text-gray-600 flex items-center justify-center hover:bg-gray-200 transition"
              onClick={() => { setMobileOpen(!mobileOpen); setSearchOpen(false); }}
            >
              {mobileOpen ? <FaTimes size={12} /> : <FaBars size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-dark uppercase text-xs font-semibold tracking-wider hover:text-teal border-b border-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </div>
  );
}
