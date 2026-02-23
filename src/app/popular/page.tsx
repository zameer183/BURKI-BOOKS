import { Suspense } from "react";
import PopularBooks from "@/components/PopularBooks";
import SpecialOffer from "@/components/SpecialOffer";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popular Books – Trending & Bestselling Books in Pakistan | Burki Books",
  description:
    "Browse the most popular and trending books in Pakistan. Bestsellers in Fiction, History, Islamic Studies, Politics, Pashto Literature & more. Cash on delivery available. Order online from Burki Books.",
  keywords: [
    "popular books Pakistan",
    "trending books Pakistan",
    "bestselling books Pakistan",
    "best fiction books Pakistan",
    "Islamic books online",
    "history books Pakistan",
    "Pashto books online",
    "CSS preparation books",
    "buy books online Lahore",
  ],
  alternates: {
    canonical: "/popular",
  },
  openGraph: {
    title: "Popular & Trending Books in Pakistan – Burki Books",
    description:
      "The most popular books customers are buying. Fiction, History, Islamic Studies, Politics & more. Order with nationwide delivery.",
    url: "/popular",
  },
  twitter: {
    card: "summary_large_image",
    title: "Popular Books – Bestsellers in Pakistan | Burki Books",
    description:
      "Browse trending & bestselling books across all genres. Order online with COD from Burki Books.",
  },
};

export default function PopularPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <main className="flex-1">
        <section className="bg-teal text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="uppercase text-sm tracking-widest text-white/70 mb-3">Trending Now</p>
            <h1 className="text-4xl font-semibold text-white mb-4">Popular Titles</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              These are the books customers are adding to their carts the most. Find your next great read among Pakistan's and the
              world's most talked-about releases.
            </p>
          </div>
        </section>
        <Suspense><PopularBooks showAll /></Suspense>
        <SpecialOffer />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
