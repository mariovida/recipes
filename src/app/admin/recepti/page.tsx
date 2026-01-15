import { getAllRecipes } from "@/lib/repositories/recipeRepository";
import AdminRecipesList from "@/components/AdminRecipesList";
import Link from "next/link";

export default async function AdminRecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="wrapper-sm admin-page">
      <div className="header">
        <h1>Upravljanje receptima</h1>
        <Link href="/admin/recepti/dodaj-novi" className="btn-primary">
          Novi recept
        </Link>
      </div>

      <AdminRecipesList initialRecipes={recipes} />
    </div>
  );
}
