import { NextResponse } from "next/server";
import {
  getRecipeBySlug,
  updateRecipe,
} from "@/lib/repositories/recipeRepository";

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
    return NextResponse.json({ error: "Recipe not found." }, { status: 404 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const body = await req.json();
    const updated = await updateRecipe(slug, body);

    return NextResponse.json({
      id: updated.id,
      slug: updated.slug,
      title: updated.title,
      lead: updated.lead,
      prepTimeMinutes: updated.prepTimeMinutes,
      servings: updated.servings,
      difficulty: updated.difficulty,
      mealType: updated.mealType,
      method: updated.method,
      tags: updated.tags,
      imageCdnPath: updated.imageCdnPath,
      ingredients: updated.ingredients.map((i) => ({
        order: i.order,
        text: i.text,
      })),
      steps: updated.steps.map((s) => ({
        order: s.order,
        text: s.text,
      })),
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Error while updating recipe." },
      { status: 400 }
    );
  }
}
