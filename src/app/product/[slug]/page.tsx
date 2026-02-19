import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ProductDetail from "@/components/ProductDetail";
import products, { allProducts } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug];
  if (!product) {
    return {
      title: "Product not found | Burki Books",
    };
  }

  return {
    title: `${product.title} | Burki Books`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) {
    notFound();
  }

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
              {allProducts
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/product/${item.slug}`}
                    className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <figure className="bg-[#f7f7f7] p-3 aspect-[3/4] flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={200}
                        height={250}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </figure>
                    {/* Hover overlay */}
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
