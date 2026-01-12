"use client";

import { useState } from "react";
import { Difficulty, Method, MealType } from "@prisma/client";
import { difficultyLabels } from "@/lib/enums/difficulty";
import { methodLabels } from "@/lib/enums/method";
import { mealTypeLabels } from "@/lib/enums/mealType";
import { Select, SelectItem } from "@/components/ui/Select";
import IngredientsList from "@/components/IngredientsList";
import { slugify } from "@/lib/slugify";
import "@/styles/pages/recipeNew.scss";

export default function NewRecipePage() {
  const [method, setMethod] = useState<Method>(Method.pecenje);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.lagano);
  const [mealType, setMealType] = useState<MealType>(MealType.desert);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [slug, setSlug] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      setMessage(json.error || "Greška pri spremanju recepta");
    } else {
      setMessage("Recept uspješno dodan!");
      form.reset();
      setSlug("");
    }

    setLoading(false);
  }

  return (
    <div className="new-recipe wrapper-sm">
      <h1>Dodajte novi recept</h1>

      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-grid">
          <label>
            Naslov
            <input
              name="title"
              required
              onChange={(e) => setSlug(slugify(e.target.value))}
            />
          </label>

          <label>
            Slug
            <input name="slug" value={slug} readOnly className="readonly" />
          </label>

          <label className="full">
            Kratki opis
            <textarea name="lead" rows={3} />
          </label>

          <label>
            Metoda
            <Select name="method" value={method} onValueChange={setMethod}>
              {Object.values(Method).map((m) => (
                <SelectItem key={m} value={m}>
                  {methodLabels[m]}
                </SelectItem>
              ))}
            </Select>
          </label>

          <label>
            Tip jela
            <Select
              name="mealType"
              value={mealType}
              onValueChange={setMealType}
            >
              {Object.values(MealType).map((m) => (
                <SelectItem key={m} value={m}>
                  {mealTypeLabels[m]}
                </SelectItem>
              ))}
            </Select>
          </label>

          <label>
            Broj porcija
            <input
              name="servings"
              type="number"
              min="1"
              defaultValue={1}
              required
            />
          </label>

          <label>
            Vrijeme pripreme (minute)
            <input name="prepTimeMinutes" type="number" min="0" />
          </label>

          <label>
            Težina
            <Select
              name="difficulty"
              value={difficulty}
              onValueChange={setDifficulty}
            >
              {Object.values(Difficulty).map((d) => (
                <SelectItem key={d} value={d}>
                  {difficultyLabels[d]}
                </SelectItem>
              ))}
            </Select>
          </label>

          <label className="full">
            Putanja slike
            <input
              name="imageCdnPath"
              placeholder="/recipes/palacinke/hero.jpg"
              required
            />
          </label>

          <label className="full">
            <IngredientsList />
          </label>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          Dodaj recept
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}
