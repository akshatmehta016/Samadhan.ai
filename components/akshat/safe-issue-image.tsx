"use client";

import { useState } from "react";
import Image from "next/image";

import { getIssueImageByTitleAndCategory } from "@/lib/issue-images";

interface SafeIssueImageProps {
  src: string | null | undefined;
  alt: string;
  category?: string;
  className?: string;
  sizes?: string;
}

export function SafeIssueImage({ src, alt, category, className, sizes }: SafeIssueImageProps) {
  const fallback = getIssueImageByTitleAndCategory(alt, category);
  const [prevSrc, setPrevSrc] = useState<string | null | undefined>(src);
  const [current, setCurrent] = useState(src || fallback);
  const [failed, setFailed] = useState(false);

  if (prevSrc !== src) {
    setPrevSrc(src);
    setCurrent(src || fallback);
    setFailed(false);
  }

  return (
    <Image
      src={failed ? fallback : current}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => {
        if (!failed) setFailed(true);
      }}
    />
  );
}