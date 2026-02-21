"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface OrderItem {
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  subtotal: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const tabs = ["all", "pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeTab === "all" ? orders : orders.filter((o) => o.status === activeTab);

  if (loading) return <div className="text-gray">Loading orders...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-dark mb-6">Orders ({orders.length})</h1>

      {/* Status Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-full border transition ${
              activeTab === tab
                ? "bg-teal text-white border-teal"
                : "bg-white text-gray-600 border-gray-200 hover:border-teal"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab !== "all" && (
              <span className="ml-1.5 text-[10px]">
                ({orders.filter((o) => o.status === tab).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-dark">Order</th>
              <th className="px-4 py-3 font-semibold text-dark">Customer</th>
              <th className="px-4 py-3 font-semibold text-dark">City</th>
              <th className="px-4 py-3 font-semibold text-dark">Items</th>
              <th className="px-4 py-3 font-semibold text-dark">Total</th>
              <th className="px-4 py-3 font-semibold text-dark">Status</th>
              <th className="px-4 py-3 font-semibold text-dark">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-teal font-medium hover:underline"
                  >
                    #{order.id.slice(0, 8)}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-dark">{order.customerName}</div>
                  <div className="text-xs text-gray">{order.phone}</div>
                </td>
                <td className="px-4 py-3 text-gray">{order.city}</td>
                <td className="px-4 py-3 text-gray">
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </td>
                <td className="px-4 py-3 font-semibold text-dark">
                  Rs. {order.subtotal.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      statusColors[order.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray">No orders found.</div>
        )}
      </div>
    </div>
  );
}
