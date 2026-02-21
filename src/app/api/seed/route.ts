export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/auth";
import { allProducts } from "@/data/products";

export async function POST() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const batch = adminDb.batch();
  const now = new Date().toISOString();

  // Map of slugs to their categories/subcategories from the PopularBooks data
  const categoryMap: Record<string, { categories: string[]; subcategories: string[] }> = {
    "portrait-photography": { categories: ["All Genre", "Self-Help & Motivation"], subcategories: ["Personal Development"] },
    "once-upon-a-time": { categories: ["All Genre", "Fiction and Literature"], subcategories: ["Contemporary Fiction"] },
    "tips-of-simple-lifestyle": { categories: ["All Genre", "Self-Help & Motivation"], subcategories: ["Personal Development", "Productivity"] },
    "just-felt-from-outside": { categories: ["All Genre", "Fiction and Literature"], subcategories: ["Contemporary Fiction"] },
    "peaceful-enlightment": { categories: ["All Genre", "Philosophy & Critical Thinking"], subcategories: ["Eastern Philosophy", "Ethics & Morality"] },
    "great-travel-at-desert": { categories: ["All Genre", "Fiction and Literature"], subcategories: ["Contemporary Fiction"] },
    "life-among-the-pirates": { categories: ["All Genre", "Fiction and Literature"], subcategories: ["Classic Literature"] },
    "simple-way-of-peace": { categories: ["All Genre", "Philosophy & Critical Thinking", "Self-Help & Motivation"], subcategories: ["Eastern Philosophy", "Mindfulness & Spirituality"] },
    "my-life-and-struggle": { categories: ["All Genre", "Biographies & Memoirs", "History & Geopolitics", "Pashto Language & Culture"], subcategories: ["Freedom Fighters", "Autobiographies", "South Asian History", "Pashtun History"] },
    "iqbal-and-sages-of-east": { categories: ["All Genre", "Philosophy & Critical Thinking", "Islamic Thought & Theology"], subcategories: ["Eastern Philosophy", "Comparative Religion", "Scholars & Thinkers"] },
    "islamic-enlightenment": { categories: ["All Genre", "Islamic Thought & Theology", "History & Geopolitics"], subcategories: ["Islamic History", "Modern History"] },
    "islam-and-economics": { categories: ["All Genre", "Islamic Thought & Theology", "Economics, Finance & Business"], subcategories: ["Maqasid al-Shariah", "Islamic Finance"] },
    "journey-through-chaos": { categories: ["All Genre", "Current Affairs & International Relations", "Politics"], subcategories: ["Global Politics", "Pakistani Politics"] },
    "hundred-years-war-palestine": { categories: ["All Genre", "History & Geopolitics", "Current Affairs & International Relations", "Politics"], subcategories: ["Middle Eastern Affairs", "Conflict & Peace Studies", "Colonialism & Post-Colonialism"] },
    "prophets-heir": { categories: ["All Genre", "Islamic Thought & Theology", "History & Geopolitics"], subcategories: ["Islamic History", "Scholars & Thinkers"] },
    "long-walk-to-freedom": { categories: ["All Genre", "Biographies & Memoirs", "History & Geopolitics"], subcategories: ["Political Leaders", "Autobiographies", "Modern History"] },
    "ghost-wars": { categories: ["All Genre", "History & Geopolitics", "Current Affairs & International Relations", "Politics"], subcategories: ["Military History", "Middle Eastern Affairs", "Diplomacy & Foreign Policy"] },
    "the-pathans": { categories: ["All Genre", "History & Geopolitics", "Pashto Language & Culture"], subcategories: ["South Asian History", "Pashtun History", "Cultural Studies"] },
  };

  // Featured slugs (from FeaturedBooks component)
  const featuredSlugs = new Set([
    "simple-way-of-peace-life", "great-travel-at-desert", "the-lady-beauty-scarlett",
    "once-upon-a-time", "birds-gonna-be-happy", "portrait-photography",
    "tips-of-simple-lifestyle", "my-life-and-struggle", "hundred-years-war-palestine",
    "ghost-wars", "technopoly", "wine-of-wisdom",
  ]);

  const bestSellerSlug = "birds-gonna-be-happy";

  for (const product of allProducts) {
    const cats = categoryMap[product.slug] || { categories: ["All Genre"], subcategories: [] };
    const doc = {
      slug: product.slug,
      title: product.title,
      author: product.author,
      price: product.price,
      oldPrice: null,
      image: product.image,
      description: product.description,
      highlights: product.highlights,
      pages: product.pages,
      language: product.language,
      publisher: product.publisher,
      inStock: product.inStock,
      categories: cats.categories,
      subcategories: cats.subcategories,
      isFeatured: featuredSlugs.has(product.slug),
      isBestSeller: product.slug === bestSellerSlug,
      createdAt: now,
      updatedAt: now,
    };
    const ref = adminDb.collection("products").doc();
    batch.set(ref, doc);
  }

  await batch.commit();
  return NextResponse.json({ success: true, count: allProducts.length });
}
