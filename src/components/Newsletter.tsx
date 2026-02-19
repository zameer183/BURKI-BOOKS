"use client";

import { FaPaperPlane } from "react-icons/fa";

export default function Newsletter() {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="md:w-5/12 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-semibold text-dark relative pb-3 mb-2">
              Subscribe to Newsletter
              <span className="absolute bottom-0 left-0 md:left-0 w-10 h-0.5 bg-teal hidden md:block" />
            </h2>
          </div>
          <div className="md:w-7/12 w-full">
            <p className="text-gray-500 text-sm mb-4 text-center md:text-left">
              Stay updated with latest arrivals, offers, and book recommendations.
            </p>
            <form className="flex items-center bg-[#f7f7f7] rounded-lg px-4 py-2.5" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-dark placeholder-gray-400 outline-none text-sm"
              />
              <button
                type="submit"
                className="ml-2 h-9 px-4 rounded-lg bg-[#1c7c84] text-white flex items-center gap-1.5 text-xs font-medium hover:bg-[#176a71] transition flex-shrink-0"
              >
                Send <FaPaperPlane className="text-[10px]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
