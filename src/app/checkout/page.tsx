"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/types/book";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";

type PaymentMethod = "cod" | "jazzcash" | "easypaisa" | "bank";

export default function CheckoutPage() {
  const { items, subtotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };
  let content: ReactNode;

  if (orderPlaced) {
    content = (
      <section className="flex min-h-full flex-col items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg text-center">
          <FaCheckCircle className="text-teal mx-auto mb-4" size={60} />
          <h1 className="text-2xl font-semibold text-dark mb-2">Order Placed Successfully!</h1>
          <p className="text-gray mb-6">
            Thank you for your order. We will contact you shortly to confirm your order details.
          </p>
          <Link
            href="/"
            className="inline-block bg-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-dark transition"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  } else if (items.length === 0) {
    content = (
      <section className="flex min-h-full flex-col items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg text-center">
          <h1 className="text-2xl font-semibold text-dark mb-4">Your cart is empty</h1>
          <p className="text-gray mb-6">Add some books to your cart to proceed with checkout.</p>
          <Link
            href="/"
            className="inline-block bg-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-dark transition"
          >
            Browse Books
          </Link>
        </div>
      </section>
    );
  } else {
    content = (
      <section className="min-h-full py-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-dark hover:text-teal transition mb-8 font-medium"
          >
            <FaArrowLeft size={12} /> Back to Shop
          </Link>

          <h1 className="text-3xl font-semibold text-dark mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 bg-[#f7f7f7] rounded-xl p-3">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={50}
                        height={70}
                        className="rounded-lg object-cover flex-shrink-0 w-12 h-[68px]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-dark truncate">{item.title}</h4>
                        <p className="text-[10px] text-gray-400">{item.author}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() =>
                                item.quantity > 1
                                  ? updateQuantity(item.id, item.quantity - 1)
                                  : removeFromCart(item.id)
                              }
                              className="w-6 h-6 text-xs rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="text-xs font-semibold w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 text-xs rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-bold text-[#1c7c84]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                  <span className="font-semibold text-dark">Total:</span>
                  <span className="font-bold text-teal text-xl">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>

            {/* Customer Form + Payment */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Details */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-dark mb-4">Customer Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                        placeholder="03XX-XXXXXXX"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-dark mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-dark mb-1">Delivery Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                        placeholder="House #, Street, Area"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                        placeholder="e.g. Lahore"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-dark mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    {/* COD */}
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-teal transition">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="accent-teal"
                      />
                      <div>
                        <span className="font-medium text-dark">Cash on Delivery (COD)</span>
                        <p className="text-xs text-gray">Pay when you receive your order</p>
                      </div>
                    </label>

                    {/* JazzCash */}
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-teal transition">
                      <input
                        type="radio"
                        name="payment"
                        value="jazzcash"
                        checked={paymentMethod === "jazzcash"}
                        onChange={() => setPaymentMethod("jazzcash")}
                        className="accent-teal"
                      />
                      <div>
                        <span className="font-medium text-dark">JazzCash</span>
                        <p className="text-xs text-gray">Send payment via JazzCash</p>
                      </div>
                    </label>
                    {paymentMethod === "jazzcash" && (
                      <div className="ml-10 p-3 bg-cream rounded-lg text-sm">
                        <p className="font-medium text-dark">JazzCash Number:</p>
                        <p className="text-teal font-bold">0300-1234567</p>
                        <p className="text-xs text-gray mt-1">Send payment and share screenshot via WhatsApp</p>
                      </div>
                    )}

                    {/* EasyPaisa */}
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-teal transition">
                      <input
                        type="radio"
                        name="payment"
                        value="easypaisa"
                        checked={paymentMethod === "easypaisa"}
                        onChange={() => setPaymentMethod("easypaisa")}
                        className="accent-teal"
                      />
                      <div>
                        <span className="font-medium text-dark">EasyPaisa</span>
                        <p className="text-xs text-gray">Send payment via EasyPaisa</p>
                      </div>
                    </label>
                    {paymentMethod === "easypaisa" && (
                      <div className="ml-10 p-3 bg-cream rounded-lg text-sm">
                        <p className="font-medium text-dark">EasyPaisa Number:</p>
                        <p className="text-teal font-bold">0300-1234567</p>
                        <p className="text-xs text-gray mt-1">Send payment and share screenshot via WhatsApp</p>
                      </div>
                    )}

                    {/* Bank Transfer */}
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-teal transition">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                        className="accent-teal"
                      />
                      <div>
                        <span className="font-medium text-dark">Bank Transfer</span>
                        <p className="text-xs text-gray">Transfer to our bank account</p>
                      </div>
                    </label>
                    {paymentMethod === "bank" && (
                      <div className="ml-10 p-3 bg-cream rounded-lg text-sm">
                        <p className="font-medium text-dark">Bank Account Details:</p>
                        <p className="text-gray mt-1">Bank: <span className="text-dark font-medium">Meezan Bank</span></p>
                        <p className="text-gray">Account Title: <span className="text-dark font-medium">Burki Books</span></p>
                        <p className="text-gray">Account No: <span className="text-teal font-bold">1234-5678901234</span></p>
                        <p className="text-gray">IBAN: <span className="text-teal font-bold">PK00MEZN1234567890123</span></p>
                        <p className="text-xs text-gray mt-2">Transfer payment and share receipt via WhatsApp</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  className="w-full bg-teal text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-dark transition shadow-md"
                >
                  Place Order - {formatPrice(subtotal)}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <main className="flex-1 flex flex-col">{content}</main>
    </div>
  );
}
