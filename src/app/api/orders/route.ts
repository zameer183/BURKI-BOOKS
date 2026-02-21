export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    const snapshot = await adminDb.collection("orders").get();

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sort by createdAt desc in memory
    orders.sort((a, b) => {
      const aDate = (a as { createdAt?: string }).createdAt || "";
      const bDate = (b as { createdAt?: string }).createdAt || "";
      return bDate.localeCompare(aDate);
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const now = new Date().toISOString();

    const order = {
      customerName: body.customerName,
      phone: body.phone,
      email: body.email || "",
      address: body.address,
      city: body.city,
      items: body.items || [],
      paymentMethod: body.paymentMethod,
      receiptImage: body.receiptImage || null,
      subtotal: body.subtotal,
      status: "pending" as const,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await adminDb.collection("orders").add(order);
    return NextResponse.json({ id: docRef.id, ...order }, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
