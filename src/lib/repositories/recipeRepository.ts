import { cache } from "react";
import prisma from "@/lib/prisma";
import { MealType, Method } from "@prisma/client";
import { RecipeCardData } from "@/types/recipe";

export async function getAllRecipes(method?: Method) {
  return prisma.recipe.findMany({
    where: method ? { method } : undefined,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      imageCdnPath: true,
      prepTimeMinutes: true,
      difficulty: true,
      method: true,
    },
  });
}

export async function getRecipeCountsByMethod() {
  const counts = await prisma.recipe.groupBy({
    by: ["method"],
    _count: { method: true },
  });

  return counts.reduce((acc, item) => {
    acc[item.method] = item._count.method;
    return acc;
  }, {} as Record<Method, number>);
}

export async function getRandomRecipesByMethod(
  method: Method
): Promise<RecipeCardData[]> {
  return prisma.recipe.findMany({
    where: { method },
    orderBy: { createdAt: "desc" },
    take: 4,
    select: {
      id: true,
      slug: true,
      title: true,
      imageCdnPath: true,
      prepTimeMinutes: true,
      difficulty: true,
      method: true,
    },
  });
}

export const getRecipeBySlug = cache(async (slug: string) => {
  return prisma.recipe.findUniqueOrThrow({
    where: { slug },
    include: { ingredients: true, steps: true },
  });
});

export async function getRelatedRecipes(
  recipeId: number,
  mealType: MealType,
  method: Method
): Promise<RecipeCardData[]> {
  const primary = await prisma.recipe.findMany({
    where: {
      id: { not: recipeId },
      method,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      lead: true,
      imageCdnPath: true,
      prepTimeMinutes: true,
      difficulty: true,
      method: true,
    },
    take: 3,
  });

  const secondary = await prisma.recipe.findMany({
    where: {
      id: { not: recipeId },
      mealType,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      imageCdnPath: true,
      prepTimeMinutes: true,
      difficulty: true,
      method: true,
    },
    take: 3,
  });

  const combined = [...primary, ...secondary];
  const unique = Array.from(new Map(combined.map((r) => [r.id, r])).values());

  return unique.slice(0, 3);
}
