"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Book, parsePrice, formatPrice } from "@/types/book";

const offerBooks = [
  { slug: "simple-way-of-peace-life", title: "Simple Way of Peace Life", author: "Armor Ramsey", oldPrice: "Rs. 1,500", price: "Rs. 1,200", image: "/images/product-item5.jpg" },
  { slug: "great-travel-at-desert", title: "Great Travel at Desert", author: "Sanchit Howdy", oldPrice: "Rs. 1,100", price: "Rs. 850", image: "/images/product-item6.jpg" },
  { slug: "the-lady-beauty-scarlett", title: "The Lady Beauty Scarlett", author: "Arthur Doyle", oldPrice: "Rs. 1,800", price: "Rs. 1,350", image: "/images/product-item7.jpg" },
  { slug: "once-upon-a-time", title: "Once Upon a Time", author: "Klien Marry", oldPrice: "Rs. 1,000", price: "Rs. 750", image: "/images/product-item8.jpg" },
  { slug: "long-walk-to-freedom", title: "Long Walk to Freedom", author: "Nelson Mandela", oldPrice: "Rs. 2,000", price: "Rs. 1,600", image: "/images/book-long-walk-freedom.jpeg" },
  { slug: "the-pathans", title: "The Pathans", author: "Sir Olaf Caroe", oldPrice: "Rs. 2,200", price: "Rs. 1,800", image: "/images/book-pathans.jpeg" },
];

function toBook(b: typeof offerBooks[number]): Book {
  return {
    id: b.image,
    title: b.title,
    author: b.author,
    price: parsePrice(b.price),
    oldPrice: parsePrice(b.oldPrice),
    image: b.image,
  };
}

export default function SpecialOffer() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = (b: typeof offerBooks[number]) => {
    addToCart(toBook(b));
    router.push("/checkout");
  };

  const goToDetail = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  return (
    <section id="special-offer" className="py-12 md:py-20">
      {/* Teal header background */}
      <div className="bg-teal py-20 md:py-28 text-center mb-[-80px]">
        <span className="text-teal-light uppercase text-sm tracking-widest">Grab your opportunity</span>
        <h2 className="text-3xl md:text-4xl font-medium text-white mt-2">Books with Offer</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {offerBooks.map((book) => (
            <div
              key={book.slug}
              className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => goToDetail(book.slug)}
            >
              <figure className="aspect-[3/4] overflow-hidden">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={200}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </figure>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3 pb-4">
                <h3 className="text-white text-sm font-semibold text-center leading-snug line-clamp-2">
                  {book.title}
                </h3>
                <span className="text-gray-300 text-xs mt-1">{book.author}</span>
                <div className="mt-1">
                  <span className="text-gray-400 line-through text-xs mr-1">{formatPrice(parsePrice(book.oldPrice))}</span>
                  <span className="text-white font-bold text-base">{formatPrice(parsePrice(book.price))}</span>
                </div>
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
