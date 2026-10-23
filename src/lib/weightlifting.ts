import elite from "../data/elite-points.json";
import { DEFAULT_SINCLAIR, type Sex, type SinclairSet } from "./sinclair-coefficients";

export type { Sex };
export type AgeGroup = "sub15" | "sub17" | "abs" | "jjoo";

export const AGE_GROUPS: { id: AgeGroup; label: string }[] = [
  { id: "sub15", label: "Sub-15" },
  { id: "sub17", label: "Sub-17" },
  { id: "abs", label: "Junior / Absoluto" },
  { id: "jjoo", label: "JJOO" },
];

export interface EliteCategory {
  cat: string;
  max: number | null;
  ref100: number;
  groups: AgeGroup[];
}

export const ELITE = elite as {
  source: string;
  validFrom: string;
  urls: Record<Sex, string>;
  note: string;
  categories: Record<Sex, EliteCategory[]>;
};

const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

export function sinclairCoef(bw: number, sex: Sex, set: SinclairSet = DEFAULT_SINCLAIR): number {
  const { A, b } = set[sex];
  if (bw <= 0) return 0;
  if (bw >= b) return 1;
  return 10 ** (A * Math.log10(bw / b) ** 2);
}

export function sinclair(total: number, bw: number, sex: Sex, set?: SinclairSet): number {
  return total * sinclairCoef(bw, sex, set);
}

/** Categorías de peso de un grupo de edad, ordenadas de menor a mayor (la "+" al final). */
export function categoriesFor(sex: Sex, group: AgeGroup): EliteCategory[] {
  return ELITE.categories[sex]
    .filter((c) => c.groups.includes(group))
    .sort((a, b) => (a.max ?? Infinity) - (b.max ?? Infinity));
}

export function weightCategory(bw: number, sex: Sex, group: AgeGroup = "abs"): EliteCategory {
  const cats = categoriesFor(sex, group);
  return cats.find((c) => c.max !== null && bw <= c.max) ?? cats[cats.length - 1];
}

export function elitePoints(total: number, cat: EliteCategory): number {
  return round((total / cat.ref100) * 100);
}

/** Kg de total necesarios para llegar a `points` puntos élite en la categoría. */
export function totalForPoints(points: number, cat: EliteCategory): number {
  return Math.ceil((points * cat.ref100) / 100);
}

export function elitePointsFor(total: number, bw: number, sex: Sex, group: AgeGroup = "abs") {
  const cat = weightCategory(bw, sex, group);
  const points = elitePoints(total, cat);
  const nextPoint = Math.floor(points) + 1;
  return {
    cat,
    points,
    kgToNextPoint: totalForPoints(nextPoint, cat) - total,
    kgTo100: Math.max(0, cat.ref100 - total),
  };
}

export const PLATES = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5] as const;
export const COLLAR_KG = 2.5;

/** Discos por lado para llegar a `target` kg (barra + collarines). Devuelve también el sobrante. */
export function plateLoad(target: number, barKg = 20, collars = true) {
  const base = barKg + (collars ? COLLAR_KG * 2 : 0);
  let perSide = Math.max(0, (target - base) / 2);
  const plates: number[] = [];
  for (const p of PLATES) {
    while (perSide >= p - 1e-9) {
      plates.push(p);
      perSide = round(perSide - p, 3);
    }
  }
  const loaded = base + plates.reduce((s, p) => s + p, 0) * 2;
  return { plates, loaded, remainder: round(target - loaded, 2) };
}

export interface ClubEvent {
  date: string;
  /** Último día, para eventos de varios días */
  endDate?: string;
  name: string;
  place: string;
  level: string;
  url?: string;
}

export function upcomingEvents(events: ClubEvent[], today = new Date()): ClubEvent[] {
  const t = today.toISOString().slice(0, 10);
  // Un evento en curso sigue visible hasta su último día
  return events.filter((e) => (e.endDate ?? e.date) >= t).sort((a, b) => a.date.localeCompare(b.date));
}
