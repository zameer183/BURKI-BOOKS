"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setQuoteText(data.quoteText || "");
        setQuoteAuthor(data.quoteAuthor || "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteText, quoteAuthor }),
      });
      if (res.ok) {
        setMessage("Settings saved successfully!");
      } else {
        setMessage("Failed to save settings.");
      }
    } catch {
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <div className="text-gray">Loading settings...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-dark mb-6">Settings</h1>

      <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl">
        <h2 className="text-lg font-medium text-dark mb-4">Quote of the Day</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Quote Text</label>
            <textarea
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              rows={3}
              className="w-full border border-gray/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1">Quote Author</label>
            <input
              type="text"
              value={quoteAuthor}
              onChange={(e) => setQuoteAuthor(e.target.value)}
              className="w-full border border-gray/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-teal text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-teal-dark transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
            {message && (
              <span
                className={`text-sm font-medium ${
                  message.includes("success") ? "text-green-600" : "text-red-500"
                }`}
              >
                {message}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
