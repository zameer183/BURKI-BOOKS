"use client";

import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const slides = [
  {
    title: "From Classics to Curiosity",
    description:
      "Discover thousands of stories, spanning continents and centuries, all in one place. Burki Books brings you the finest curation.",
    image: "/hero/hero1.png",
  },
  {
    title: "Explore New Worlds",
    description:
      "Fiction, History, Politics, and more—dive into shelves that transport you beyond the ordinary.",
    image: "/hero/hero2.png",
  },
  {
    title: "Stories Delivered Worldwide",
    description:
      "From Lahore to the world. We deliver thoughtful reads to readers everywhere.",
    image: "/hero/hero3.png",
  },
  {
    title: "Rare Finds & New Releases",
    description:
      "Stay ahead with our weekly picks featuring rare editions and fresh releases.",
    image: "/hero/hero4.png",
  },
];

const textAnimation = "animate-hero-text";

export default function HeroBanner() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative overflow-hidden text-white">
      {/* Background slides */}
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        speed={800}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        navigation={false}
        className="h-[60vh] md:h-[75vh] z-0"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-[60vh] md:h-[75vh]">
              <Image src={slide.image} alt={slide.title} fill priority className="object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />

      {/* Text content */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 h-full flex items-center">
          <div
            key={activeIndex}
            className={`max-w-2xl space-y-4 text-center md:text-left ${textAnimation} pointer-events-auto`}
          >
            <p className="uppercase text-xs tracking-[0.6em] text-white/75">Burki Books</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white">
              {slides[activeIndex].title}
            </h1>
            <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed">
              {slides[activeIndex].description}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href="/popular"
                className="w-full sm:w-auto h-11 px-8 rounded-full bg-[#1c7c84] text-white text-sm font-semibold tracking-[0.3em] uppercase flex items-center justify-center hover:bg-[#176a71] transition"
              >
                Shop Now
              </a>
              <a
                href="#featured-books"
                className="w-full sm:w-auto h-11 px-8 rounded-full border border-white/70 text-white text-sm font-semibold tracking-[0.3em] uppercase flex items-center justify-center hover:bg-white/10 transition"
              >
                Browse Books
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`w-4 h-4 rounded-full border border-white transition ${
              activeIndex === index ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
