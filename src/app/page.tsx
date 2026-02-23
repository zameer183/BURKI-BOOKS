import { Suspense } from "react";
import HeroBanner from "@/components/HeroBanner";
import FeaturedBooks from "@/components/FeaturedBooks";
import BestSelling from "@/components/BestSelling";
import PopularBooks from "@/components/PopularBooks";
import Quote from "@/components/Quote";
import Testimonials from "@/components/Testimonials";
import ProductGrid from "@/components/ProductGrid";
import SpecialOffer from "@/components/SpecialOffer";
import Newsletter from "@/components/Newsletter";
import About from "@/components/About";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Burki Books",
  url: "https://burkibooks.com",
  description:
    "Pakistan's growing online bookstore. Buy new & used books on Fiction, History, Politics, Islamic Thought, Pashto Literature & more.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://burkibooks.com/popular?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "Burki Books",
    url: "https://burkibooks.com",
    sameAs: [
      "https://www.facebook.com/share/1C6TLz4jCG/",
      "https://www.instagram.com/burkibooks/",
      "https://x.com/BurkiBooks",
      "https://www.tiktok.com/@burkibooks",
      "https://www.threads.com/@burkibooks",
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroBanner />
      <FeaturedBooks />
      <BestSelling />
      <Suspense><PopularBooks /></Suspense>
      <ProductGrid />
      <Quote />
      <Testimonials />
      <SpecialOffer />
      <About />
      <Newsletter />
      <Footer />
    </>
  );
}
