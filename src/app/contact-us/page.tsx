import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
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
    value: "+92 340 2715205",
    href: "tel:+923402715205",
    description: "Monday to Saturday, 10am - 8pm",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+92 340 2715205",
    href: "https://wa.me/923402715205",
    description: "Fastest way to confirm orders & share receipts",
  },
  {
    icon: FaEnvelope,
    title: "Email",
    value: "burkibooks205@gmail.com",
    href: "mailto:burkibooks205@gmail.com",
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
  title: "Contact Us – Burki Books | Order Inquiry, WhatsApp & Phone",
  description:
    "Contact Burki Books for book orders, inquiries, bulk purchases, partnerships & collaborations. Reach us via WhatsApp, phone, email or visit us in Lahore, Pakistan. Fast response guaranteed.",
  keywords: [
    "contact Burki Books",
    "Burki Books phone number",
    "Burki Books WhatsApp",
    "book order inquiry Pakistan",
    "Burki Books Lahore address",
    "buy books Lahore",
    "online bookstore contact Pakistan",
  ],
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Burki Books – We're One Message Away",
    description:
      "Have a question about an order or need a book recommendation? Contact Burki Books via WhatsApp, phone, or email. Located in Lahore, Pakistan.",
    url: "/contact-us",
  },
  twitter: {
    card: "summary",
    title: "Contact Burki Books – WhatsApp, Phone & Email",
    description:
      "Reach Burki Books for orders, bulk purchases & partnerships. Fast response via WhatsApp & email.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BookStore",
  name: "Burki Books",
  url: "https://burkibooks.com",
  telephone: "+923402715205",
  email: "burkibooks205@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
    streetAddress: "Cantt, Lahore",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "20:00",
  },
  sameAs: [
    "https://www.facebook.com/share/1C6TLz4jCG/",
    "https://www.instagram.com/burkibooks/",
    "https://x.com/BurkiBooks",
    "https://www.tiktok.com/@burkibooks",
    "https://www.threads.com/@burkibooks",
  ],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                <div className="min-w-0">
                  <p className="text-sm uppercase text-light-gray tracking-widest">{method.title}</p>
                  <p className="text-lg font-semibold text-dark break-all">{method.value}</p>
                  <p className="text-sm text-gray mt-1">{method.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ContactForm />
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
                <Link href="mailto:burkibooks205@gmail.com" className="text-teal font-semibold">
                  burkibooks205@gmail.com
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
