"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/types/book";
import { FaArrowLeft, FaCheckCircle, FaCloudUploadAlt, FaTimes } from "react-icons/fa";

type PaymentMethod = "easypaisa" | "meezan" | "sadapay";

export default function CheckoutPage() {
  const { items, subtotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const totalBooks = items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryCharges = totalBooks * 170;
  const grandTotal = subtotal + deliveryCharges;
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("easypaisa");
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState("");
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

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReceiptFile(file);
    const reader = new FileReader();
    reader.onload = () => setReceiptPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeReceipt = () => {
    setReceiptFile(null);
    setReceiptPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Upload receipt if provided
      let receiptImage: string | null = null;
      if (receiptFile) {
        const formData = new FormData();
        formData.append("file", receiptFile);
        const uploadRes = await fetch("/api/upload?type=receipt", {
          method: "POST",
          body: formData,
        });
        if (uploadRes.ok) {
          const data = await uploadRes.json();
          receiptImage = data.url;
        }
      }

      // Submit order
      const orderData = {
        customerName: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        items: items.map((item) => ({
          productId: item.id,
          slug: item.id,
          title: item.title,
          author: item.author,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        paymentMethod,
        transactionId: transactionId || null,
        receiptImage,
        subtotal,
        deliveryCharges,
        total: grandTotal,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        setOrderPlaced(true);
        clearCart();
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
                <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray">Subtotal:</span>
                    <span className="font-medium text-dark">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray">Delivery ({totalBooks} book{totalBooks !== 1 ? "s" : ""} x Rs. 170):</span>
                    <span className="font-medium text-dark">{formatPrice(deliveryCharges)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-dark">Total:</span>
                    <span className="font-bold text-teal text-xl">{formatPrice(grandTotal)}</span>
                  </div>
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
                      <img src="/images/icon-easypaisa.webp" alt="EasyPaisa" className="w-9 h-9 rounded-full object-contain flex-shrink-0" />
                      <div>
                        <span className="font-medium text-dark">EasyPaisa</span>
                        <p className="text-xs text-gray">Send payment via EasyPaisa</p>
                      </div>
                    </label>
                    {paymentMethod === "easypaisa" && (
                      <div className="ml-10 p-3 bg-cream rounded-lg text-sm">
                        <p className="text-gray">Title: <span className="text-dark font-medium">Farid Ullah Burki</span></p>
                        <p className="text-gray">Account: <span className="text-teal font-bold">03402715205</span></p>
                        <p className="text-gray">IBAN: <span className="text-teal font-bold">PK49TMFB0000000017395241</span></p>
                        <p className="text-xs text-gray mt-2">Payment kar ke screenshot neeche upload karein</p>
                      </div>
                    )}

                    {/* Meezan Bank */}
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-teal transition">
                      <input
                        type="radio"
                        name="payment"
                        value="meezan"
                        checked={paymentMethod === "meezan"}
                        onChange={() => setPaymentMethod("meezan")}
                        className="accent-teal"
                      />
                      <img src="/images/icon-meezan-bank.png" alt="Meezan Bank" className="w-9 h-9 rounded-full object-contain flex-shrink-0" />
                      <div>
                        <span className="font-medium text-dark">Meezan Bank</span>
                        <p className="text-xs text-gray">Transfer to Meezan Bank account</p>
                      </div>
                    </label>
                    {paymentMethod === "meezan" && (
                      <div className="ml-10 p-3 bg-cream rounded-lg text-sm">
                        <p className="text-gray">Title: <span className="text-dark font-medium">Farid Ullah Burki</span></p>
                        <p className="text-gray">Account: <span className="text-teal font-bold">12310105974403</span></p>
                        <p className="text-gray">IBAN: <span className="text-teal font-bold">PK96MEZN0012310105974403</span></p>
                        <p className="text-gray">Branch: <span className="text-dark font-medium">Tank City BR</span></p>
                        <p className="text-xs text-gray mt-2">Payment kar ke receipt neeche upload karein</p>
                      </div>
                    )}

                    {/* SadaPay */}
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-teal transition">
                      <input
                        type="radio"
                        name="payment"
                        value="sadapay"
                        checked={paymentMethod === "sadapay"}
                        onChange={() => setPaymentMethod("sadapay")}
                        className="accent-teal"
                      />
                      <img src="/images/icon-sadapay.png" alt="SadaPay" className="w-9 h-9 rounded-full object-contain flex-shrink-0" />
                      <div>
                        <span className="font-medium text-dark">SadaPay</span>
                        <p className="text-xs text-gray">Send payment via SadaPay</p>
                      </div>
                    </label>
                    {paymentMethod === "sadapay" && (
                      <div className="ml-10 p-3 bg-cream rounded-lg text-sm">
                        <p className="text-gray">Title: <span className="text-dark font-medium">Farid Ullah Burki</span></p>
                        <p className="text-gray">Account: <span className="text-teal font-bold">03402715205</span></p>
                        <p className="text-xs text-gray mt-2">Payment kar ke screenshot neeche upload karein</p>
                      </div>
                    )}
                  </div>

                  {/* Payment Proof */}
                  <div className="mt-5 pt-5 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-dark mb-2">Payment Proof</h3>
                    <p className="text-xs text-gray mb-3">Payment karne ke baad screenshot upload karein ya Transaction ID darj karein</p>

                    {/* Transaction ID */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-dark mb-1">Transaction ID / TRX ID</label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                        placeholder="e.g. TRX123456789"
                      />
                    </div>

                    <div className="relative flex items-center mb-4">
                      <div className="flex-grow border-t border-gray-200" />
                      <span className="mx-3 text-xs text-gray">ya / or</span>
                      <div className="flex-grow border-t border-gray-200" />
                    </div>

                    {/* Receipt Upload */}
                    <label className="block text-sm font-medium text-dark mb-1">Upload Screenshot</label>
                    {!receiptPreview ? (
                      <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-teal hover:bg-[#f0fafb] transition">
                        <FaCloudUploadAlt className="text-gray-400 text-2xl" />
                        <span className="text-xs text-gray-500 font-medium">Click to upload receipt</span>
                        <span className="text-[10px] text-gray-400">JPG, PNG or PDF</span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleReceiptUpload}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="relative inline-block">
                        <img
                          src={receiptPreview}
                          alt="Payment receipt"
                          className="max-h-48 rounded-xl border border-gray-200 shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={removeReceipt}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition"
                        >
                          <FaTimes size={10} />
                        </button>
                        <p className="text-xs text-teal font-medium mt-2">{receiptFile?.name}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-teal text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-dark transition shadow-md disabled:opacity-50"
                >
                  {submitting ? "Placing Order..." : `Place Order - ${formatPrice(grandTotal)}`}
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
