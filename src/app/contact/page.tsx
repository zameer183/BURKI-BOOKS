import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const contactMethods = [
  {
    icon: FaPhoneAlt,
    title: "Call Us",
    value: "+92 300 1234567",
    href: "tel:+923001234567",
    description: "Monday to Saturday, 10am - 8pm",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+92 312 9876543",
    href: "https://wa.me/923129876543",
    description: "Fastest way to confirm orders & share receipts",
  },
  {
    icon: FaEnvelope,
    title: "Email",
    value: "hello@burkibooks.com",
    href: "mailto:hello@burkibooks.com",
    description: "We reply within 24 hours",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Visit",
    value: "Lahore, Pakistan",
    href: "https://maps.google.com/?q=Lahore,Pakistan",
    description: "Pickup available on request",
  },
];

export const metadata: Metadata = {
  title: "Contact Us – Burki Books Pakistan",
  description:
    "Get in touch with Burki Books for orders, book inquiries, bulk purchases, and partnerships. Reach us via WhatsApp, phone, or email.",
  openGraph: {
    title: "Contact Burki Books",
    description: "Reach us for orders, inquiries, and partnerships.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <main className="flex-1">
        <section className="bg-teal text-white py-12">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="uppercase text-sm tracking-widest text-white/70 mb-3">Contact</p>
            <h1 className="text-4xl font-semibold text-white mb-4">We would love to hear from you</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Whether you have a question about an order, need a recommendation, or want to collaborate on an event, we are one message away.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method) => (
              <Link
                key={method.title}
                href={method.href}
                className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-3 hover:-translate-y-1 transition-transform"
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <method.icon className="text-teal text-2xl" />
                <div>
                  <p className="text-sm uppercase text-light-gray tracking-widest">{method.title}</p>
                  <p className="text-xl font-semibold text-dark">{method.value}</p>
                  <p className="text-sm text-gray mt-1">{method.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-dark mb-6">Send us a message</h2>
              <form action="mailto:hello@burkibooks.com" method="post" encType="text/plain" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                    placeholder="Tell us how we can help"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                    placeholder="Share more details..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal text-white py-3 rounded-xl font-semibold hover:bg-teal-dark transition"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-semibold text-dark mb-3">Store Hours</h2>
                <p className="text-gray mb-2">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                <p className="text-gray">Sunday: Online support only</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-semibold text-dark mb-3">Visit Us</h2>
                <p className="text-gray mb-4">
                  Burki Books HQ, Cantt, Lahore. Pickup is available by appointment and we can arrange meetups for bulk orders.
                </p>
                <Link
                  href="https://maps.google.com/?q=Lahore,Pakistan"
                  className="inline-flex items-center gap-2 text-teal font-semibold"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Google Maps
                </Link>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-semibold text-dark mb-3">Press & Partnerships</h2>
                <p className="text-gray mb-4">
                  For collaborations, author events, or wholesale requests, drop us a line and we will get back to you with next steps.
                </p>
                <Link href="mailto:partners@burkibooks.com" className="text-teal font-semibold">
                  partners@burkibooks.com
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
