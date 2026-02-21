"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Product {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  image: string;
  inStock: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  if (loading) return <div className="text-gray">Loading products...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-dark">Products ({products.length})</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-dark transition"
        >
          <FaPlus className="text-xs" /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-dark">Image</th>
              <th className="px-4 py-3 font-semibold text-dark">Title</th>
              <th className="px-4 py-3 font-semibold text-dark">Author</th>
              <th className="px-4 py-3 font-semibold text-dark">Price</th>
              <th className="px-4 py-3 font-semibold text-dark">Status</th>
              <th className="px-4 py-3 font-semibold text-dark">Flags</th>
              <th className="px-4 py-3 font-semibold text-dark">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={40}
                    height={56}
                    className="rounded-md object-cover w-10 h-14"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-dark">{product.title}</td>
                <td className="px-4 py-3 text-gray">{product.author}</td>
                <td className="px-4 py-3 font-semibold text-teal">
                  Rs. {product.price.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      product.inStock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {product.isFeatured && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-teal/10 text-teal">
                        Featured
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#c9a27e]/10 text-[#c9a27e]">
                        Bestseller
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-teal hover:text-teal-dark transition"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.title)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-12 text-gray">
            No products found. Add your first product!
          </div>
        )}
      </div>
    </div>
  );
}
