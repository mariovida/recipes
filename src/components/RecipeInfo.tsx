import { difficultyLabels } from "@/lib/enums/difficulty";
import { methodLabels } from "@/lib/enums/method";
import { Utensils, Star, Clock2, ChefHat } from "lucide-react";
import { Difficulty, Method } from "@prisma/client";
import "@/styles/components/recipeInfo.scss";

type InfoProps = {
  prepTimeMinutes: number | null;
  servings: number;
  difficulty: Difficulty;
  mealType: string;
  method: Method;
};

export default function RecipeInfo({
  prepTimeMinutes,
  servings,
  difficulty,
  mealType,
  method,
}: InfoProps) {
  const cards = [
    {
      icon: <ChefHat size={20} color="#f0960f" />,
      label: "Način pripreme",
      value: methodLabels[method],
    },
    {
      icon: <Clock2 size={20} color="#f0960f" />,
      label: "Vrijeme pripreme",
      value: `${prepTimeMinutes} minuta`,
    },
    {
      icon: <Utensils size={20} color="#f0960f" />,
      label: "Porcije",
      value: servings,
    },
    {
      icon: <Star size={20} color="#f0960f" />,
      label: "Težina",
      value: difficultyLabels[difficulty],
    },
    // { icon: <Utensils size={20} />, label: "Tip jela", value: mealType },
  ];

  return (
    <section className="info">
      {cards.map((item, idx) => (
        <div className="info-card" key={idx}>
          <div className="icon">{item.icon}</div>
          <div className="text">
            <span className="label">{item.label}</span>
            <span className="value">{item.value}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
