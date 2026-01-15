import { getAllRecipes } from "@/lib/repositories/recipeRepository";

export default async function sitemap() {
  const recipes = await getAllRecipes();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    ...recipes.map((r) => ({
      url: `${baseUrl}/recipes/${r.slug}`,
      lastModified: r.updatedAt,
    })),
  ];
}
