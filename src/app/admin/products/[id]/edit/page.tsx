"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";

const CATEGORY_OPTIONS = [
  "Islamic Thought & Theology",
  "History & Geopolitics",
  "Fiction and Literature",
  "Philosophy & Critical Thinking",
  "Current Affairs & International Relations",
  "Economics, Finance & Business",
  "Biographies & Memoirs",
  "Exam Preparation (CSS / PMS)",
  "Children's Literature & Learning",
  "Self-Help & Motivation",
  "Pashto Language & Culture",
  "Politics",
  "Urdu Literature",
];

const ALL_SUBCATEGORY_OPTIONS = [
  "Activity Books",
  "Classical Urdu Literature",
  "Business Strategy",
  "Colonial & Post-Colonial Studies",
  "Comparative Religion",
  "Compulsory Subjects",
  "Contemporary Fiction",
  "Cultural Studies",
  "Democracy & Governance",
  "Development Economics",
  "Diplomacy & Foreign Policy",
  "Early Learning",
  "English Classics",
  "Entrepreneurship",
  "Essay & Precis Writing",
  "Folk Stories",
  "Modern Urdu Prose",
  "Global Issues",
  "Greek Philosophy",
  "Hadith & Sunnah",
  "Historical Figures",
  "Ideologies",
  "Interview Preparation",
  "Islamic Books for Kids",
  "Islamic History",
  "Islamic Jurisprudence (Fiqh)",
  "Islamic Philosophy",
  "Urdu Drama",
  "Leadership",
  "Logic & Reasoning",
  "Maqasid al-Shariah",
  "Mental Health",
  "Modern Philosophy",
  "Moral Stories",
  "Optional Subjects",
  "Pakistani Politics",
  "Pashto Fiction",
  "Pashto Poetry",
  "Past Papers",
  "Personal Finance",
  "Personal Growth",
  "Personal Narratives",
  "Picture Books",
  "Poetry",
  "Political Economy",
  "Political Theory",
  "Qur'anic Studies",
  "Regional Politics",
  "Revolutionaries & Leaders",
  "Security & Strategy",
  "Short Stories",
  "South Asian History",
  "Strategic Studies",
  "Time Management",
  "Urdu Poetry",
  "Urdu Fiction",
  "War & Conflict",
  "World History",
  "Writers & Philosophers",
];

const CATEGORY_SUBCATEGORY_MAP: Record<string, string[]> = {
  "Islamic Thought & Theology": ["Qur'anic Studies", "Hadith & Sunnah", "Islamic Jurisprudence (Fiqh)", "Islamic History", "Maqasid al-Shariah", "Comparative Religion"],
  "History & Geopolitics": ["South Asian History", "World History", "Colonial & Post-Colonial Studies", "War & Conflict", "Strategic Studies"],
  "Fiction and Literature": ["Urdu Fiction", "English Classics", "Contemporary Fiction", "Short Stories", "Poetry"],
  "Philosophy & Critical Thinking": ["Greek Philosophy", "Islamic Philosophy", "Modern Philosophy", "Logic & Reasoning"],
  "Current Affairs & International Relations": ["Global Issues", "Diplomacy & Foreign Policy", "Regional Politics", "Security & Strategy"],
  "Economics, Finance & Business": ["Development Economics", "Political Economy", "Entrepreneurship", "Business Strategy", "Personal Finance"],
  "Biographies & Memoirs": ["Historical Figures", "Revolutionaries & Leaders", "Writers & Philosophers", "Personal Narratives"],
  "Exam Preparation (CSS / PMS)": ["Compulsory Subjects", "Optional Subjects", "Past Papers", "Essay & Precis Writing", "Interview Preparation"],
  "Children's Literature & Learning": ["Picture Books", "Moral Stories", "Activity Books", "Early Learning", "Islamic Books for Kids"],
  "Self-Help & Motivation": ["Personal Growth", "Time Management", "Leadership", "Mental Health"],
  "Pashto Language & Culture": ["Pashto Poetry", "Pashto Fiction", "Cultural Studies", "Folk Stories"],
  "Politics": ["Political Theory", "Pakistani Politics", "Democracy & Governance", "Ideologies"],
  "Urdu Literature": ["Urdu Poetry", "Urdu Fiction", "Urdu Drama", "Classical Urdu Literature", "Modern Urdu Prose"],
};

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          author: data.author || "",
          price: String(data.price || ""),
          oldPrice: data.oldPrice ? String(data.oldPrice) : "",
          image: data.image || "",
          description: data.description || "",
          highlights: (data.highlights || []).join("\n"),
          language: data.language || "English",
          inStock: data.inStock ?? true,
          categories: (data.categories || []).join(", "),
          subcategories: (data.subcategories || []).join(", "),
          isFeatured: data.isFeatured ?? false,
          isBestSeller: data.isBestSeller ?? false,
        });
        setImagePreview(data.image || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

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

  // Dynamically compute available subcategories based on selected categories
  const availableSubcategories = selectedCategories.length === 0
    ? ALL_SUBCATEGORY_OPTIONS
    : [...new Set(selectedCategories.flatMap((cat) => CATEGORY_SUBCATEGORY_MAP[cat] || []))].sort();

  const handleCategoryChange = (vals: string[]) => {
    const newAvailable = vals.length === 0
      ? ALL_SUBCATEGORY_OPTIONS
      : [...new Set(vals.flatMap((cat) => CATEGORY_SUBCATEGORY_MAP[cat] || []))];
    // Remove subcategories that are no longer available
    const filteredSubs = selectedSubcategories.filter((sub) => newAvailable.includes(sub));
    setForm({
      ...form,
      categories: vals.join(", "),
      subcategories: filteredSubs.join(", "),
    });
  };

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

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/products");
    } else {
      alert("Failed to update product");
    }

    setSaving(false);
  };

  if (loading) return <div className="text-gray">Loading product...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-dark mb-6">Edit Product</h1>

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
                onChange={handleChange}
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

        {/* Image */}
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
            <label className="block text-sm font-medium text-dark mb-1">Highlights (one per line)</label>
            <textarea
              name="highlights"
              value={form.highlights}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal resize-none"
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
            onChange={handleCategoryChange}
          />

          <MultiSelectDropdown
            label="Subcategories"
            options={availableSubcategories}
            selected={selectedSubcategories}
            onChange={(vals) => setForm({ ...form, subcategories: vals.join(", ") })}
          />

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} className="accent-teal" />
              <span className="text-sm text-dark">In Stock</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="accent-teal" />
              <span className="text-sm text-dark">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isBestSeller" checked={form.isBestSeller} onChange={handleChange} className="accent-teal" />
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
            {saving ? "Saving..." : "Update Product"}
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
