"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTimes, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/types/book";

export default function CartSidebar() {
  const { items, removeFromCart, updateQuantity, subtotal, isCartOpen, setIsCartOpen } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60]"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white z-[70] shadow-2xl flex flex-col transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-dark">Your Cart ({items.length})</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-dark transition"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-400 text-sm">Your cart is empty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-3 text-[#1c7c84] text-sm font-medium hover:underline"
              >
                Browse Books
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-[#f7f7f7] rounded-xl p-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={56}
                    height={80}
                    className="rounded-lg object-cover flex-shrink-0 w-14 h-20"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-dark truncate">{item.title}</h4>
                    <p className="text-[10px] text-gray-400">{item.author}</p>
                    <p className="text-[#1c7c84] font-bold text-sm mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition text-xs"
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus size={8} />
                      </button>
                      <span className="text-xs font-semibold w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition text-xs"
                      >
                        <FaPlus size={8} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-gray-300 hover:text-red-500 transition"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-4 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-dark font-semibold text-sm">Subtotal:</span>
              <span className="text-[#1c7c84] font-bold text-lg">{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full bg-[#1c7c84] text-white text-center py-3 rounded-lg font-semibold text-sm hover:bg-[#176a71] transition"
            >
              Checkout
            </Link>
            <button
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center text-gray-400 hover:text-dark transition text-xs"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
