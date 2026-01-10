import { Difficulty } from "@prisma/client";

export const difficultyLabels: Record<Difficulty, string> = {
  lagano: "Lagano",
  srednje_zahtjevno: "Srednje zahtjevno",
  slozeno: "Složeno",
};
