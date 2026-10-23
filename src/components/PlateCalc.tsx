import { useState } from "react";
import { plateLoad } from "../lib/weightlifting";
import { Card, NumField, Seg } from "./ui";

// Colores IWF; alto y grosor aproximados para el dibujo
const STYLE: Record<number, { fill: string; h: number; w: number }> = {
  25: { fill: "#e3170a", h: 180, w: 26 }, 20: { fill: "#1f5fd6", h: 180, w: 22 },
  15: { fill: "#f2c400", h: 180, w: 18 }, 10: { fill: "#12a150", h: 180, w: 14 },
  5: { fill: "#f3f0ea", h: 130, w: 12 }, 2.5: { fill: "#e3170a", h: 100, w: 10 },
  2: { fill: "#1f5fd6", h: 92, w: 9 }, 1.5: { fill: "#f2c400", h: 86, w: 8 },
  1: { fill: "#12a150", h: 80, w: 7 }, 0.5: { fill: "#f3f0ea", h: 74, w: 6 },
};

export default function PlateCalc() {
  const [target, setTarget] = useState(100);
  const [bar, setBar] = useState<"20" | "15">("20");
  const { plates, loaded, remainder } = plateLoad(target || 0, Number(bar));
  let x = 150;

  return (
    <Card>
      <h3 className="display text-4xl">Discos</h3>
      <p className="mt-1 text-sm text-mute">Qué cargar en cada lado (collarines de 2,5 kg incluidos).</p>
      <div className="mt-5 flex flex-wrap items-end gap-3">
        <div className="min-w-[140px] flex-1"><NumField label="Peso objetivo" value={target} onChange={setTarget} step={0.5} suffix="kg" /></div>
        <Seg label="Barra" value={bar} options={[{ id: "20", label: "Barra 20" }, { id: "15", label: "Barra 15" }]} onChange={setBar} />
      </div>
      <svg viewBox="0 0 600 200" className="mt-6 w-full" role="img" aria-label={`Por lado: ${plates.join(", ") || "nada"} kg`}>
        <rect x="0" y="94" width="600" height="12" rx="3" fill="#6b6a66" />
        <rect x="132" y="80" width="14" height="40" rx="2" fill="#8a8984" />
        {plates.map((p, i) => {
          const s = STYLE[p];
          const el = <rect key={i} x={x} y={100 - s.h / 2} width={s.w} height={s.h} rx="3" fill={s.fill} stroke="#0a0a0b" strokeWidth="1.5" />;
          x += s.w + 2;
          return el;
        })}
        <rect x={x} y="86" width="14" height="28" rx="2" fill="#c9c7c1" />
      </svg>
      <p className="mt-3 text-sm">
        Por lado: <b>{plates.length ? plates.map((p) => p.toLocaleString("es-ES")).join(" + ") : "solo barra"}</b>
        <span className="text-mute"> · cargado {loaded.toLocaleString("es-ES")} kg</span>
      </p>
      {remainder !== 0 && <p className="mt-1 text-xs text-yellow">No se puede cargar exacto: diferencia de {remainder.toLocaleString("es-ES")} kg.</p>}
    </Card>
  );
}
