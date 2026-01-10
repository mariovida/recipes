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
        Svi recepti
      </button>

      {methods
        .filter((m) => counts[m] > 0)
        .map((m) => (
          <button
            key={m}
            className={selected === m ? "active" : ""}
            onClick={() => updateFilter(m)}
          >
            {methodLabels[m]}
          </button>
        ))}
    </div>
  );
}
