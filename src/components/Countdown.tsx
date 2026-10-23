import { useEffect, useState } from "react";
import type { ClubEvent } from "../lib/weightlifting";

// Elige el próximo evento en el navegador, así la cuenta atrás avanza sola sin volver a publicar.
export default function Countdown({ events }: { events: ClubEvent[] }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const today = now === null ? null : new Date(now).toLocaleDateString("sv-SE");
  const next = today === null
    ? events[0]
    : [...events].sort((a, b) => a.date.localeCompare(b.date)).find((e) => (e.endDate ?? e.date) >= today);
  if (!next) return null;

  const target = new Date(`${next.date}T09:00:00`).getTime();
  const ms = Math.max(0, target - (now ?? target));
  const parts = [
    { v: Math.floor(ms / 864e5), l: "días" },
    { v: Math.floor(ms / 36e5) % 24, l: "h" },
    { v: Math.floor(ms / 6e4) % 60, l: "min" },
    { v: Math.floor(ms / 1e3) % 60, l: "s" },
  ];
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-mute">Próximo: {next.name}</p>
      {now !== null && ms === 0 ? <p className="display mt-1 text-4xl text-accent">¡En marcha!</p> : <div className="mt-1 flex gap-4 tabular-nums">
        {parts.map((p) => (
          <span key={p.l} className="flex items-baseline gap-1">
            <span className="display text-4xl">{now === null ? "--" : String(p.v).padStart(2, "0")}</span>
            <span className="text-xs text-mute">{p.l}</span>
          </span>
        ))}
      </div>}
    </div>
  );
}
