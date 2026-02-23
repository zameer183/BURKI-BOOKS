"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect fill='%23e5e7eb' width='200' height='280'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";

type BookImageProps = Omit<ImageProps, "onError"> & {
  fallback?: string;
};

export default function BookImage({ fallback, src, alt, ...props }: BookImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  const handleError = () => {
    if (!errored) {
      setErrored(true);
      setImgSrc(fallback || PLACEHOLDER);
    }
  };

  // If src is empty or not a valid URL, show placeholder
  const safeSrc = imgSrc && typeof imgSrc === "string" && imgSrc.trim() !== "" ? imgSrc : PLACEHOLDER;

  return (
    <Image
      {...props}
      src={safeSrc}
      alt={alt}
      onError={handleError}
      unoptimized={errored}
    />
  );
}
