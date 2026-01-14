import { cache } from "react";
import prisma from "@/lib/prisma";
import { Prisma, MealType, Method, Difficulty } from "@prisma/client";
import { RecipeCardData, CreateRecipeInput } from "@/types/recipe";

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

// Count recipes based on method
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

// Get 4 latest recipes based on method
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

// Get single recipe data
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

// Create new recipe
export async function createRecipe(data: CreateRecipeInput) {
  if (!data.title || !data.slug) {
    throw new Error("Title and slug are required.");
  }

  if (!Object.values(Method).includes(data.method)) {
    throw new Error("Invalid method.");
  }

  if (!Object.values(Difficulty).includes(data.difficulty)) {
    throw new Error("Invalid difficulty.");
  }

  if (!Object.values(MealType).includes(data.mealType)) {
    throw new Error("Invalid meal type.");
  }

  const prepTime =
    data.prepTimeMinutes !== undefined && data.prepTimeMinutes !== null
      ? Number(data.prepTimeMinutes)
      : null;

  if (prepTime !== null && isNaN(prepTime)) {
    throw new Error("Prep time must be a number.");
  }

  const existing = await prisma.recipe.findUnique({
    where: { slug: data.slug },
  });

  if (existing) {
    throw new Error("Slug already exists.");
  }

  return prisma.recipe.create({
    data: {
      title: data.title,
      slug: data.slug,
      lead: data.lead ?? null,
      prepTimeMinutes: prepTime,
      difficulty: data.difficulty,
      servings: Number(data.servings),
      method: data.method,
      mealType: data.mealType,
      imageCdnPath: data.imageCdnPath ?? null,
      ingredients: {
        create: data.ingredients.map((ing, index) => ({
          text: ing.text,
          order: index + 1,
        })),
      },
      steps: {
        create: data.steps.map((step, index) => ({
          text: step.text,
          order: index + 1,
        })),
      },
    },
    include: {
      ingredients: true,
      steps: true,
    },
  });
}

// Update recipe
export async function updateRecipe(
  slug: string,
  data: Partial<CreateRecipeInput>
) {
  if (data.method && !Object.values(Method).includes(data.method)) {
    throw new Error("Invalid method.");
  }

  if (data.difficulty && !Object.values(Difficulty).includes(data.difficulty)) {
    throw new Error("Invalid difficulty.");
  }

  if (data.mealType && !Object.values(MealType).includes(data.mealType)) {
    throw new Error("Invalid meal type.");
  }

  const prepTime =
    data.prepTimeMinutes !== undefined && data.prepTimeMinutes !== null
      ? Number(data.prepTimeMinutes)
      : data.prepTimeMinutes ?? null;

  if (prepTime !== null && prepTime !== undefined && isNaN(prepTime)) {
    throw new Error("Prep time must be a number.");
  }

  const updateData: Prisma.RecipeUpdateInput = {};

  if (data.title !== undefined) updateData.title = data.title;
  if (data.lead !== undefined) updateData.lead = data.lead;
  if (prepTime !== undefined) updateData.prepTimeMinutes = prepTime;
  if (data.difficulty !== undefined) updateData.difficulty = data.difficulty;
  if (data.servings !== undefined) updateData.servings = Number(data.servings);
  if (data.method !== undefined) updateData.method = data.method;
  if (data.mealType !== undefined) updateData.mealType = data.mealType;
  if (data.imageCdnPath !== undefined)
    updateData.imageCdnPath = data.imageCdnPath;

  if (data.ingredients) {
    updateData.ingredients = {
      deleteMany: {},
      create: data.ingredients.map((ing, index) => ({
        text: ing.text,
        order: index + 1,
      })),
    };
  }

  if (data.steps) {
    updateData.steps = {
      deleteMany: {},
      create: data.steps.map((step, index) => ({
        text: step.text,
        order: index + 1,
      })),
    };
  }

  return prisma.recipe.update({
    where: { slug },
    data: updateData,
    include: {
      ingredients: true,
      steps: true,
    },
  });
}
