"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Recipe,
  Ingredient,
  Step,
  Difficulty,
  Method,
  MealType,
} from "@prisma/client";
import { difficultyLabels } from "@/lib/enums/difficulty";
import { methodLabels } from "@/lib/enums/method";
import { mealTypeLabels } from "@/lib/enums/mealType";
import IngredientsList, { IngredientInput } from "@/components/IngredientsList";
import StepsList, { StepInput } from "@/components/StepsList";
import { Select, SelectItem } from "@/components/Select";
import type { Tag } from "@/types/recipe";
import { ArrowLeft } from "lucide-react";
import ConfirmationModal from "@/components/ConfirmationModal";
import "@/styles/pages/recipeNew.scss";

export default function EditRecipeForm({
  recipe,
}: {
  recipe: Recipe & { ingredients: Ingredient[]; steps: Step[] };
}) {
  const [title, setTitle] = useState(recipe.title);
  const [lead, setLead] = useState(recipe.lead ?? "");
  const [method, setMethod] = useState<Method>(recipe.method);
  const [difficulty, setDifficulty] = useState<Difficulty>(recipe.difficulty);
  const [mealType, setMealType] = useState<MealType>(recipe.mealType);
  const [servings, setServings] = useState<number>(recipe.servings);
  const [prepTimeMinutes, setPrepTimeMinutes] = useState<number>(
    recipe.prepTimeMinutes ?? 0
  );
  const [tagInput, setTagInput] = useState("");

  const [tags, setTags] = useState<Tag[]>(() => {
    if (!Array.isArray(recipe.tags)) return [];
    return recipe.tags
      .filter((t): t is string => typeof t === "string")
      .map((t) => ({
        id: crypto.randomUUID(),
        value: t,
      }));
  });

  const [imageFilename, setImageFilename] = useState(
    recipe.imageCdnPath?.split("/").pop() ?? ""
  );
  const [ingredients, setIngredients] = useState<IngredientInput[]>(
    recipe.ingredients.map((i) => ({
      id: crypto.randomUUID(),
      text: i.text,
    }))
  );
  const [steps, setSteps] = useState<StepInput[]>(
    recipe.steps.map((s) => ({
      id: crypto.randomUUID(),
      text: s.text,
    }))
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = tagInput.trim().toLowerCase();

      if (value && !tags.some((t) => t.value === value)) {
        setTags((prev) => [...prev, { id: crypto.randomUUID(), value }]);
      }

      setTagInput("");
    }
  }

  function removeTag(id: string) {
    setTags((prevTags) => prevTags.filter((t) => t.id !== id));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const data = {
      title,
      lead,
      method,
      difficulty,
      mealType,
      servings,
      prepTimeMinutes,
      imageCdnPath: `/recipes/${recipe.slug}/${imageFilename}`,
      tags: tags.map((t) => t.value),
      ingredients: ingredients.map((item, index) => ({
        order: index + 1,
        text: item.text,
      })),
      steps: steps.map((item, index) => ({
        order: index + 1,
        text: item.text,
      })),
    };

    const res = await fetch(`/api/recipes/${recipe.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      setMessage(json.error || "Greška pri ažuriranju recepta");
    } else {
      setShowModal(true);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="new-recipe wrapper-sm">
        <section className="back-link">
          <Link href="/admin/recepti">
            <ArrowLeft size={20} />
            Povratak
          </Link>
        </section>

        <h1>Uređivanje recepta</h1>

        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-grid">
            <label className="full">
              Naslov
              <input
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label className="full">
              Slug
              <input
                name="slug"
                value={recipe.slug}
                readOnly
                className="readonly"
              />
            </label>

            <label className="full">
              Kratki opis
              <textarea
                name="lead"
                rows={3}
                value={lead}
                onChange={(e) => setLead(e.target.value)}
              />
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
                required
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
              />
            </label>

            <label>
              Vrijeme pripreme (minute)
              <input
                name="prepTimeMinutes"
                type="number"
                min="0"
                value={prepTimeMinutes}
                onChange={(e) => setPrepTimeMinutes(Number(e.target.value))}
              />
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
              Tagovi (kliknite na tag za uklanjanje)
              <div className="tags">
                <div className="tags-list">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="tags-badge"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(tag.id);
                      }}
                    >
                      {tag.value}
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
            Spremi izmjene
          </button>

          {message && <p>{message}</p>}
        </form>
      </div>
      <ConfirmationModal
        open={showModal}
        onClose={setShowModal}
        title="Recept ažuriran"
        description="Izmjene su uspješno spremljene."
        onConfirm={() => window.location.reload()}
      />
    </>
  );
}
