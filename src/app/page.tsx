import Link from "next/link";
import Image from "next/image";
import { getRandomRecipesByMethod } from "@/lib/repositories/recipeRepository";
import RecipeCard from "@/components/RecipeCard";
import { ArrowRight } from "lucide-react";
import "@/styles/pages/home.scss";

export default async function HomePage() {
  const random = await getRandomRecipesByMethod("kuhanje");

  return (
    <div className="wrapper home-page">
      <section className="hero">
        <Image
          src="/images/hero.jpg"
          alt="Hero image"
          fill
          priority
          className="hero-bg"
        />

        <div className="hero-content">
          <h1>
            Dobrodošli u <span>svijet okusa</span>
          </h1>
          <p className="subtitle">
            Otkrijte recepte koji inspiriraju svaki dan.
          </p>
          <Link href="/recepti" className="hero-btn">
            Istražite recepte
            <ArrowRight size={22} />
          </Link>
        </div>
      </section>

      {random.length > 0 && (
        <section className="suggested">
          <h2>Inspiracija za današnje kuhanje</h2>
          <div className="suggested-list">
            {random.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
