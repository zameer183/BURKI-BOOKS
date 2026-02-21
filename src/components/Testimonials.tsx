"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaStar, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Rizwan Burki",
    role: "Assistant Commissioner Wana",
    location: "South Waziristan",
    image: "/images/reviews/rizwan-burki.jpeg",
    text: "Burki Books never disappoints. Genuine editions, reasonable prices, and professional dealing. A great platform for anyone serious about building a quality collection.",
  },
  {
    name: "Abdul Qahar",
    role: "PMS Officer KPK",
    location: "Khyber Pakhtunkhwa",
    image: "/images/reviews/abdul-qahar.jpeg",
    text: "I recently ordered a few books from Burki Books, and I was thoroughly impressed. They offer a thoughtfully curated selection of both new and classic titles, all genuinely available without misleading stock issues. Highly recommended for anyone seeking a trustworthy online book-buying experience.",
  },
  {
    name: "Ahmed Suleman Lashari",
    role: "Entrepreneur",
    location: "South Punjab",
    image: "/images/reviews/ahmed-suleman-lashari.jpeg",
    text: "I recently came across Burki Books and had a wonderful experience. Their online service makes it simple to access books that are often difficult to find in Pakistan \u2014 dependable, hassle-free, and highly recommended for every book lover.",
  },
  {
    name: "Zawak Watanyar",
    role: "Reader & Book Enthusiast",
    location: "Netherlands",
    image: "/images/reviews/zawak-watanyar.jpeg",
    text: "I recently bought some books from Burki Books in Pakistan and had a very good experience. I also received a personal letter in the package, which was a really nice touch and showed their appreciation for customers. I'm really happy with my purchase and would definitely order from Burki Books again. Recommended!",
  },
  {
    name: "Ahmed Sheraz",
    role: "TGT English at Federal Govt.",
    location: "Pakistan",
    image: "/images/reviews/ahmed-sheraz.jpeg",
    text: "I have been purchasing books from Burki Books for a considerable time, and my experience has consistently been excellent. I highly recommend Burki Books to anyone who values quality, transparency, and outstanding customer service.",
  },
  {
    name: "Kashif Mahsood",
    role: "Student of Political Science",
    location: "GC Lahore",
    image: "/images/reviews/kashif-mahsood.jpeg",
    text: "I am truly grateful to Burki Books for providing me with books that I could not have found on my own. Their collection is impressive, and they offer quality books at fair and reasonable prices. Their commitment to readers is truly commendable.",
  },
  {
    name: "Shahzaib Baloch",
    role: "Junior Assistant, ECP",
    location: "Sibi, Balochistan",
    image: "/images/reviews/shahzaib-baloch.jpeg",
    text: "I have ordered books from Burki Books online multiple times. Every time, the experience has been excellent \u2014 smooth ordering process, timely delivery, and outstanding service. Highly recommended!",
  },
  {
    name: "Farhan Tariq",
    role: "Ex Reporter",
    location: "JK TV and ABN News",
    image: "/images/reviews/farhan-tariq.jpeg",
    text: "Burki Books is a name you can trust. I am grateful to Burki Books for promoting book reading in an era when books are being replaced by screens. In such times, they are providing readers with affordable, high-quality books.",
  },
  {
    name: "Mr. Abdul Rauf",
    role: "BS English Language & Literature",
    location: "QUEST, Nawabshah, Sindh",
    image: "/images/reviews/abdul-rauf.jpeg",
    text: "I've ordered books from Burki Books around 7\u20138 times, and every experience has been exceptional! Their service is always timely. I highly recommend that all fellow readers get in touch with Burki Books \u2014 you won't be disappointed!",
  },
  {
    name: "Muhammad Shafique",
    role: "Lecturer",
    location: "Dera Ismail Khan",
    image: "/images/reviews/muhammad-shafique.jpeg",
    text: "Burki Books has been my go-to source for essential reads in history, philosophy, and politics since 2022. I've consistently appreciated their excellent quality, fair prices, and secure delivery.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const t = testimonials[active];

  return (
    <section className="py-16 md:py-20 bg-[#FFFFFF]">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-light-gray uppercase text-xs tracking-[0.4em]">
            What our readers say
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-dark mt-2">
            Customer Reviews
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-[#0E7E8B] rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row md:h-[400px]">
            {/* Image */}
            <div className="md:w-5/12 relative">
              <div className="h-[320px] md:h-full relative">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 20%" }}
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* Content */}
            <div className="md:w-7/12 p-6 md:p-10 flex flex-col justify-center relative">
              <FaQuoteRight className="absolute top-6 right-6 text-white/10 text-4xl md:text-5xl" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-[#f0c987] text-xs" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-white/90 text-sm md:text-[15px] leading-relaxed mb-6 line-clamp-5 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author Info */}
              <div className="border-l-[3px] border-[#f0c987] pl-4">
                <h4 className="text-white font-bold text-sm md:text-base">
                  {t.name}
                </h4>
                <p className="text-[#f0c987] text-[11px] md:text-xs font-semibold">
                  {t.role}
                </p>
                <p className="text-white/60 text-[10px] md:text-[11px]">{t.location}</p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 shadow-md flex items-center justify-center text-white hover:bg-white hover:text-[#0E7E8B] transition-all duration-200 z-10"
          >
            <FaChevronLeft size={12} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 shadow-md flex items-center justify-center text-white hover:bg-white hover:text-[#0E7E8B] transition-all duration-200 z-10"
          >
            <FaChevronRight size={12} />
          </button>
        </div>

        {/* Thumbnail Dots */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full overflow-hidden transition-all duration-300 ${
                i === active
                  ? "w-8 h-8 ring-2 ring-[#0E7E8B] ring-offset-2 ring-offset-[#FFFFFF] opacity-100"
                  : "w-6 h-6 opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={32}
                height={32}
                className="w-full h-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
