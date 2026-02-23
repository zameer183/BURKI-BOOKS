"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaSearch, FaBars, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "FEATURED", href: "/featured" },
  { name: "POPULAR", href: "/popular" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact-us" },
];

const catalogCategories = [
  {
    name: "Islamic Thought & Theology",
    href: "/popular?cat=Islamic+Thought+%26+Theology",
    subs: ["Qur'anic Studies", "Hadith & Sunnah", "Islamic Jurisprudence (Fiqh)", "Islamic History", "Maqasid al-Shariah", "Comparative Religion"],
  },
  {
    name: "History & Geopolitics",
    href: "/popular?cat=History+%26+Geopolitics",
    subs: ["Ancient Civilizations", "Modern History", "Military History", "Colonialism & Post-Colonialism", "South Asian History", "Middle Eastern Affairs"],
  },
  {
    name: "Fiction and Literature",
    href: "/popular?cat=Fiction+and+Literature",
    subs: ["Classic Literature", "Contemporary Fiction", "Urdu Fiction", "Short Stories", "Poetry", "Science Fiction & Fantasy"],
  },
  {
    name: "Philosophy & Critical Thinking",
    href: "/popular?cat=Philosophy+%26+Critical+Thinking",
    subs: ["Eastern Philosophy", "Western Philosophy", "Logic & Reasoning", "Ethics & Morality", "Existentialism", "Philosophy of Science"],
  },
  {
    name: "Current Affairs & International Relations",
    href: "/popular?cat=Current+Affairs+%26+International+Relations",
    subs: ["Global Politics", "Diplomacy & Foreign Policy", "Conflict & Peace Studies", "International Law", "Regional Studies"],
  },
  {
    name: "Economics, Finance & Business",
    href: "/popular?cat=Economics%2C+Finance+%26+Business",
    subs: ["Microeconomics", "Macroeconomics", "Islamic Finance", "Entrepreneurship", "Personal Finance", "Development Economics"],
  },
  {
    name: "Biographies & Memoirs",
    href: "/popular?cat=Biographies+%26+Memoirs",
    subs: ["Political Leaders", "Scholars & Thinkers", "Literary Figures", "Freedom Fighters", "Autobiographies"],
  },
  {
    name: "Exam Preparation (CSS / PMS)",
    href: "/popular?cat=Exam+Preparation+%28CSS+%2F+PMS%29",
    subs: ["Pakistan Affairs", "Current Affairs", "English Essay & Composition", "General Knowledge", "Islamiyat", "Optional Subjects"],
  },
  {
    name: "Children's Literature & Learning",
    href: "/popular?cat=Children%27s+Literature+%26+Learning",
    subs: ["Picture Books", "Early Readers", "Islamic Stories for Kids", "Educational Activity Books", "Young Adult"],
  },
  {
    name: "Self-Help & Motivation",
    href: "/popular?cat=Self-Help+%26+Motivation",
    subs: ["Personal Development", "Productivity", "Mindfulness & Spirituality", "Leadership", "Communication Skills"],
  },
  {
    name: "Pashto Language & Culture",
    href: "/popular?cat=Pashto+Language+%26+Culture",
    subs: ["Pashto Literature", "Pashto Poetry", "Pashtun History", "Language Learning", "Cultural Studies"],
  },
  {
    name: "Politics",
    href: "/popular?cat=Politics",
    subs: ["Pakistani Politics", "Political Theory", "Governance & Policy", "Democracy & Elections", "Political Movements"],
  },
  {
    name: "Urdu Literature",
    href: "/popular?cat=Urdu Literature",
    subs: ["Urdu Poetry", "Urdu Fiction", "Urdu Drama", "Classical Urdu Literature", "Modern Urdu Prose"],
  },
];

