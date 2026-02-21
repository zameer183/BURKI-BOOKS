"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { Book } from "@/types/book";

interface ApiProduct {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  image: string;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 18)))
      .catch(() => {});
  }, []);

  const toBook = (p: ApiProduct): Book => ({
    id: p.slug,
    title: p.title,
    author: p.author,
    price: p.price,
    image: p.image,
  });

  const handleBuyNow = (product: ApiProduct) => {
    addToCart(toBook(product));
    router.push("/checkout");
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="uppercase text-xs tracking-[0.4em] text-light-gray mb-3">All Books</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-dark">Browse Our Collection</h2>
        </div>

        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => (
            <article
              key={product.slug}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push(`/product/${product.slug}`)}
            >
              <figure className="aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                      addToCart(toBook(product));
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

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/featured"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-teal text-teal text-sm font-semibold hover:bg-teal hover:text-white transition"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
