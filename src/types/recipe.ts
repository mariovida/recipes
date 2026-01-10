import { Prisma } from "@prisma/client";

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
