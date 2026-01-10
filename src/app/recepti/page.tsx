import {
  getAllRecipes,
  getRecipeCountsByMethod,
} from "@/lib/repositories/recipeRepository";
import FilterBar from "@/components/FilterBar";
import RecipeCard from "@/components/RecipeCard";
import { Method } from "@prisma/client";
import "@/styles/pages/recipes.scss";

export default async function ReceptiPage(props: {
  searchParams: Promise<{ method?: Method }>;
}) {
  const searchParams = await props.searchParams;

  const methodParam = Array.isArray(searchParams.method)
    ? searchParams.method[0]
    : searchParams.method;

  const [recipes, counts] = await Promise.all([
    getAllRecipes(methodParam),
    getRecipeCountsByMethod(),
  ]);

  return (
    <div className="wrapper">
      <FilterBar selected={methodParam} counts={counts} />

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
