import { getRecipeBySlug } from "@/lib/repositories/recipeRepository";
import EditRecipeForm from "./EditRecipeForm";
import { Recipe, Ingredient, Step } from "@prisma/client";

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const recipe: Recipe & { ingredients: Ingredient[]; steps: Step[] } =
    await getRecipeBySlug(slug);

  return <EditRecipeForm recipe={recipe} />;
}
