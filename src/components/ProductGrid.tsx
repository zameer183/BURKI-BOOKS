"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { allProducts } from "@/data/products";

export default function ProductGrid() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = (product: typeof allProducts[number]) => {
    addToCart(product);
    router.push("/checkout");
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 text-center md:text-left">
          <div>
            <p className="uppercase text-xs tracking-[0.4em] text-light-gray mb-3">All Books</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-dark">Browse Our Collection</h2>
          </div>
          <Link
            href="/featured"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal text-teal text-sm font-semibold hover:bg-teal hover:text-white transition"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allProducts.map((product) => (
            <article
              key={product.slug}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push(`/product/${product.slug}`)}
            >
              <figure className="bg-[#f7f7f7] p-3 aspect-[3/4] flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={250}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </figure>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3 pb-4">
                <h3 className="text-white text-sm font-semibold text-center leading-snug line-clamp-2">
                  {product.title}
                </h3>
                <span className="text-gray-300 text-xs mt-1">{product.author}</span>
                <div className="text-white font-bold text-base mt-1">Rs. {product.price.toLocaleString()}</div>
                <div className="flex gap-2 mt-3 w-full">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="flex-1 h-9 rounded-lg bg-[#1c7c84] text-white text-xs font-medium transition-all duration-300 hover:bg-[#176a71]"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyNow(product);
                    }}
                    className="flex-1 h-9 rounded-lg bg-[#c9a27e] text-white text-xs font-medium transition-all duration-300 hover:bg-[#b88f6a]"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
