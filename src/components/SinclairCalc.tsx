import { useState } from "react";
import { SINCLAIR_SETS } from "../lib/sinclair-coefficients";
import { sinclair, sinclairCoef, type Sex } from "../lib/weightlifting";
import { Card, NumField, Seg, SEXES, fmt } from "./ui";

export default function SinclairCalc() {
  const [sex, setSex] = useState<Sex>("M");
  const [setId, setSetId] = useState(SINCLAIR_SETS[0].id);
  const [bw, setBw] = useState(81);
  const [snatch, setSnatch] = useState(110);
  const [cj, setCj] = useState(140);
  const set = SINCLAIR_SETS.find((s) => s.id === setId)!;
  const total = (snatch || 0) + (cj || 0);
  const coef = bw > 0 ? sinclairCoef(bw, sex, set) : 0;

  return (
    <Card>
      <h3 className="display text-4xl">Sinclair</h3>
      <p className="mt-1 text-sm text-mute">Compara atletas de distinto peso corporal.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Seg label="Sexo" value={sex} options={SEXES} onChange={setSex} />
        <Seg label="Coeficientes" value={setId} options={SINCLAIR_SETS.map((s) => ({ id: s.id, label: s.id }))} onChange={setSetId} />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <NumField label="Peso" value={bw} onChange={setBw} step={0.1} suffix="kg" />
        <NumField label="Arrancada" value={snatch} onChange={setSnatch} suffix="kg" />
        <NumField label="Dos tiempos" value={cj} onChange={setCj} suffix="kg" />
      </div>
      <p className="mt-6 text-xs uppercase tracking-widest text-mute">Total {total} kg · coef. {coef.toFixed(4)}</p>
      <p className="display text-7xl">{fmt(sinclair(total, bw, sex, set))}</p>
      {!set.verified && <p className="mt-3 text-xs text-yellow">Coeficientes {set.label}: pendientes de confirmar con la IWF.</p>}
    </Card>
  );
}
