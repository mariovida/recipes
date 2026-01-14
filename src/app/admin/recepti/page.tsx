import { getAllRecipes } from "@/lib/repositories/recipeRepository";
import Link from "next/link";
import Image from "next/image";
import "@/styles/pages/admin.scss";

export default async function AdminRecipesPage() {
  const recipes = await getAllRecipes();

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
            </div>
          );
        })}
      </div>
    </div>
  );
}
