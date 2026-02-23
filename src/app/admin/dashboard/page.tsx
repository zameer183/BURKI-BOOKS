"use client";

import { useEffect, useState } from "react";
import { FaBook, FaBoxOpen, FaClock, FaEnvelope, FaMoneyBillWave } from "react-icons/fa";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  revenue: number;
  unreadMessages: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, ordersRes, messagesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/orders"),
          fetch("/api/messages"),
        ]);

        const products = productsRes.ok ? await productsRes.json() : [];
        const orders = ordersRes.ok ? await ordersRes.json() : [];
        const messages = messagesRes.ok ? await messagesRes.json() : [];

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          pendingOrders: orders.filter(
            (o: { status: string }) => o.status === "pending"
          ).length,
          revenue: orders
            .filter((o: { status: string }) => o.status !== "cancelled")
            .reduce((sum: number, o: { subtotal: number }) => sum + (o.subtotal || 0), 0),
          unreadMessages: Array.isArray(messages)
            ? messages.filter((m: { status: string }) => m.status === "unread").length
            : 0,
        });
      } catch {
        // stats stay at 0
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: FaBook,
      color: "bg-teal",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: FaBoxOpen,
      color: "bg-[#c9a27e]",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: FaClock,
      color: "bg-orange-500",
    },
    {
      label: "Revenue",
      value: `Rs. ${stats.revenue.toLocaleString()}`,
      icon: FaMoneyBillWave,
      color: "bg-green-600",
    },
    {
      label: "Unread Messages",
      value: stats.unreadMessages,
      icon: FaEnvelope,
      color: "bg-blue-600",
    },
  ];

  if (loading) {
    return <div className="text-gray">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-dark mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4"
          >
            <div
              className={`${card.color} text-white w-12 h-12 rounded-lg flex items-center justify-center`}
            >
              <card.icon className="text-lg" />
            </div>
            <div>
              <p className="text-xs text-gray">{card.label}</p>
              <p className="text-xl font-bold text-dark">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
