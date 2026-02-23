import About from "@/components/About";
import Quote from "@/components/Quote";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Burki Books – Our Story, Mission & Milestones",
  description:
    "Learn about Burki Books — Pakistan's growing online bookstore founded in Lahore. Discover our story, mission, milestones, and how we deliver 5,000+ curated books worldwide.",
  keywords: [
    "about Burki Books",
    "Burki Books story",
    "online bookstore Pakistan",
    "Burki Books Lahore",
    "Pakistani bookstore",
    "Faridoon Burki",
    "book delivery Pakistan",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Burki Books – From Lahore to the World",
    description:
      "From a passion project in Lahore to delivering curated reads worldwide. 5,000+ books, 500+ happy customers, 3+ countries served.",
    url: "/about",
  },
  twitter: {
    card: "summary",
    title: "About Burki Books – Our Story & Mission",
    description:
      "Pakistan's growing online bookstore. 5,000+ books across Fiction, History, Islamic Thought & more.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <main className="flex-1">
        <section className="bg-teal text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="uppercase text-sm tracking-widest text-white/70 mb-3">Our Journey</p>
            <h1 className="text-4xl font-semibold text-white mb-4">About Burki Books</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              From a small passion project in Lahore to delivering carefully curated reads worldwide, Burki Books is on a mission to
              celebrate literature, culture, and community. Explore our milestones, values, and the team that keeps readers inspired.
            </p>
          </div>
        </section>
        <About />
        <Quote />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
