"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { parsePrice } from "@/types/book";

const bestSellingBook = {
  id: "/images/single-image.jpg",
  title: "Birds Gonna Be Happy",
  author: "Timbur Hood",
  price: parsePrice("Rs. 1,350"),
  image: "/images/single-image.jpg",
};
const bestSellingSlug = "birds-gonna-be-happy";

export default function BestSelling() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    addToCart(bestSellingBook);
    router.push("/checkout");
  };

  const goToDetail = () => {
    router.push(`/product/${bestSellingSlug}`);
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
              <Image
                src="/images/single-image.jpg"
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
            <div className="text-white/60 font-semibold mb-1 uppercase tracking-[0.2em] text-[10px]">By Timbur Hood</div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Birds Gonna Be Happy</h3>
            <p className="text-white/60 leading-relaxed mb-3 text-xs md:text-sm line-clamp-2">
              A beautiful story about finding joy in the simplest things of life.
              This bestseller has touched thousands of hearts across Pakistan and beyond.
            </p>
            <div className="text-white text-lg md:text-xl font-bold mb-3">Rs. 1,350</div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => addToCart(bestSellingBook)}
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
