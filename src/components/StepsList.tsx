"use client";

import { PlusIcon, Minus } from "lucide-react";
import "@/styles/components/ingredientsList.scss";

export type StepInput = { id: string; text: string };

export default function StepsList({
  items,
  setItems,
}: {
  items: StepInput[];
  setItems: React.Dispatch<React.SetStateAction<StepInput[]>>;
}) {
  const updateItem = (id: string, text: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, text } : i)));

  const addItem = () =>
    setItems((prev) => [...prev, { id: crypto.randomUUID(), text: "" }]);

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="ingredients-list">
      <h3>Koraci pripreme</h3>

      {items.map((item, index) => (
        <div key={item.id} className="ingredient-row">
          <textarea
            className="text"
            placeholder={`Korak ${index + 1}`}
            value={item.text}
            onChange={(e) => updateItem(item.id, e.target.value)}
          />
          <button
            type="button"
            className="remove-btn"
            onClick={() => removeItem(item.id)}
            disabled={items.length === 1}
          >
            <Minus size={14} />
          </button>
        </div>
      ))}

      <button type="button" className="btn-secondary add-btn" onClick={addItem}>
        <PlusIcon size={18} /> Dodaj korak
      </button>
    </div>
  );
}
