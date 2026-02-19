"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { Book } from "@/types/book";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

type FeaturedBook = Book & { slug: string };

const books: FeaturedBook[] = [
  { id: "peace-life", slug: "simple-way-of-peace-life", title: "Simple Way of Peace Life", author: "Armor Ramsey", price: 1200, image: "/images/product-item1.jpg" },
  { id: "desert-travel", slug: "great-travel-at-desert", title: "Great Travel at Desert", author: "Sanchit Howdy", price: 950, image: "/images/product-item2.jpg" },
  { id: "lady-beauty", slug: "the-lady-beauty-scarlett", title: "The Lady Beauty Scarlett", author: "Arthur Doyle", price: 1500, image: "/images/product-item3.jpg" },
  { id: "once-upon", slug: "once-upon-a-time", title: "Once Upon a Time", author: "Klien Marry", price: 800, image: "/images/product-item4.jpg" },
  { id: "birds-happy", slug: "birds-gonna-be-happy", title: "Birds Gonna Be Happy", author: "Timbur Hood", price: 1350, image: "/images/single-image.jpg" },
  { id: "portrait-photo", slug: "portrait-photography", title: "Portrait Photography", author: "Adam Silber", price: 1200, image: "/images/tab-item1.jpg" },
  { id: "tips-lifestyle", slug: "tips-of-simple-lifestyle", title: "Tips of Simple Lifestyle", author: "Bratt Smith", price: 1100, image: "/images/tab-item3.jpg" },
];

export default function FeaturedBooks() {
  const { addToCart } = useCart();
  const router = useRouter();
  const swiperRef = useRef<SwiperClass | null>(null);
  const canLoop = books.length > 4;

  const handleBuyNow = (book: Book) => {
    addToCart(book);
    router.push("/checkout");
  };

  const navigateToDetail = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  return (
    <section id="featured-books" className="py-8 md:py-12 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="uppercase text-[10px] tracking-[0.4em] text-gray-400 mb-1">Featured Collection</p>
            <h2 className="text-xl md:text-2xl font-semibold text-[#1c7c84]">Featured Books</h2>
          </div>
          <Link
            href="/featured"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-xs font-semibold text-[#1c7c84] shadow-sm hover:shadow-md transition"
          >
            View All
          </Link>
        </div>

        <div
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
        >
          <Swiper
            modules={[Autoplay, FreeMode, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            loop={canLoop}
            loopAdditionalSlides={canLoop ? books.length : undefined}
            freeMode={{ enabled: true, momentum: false }}
            speed={7000}
            autoplay={{
              delay: 0,
              disableOnInteraction: !canLoop,
              pauseOnMouseEnter: false,
            }}
            allowTouchMove={!canLoop}
            pagination={{ clickable: true }}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="[&_.swiper-wrapper]:transition-transform [&_.swiper-wrapper]:ease-linear [&_.swiper-pagination-bullet]:!bg-[#1c7c84]/30 [&_.swiper-pagination-bullet-active]:!bg-[#1c7c84]"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {books.map((book) => (
            <SwiperSlide key={book.id}>
              <article
                className="relative min-h-[300px] sm:min-h-[350px] rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                onClick={() => navigateToDetail(book.slug)}
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-sm font-semibold text-center leading-snug line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-300 text-xs text-center mt-1">{book.author}</p>
                  <p className="text-white font-bold text-base text-center mt-1">Rs. {book.price.toLocaleString()}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(book);
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
              </article>
            </SwiperSlide>
          ))}
          </Swiper>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full bg-white text-[#1c7c84] shadow-md flex items-center justify-center text-lg hover:bg-[#1c7c84] hover:text-white transition-colors duration-300"
            >
              ‹
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full bg-white text-[#1c7c84] shadow-md flex items-center justify-center text-lg hover:bg-[#1c7c84] hover:text-white transition-colors duration-300"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
