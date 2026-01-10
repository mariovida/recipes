"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Difficulty } from "@prisma/client";
import { RecipeCardData } from "@/types/recipe";
import { Star } from "lucide-react";
import "@/styles/components/recipeCard.scss";

type Props = {
  recipe: RecipeCardData;
};

const difficultyStars: Record<Difficulty, number> = {
  lagano: 1,
  srednje_zahtjevno: 2,
  slozeno: 3,
};

export default function RecipeCard({ recipe }: Props) {
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_CDN_BASE_URL}${recipe.imageCdnPath}`
  );

  return (
    <Link href={`/recepti/${recipe.slug}`} className="recipe-card">
      <div className="image-wrapper">
        <Image
          src={imgSrc}
          alt={recipe.title}
          fill
          unoptimized
          style={{ objectFit: "cover" }}
          onError={() => setImgSrc("/images/recipe-placeholder.jpg")}
        />
      </div>

      <div className="card-content">
        <div className="difficulty">
          {[...Array(3)].map((_, i) => (
            <Star
              key={i}
              size={16}
              color={
                i < difficultyStars[recipe.difficulty] ? "#f1a027" : "#ffffff"
              }
              fill={i < difficultyStars[recipe.difficulty] ? "#f1a027" : "none"}
            />
          ))}
        </div>

        <h2>{recipe.title}</h2>
        {recipe.prepTimeMinutes && <p>{recipe.prepTimeMinutes} min</p>}
      </div>
    </Link>
  );
}
