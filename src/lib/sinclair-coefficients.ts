export type Sex = "M" | "F";

export interface SinclairSet {
  id: string;
  label: string;
  verified: boolean;
  M: { A: number; b: number };
  F: { A: number; b: number };
}

// Coeficientes por ciclo olímpico. El ciclo 2025–2028 aún no se ha verificado
// contra el documento oficial de la IWF: confirmar antes de marcarlo como verificado.
export const SINCLAIR_SETS: SinclairSet[] = [
  {
    id: "2021-2024",
    label: "IWF 2021–2024",
    verified: true,
    M: { A: 0.722762521, b: 193.609 },
    F: { A: 0.787004341, b: 153.757 },
  },
  {
    id: "2025-2028",
    label: "IWF 2025–2028 (sin verificar)",
    verified: false,
    M: { A: 0.700767819, b: 201.159 },
    F: { A: 0.674107991, b: 163.918 },
  },
];

export const DEFAULT_SINCLAIR = SINCLAIR_SETS[0];
