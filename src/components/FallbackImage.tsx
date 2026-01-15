"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

export default function FallbackImage(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const [error, setError] = useState(false);

  return (
    <Image
      {...rest}
      src={error ? "/images/recipe-placeholder.jpg" : src}
      alt={alt}
      onError={() => setError(true)}
      unoptimized
    />
  );
}
