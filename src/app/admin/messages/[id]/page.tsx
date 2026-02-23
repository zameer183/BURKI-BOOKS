"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaTrash, FaEnvelope, FaCheck } from "react-icons/fa";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`/api/messages/${id}`)
      .then((res) => res.json())
      .then(setMessage)
      .finally(() => setLoading(false));
  }, [id]);

  const markAsRead = async () => {
    setUpdating(true);
    const res = await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "read" }),
    });
    if (res.ok) {
      setMessage((prev) => (prev ? { ...prev, status: "read" } : prev));
    }
    setUpdating(false);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this message? This cannot be undone.")) return;
    const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/messages");
    } else {
      alert("Failed to delete message");
    }
  };

  if (loading) return <div className="text-gray">Loading message...</div>;
  if (!message) return <div className="text-gray">Message not found.</div>;

  const statusColor =
    message.status === "unread"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-600";

  return (
    <div>
      <Link
        href="/admin/messages"
        className="inline-flex items-center gap-2 text-dark hover:text-teal transition mb-6 text-sm font-medium"
      >
        <FaArrowLeft size={10} /> Back to Messages
      </Link>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-dark">
            {message.subject || "No Subject"}
          </h1>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}
          >
            {message.status}
          </span>
        </div>
        <div className="flex gap-2">
          {message.status === "unread" && (
            <button
              onClick={markAsRead}
              disabled={updating}
              className="flex items-center gap-2 bg-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-dark transition disabled:opacity-50"
            >
              <FaCheck className="text-xs" /> Mark as Read
            </button>
          )}
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
          >
            <FaTrash className="text-xs" /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-dark mb-4">Message</h2>
            <p className="text-dark whitespace-pre-wrap leading-relaxed">
              {message.message}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sender Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-dark mb-4">Sender</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray">Name:</span>
                <span className="ml-2 text-dark font-medium">{message.name}</span>
              </div>
              <div>
                <span className="text-gray">Email:</span>
                <span className="ml-2 text-dark font-medium">{message.email}</span>
              </div>
              <div>
                <span className="text-gray">Date:</span>
                <span className="ml-2 text-dark font-medium">
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-dark mb-4">Actions</h2>
            <a
              href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject || "Your message to Burki Books")}`}
              className="flex items-center gap-2 w-full bg-teal text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-dark transition justify-center"
            >
              <FaEnvelope className="text-xs" /> Reply via Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
