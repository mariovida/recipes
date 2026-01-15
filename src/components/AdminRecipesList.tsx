"use client";

import { useState } from "react";
import Link from "next/link";
import AdminRecipeThumb from "@/components/AdminRecipeThumb";
import type { AdminRecipeListItem } from "@/types/recipe";
import { Trash2 } from "lucide-react";
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
    const res = await fetch(`/api/recipes/${slug}`, { method: "DELETE" });

    if (res.ok) {
      setRecipes((prev) => prev.filter((r) => r.slug !== slug));
    }
  }

  return (
    <>
      <div className="admin-list">
        {recipes.map((r) => {
          const imageUrl = r.imageCdnPath
            ? `${process.env.NEXT_PUBLIC_CDN_BASE_URL}${r.imageCdnPath}`
            : "/images/recipe-placeholder.jpg";

          return (
            <div key={r.id} className="admin-item">
              <AdminRecipeThumb src={imageUrl} alt={r.title} />

              <div className="admin-info">
                <h3>{r.title}</h3>
              </div>

              <Link
                href={`/admin/recepti/${r.slug}/uredi`}
                className="btn-secondary edit"
              >
                Uredi
              </Link>

              <button className="delete" onClick={() => setDeleteSlug(r.slug)}>
                <Trash2 size={16} color="#f2f2f2" />
              </button>
            </div>
          );
        })}
      </div>

      <ConfirmationModal
        open={deleteSlug !== null}
        onClose={() => setDeleteSlug(null)}
        title="Obrisati recept?"
        description="Jeste li sigurni da želite obrisati ovaj recept? Ova radnja je trajna i ne može se poništiti."
        onConfirm={() => {
          if (deleteSlug) handleDelete(deleteSlug);
          setDeleteSlug(null);
        }}
        icon={<Trash2 size={22} color="#f0960f" />}
        confirmLabel="Obriši"
      />
    </>
  );
}
