import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getRecipeBySlug,
  getRelatedRecipes,
} from "@/lib/repositories/recipeRepository";
import RecipeCard from "@/components/RecipeCard";
import RecipeInfo from "@/components/RecipeInfo";
import { ArrowLeft, CircleSmall } from "lucide-react";
import "@/styles/pages/recipeSingle.scss";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  let recipe;
  try {
    recipe = await getRecipeBySlug(slug);
  } catch {
    return {
      title: "Recept nije pronađen",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}${recipe.imageCdnPath}`;

  return {
    title: `${recipe.title} | Recepti`,
    description:
      recipe.lead ||
      `Detaljan recept za ${recipe.title}. Pogledajte sastojke i korake pripreme.`,

    alternates: {
      canonical: `/recepti/${recipe.slug}`,
    },

    openGraph: {
      type: "article",
      locale: "hr_HR",
      title: recipe.title,
      description: recipe.lead || undefined,
      url: `/recepti/${recipe.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.lead || undefined,
      images: [imageUrl],
    },
  };
}

export default async function RecipePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  if (!slug) notFound();
  let recipe;
  try {
    recipe = await getRecipeBySlug(slug);
  } catch {
    notFound();
  }

  const related = await getRelatedRecipes(
    recipe.id,
    recipe.mealType,
    recipe.method
  );

  const imageUrl = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}${recipe.imageCdnPath}`;

  return (
    <div className="recipe-page wrapper-sm">
      <section className="back-link">
        <Link href="/recepti">
          <ArrowLeft size={20} />
          Svi recepti
        </Link>
      </section>

      <p className="date">
        {recipe.createdAt.toLocaleDateString("hr-HR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <h1 className="title">{recipe.title}</h1>
      {recipe.lead && <p className="lead">{recipe.lead}</p>}

      <header className="hero">
        <Image
          src={imageUrl}
          alt={recipe.title}
          fill
          unoptimized
          style={{ objectFit: "cover" }}
        />
      </header>

      <RecipeInfo
        prepTimeMinutes={recipe.prepTimeMinutes}
        servings={recipe.servings}
        difficulty={recipe.difficulty}
        mealType={recipe.mealType}
        method={recipe.method}
      />

      <div className="content">
        <section className="ingredients">
          <h2>Sastojci</h2>
          <div className="ingredients-list">
            {recipe.ingredients
              .sort((a, b) => a.order - b.order)
              .map((ing) => (
                <p key={ing.id}>
                  <span>
                    <CircleSmall size={14} color="#f0960f" />
                  </span>
                  {ing.text}
                </p>
              ))}
          </div>
        </section>

        <section className="steps">
          <h2>Koraci</h2>
          <ol className="steps-list">
            {recipe.steps.map((step) => (
              <li key={step.id} className="step">
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {related.length > 0 && (
        <section className="related">
          <h2>Preporučeni recepti</h2>
          <div className="related-list">
            {related.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
