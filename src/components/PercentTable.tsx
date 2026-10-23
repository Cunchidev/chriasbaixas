import { useState } from "react";
import { Card, NumField } from "./ui";

const PCTS = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105];

export default function PercentTable() {
  const [sn, setSn] = useState(100);
  const [cj, setCj] = useState(125);
  const [sq, setSq] = useState(160);
  const lifts = [{ k: "Arrancada", v: sn }, { k: "Dos tiempos", v: cj }, { k: "Sentadilla", v: sq }];

  return (
    <Card>
      <h3 className="display text-4xl">Porcentajes</h3>
      <p className="mt-1 text-sm text-mute">Mete tus máximos y planifica la sesión (redondeo a 1 kg).</p>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <NumField label="Arrancada" value={sn} onChange={setSn} suffix="kg" />
        <NumField label="Dos tiempos" value={cj} onChange={setCj} suffix="kg" />
        <NumField label="Sentadilla" value={sq} onChange={setSq} suffix="kg" />
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-right text-sm tabular-nums">
          <thead className="text-xs uppercase tracking-widest text-mute">
            <tr><th className="py-2 text-left">%</th>{lifts.map((l) => <th key={l.k} className="py-2">{l.k}</th>)}</tr>
          </thead>
          <tbody>
            {PCTS.map((p) => (
              <tr key={p} className={`border-t border-ink-3 ${p === 100 ? "font-semibold text-accent" : ""}`}>
                <td className="py-1.5 text-left">{p}%</td>
                {lifts.map((l) => <td key={l.k} className="py-1.5">{l.v > 0 ? `${Math.round((l.v * p) / 100)} kg` : "–"}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
