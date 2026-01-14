import { Prisma, Difficulty, Method, MealType } from "@prisma/client";

export type RecipeCardData = Prisma.RecipeGetPayload<{
  select: {
    id: true;
    slug: true;
    title: true;
    imageCdnPath: true;
    prepTimeMinutes: true;
    difficulty: true;
    method: true;
  };
}>;

export type CreateRecipeInput = {
  title: string;
  slug: string;
  lead?: string | null;
  prepTimeMinutes?: number | null;
  difficulty: Difficulty;
  servings: string | number;
  method: Method;
  mealType: MealType;
  imageCdnPath?: string;
  ingredients: { text: string }[];
  steps: { text: string }[];
};