const socialLinks = [
  { icon: FaFacebookF, href: "https://www.facebook.com/share/1C6TLz4jCG/" },
  { icon: FaInstagram, href: "https://www.instagram.com/burkibooks/profilecard/?igsh=MW05aGt2c3R6eWFwZA==" },
  { icon: FaWhatsapp, href: "https://wa.me/923402715205" },
];

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  author: string;
  image: string;
  price: number;
}

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const lastScroll = useRef(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const mobileCatalogRef = useRef<HTMLDivElement>(null);
  const searchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { totalItems, setIsCartOpen } = useCart();

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

  // Close catalog and search on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        catalogRef.current && !catalogRef.current.contains(e.target as Node) &&
        (!mobileCatalogRef.current || !mobileCatalogRef.current.contains(e.target as Node))
      ) {
        setCatalogOpen(false);
        setOpenCategory(null);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Top Bar - hidden on mobile */}
      <div className="hidden sm:block bg-[#0E7E8B] text-white">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href }) => (
              <Link key={href} href={href} target="_blank" rel="noreferrer" className="hover:text-white/70 transition">
                <Icon size={12} />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsCartOpen(true)} className="hover:text-white/70 transition">
              Cart ({totalItems})
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo/logo.png"
              alt="Burki Books Logo"
              width={160}
              height={48}
              className="h-8 md:h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 text-xs font-semibold uppercase">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                <Link
                  href={link.href}
                  className="px-3 py-1.5 rounded-full text-[#2f2f2f] tracking-[0.15em] hover:text-white hover:bg-[#0E7E8B] transition-colors duration-300"
                >
                  {link.name}
                </Link>
                {link.name === "POPULAR" && (
                  /* Catalog Dropdown - after POPULAR */
            <div className="relative" ref={catalogRef}>
              <button
                onClick={() => setCatalogOpen((prev) => !prev)}
                className="px-3 py-1.5 rounded-full text-[#2f2f2f] tracking-[0.15em] hover:text-white hover:bg-[#0E7E8B] transition-colors duration-300 inline-flex items-center gap-1"
              >
                CATALOG <FaChevronDown size={8} className={`transition-transform duration-200 ${catalogOpen ? "rotate-180" : ""}`} />
              </button>
              {catalogOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-50 max-h-[80vh] overflow-y-auto">
                  {catalogCategories.map((cat) => (
                    <div key={cat.name}>
                      <button
                        onClick={() => setOpenCategory(openCategory === cat.name ? null : cat.name)}
                        className="flex items-center justify-between w-full px-4 py-2 text-[11px] text-[#2f2f2f] tracking-[0.1em] hover:bg-[#f7f7f7] hover:text-[#0E7E8B] transition"
                      >
                        <Link
                          href={cat.href}
                          onClick={(e) => { e.stopPropagation(); setCatalogOpen(false); setOpenCategory(null); }}
                          className="hover:text-[#0E7E8B]"
                        >
                          {cat.name}
                        </Link>
                        <FaChevronRight size={8} className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${openCategory === cat.name ? "rotate-90" : ""}`} />
                      </button>
                      {openCategory === cat.name && cat.subs.length > 0 && (
                        <div className="pl-7 pr-4 pb-1">
                          {cat.subs.map((sub) => (
                            <Link
                              key={sub}
                              href={`${cat.href}&sub=${encodeURIComponent(sub)}`}
                              className="block py-1.5 text-[10px] text-gray-500 tracking-[0.08em] hover:text-[#0E7E8B] transition"
                              onClick={() => { setCatalogOpen(false); setOpenCategory(null); }}
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link
                      href="/popular"
                      className="block px-4 py-2 text-[11px] text-[#0E7E8B] font-bold tracking-[0.1em] hover:bg-[#f7f7f7] transition"
                      onClick={() => { setCatalogOpen(false); setOpenCategory(null); }}
                    >
                      ALL BOOKS
                    </Link>
                  </div>
                </div>
              )}
            </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5" ref={searchRef}>
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => { setSearchOpen((prev) => !prev); setMobileOpen(false); }}
                className="w-8 h-8 rounded-full bg-[#f7f7f7] text-gray-500 hover:bg-[#0E7E8B] hover:text-white flex items-center justify-center transition-colors duration-300"
              >
                {searchOpen ? <FaTimes size={11} /> : <FaSearch size={11} />}
              </button>
              {searchOpen && (
                <div className="absolute top-full right-0 mt-2 w-[260px] sm:w-72 bg-white shadow-xl rounded-xl p-2.5 border border-gray-100 z-50">
                  <div className="flex items-center bg-[#f7f7f7] rounded-lg px-3 py-2">
                    <FaSearch className="text-gray-400 text-[10px] flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search books..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="flex-1 bg-transparent text-xs text-[#2f2f2f] focus:outline-none ml-2"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => { setSearchQuery(""); setSearchResults([]); }}
                        className="text-gray-400 hover:text-gray-600 mr-1"
                      >
                        <FaTimes size={9} />
                      </button>
                    )}
                  </div>
                  {/* Search Results */}
                  {searchQuery.trim() && (
                    <div className="mt-2 max-h-72 overflow-y-auto">
                      {searching ? (
                        <p className="text-[10px] text-gray-400 text-center py-4">Searching...</p>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((book) => (
                          <Link
                            key={book.id}
                            href={`/product/${book.slug}`}
                            onClick={() => { setSearchOpen(false); setSearchQuery(""); setSearchResults([]); }}
                            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#f7f7f7] transition"
                          >
                            <Image
                              src={book.image || "/images/placeholder.png"}
                              alt={book.title}
                              width={32}
                              height={44}
                              className="rounded object-cover w-8 h-11 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-semibold text-[#2f2f2f] truncate">{book.title}</p>
                              <p className="text-[9px] text-gray-500 truncate">{book.author}</p>
                              <p className="text-[9px] font-bold text-[#0E7E8B]">Rs. {book.price}</p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-[10px] text-gray-400 text-center py-4">No books found</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart - mobile only */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="sm:hidden w-8 h-8 rounded-full bg-[#f7f7f7] text-gray-500 hover:bg-[#0E7E8B] hover:text-white flex items-center justify-center transition-colors duration-300 relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c9a27e] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger - mobile only */}
            <button
              className="md:hidden w-8 h-8 rounded-full bg-[#f7f7f7] text-gray-600 flex items-center justify-center hover:bg-gray-200 transition"
              onClick={() => { setMobileOpen((prev) => !prev); setSearchOpen(false); }}
            >
              {mobileOpen ? <FaTimes size={11} /> : <FaBars size={13} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-2">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                <Link
                  href={link.href}
                  className="flex items-center text-[#2f2f2f] hover:text-[#0E7E8B] uppercase tracking-[0.15em] text-[11px] font-semibold py-2 border-b border-gray-50 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
                {link.name === "POPULAR" && (
                  /* Mobile Catalog - after POPULAR */
                  <div ref={mobileCatalogRef}>
                    <button
                      onClick={() => setCatalogOpen((prev) => !prev)}
                      className="flex items-center justify-between w-full text-[#2f2f2f] uppercase tracking-[0.15em] text-[11px] font-semibold py-2 border-b border-gray-50 transition"
                    >
                      CATALOG <FaChevronDown size={8} className={`transition-transform duration-200 ${catalogOpen ? "rotate-180" : ""}`} />
                    </button>
                    {catalogOpen && (
                      <div className="pl-4 pb-1">
                        {catalogCategories.map((cat) => (
                          <div key={cat.name}>
                            <div className="flex items-center justify-between border-b border-gray-50">
                              <Link
                                href={cat.href}
                                className="flex-1 text-[#2f2f2f] hover:text-[#0E7E8B] uppercase tracking-[0.1em] text-[10px] py-1.5 transition"
                                onClick={() => { setMobileOpen(false); setCatalogOpen(false); setOpenCategory(null); }}
                              >
                                {cat.name}
                              </Link>
                              <button
                                onClick={() => setOpenCategory(openCategory === cat.name ? null : cat.name)}
                                className="p-1.5 text-gray-400"
                              >
                                <FaChevronRight size={8} className={`transition-transform duration-200 ${openCategory === cat.name ? "rotate-90" : ""}`} />
                              </button>
                            </div>
                            {openCategory === cat.name && cat.subs.length > 0 && (
                              <div className="pl-4 pb-1">
                                {cat.subs.map((sub) => (
                                  <Link
                                    key={sub}
                                    href={`${cat.href}&sub=${encodeURIComponent(sub)}`}
                                    className="block text-gray-500 hover:text-[#0E7E8B] tracking-[0.08em] text-[9px] py-1.5 border-b border-gray-50/50 transition"
                                    onClick={() => { setMobileOpen(false); setCatalogOpen(false); setOpenCategory(null); }}
                                  >
                                    {sub}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        <Link
                          href="/popular"
                          className="block text-[#0E7E8B] font-bold uppercase tracking-[0.1em] text-[10px] py-1.5 transition"
                          onClick={() => { setMobileOpen(false); setCatalogOpen(false); setOpenCategory(null); }}
                        >
                          ALL BOOKS
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
