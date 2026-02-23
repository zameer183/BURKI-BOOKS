export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const doc = {
      name,
      email,
      subject: subject || "",
      message,
      status: "unread",
      createdAt: now,
    };

    const docRef = await adminDb.collection("messages").add(doc);
    return NextResponse.json({ id: docRef.id, ...doc }, { status: 201 });
  } catch (error) {
    console.error("POST /api/messages error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    const snapshot = await adminDb.collection("messages").get();

    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    messages.sort((a, b) => {
      const aDate = (a as { createdAt?: string }).createdAt || "";
      const bDate = (b as { createdAt?: string }).createdAt || "";
      return bDate.localeCompare(aDate);
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET /api/messages error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
