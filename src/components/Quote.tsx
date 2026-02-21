"use client";

import { useEffect, useState } from "react";

const DEFAULT_QUOTE = "The more that you read, the more things you will know. The more that you learn, the more places you'll go.";
const DEFAULT_AUTHOR = "Dr. Seuss";

export default function Quote() {
  const [quoteText, setQuoteText] = useState(DEFAULT_QUOTE);
  const [quoteAuthor, setQuoteAuthor] = useState(DEFAULT_AUTHOR);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.quoteText) setQuoteText(data.quoteText);
        if (data.quoteAuthor) setQuoteAuthor(data.quoteAuthor);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 md:py-20 text-center bg-teal text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-medium relative inline-block mb-12">
          Quote of the Day
          <span className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-12 h-0.5 bg-white" />
        </h2>
        <blockquote className="text-2xl md:text-3xl text-white leading-relaxed italic mb-8">
          &ldquo;{quoteText}&rdquo;
        </blockquote>
        <p className="text-xl font-medium text-white/80">{quoteAuthor}</p>
      </div>
    </section>
  );
}
