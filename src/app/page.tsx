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

export default function Home() {
  return (
    <>
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
