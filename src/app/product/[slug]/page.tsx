export const dynamic = "force-dynamic";

import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ProductDetail from "@/components/ProductDetail";
import { adminDb } from "@/lib/firebase-admin";
import Link from "next/link";
import BookImage from "@/components/BookImage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

async function getProductBySlug(slug: string) {
  try {
    const snapshot = await adminDb.collection("products").get();
    const doc = snapshot.docs.find(
      (d) => (d.data() as { slug: string }).slug === slug
    );
    if (!doc) return null;
    return { id: doc.id, ...doc.data() } as {
      id: string;
      slug: string;
      title: string;
      author: string;
      price: number;
      oldPrice?: number;
      image: string;
      description: string;
      highlights: string[];
      pages: number;
      language: string;
      publisher: string;
      inStock: boolean;
    };
  } catch (error) {
    console.error("getProductBySlug error:", error);
    return null;
  }
}

async function getRelatedProducts(excludeSlug: string) {
  try {
    const snapshot = await adminDb.collection("products").get();
    return snapshot.docs
      .map((doc) => ({ id: doc.id, ...(doc.data() as { slug: string; title: string; author: string; price: number; image: string }) }))
      .filter((p) => p.slug !== excludeSlug)
      .slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product not found" };
  }
  const desc = product.description?.slice(0, 160) || `Buy ${product.title} by ${product.author} online at Burki Books. Best price in Pakistan with nationwide delivery.`;
  return {
    title: `${product.title} by ${product.author} – Buy Online`,
    description: desc,
    openGraph: {
      title: `${product.title} by ${product.author}`,
      description: desc,
      images: product.image ? [{ url: product.image }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} by ${product.author}`,
      description: desc,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(slug);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <main className="flex-1">
        <section className="bg-teal text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="uppercase text-sm tracking-widest text-white/70 mb-3">Product Detail</p>
            <h1 className="text-4xl font-semibold text-white">{product.title}</h1>
          </div>
        </section>
        <ProductDetail product={product} />
        <section className="bg-white py-14">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-semibold text-dark text-center mb-8">You might also like</h3>
            <div className="grid gap-5 grid-cols-2 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.slug}`}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <figure className="aspect-[3/4] overflow-hidden">
                    <BookImage
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={250}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </figure>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3 pb-4">
                    <h3 className="text-white text-sm font-semibold text-center leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <span className="text-gray-300 text-xs mt-1">{item.author}</span>
                    <div className="text-white font-bold text-base mt-1">Rs. {item.price.toLocaleString()}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
