"use client";

import { Method } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { methodLabels } from "@/lib/enums/method";
import "@/styles/components/filterBar.scss";

const methods: Method[] = [
  "pecenje",
  "przenje",
  "kuhanje",
  "svjeze",
  "bez_kuhanja",
];

export default function FilterBar({
  selected,
  counts,
}: {
  selected?: Method;
  counts: Record<Method, number>;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  function updateFilter(method?: Method) {
    const newParams = new URLSearchParams(params.toString());

    if (!method) newParams.delete("method");
    else newParams.set("method", method);

    router.push(`/recepti?${newParams.toString()}`);
  }

  return (
    <div className="filter-bar">
      <button
        className={!selected ? "active" : ""}
        onClick={() => updateFilter(undefined)}
      >
        <span className="method">Svi recepti</span>
        <span className="count">
          {Object.values(counts).reduce((a, b) => a + b, 0)}
        </span>
      </button>

      {methods
        .filter((m) => counts[m] > 0)
        .map((m) => (
          <button
            key={m}
            className={selected === m ? "active" : ""}
            onClick={() => updateFilter(m)}
          >
            <span className="method">{methodLabels[m]}</span>
            <span className="count">{counts[m]}</span>
          </button>
        ))}
    </div>
  );
}
