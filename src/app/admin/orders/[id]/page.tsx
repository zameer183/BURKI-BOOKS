"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

interface OrderItem {
  productId?: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  items: OrderItem[];
  paymentMethod: string;
  receiptImage: string | null;
  subtotal: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  const updateStatus = async (status: string) => {
    setUpdating(true);
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setOrder((prev) => (prev ? { ...prev, status } : prev));
    }
    setUpdating(false);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this order? This cannot be undone.")) return;
    const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/orders");
    } else {
      alert("Failed to delete order");
    }
  };

  if (loading) return <div className="text-gray">Loading order...</div>;
  if (!order) return <div className="text-gray">Order not found.</div>;

  return (
    <div>
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-dark hover:text-teal transition mb-6 text-sm font-medium"
      >
        <FaArrowLeft size={10} /> Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-dark">
            Order #{order.id.slice(0, 8)}
          </h1>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              statusColors[order.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {order.status}
          </span>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
        >
          <FaTrash className="text-xs" /> Delete Order
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-dark mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={70}
                    className="rounded-md object-cover w-12 h-[68px]"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-dark">{item.title}</h4>
                    <p className="text-xs text-gray">{item.author}</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray">Qty: {item.quantity}</span>
                      <span className="text-sm font-semibold text-teal">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between">
              <span className="font-semibold text-dark">Total</span>
              <span className="text-xl font-bold text-teal">
                Rs. {order.subtotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Receipt */}
          {order.receiptImage && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-dark mb-4">Payment Receipt</h2>
              <Image
                src={order.receiptImage}
                alt="Payment receipt"
                width={300}
                height={400}
                className="rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-dark mb-4">Customer</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray">Name:</span>
                <span className="ml-2 text-dark font-medium">{order.customerName}</span>
              </div>
              <div>
                <span className="text-gray">Phone:</span>
                <span className="ml-2 text-dark font-medium">{order.phone}</span>
              </div>
              {order.email && (
                <div>
                  <span className="text-gray">Email:</span>
                  <span className="ml-2 text-dark font-medium">{order.email}</span>
                </div>
              )}
              <div>
                <span className="text-gray">Address:</span>
                <span className="ml-2 text-dark font-medium">{order.address}</span>
              </div>
              <div>
                <span className="text-gray">City:</span>
                <span className="ml-2 text-dark font-medium">{order.city}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-dark mb-4">Payment</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray">Method:</span>
                <span className="ml-2 text-dark font-medium capitalize">{order.paymentMethod}</span>
              </div>
              <div>
                <span className="text-gray">Date:</span>
                <span className="ml-2 text-dark font-medium">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Update Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-dark mb-4">Update Status</h2>
            <div className="space-y-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  disabled={updating || order.status === status}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition ${
                    order.status === status
                      ? "bg-teal text-white"
                      : "bg-gray-50 text-dark hover:bg-gray-100"
                  } disabled:opacity-50`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
