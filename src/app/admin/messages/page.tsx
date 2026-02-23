"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  unread: "bg-blue-100 text-blue-700",
  read: "bg-gray-100 text-gray-600",
};

const tabs = ["all", "unread", "read"];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then(setMessages)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeTab === "all" ? messages : messages.filter((m) => m.status === activeTab);

  if (loading) return <div className="text-gray">Loading messages...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-dark mb-6">
        Messages ({messages.length})
      </h1>

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
                ({messages.filter((m) => m.status === tab).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-dark">Name</th>
              <th className="px-4 py-3 font-semibold text-dark">Email</th>
              <th className="px-4 py-3 font-semibold text-dark">Subject</th>
              <th className="px-4 py-3 font-semibold text-dark">Status</th>
              <th className="px-4 py-3 font-semibold text-dark">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((msg) => (
              <tr
                key={msg.id}
                className={`hover:bg-gray-50 ${msg.status === "unread" ? "font-medium" : ""}`}
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/messages/${msg.id}`}
                    className="text-teal font-medium hover:underline"
                  >
                    {msg.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray">{msg.email}</td>
                <td className="px-4 py-3 text-dark">
                  {msg.subject || <span className="text-gray italic">No subject</span>}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      statusColors[msg.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {msg.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray text-xs">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray">No messages found.</div>
        )}
      </div>
    </div>
  );
}
