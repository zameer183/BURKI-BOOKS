"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <div className="text-teal text-4xl mb-4">&#10003;</div>
        <h2 className="text-2xl font-semibold text-dark mb-2">Message Sent!</h2>
        <p className="text-gray mb-6">
          Thank you for reaching out. We will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="bg-teal text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-teal-dark transition"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-semibold text-dark mb-6">Send us a message</h2>

      {status === "error" && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Full Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Subject</label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            placeholder="Tell us how we can help"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Message</label>
          <textarea
            rows={5}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            placeholder="Share more details..."
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-teal text-white py-3 rounded-xl font-semibold hover:bg-teal-dark transition disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
