export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { adminDb } from "@/lib/firebase-admin";
import cloudinary from "@/lib/cloudinary";
import fs from "fs";
import path from "path";

export async function POST() {
  const admin = await getAdminFromCookie();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snapshot = await adminDb.collection("products").get();
  const results: { id: string; old: string; new: string }[] = [];
  const errors: { id: string; error: string }[] = [];

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const imagePath = data.image;

    // Skip if already a full URL (already migrated)
    if (!imagePath || imagePath.startsWith("http")) continue;

    const localFile = path.join(process.cwd(), "public", imagePath);

    if (!fs.existsSync(localFile)) {
      errors.push({ id: doc.id, error: `File not found: ${imagePath}` });
      continue;
    }

    try {
      const result = await cloudinary.uploader.upload(localFile, {
        folder: "burki-books/products",
        resource_type: "image",
      });

      await adminDb.collection("products").doc(doc.id).update({
        image: result.secure_url,
      });

      results.push({ id: doc.id, old: imagePath, new: result.secure_url });
    } catch (err) {
      errors.push({
        id: doc.id,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return NextResponse.json({
    migrated: results.length,
    failed: errors.length,
    results,
    errors,
  });
}
