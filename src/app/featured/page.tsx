import FeaturedBooks from "@/components/FeaturedBooks";
import BestSelling from "@/components/BestSelling";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Books – Handpicked & Curated Reads | Burki Books Pakistan",
  description:
    "Discover handpicked featured books, staff picks & curated collections from Burki Books. Fiction, History, Islamic Thought, Poetry & more. Updated weekly with fresh recommendations.",
  keywords: [
    "featured books Pakistan",
    "curated books",
    "staff picks Burki Books",
    "best books to read Pakistan",
    "handpicked books online",
    "book recommendations Pakistan",
    "new books Pakistan",
  ],
  alternates: {
    canonical: "/featured",
  },
  openGraph: {
    title: "Featured Books – Handpicked Reads from Burki Books",
    description:
      "Curated collections, staff picks & limited-time featured books. Handpicked by Burki Books for readers across Pakistan. Updated weekly.",
    url: "/featured",
  },
  twitter: {
    card: "summary_large_image",
    title: "Featured Books – Curated Reads from Burki Books",
    description:
      "Handpicked books across Fiction, History, Memoir & more. Refreshed weekly by Burki Books.",
  },
};

export default function FeaturedPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <main className="flex-1">
        <section className="bg-teal text-white py-8 md:py-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="uppercase text-[10px] md:text-xs tracking-widest text-white/50 mb-1.5">Curated Shelves</p>
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">Featured Collections</h1>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Hand-picked reads across fiction, history, memoir, and more — refreshed weekly.
            </p>
          </div>
        </section>
        <FeaturedBooks />
        <BestSelling />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
