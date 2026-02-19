"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaBookmark, FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/types/book";
import type { ProductDetail } from "@/data/products";

interface ProductDetailProps {
  product: ProductDetail;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAdd = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/checkout");
  };

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Image - sticky on desktop */}
        <div className="lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <div className="bg-[#f7f7f7] rounded-xl p-6 md:p-8 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={520}
                className="max-w-full h-auto object-contain max-h-[400px]"
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="uppercase text-xs tracking-[0.4em] text-[#1c7c84] mb-2">{product.author}</p>
          <h1 className="text-2xl md:text-3xl font-semibold text-dark mb-3">{product.title}</h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-5">{product.description}</p>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl md:text-3xl font-bold text-[#1c7c84]">{formatPrice(product.price)}</span>
            {product.inStock ? (
              <span className="text-xs font-semibold text-white bg-[#1c7c84] px-3 py-1 rounded-full">In Stock</span>
            ) : (
              <span className="text-xs font-semibold text-white bg-[#c9a27e] px-3 py-1 rounded-full">Pre-order</span>
            )}
          </div>

          <div className="bg-[#f7f7f7] rounded-xl p-4 mb-5 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-400 uppercase tracking-widest text-[10px]">Pages</p>
              <p className="text-dark font-semibold">{product.pages}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase tracking-widest text-[10px]">Language</p>
              <p className="text-dark font-semibold">{product.language}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase tracking-widest text-[10px]">Publisher</p>
              <p className="text-dark font-semibold">{product.publisher}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase tracking-widest text-[10px]">SKU</p>
              <p className="text-dark font-semibold">{product.id.replace(/[^a-z0-9]/gi, "-")}</p>
            </div>
          </div>

          <ul className="space-y-2 mb-6">
            {product.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-dark text-sm">
                <FaBookmark className="text-[#1c7c84] mt-0.5 flex-shrink-0 text-xs" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 sm:flex-none h-11 px-6 rounded-lg bg-[#1c7c84] text-white text-sm font-medium transition-all duration-300 hover:bg-[#176a71] inline-flex items-center justify-center gap-2"
            >
              <FaShoppingCart className="text-xs" /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 sm:flex-none h-11 px-6 rounded-lg bg-[#c9a27e] text-white text-sm font-medium transition-all duration-300 hover:bg-[#b88f6a] inline-flex items-center justify-center gap-2"
            >
              Buy Now <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
