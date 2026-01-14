import { getAllRecipes } from "@/lib/repositories/recipeRepository";
import AdminRecipesList from "@/components/AdminRecipesList";

export default async function AdminRecipesPage() {
  const recipes = await getAllRecipes();
  return <AdminRecipesList initialRecipes={recipes} />;
}
