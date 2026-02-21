export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/auth";

const DEFAULT_SETTINGS = {
  quoteText:
    "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
  quoteAuthor: "Dr. Seuss",
};

export async function GET() {
  try {
    const doc = await adminDb.collection("siteSettings").doc("general").get();

    if (!doc.exists) {
      return NextResponse.json(DEFAULT_SETTINGS);
    }

    return NextResponse.json({ ...DEFAULT_SETTINGS, ...doc.data() });
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json(DEFAULT_SETTINGS);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    const body = await req.json();

    const update: Record<string, string> = {};
    if (typeof body.quoteText === "string") update.quoteText = body.quoteText;
    if (typeof body.quoteAuthor === "string") update.quoteAuthor = body.quoteAuthor;

    await adminDb.collection("siteSettings").doc("general").set(update, { merge: true });

    return NextResponse.json({ success: true, ...update });
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
