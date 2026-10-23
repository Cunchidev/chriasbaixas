import { useMemo, useState } from "react";
import { AGE_GROUPS, ELITE, categoriesFor, elitePointsFor, totalForPoints, type AgeGroup, type Sex } from "../lib/weightlifting";
import { Card, NumField, Seg, SEXES, fmt } from "./ui";

const MILESTONES = [40, 45, 47, 50, 60, 70, 80, 90, 100];
const ROWS = [100, 90, 80, 70, 60, 50, 47, 45, 40, 30, 20];

export default function ElitePoints() {
  const [sex, setSex] = useState<Sex>("M");
  const [group, setGroup] = useState<AgeGroup>("abs");
  const [bw, setBw] = useState(73);
  const [total, setTotal] = useState(250);

  const cats = categoriesFor(sex, group);
  const ok = bw > 0 && total > 0;
  const r = useMemo(() => (ok ? elitePointsFor(total, bw, sex, group) : null), [total, bw, sex, group, ok]);
  const pct = r ? Math.min(100, r.points) : 0;

  return (
    <div className="space-y-10">
      <Card>
        <div className="flex flex-wrap gap-3">
          <Seg label="Sexo" value={sex} options={SEXES} onChange={setSex} />
          <Seg label="Grupo de edad" value={group} options={AGE_GROUPS} onChange={setGroup} />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <NumField label="Peso corporal" value={bw} onChange={setBw} step={0.1} suffix="kg" />
          <NumField label="Total olímpico" value={total} onChange={setTotal} suffix="kg" />
        </div>

        {r && (
          <>
            <div className="mt-8 grid items-end gap-6 sm:grid-cols-[auto_1fr]">
              <div>
                <p className="text-xs uppercase tracking-widest text-mute">Categoría {r.cat.cat} kg · 100 p = {r.cat.ref100} kg</p>
                <p className="display text-7xl sm:text-8xl">{fmt(r.points)}<span className="ml-2 text-2xl text-accent">PE</span></p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="h-3 overflow-hidden rounded-full bg-ink-3" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full bg-accent transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-mute">
                  {r.kgTo100 > 0
                    ? <>Te faltan <b className="text-chalk">{r.kgTo100} kg</b> para los 100 puntos · <b className="text-chalk">{r.kgToNextPoint} kg</b> para el siguiente punto.</>
                    : <>Estás por encima de los 100 puntos de tu categoría.</>}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {MILESTONES.map((m) => {
                const need = totalForPoints(m, r.cat);
                const done = total >= need;
                return (
                  <span key={m} className={`rounded-full border px-3 py-1 text-xs tabular-nums ${done ? "border-accent bg-accent/15 text-chalk" : "border-ink-3 text-mute"}`}>
                    {m} p · {need} kg
                  </span>
                );
              })}
            </div>
          </>
        )}
      </Card>

      <div>
        <h3 className="display mb-3 text-3xl">Tabla {sex === "M" ? "masculina" : "femenina"} · {AGE_GROUPS.find((g) => g.id === group)?.label}</h3>
        <div className="overflow-x-auto rounded-2xl border border-ink-3">
          <table className="w-full min-w-[560px] text-right text-sm tabular-nums">
            <thead className="bg-ink-2 text-xs uppercase tracking-widest text-mute">
              <tr>
                <th className="px-3 py-3 text-left">Puntos</th>
                {cats.map((c) => (
                  <th key={c.cat} className={`px-3 py-3 ${r?.cat.cat === c.cat ? "text-accent" : ""}`}>{c.cat}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((p) => (
                <tr key={p} className="border-t border-ink-3">
                  <td className="px-3 py-2 text-left font-semibold">{p}</td>
                  {cats.map((c) => (
                    <td key={c.cat} className={`px-3 py-2 ${r?.cat.cat === c.cat ? "bg-accent/10" : ""}`}>{totalForPoints(p, c)} kg</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-mute">
          Total mínimo (kg) para cada nivel. Fuente: {ELITE.source}, de aplicación desde el {new Date(ELITE.validFrom).toLocaleDateString("es-ES")}.{" "}
          <a className="underline hover:text-chalk" href={ELITE.urls.M} target="_blank" rel="noopener">Tabla masculina</a> ·{" "}
          <a className="underline hover:text-chalk" href={ELITE.urls.F} target="_blank" rel="noopener">Tabla femenina</a>
        </p>
      </div>
    </div>
  );
}
