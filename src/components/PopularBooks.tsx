"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Book, parsePrice, formatPrice } from "@/types/book";

const categories = ["All Genre", "Fiction", "History", "Politics", "Romantic", "Adventure"];

const allBooks = [
  { slug: "portrait-photography", title: "Portrait Photography", author: "Adam Silber", price: "Rs. 1,200", image: "/images/tab-item1.jpg", categories: ["All Genre", "History"] },
  { slug: "once-upon-a-time", title: "Once Upon a Time", author: "Klien Marry", price: "Rs. 850", image: "/images/tab-item2.jpg", categories: ["All Genre", "Fiction"] },
  { slug: "tips-of-simple-lifestyle", title: "Tips of Simple Lifestyle", author: "Bratt Smith", price: "Rs. 1,100", image: "/images/tab-item3.jpg", categories: ["All Genre", "Politics"] },
  { slug: "just-felt-from-outside", title: "Just Felt from Outside", author: "Nicole Wilson", price: "Rs. 950", image: "/images/tab-item4.jpg", categories: ["All Genre", "Romantic"] },
  { slug: "peaceful-enlightment", title: "Peaceful Enlightment", author: "Marmik Lama", price: "Rs. 1,300", image: "/images/tab-item5.jpg", categories: ["All Genre", "Adventure"] },
  { slug: "great-travel-at-desert", title: "Great Travel at Desert", author: "Sanchit Howdy", price: "Rs. 900", image: "/images/tab-item6.jpg", categories: ["All Genre", "Fiction", "Adventure"] },
  { slug: "life-among-the-pirates", title: "Life Among the Pirates", author: "Armor Ramsey", price: "Rs. 1,400", image: "/images/tab-item7.jpg", categories: ["All Genre", "Adventure", "Fiction"] },
  { slug: "simple-way-of-peace", title: "Simple Way of Peace", author: "Armor Ramsey", price: "Rs. 1,000", image: "/images/tab-item8.jpg", categories: ["All Genre", "History", "Politics"] },
];

function toBook(b: typeof allBooks[number]): Book {
  return {
    id: b.image,
    title: b.title,
    author: b.author,
    price: parsePrice(b.price),
    image: b.image,
  };
}

export default function PopularBooks() {
  const [activeTab, setActiveTab] = useState("All Genre");
  const { addToCart } = useCart();
  const router = useRouter();

  const filteredBooks = allBooks.filter((book) => book.categories.includes(activeTab));

  const handleBuyNow = (b: typeof allBooks[number]) => {
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 text-center md:text-left">
          <div>
            <span className="text-light-gray uppercase text-xs tracking-[0.4em]">Some quality items</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-dark mt-2">Popular Books</h2>
          </div>
          <Link
            href="/popular"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal text-teal text-sm font-semibold hover:bg-teal hover:text-white transition"
          >
            View All
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-10 my-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`font-semibold pb-1 transition ${
                activeTab === cat
                  ? "text-dark border-b-2 border-teal"
                  : "text-light-gray hover:text-dark"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.slug}
              className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => goToDetail(book.slug)}
            >
              <figure className="bg-[#f7f7f7] p-3 aspect-[3/4] flex items-center justify-center">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={200}
                  height={250}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </figure>
              {/* Hover overlay with details & buttons */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3 pb-4">
                <h3 className="text-white text-sm font-semibold text-center leading-snug line-clamp-2">
                  {book.title}
                </h3>
                <span className="text-gray-300 text-xs mt-1">{book.author}</span>
                <div className="text-white font-bold text-base mt-1">{formatPrice(parsePrice(book.price))}</div>
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
      </div>
    </section>
  );
}
