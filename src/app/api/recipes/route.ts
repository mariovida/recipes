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
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("Slug already exists.")) {
      return NextResponse.json(
        { error: "Slug already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }
}
