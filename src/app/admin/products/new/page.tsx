"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";

const CATEGORY_OPTIONS = [
  "All Genre",
  "Biographies & Memoirs",
  "Current Affairs & International Relations",
  "Economics Finance & Business",
  "Fiction and Literature",
  "History & Geopolitics",
  "Islamic Thought & Theology",
  "Pashto Language & Culture",
  "Philosophy & Critical Thinking",
  "Politics",
  "Self-Help & Motivation",
];

const SUBCATEGORY_OPTIONS = [
  "Autobiographies",
  "Classic Literature",
  "Contemporary Fiction",
  "Cultural Studies",
  "Eastern Philosophy",
  "Ethics & Morality",
  "Freedom Fighters",
  "Global Politics",
  "Islamic Finance",
  "Islamic History",
  "Middle Eastern Affairs",
  "Military History",
  "Mindfulness & Spirituality",
  "Modern History",
  "Pakistani Politics",
  "Pashtun History",
  "Political Leaders",
  "Scholars & Thinkers",
  "South Asian History",
];

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    author: "",
    price: "",
    oldPrice: "",
    image: "",
    description: "",
    highlights: "",
    language: "English",
    inStock: true,
    categories: "",
    subcategories: "",
    isFeatured: false,
    isBestSeller: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;
    setForm({ ...form, [target.name]: value });
  };

  const autoSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm({ ...form, title, slug: autoSlug(title) });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload?type=product", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const { url } = await res.json();
      setForm({ ...form, image: url });
      setImagePreview(url);
    }
  };

  const selectedCategories = form.categories
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  const selectedSubcategories = form.subcategories
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      ...form,
      price: parseInt(form.price) || 0,
      oldPrice: form.oldPrice ? parseInt(form.oldPrice) : null,
      highlights: form.highlights
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
      categories: selectedCategories,
      subcategories: selectedSubcategories,
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/products");
    } else {
      alert("Failed to create product");
    }

    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-dark mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Basic Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-dark mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleTitleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-1">Author *</label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-1">Price (Rs.) *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-1">Old Price (Rs.)</label>
              <input
                type="number"
                name="oldPrice"
                value={form.oldPrice}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Product Image</h2>

          {imagePreview ? (
            <div className="relative inline-block">
              <Image
                src={imagePreview}
                alt="Preview"
                width={200}
                height={280}
                className="rounded-xl border border-gray-200 shadow-sm object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setForm({ ...form, image: "" });
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600"
              >
                <FaTimes size={10} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-teal hover:bg-[#f0fafb] transition">
              <FaCloudUploadAlt className="text-gray-400 text-3xl" />
              <span className="text-sm text-gray-500 font-medium">Click to upload image</span>
              <span className="text-xs text-gray-400">JPG, PNG, JPEG</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}

          <div>
            <label className="block text-sm font-medium text-dark mb-1">Or enter image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={(e) => {
                setForm({ ...form, image: e.target.value });
                setImagePreview(e.target.value || null);
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
              placeholder="/images/product-name.jpg"
            />
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Details</h2>

          <div>
            <label className="block text-sm font-medium text-dark mb-1">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Highlights (one per line)
            </label>
            <textarea
              name="highlights"
              value={form.highlights}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal resize-none"
              placeholder={"Paperback edition\nShips in 2-3 business days\nBookmark included"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1">Language</label>
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            >
              <option>English</option>
              <option>Urdu</option>
              <option>Pashto</option>
            </select>
          </div>
        </div>

        {/* Categories & Flags */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Categories & Flags</h2>

          <MultiSelectDropdown
            label="Categories"
            options={CATEGORY_OPTIONS}
            selected={selectedCategories}
            onChange={(vals) => setForm({ ...form, categories: vals.join(", ") })}
          />

          <MultiSelectDropdown
            label="Subcategories"
            options={SUBCATEGORY_OPTIONS}
            selected={selectedSubcategories}
            onChange={(vals) => setForm({ ...form, subcategories: vals.join(", ") })}
          />

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="inStock"
                checked={form.inStock}
                onChange={handleChange}
                className="accent-teal"
              />
              <span className="text-sm text-dark">In Stock</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
                className="accent-teal"
              />
              <span className="text-sm text-dark">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isBestSeller"
                checked={form.isBestSeller}
                onChange={handleChange}
                className="accent-teal"
              />
              <span className="text-sm text-dark">Best Seller</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-dark transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg border border-gray-300 text-dark hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
