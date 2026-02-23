export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get("category");
    const featured = req.nextUrl.searchParams.get("featured");
    const bestSeller = req.nextUrl.searchParams.get("bestSeller");
    const search = req.nextUrl.searchParams.get("q");

    const snapshot = await adminDb.collection("products").get();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let products: any[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Filter in memory (avoids composite index requirements)
    if (featured === "true") {
      products = products.filter((p) => p.isFeatured === true);
    }
    if (bestSeller === "true") {
      products = products.filter((p) => p.isBestSeller === true);
    }
    if (category && category !== "All Genre") {
      products = products.filter(
        (p) => Array.isArray(p.categories) && (p.categories as string[]).includes(category)
      );
    }
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          (p.title && (p.title as string).toLowerCase().includes(q)) ||
          (p.author && (p.author as string).toLowerCase().includes(q))
      );
    }

    // Sort by createdAt desc
    products.sort((a, b) => {
      const aDate = (a.createdAt as string) || "";
      const bDate = (b.createdAt as string) || "";
      return bDate.localeCompare(aDate);
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    const body = await req.json();
    const now = new Date().toISOString();

    const product = {
      slug: body.slug,
      title: body.title,
      author: body.author,
      price: body.price,
      oldPrice: body.oldPrice || null,
      image: body.image,
      description: body.description,
      highlights: body.highlights || [],
      pages: body.pages || 0,
      language: body.language || "English",
      publisher: body.publisher || "",
      inStock: body.inStock ?? true,
      categories: body.categories || [],
      subcategories: body.subcategories || [],
      isFeatured: body.isFeatured ?? false,
      isBestSeller: body.isBestSeller ?? false,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await adminDb.collection("products").add(product);
    return NextResponse.json({ id: docRef.id, ...product }, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
