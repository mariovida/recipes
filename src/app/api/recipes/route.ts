import { NextResponse } from "next/server";
import {
  getAllRecipes,
  createRecipe,
} from "@/lib/repositories/recipeRepository";

export async function GET() {
  const recipes = await getAllRecipes();
  return NextResponse.json(recipes);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const recipe = await createRecipe(data);
    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 400 }
    );
  }
}
