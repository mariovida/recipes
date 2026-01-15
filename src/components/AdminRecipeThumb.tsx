import { useState } from "react";
import Image from "next/image";

export default function AdminRecipeThumb({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? "/images/recipe-placeholder.jpg" : src}
      alt={alt}
      width={80}
      height={80}
      className="admin-thumb"
      style={{ objectFit: "cover" }}
      unoptimized
      onError={() => setError(true)}
    />
  );
}
