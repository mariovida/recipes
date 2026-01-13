import { NextResponse } from "next/server";
import { getRecipeBySlug } from "@/lib/repositories/recipeRepository";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const recipe = await getRecipeBySlug(slug);

    return NextResponse.json({
      id: recipe.id,
      slug: recipe.slug,
      title: recipe.title,
      lead: recipe.lead,
      prepTimeMinutes: recipe.prepTimeMinutes,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      mealType: recipe.mealType,
      method: recipe.method,
      tags: recipe.tags,
      imageCdnPath: recipe.imageCdnPath,
      ingredients: recipe.ingredients.map((i) => ({
        order: i.order,
        text: i.text,
      })),
      steps: recipe.steps.map((s) => ({
        order: s.order,
        text: s.text,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }
}
