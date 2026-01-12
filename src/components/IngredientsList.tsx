"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import "@/styles/components/ingredientsList.scss";

export type IngredientInput = {
  id: string;
  text: string;
};

export default function IngredientsList() {
  const [items, setItems] = useState<IngredientInput[]>([
    { id: crypto.randomUUID(), text: "" },
  ]);

  function updateItem(id: string, value: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: value } : item))
    );
  }

  function addItem() {
    setItems((prev) => [...prev, { id: crypto.randomUUID(), text: "" }]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="ingredients-list">
      <h3>Sastojci</h3>

      {items.map((item, index) => (
        <div key={item.id} className="ingredient-row">
          <input
            type="hidden"
            name={`ingredients[${index}][order]`}
            value={index + 1}
          />
          <input
            type="hidden"
            name={`ingredients[${index}][text]`}
            value={item.text}
          />
          <input
            className="text"
            placeholder={`Sastojak ${index + 1}`}
            value={item.text}
            onChange={(e) => updateItem(item.id, e.target.value)}
          />

          <button
            type="button"
            className="remove-btn"
            onClick={() => removeItem(item.id)}
            disabled={items.length === 1}
          >
            -
          </button>
        </div>
      ))}

      <button type="button" className="add-btn" onClick={addItem}>
        <PlusIcon size={18} /> Dodaj sastojak
      </button>
    </div>
  );
}
