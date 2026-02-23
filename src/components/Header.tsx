"use client";

import { useEffect, useRef, useState } from "react";
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
  { name: "Contact", href: "/contact-us" },
];

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  author: string;
  image: string;
  price: number;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const router = useRouter();
  const searchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    if (!value.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    searchTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(value.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.slice(0, 6));
        }
      } catch {
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash === "#about") {
      router.replace("/about");
    } else if (hash === "#contact") {
      router.replace("/contact-us");
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
              href="https://wa.me/923402715205"
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
                  <div className="flex items-center bg-[#f7f7f7] rounded-lg px-3 py-2">
                    <FaSearch className="text-gray-400 text-xs flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search books..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-dark focus:outline-none ml-2"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => { setSearchQuery(""); setSearchResults([]); }}
                        className="text-gray-400 hover:text-gray-600 mr-1"
                      >
                        <FaTimes size={10} />
                      </button>
                    )}
                  </div>
                  {/* Search Results */}
                  {searchQuery.trim() && (
                    <div className="mt-2 max-h-72 overflow-y-auto">
                      {searching ? (
                        <p className="text-xs text-gray-400 text-center py-4">Searching...</p>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((book) => (
                          <Link
                            key={book.id}
                            href={`/product/${book.slug}`}
                            onClick={() => { setSearchOpen(false); setSearchQuery(""); setSearchResults([]); }}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f7f7f7] transition"
                          >
                            <Image
                              src={book.image || "/images/placeholder.png"}
                              alt={book.title}
                              width={36}
                              height={50}
                              className="rounded object-cover w-9 h-12 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-dark truncate">{book.title}</p>
                              <p className="text-[10px] text-gray-500 truncate">{book.author}</p>
                              <p className="text-[10px] font-bold text-teal">Rs. {book.price}</p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400 text-center py-4">No books found</p>
                      )}
                    </div>
                  )}
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
