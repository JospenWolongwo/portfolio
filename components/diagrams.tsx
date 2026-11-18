import type { DiagramKey } from "@/content/case-studies";

const t = { fontFamily: "var(--font-jetbrains), ui-monospace, monospace", fontSize: 11 } as const;

function Arrow({ id, color }: { id: string; color: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill={color} />
    </marker>
  );
}

function TokenRace() {
  const lanes = [
    { x: 90, label: "Browser" },
    { x: 330, label: "API" },
    { x: 560, label: "Redis" },
  ];
  return (
    <svg viewBox="0 0 650 360" className="w-full" role="img" aria-label="Sequence: a navigation aborts a refresh after the server rotated token A to B; the browser replays A. Before the fix the family is revoked; after it, A is accepted once within ten seconds.">
      <defs>
        <Arrow id="a-ink" color="var(--ink)" />
        <Arrow id="a-sig" color="var(--signal)" />
        <Arrow id="a-amb" color="var(--amber)" />
      </defs>
      {lanes.map((l) => (
        <g key={l.label}>
          <rect x={l.x - 52} y={8} width={104} height={28} rx={14} fill="var(--card)" stroke="var(--rule)" />
          <text x={l.x} y={26} textAnchor="middle" fill="var(--ink)" style={t}>{l.label}</text>
          <line x1={l.x} y1={36} x2={l.x} y2={350} stroke="var(--rule)" strokeDasharray="3 4" />
        </g>
      ))}
      <line x1={90} y1={70} x2={326} y2={70} stroke="var(--ink)" markerEnd="url(#a-ink)" />
      <text x={100} y={62} fill="var(--ink-2)" style={t}>1 · refresh(A) on page load</text>
      <line x1={330} y1={98} x2={556} y2={98} stroke="var(--ink)" markerEnd="url(#a-ink)" />
      <text x={342} y={90} fill="var(--ink-2)" style={t}>2 · rotate A → B</text>
      <line x1={330} y1={128} x2={150} y2={128} stroke="var(--amber)" strokeDasharray="5 4" />
      <text x={128} y={132} textAnchor="middle" fill="var(--amber)" style={{ ...t, fontSize: 16 }}>✕</text>
      <text x={160} y={150} fill="var(--amber)" style={t}>3 · user navigates, request aborted, B never arrives</text>
      <line x1={90} y1={190} x2={326} y2={190} stroke="var(--ink)" markerEnd="url(#a-ink)" />
      <text x={100} y={182} fill="var(--ink-2)" style={t}>4 · refresh(A) on the next page</text>

      <rect x={196} y={214} width={440} height={56} rx={10} fill="var(--amber-soft)" />
      <text x={212} y={236} fill="var(--amber)" style={{ ...t, fontWeight: 600 }}>BEFORE</text>
      <text x={212} y={256} fill="var(--ink)" style={t}>A already used → looks like theft → family revoked, logged out</text>

      <rect x={196} y={282} width={440} height={56} rx={10} fill="var(--signal-soft)" />
      <text x={212} y={304} fill="var(--signal)" style={{ ...t, fontWeight: 600 }}>AFTER</text>
      <text x={212} y={324} fill="var(--ink)" style={t}>A is the previous token, rotated &lt; 10 s ago → rotate again ✓</text>
    </svg>
  );
}

