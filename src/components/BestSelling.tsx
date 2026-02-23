"use client";

import { useEffect, useState } from "react";
import BookImage from "@/components/BookImage";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

interface BestSellerProduct {
  slug: string;
  title: string;
  author: string;
  price: number;
  image: string;
}

export default function BestSelling() {
  const [book, setBook] = useState<BestSellerProduct | null>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products?bestSeller=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const p = data[0];
          setBook({
            slug: p.slug,
            title: p.title,
            author: p.author,
            price: p.price,
            image: p.image,
          });
        }
      })
      .catch(() => {});
  }, []);

  if (!book) return null;

  const cartBook = {
    id: book.slug,
    title: book.title,
    author: book.author,
    price: book.price,
    image: book.image,
  };

  const handleBuyNow = () => {
    addToCart(cartBook);
    router.push("/checkout");
  };

  const goToDetail = () => {
    router.push(`/product/${book.slug}`);
  };

  return (
    <section className="bg-teal py-8 md:py-12 relative overflow-hidden text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
          {/* Book Image */}
          <div className="w-full md:w-4/12">
            <figure
              className="relative rounded-xl overflow-hidden cursor-pointer group shadow-xl max-w-[180px] mx-auto md:max-w-none"
              onClick={goToDetail}
            >
              <BookImage
                src={book.image}
                alt="Best Selling Book"
                width={300}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-[#c9a27e] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Bestseller
              </div>
            </figure>
          </div>

          {/* Book Info */}
          <div className="w-full md:w-8/12 bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-medium relative pb-2 mb-2 text-white">
              Best Selling Book
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-white/70" />
            </h2>
            <div className="text-white/60 font-semibold mb-1 uppercase tracking-[0.2em] text-[10px]">By {book.author}</div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">{book.title}</h3>
<div className="text-white text-lg md:text-xl font-bold mb-3">Rs. {book.price.toLocaleString()}</div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => addToCart(cartBook)}
                className="h-9 px-4 rounded-lg bg-white text-[#1c7c84] text-xs font-medium transition-all duration-300 hover:bg-white/90 inline-flex items-center justify-center gap-1.5"
              >
                <FaShoppingCart className="text-[10px]" /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="h-9 px-4 rounded-lg bg-[#c9a27e] text-white text-xs font-medium transition-all duration-300 hover:bg-[#b88f6a] inline-flex items-center justify-center gap-1.5"
              >
                Buy Now <FaArrowRight className="text-[10px]" />
              </button>
              <button
                onClick={goToDetail}
                className="text-white/70 text-xs underline-offset-4 hover:underline hover:text-white transition"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
