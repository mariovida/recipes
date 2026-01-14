"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { AdminRecipeListItem } from "@/types/recipe";
import ConfirmationModal from "@/components/ConfirmationModal";
import "@/styles/pages/admin.scss";

export default function AdminRecipesList({
  initialRecipes,
}: {
  initialRecipes: AdminRecipeListItem[];
}) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  async function handleDelete(slug: string) {
    console.log("Calling:", `/api/recipes/${slug}`);
    const res = await fetch(`/api/recipes/${slug}`, { method: "DELETE" });
    console.log("Status:", res.status);

    if (res.ok) {
      setRecipes((prev) => prev.filter((r) => r.slug !== slug));
    }
  }

  return (
    <div className="wrapper-sm admin-page">
      <div className="admin-list">
        {recipes.map((r) => {
          const imageUrl = r.imageCdnPath
            ? `${process.env.NEXT_PUBLIC_CDN_BASE_URL}${r.imageCdnPath}`
            : "/images/recipe-placeholder.jpg";

          return (
            <div key={r.id} className="admin-item">
              <Image
                src={imageUrl}
                alt={r.title}
                width={80}
                height={80}
                className="admin-thumb"
                style={{ objectFit: "cover" }}
                unoptimized
              />

              <div className="admin-info">
                <h3>{r.title}</h3>
              </div>

              <Link
                href={`/admin/recepti/${r.slug}/uredi`}
                className="btn-secondary edit-btn"
              >
                Uredi
              </Link>

              <button
                className="btn-danger delete-btn"
                onClick={() => setDeleteSlug(r.slug)}
              >
                Obriši
              </button>
            </div>
          );
        })}
      </div>

      <ConfirmationModal
        open={deleteSlug !== null}
        onClose={() => setDeleteSlug(null)}
        title="Obrisati recept?"
        description="Ova radnja je trajna i ne može se poništiti."
        onConfirm={() => {
          if (deleteSlug) handleDelete(deleteSlug);
          setDeleteSlug(null);
        }}
      />
    </div>
  );
}