function Idempotency() {
  const box = (x: number, y: number, w: number, label: string, sub?: string, tone = "var(--card)") => (
    <g>
      <rect x={x} y={y} width={w} height={sub ? 50 : 36} rx={10} fill={tone} stroke="var(--rule)" />
      <text x={x + w / 2} y={y + (sub ? 21 : 22)} textAnchor="middle" fill="var(--ink)" style={{ ...t, fontWeight: 600 }}>{label}</text>
      {sub && <text x={x + w / 2} y={y + 38} textAnchor="middle" fill="var(--muted)" style={t}>{sub}</text>}
    </g>
  );
  return (
    <svg viewBox="0 0 650 330" className="w-full" role="img" aria-label="Flow: the phone sends a booking with an idempotency key and retries with the same key. The database locks per passenger and ride, returns the existing booking for a repeated key, refuses a key reused for a different request, and otherwise runs the existing seat logic and stores the key.">
      <defs>
        <Arrow id="i-ink" color="var(--ink)" />
      </defs>
      {box(10, 20, 150, "Phone", "tap · retry · offline replay")}
      {box(250, 20, 150, "POST /bookings", "Idempotency-Key: k")}
      {box(470, 20, 170, "advisory lock", "passenger × ride")}
      <line x1={160} y1={45} x2={246} y2={45} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      <line x1={400} y1={45} x2={466} y2={45} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      <line x1={555} y1={70} x2={555} y2={110} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      {box(445, 114, 220 - 25, "key k used before?")}
      <line x1={470} y1={150} x2={330} y2={200} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      <line x1={555} y1={150} x2={555} y2={196} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      <text x={360} y={168} fill="var(--muted)" style={t}>yes</text>
      <text x={565} y={180} fill="var(--muted)" style={t}>no</text>
      {box(180, 200, 220, "same ride & seats?")}
      {box(450, 200, 190, "reserve_ride_seats()", "existing logic, untouched")}
      <line x1={250} y1={236} x2={170} y2={270} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      <line x1={330} y1={236} x2={360} y2={270} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      <line x1={545} y1={250} x2={545} y2={270} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      {box(40, 274, 200, "same booking ✓", undefined, "var(--signal-soft)")}
      {box(260, 274, 170, "409 conflict", undefined, "var(--amber-soft)")}
      {box(450, 274, 190, "new booking + key ✓", undefined, "var(--signal-soft)")}
    </svg>
  );
}

function Horizon() {
  const days = Array.from({ length: 31 }, (_, i) => i);
  const x0 = 20;
  const w = 19.5;
  return (
    <svg viewBox="0 0 650 250" className="w-full" role="img" aria-label="Timeline: from tomorrow, thirty days are planned. When a schedule changes, the plan is invalidated from the first covered day and replanned, with an expected revision and idempotency keys.">
      <text x={x0} y={22} fill="var(--muted)" style={t}>today</text>
      <text x={x0 + w} y={22} fill="var(--muted)" style={t}>→ tomorrow … +30 days</text>
      {days.map((d) => (
        <rect key={d} x={x0 + d * w} y={34} width={w - 3} height={30} rx={4}
          fill={d === 0 ? "var(--rule)" : d < 9 ? "var(--signal-soft)" : "var(--signal)"}
          opacity={d === 0 ? 1 : d < 9 ? 1 : 0.8} />
      ))}
      <text x={x0 + w} y={86} fill="var(--ink-2)" style={t}>covered days are skipped, so reruns are cheap</text>
      <text x={x0 + 9 * w} y={104} fill="var(--signal)" style={t}>new days planned each run</text>

      <line x1={x0 + 4 * w} y1={124} x2={x0 + 4 * w} y2={150} stroke="var(--amber)" />
      <text x={x0 + 4 * w + 6} y={136} fill="var(--amber)" style={t}>manager edits a schedule</text>
      {days.map((d) => (
        <rect key={`b${d}`} x={x0 + d * w} y={156} width={w - 3} height={30} rx={4}
          fill={d === 0 ? "var(--rule)" : d < 1 ? "var(--signal-soft)" : "var(--amber-soft)"} stroke={d >= 1 ? "var(--amber)" : "none"} strokeOpacity={0.4} />
      ))}
      <text x={x0} y={210} fill="var(--ink)" style={t}>invalidate from the first covered day with expectedRevision → replan all 30</text>
      <text x={x0} y={230} fill="var(--muted)" style={t}>every step keyed by sha256(contract, revision, sourceChange): retries never double-apply</text>
    </svg>
  );
}

export function Diagram({ k }: { k: DiagramKey }) {
  return (
    <figure tabIndex={0} aria-label="Diagram, scrolls sideways on small screens" className="my-8 overflow-x-auto rounded-2xl border border-rule bg-card p-4 sm:p-6">
      <div className="min-w-[520px]">
        {k === "token-race" && <TokenRace />}
        {k === "idempotency" && <Idempotency />}
        {k === "horizon" && <Horizon />}
      </div>
    </figure>
  );
}
