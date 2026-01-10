import prisma from "@/lib/prisma";
import { Method } from "@prisma/client";

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
