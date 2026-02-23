"use client";

import { useState, useEffect } from "react";
import BookImage from "@/components/BookImage";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/types/book";
import type { Book } from "@/types/book";

const categoryData: { name: string; subs: string[] }[] = [
  { name: "All Genre", subs: [] },
  { name: "Islamic Thought & Theology", subs: ["Qur'anic Studies", "Hadith & Sunnah", "Islamic Jurisprudence (Fiqh)", "Islamic History", "Maqasid al-Shariah", "Comparative Religion"] },
  { name: "History & Geopolitics", subs: ["Ancient Civilizations", "Modern History", "Military History", "Colonialism & Post-Colonialism", "South Asian History", "Middle Eastern Affairs"] },
  { name: "Fiction and Literature", subs: ["Classic Literature", "Contemporary Fiction", "Urdu Fiction", "Short Stories", "Poetry", "Science Fiction & Fantasy"] },
  { name: "Philosophy & Critical Thinking", subs: ["Eastern Philosophy", "Western Philosophy", "Logic & Reasoning", "Ethics & Morality", "Existentialism", "Philosophy of Science"] },
  { name: "Current Affairs & International Relations", subs: ["Global Politics", "Diplomacy & Foreign Policy", "Conflict & Peace Studies", "International Law", "Regional Studies"] },
  { name: "Economics, Finance & Business", subs: ["Microeconomics", "Macroeconomics", "Islamic Finance", "Entrepreneurship", "Personal Finance", "Development Economics"] },
  { name: "Biographies & Memoirs", subs: ["Political Leaders", "Scholars & Thinkers", "Literary Figures", "Freedom Fighters", "Autobiographies"] },
  { name: "Exam Preparation (CSS / PMS)", subs: ["Pakistan Affairs", "Current Affairs", "English Essay & Composition", "General Knowledge", "Islamiyat", "Optional Subjects"] },
  { name: "Children's Literature & Learning", subs: ["Picture Books", "Early Readers", "Islamic Stories for Kids", "Educational Activity Books", "Young Adult"] },
  { name: "Self-Help & Motivation", subs: ["Personal Development", "Productivity", "Mindfulness & Spirituality", "Leadership", "Communication Skills"] },
  { name: "Pashto Language & Culture", subs: ["Pashto Literature", "Pashto Poetry", "Pashtun History", "Language Learning", "Cultural Studies"] },
  { name: "Politics", subs: ["Pakistani Politics", "Political Theory", "Governance & Policy", "Democracy & Elections", "Political Movements"] },
  { name: "Urdu Literature", subs: ["Urdu Poetry", "Urdu Fiction", "Urdu Drama", "Classical Urdu Literature", "Modern Urdu Prose"] },
];

const categories = categoryData.map((c) => c.name);

interface ApiProduct {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  image: string;
  categories: string[];
  subcategories: string[];
}

function toBook(b: ApiProduct): Book {
  return {
    id: b.id || b.slug,
    title: b.title,
    author: b.author,
    price: b.price,
    image: b.image,
  };
}

export default function PopularBooks({ showAll = false }: { showAll?: boolean }) {
  const [activeTab, setActiveTab] = useState("All Genre");
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [allBooks, setAllBooks] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setAllBooks(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const cat = searchParams.get("cat");
    const sub = searchParams.get("sub");
    if (cat && categories.includes(cat)) {
      setActiveTab(cat);
      setActiveSub(sub || null);
    } else {
      setActiveSub(null);
    }
  }, [searchParams]);

  const activeCatData = categoryData.find((c) => c.name === activeTab);

  const filtered = allBooks.filter((book) => {
    if (activeTab === "All Genre") return true;
    if (!book.categories?.includes(activeTab)) return false;
    if (activeSub) return book.subcategories?.includes(activeSub);
    return true;
  });
  const filteredBooks = showAll ? filtered : filtered.slice(0, 12);

  const handleBuyNow = (b: ApiProduct) => {
    addToCart(toBook(b));
    router.push("/checkout");
  };

  const goToDetail = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  return (
    <section id="popular-books" className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-light-gray uppercase text-xs tracking-[0.4em]">Some quality items</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-dark mt-2">Popular Books</h2>
        </div>

        {/* Tabs */}
        <div className="my-8 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex md:flex-wrap md:justify-center gap-2 md:gap-2.5 overflow-x-auto pb-2 md:pb-0 scrollbar-hide snap-x snap-mandatory">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveTab(cat); setActiveSub(null); }}
                className={`whitespace-nowrap snap-start text-[11px] md:text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 shadow-sm ${
                  activeTab === cat
                    ? "bg-[#0E7E8B] text-white border-[#0E7E8B] shadow-[#0E7E8B]/20"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#0E7E8B] hover:text-[#0E7E8B] hover:shadow-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory Pills */}
        {activeCatData && activeCatData.subs.length > 0 && (
          <div className="-mx-4 px-4 md:mx-0 md:px-0 mb-8">
            <div className="flex md:flex-wrap md:justify-center gap-1.5 md:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide snap-x snap-mandatory">
              <button
                onClick={() => setActiveSub(null)}
                className={`whitespace-nowrap snap-start text-[10px] md:text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  activeSub === null
                    ? "bg-[#c9a27e] text-white border-[#c9a27e] shadow-sm shadow-[#c9a27e]/20"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#c9a27e] hover:text-[#c9a27e]"
                }`}
              >
                All
              </button>
              {activeCatData.subs.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSub(activeSub === sub ? null : sub)}
                  className={`whitespace-nowrap snap-start text-[10px] md:text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    activeSub === sub
                      ? "bg-[#c9a27e] text-white border-[#c9a27e] shadow-sm shadow-[#c9a27e]/20"
                      : "bg-white text-gray-500 border-gray-200 hover:border-[#c9a27e] hover:text-[#c9a27e]"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Books Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray">Loading books...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                onClick={() => goToDetail(book.slug)}
              >
                <figure className="aspect-[3/4] overflow-hidden">
                  <BookImage
                    src={book.image}
                    alt={book.title}
                    width={200}
                    height={250}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </figure>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3 pb-4">
                  <h3 className="text-white text-sm font-semibold text-center leading-snug line-clamp-2">
                    {book.title}
                  </h3>
                  <span className="text-gray-300 text-xs mt-1">{book.author}</span>
                  <div className="text-white font-bold text-base mt-1">{formatPrice(book.price)}</div>
                  <div className="flex gap-2 mt-3 w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(toBook(book));
                      }}
                      className="flex-1 h-9 rounded-lg bg-[#1c7c84] text-white text-xs font-medium transition-all duration-300 hover:bg-[#176a71]"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(book);
                      }}
                      className="flex-1 h-9 rounded-lg bg-[#c9a27e] text-white text-xs font-medium transition-all duration-300 hover:bg-[#b88f6a]"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredBooks.length === 0 && !loading && (
          <div className="text-center py-12 text-gray">No books found in this category.</div>
        )}

        {/* View All Button */}
        {!showAll && (
          <div className="flex justify-center mt-8">
            <Link
              href="/popular"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-teal text-teal text-sm font-semibold hover:bg-teal hover:text-white transition"
            >
              View All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
