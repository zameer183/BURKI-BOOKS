import PopularBooks from "@/components/PopularBooks";
import SpecialOffer from "@/components/SpecialOffer";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popular Books | Burki Books",
  description: "Browse trending titles and bestsellers that Burki Books readers are ordering right now.",
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
        <PopularBooks />
        <SpecialOffer />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
