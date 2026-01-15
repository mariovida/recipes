"use client";

import { useState } from "react";
import { Difficulty, Method, MealType } from "@prisma/client";
import { difficultyLabels } from "@/lib/enums/difficulty";
import { methodLabels } from "@/lib/enums/method";
import { mealTypeLabels } from "@/lib/enums/mealType";
import { Select, SelectItem } from "@/components/Select";
import IngredientsList from "@/components/IngredientsList";
import { IngredientInput } from "@/components/IngredientsList";
import StepsList from "@/components/StepsList";
import { StepInput } from "@/components/StepsList";
import { X } from "lucide-react";
import { slugify } from "@/lib/slugify";
import "@/styles/pages/recipeNew.scss";

export default function NewRecipePage() {
  const [method, setMethod] = useState<Method>(Method.pecenje);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.lagano);
  const [mealType, setMealType] = useState<MealType>(MealType.desert);
  const [imageFilename, setImageFilename] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientInput[]>([
    { id: crypto.randomUUID(), text: "" },
  ]);
  const [steps, setSteps] = useState<StepInput[]>([
    { id: crypto.randomUUID(), text: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [slug, setSlug] = useState("");

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = tagInput.trim().toLowerCase();

      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
      }

      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const form = e.currentTarget;
    const filename = imageFilename;
    const data = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      slug,
      lead: (form.elements.namedItem("lead") as HTMLTextAreaElement).value,
      imageCdnPath: `/recipes/${slug}/${filename}`,
      servings: Number(
        (form.elements.namedItem("servings") as HTMLInputElement).value
      ),
      prepTimeMinutes: Number(
        (form.elements.namedItem("prepTimeMinutes") as HTMLInputElement).value
      ),
      method,
      mealType,
      difficulty,
      tags,
      ingredients: ingredients.map((item, index) => ({
        order: index + 1,
        text: item.text,
      })),
      steps: steps.map((item, index) => ({
        order: index + 1,
        text: item.text,
      })),
    };

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
      setIngredients([{ id: crypto.randomUUID(), text: "" }]);
    }

    setLoading(false);
  }

  return (
    <div className="new-recipe wrapper-sm">
      <h1>Dodajte novi recept</h1>

      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-grid">
          <label className="full">
            Naslov
            <input
              name="title"
              required
              onChange={(e) => {
                const newSlug = slugify(e.target.value);
                setSlug(newSlug);
                setImageFilename(`${newSlug}.jpg`);
              }}
            />
          </label>

          <label className="full">
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

          <label>
            Naziv slike
            <input
              name="imageFilename"
              placeholder="image.jpg"
              required
              value={imageFilename}
              onChange={(e) => setImageFilename(e.target.value)}
            />
          </label>

          <label className="full">
            Tagovi
            <div className="tags">
              <div className="tags-list">
                {tags.map((tag) => (
                  <span key={tag} className="tags-badge">
                    {tag}
                    <button
                      type="button"
                      className="remove"
                      onClick={() => removeTag(tag)}
                    >
                      <X size={16} />
                    </button>
                  </span>
                ))}
              </div>

              <input
                type="text"
                placeholder="Dodaj tag i pritisni Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
            </div>
          </label>

          <label className="full">
            <IngredientsList items={ingredients} setItems={setIngredients} />
          </label>

          <label className="full">
            <StepsList items={steps} setItems={setSteps} />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary submit-btn"
        >
          Dodaj recept
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
