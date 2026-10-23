import type { ReactNode } from "react";

export function Seg<T extends string>({ value, options, onChange, label }: {
  value: T; options: { id: T; label: string }[]; onChange: (v: T) => void; label: string;
}) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>{o.label}</button>
      ))}
    </div>
  );
}

export function NumField({ label, value, onChange, step = 1, suffix }: {
  label: string; value: number; onChange: (v: number) => void; step?: number; suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-widest text-mute">{label}</span>
      <span className="relative block">
        <input className="field pr-10" type="number" inputMode="decimal" min={0} step={step}
          value={Number.isNaN(value) ? "" : value} onChange={(e) => onChange(parseFloat(e.target.value))} />
        {suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-mute">{suffix}</span>}
      </span>
    </label>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-ink-3 bg-ink-2 p-5 sm:p-7 ${className}`}>{children}</div>;
}

export const SEXES = [{ id: "M" as const, label: "Masculino" }, { id: "F" as const, label: "Femenino" }];
export const fmt = (n: number, d = 2) => n.toLocaleString("es-ES", { minimumFractionDigits: d, maximumFractionDigits: d });
