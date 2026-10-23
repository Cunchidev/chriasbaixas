import { describe, expect, it } from "vitest";
import {
  ELITE, elitePoints, elitePointsFor, plateLoad, sinclair, sinclairCoef,
  upcomingEvents, weightCategory, categoriesFor,
} from "./weightlifting";
import { SINCLAIR_SETS } from "./sinclair-coefficients";

const cat = (sex: "M" | "F", c: string) => ELITE.categories[sex].find((x) => x.cat === c)!;

describe("sinclair", () => {
  it("es 1 por encima de b", () => {
    expect(sinclairCoef(200, "M")).toBe(1);
    expect(sinclairCoef(160, "F")).toBe(1);
  });
  it("coincide con valores de referencia 2021–2024", () => {
    // 73 kg, 348 kg → ≈ 469 (FEDEHALTER usa este valor en la Circular 1/2025)
    expect(sinclair(348, 73, "M")).toBeCloseTo(469.11, 1);
    // (la circular da 319,08 para mujeres porque usó los coeficientes femeninos 2017–2020)
    expect(sinclair(191, 45, "F")).toBeCloseTo(319.99, 1);
  });
  it("cambia con otro ciclo", () => {
    expect(sinclair(300, 80, "M", SINCLAIR_SETS[1])).not.toBeCloseTo(sinclair(300, 80, "M"), 1);
  });
});

describe("puntos élite RFEH", () => {
  it("reproduce valores de la tabla oficial", () => {
    expect(elitePoints(1, cat("F", "41"))).toBe(0.55);
    expect(elitePoints(33, cat("F", "86"))).toBe(11.26);
    expect(elitePoints(33, cat("M", "51"))).toBe(11.66);
    expect(elitePoints(33, cat("M", "+110"))).toBe(7.28);
    expect(elitePoints(453, cat("M", "+110"))).toBe(100);
  });
  it("asigna la categoría según grupo de edad", () => {
    expect(weightCategory(72, "F", "sub15").cat).toBe("+69");
    expect(weightCategory(72, "F", "abs").cat).toBe("77");
    expect(weightCategory(120, "M", "abs").cat).toBe("+110");
    expect(weightCategory(49, "M", "abs").cat).toBe("60");
    expect(categoriesFor("M", "jjoo").map((c) => c.cat)).toEqual(["65", "75", "85", "95", "110", "+110"]);
  });
  it("calcula kg que faltan", () => {
    const r = elitePointsFor(300, 75, "M");
    expect(r.cat.cat).toBe("75");
    expect(r.kgTo100).toBe(54);
    expect(r.kgToNextPoint).toBeGreaterThan(0);
  });
});

describe("discos", () => {
  it("carga 100 kg con barra 20 y collarines", () => {
    expect(plateLoad(100).plates).toEqual([25, 10, 2.5]);
    expect(plateLoad(100).remainder).toBe(0);
  });
  it("informa del sobrante imposible", () => {
    expect(plateLoad(25.5, 20, false).remainder).toBe(0.5);
  });
});

describe("eventos", () => {
  it("oculta pasados y ordena", () => {
    const ev = [
      { date: "2026-12-01", name: "b", place: "", level: "" },
      { date: "2026-01-01", name: "a", place: "", level: "" },
      { date: "2026-11-01", name: "c", place: "", level: "" },
    ];
    expect(upcomingEvents(ev, new Date("2026-10-23")).map((e) => e.name)).toEqual(["c", "b"]);
  });
  it("mantiene los eventos en curso", () => {
    const ev = [{ date: "2026-10-20", endDate: "2026-10-25", name: "mundial", place: "", level: "" }];
    expect(upcomingEvents(ev, new Date("2026-10-23"))).toHaveLength(1);
    expect(upcomingEvents(ev, new Date("2026-10-26"))).toHaveLength(0);
  });
});
