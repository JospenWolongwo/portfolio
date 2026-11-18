import type { DiagramKey } from "@/content/case-studies";
import type { Locale } from "@/lib/i18n";

const labels = {
  en: {
    figure: "Diagram, scrolls sideways on small screens",
    browser: "Browser",
    tr1: "1 · refresh(A) on page load",
    tr2: "2 · rotate A → B",
    tr3: "3 · user navigates, request aborted, B never arrives",
    tr4: "4 · refresh(A) on the next page",
    before: "BEFORE",
    trBefore: "A already used → looks like theft → family revoked, logged out",
    after: "AFTER",
    trAfter: "A is the previous token, rotated < 10 s ago → rotate again ✓",
    phone: "Phone",
    phoneSub: "tap · retry · offline replay",
    lock: "advisory lock",
    lockSub: "passenger × ride",
    keyUsed: "key k used before?",
    yes: "yes",
    no: "no",
    sameReq: "same ride & seats?",
    legacy: "existing logic, untouched",
    sameBooking: "same booking ✓",
    conflict: "409 conflict",
    newBooking: "new booking + key ✓",
    today: "today",
    tomorrow: "→ tomorrow … +30 days",
    skipped: "covered days are skipped, so reruns are cheap",
    newDays: "new days planned each run",
    edits: "manager edits a schedule",
    invalidate: "invalidate from the first covered day with expectedRevision → replan all 30",
    keyed: "every step keyed by sha256(contract, revision, sourceChange): retries never double-apply",
    ariaToken:
      "Sequence: a navigation aborts a refresh after the server rotated token A to B; the browser replays A. Before the fix the family is revoked; after it, A is accepted once within ten seconds.",
    ariaIdem:
      "Flow: the phone sends a booking with an idempotency key and retries with the same key. The database locks per passenger and ride, returns the existing booking for a repeated key, refuses a key reused for a different request, and otherwise runs the existing seat logic and stores the key.",
    ariaHorizon:
      "Timeline: from tomorrow, thirty days are planned. When a schedule changes, the plan is invalidated from the first covered day and replanned, with an expected revision and idempotency keys.",
  },
  fr: {
    figure: "Schéma, défile horizontalement sur petit écran",
    browser: "Navigateur",
    tr1: "1 · refresh(A) au chargement",
    tr2: "2 · rotation A → B",
    tr3: "3 · navigation, requête annulée, B n'arrive jamais",
    tr4: "4 · refresh(A) sur la page suivante",
    before: "AVANT",
    trBefore: "A déjà utilisé → ressemble à un vol → famille révoquée",
    after: "APRÈS",
    trAfter: "A = jeton précédent, remplacé il y a < 10 s → rotation ✓",
    phone: "Téléphone",
    phoneSub: "relance · hors ligne",
    lock: "verrou consultatif",
    lockSub: "passager × trajet",
    keyUsed: "clé k déjà utilisée ?",
    yes: "oui",
    no: "non",
    sameReq: "même trajet et places ?",
    legacy: "logique existante intacte",
    sameBooking: "même réservation ✓",
    conflict: "409 conflit",
    newBooking: "réservation + clé ✓",
    today: "aujourd'hui",
    tomorrow: "→ demain … +30 jours",
    skipped: "les jours couverts sont sautés : relancer coûte peu",
    newDays: "nouveaux jours planifiés à chaque passage",
    edits: "un manager modifie un planning",
    invalidate: "invalider dès le premier jour couvert (expectedRevision) → replanifier les 30",
    keyed: "chaque étape a sa clé sha256(contrat, révision, changement) : jamais appliquée deux fois",
    ariaToken:
      "Séquence : une navigation annule un rafraîchissement après que le serveur a remplacé le jeton A par B ; le navigateur rejoue A. Avant le correctif, la famille est révoquée ; après, A est accepté une fois dans les dix secondes.",
    ariaIdem:
      "Flux : le téléphone envoie une réservation avec une clé d'idempotence et relance avec la même clé. La base verrouille par passager et trajet, renvoie la réservation existante pour une clé répétée, refuse une clé réutilisée pour une autre requête, et sinon exécute la logique de places existante et enregistre la clé.",
    ariaHorizon:
      "Chronologie : à partir de demain, trente jours sont planifiés. Quand un planning change, le plan est invalidé dès le premier jour couvert et replanifié, avec une révision attendue et des clés d'idempotence.",
  },
};
type Labels = (typeof labels)["en"];

const t = { fontFamily: "var(--font-jetbrains), ui-monospace, monospace", fontSize: 11 } as const;

function Arrow({ id, color }: { id: string; color: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill={color} />
    </marker>
  );
}

function TokenRace({ L }: { L: Labels }) {
  const lanes = [
    { x: 90, label: L.browser },
    { x: 330, label: "API" },
    { x: 560, label: "Redis" },
  ];
  return (
    <svg viewBox="0 0 650 360" className="w-full" role="img" aria-label={L.ariaToken}>
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
      <text x={100} y={62} fill="var(--ink-2)" style={t}>{L.tr1}</text>
      <line x1={330} y1={98} x2={556} y2={98} stroke="var(--ink)" markerEnd="url(#a-ink)" />
      <text x={342} y={90} fill="var(--ink-2)" style={t}>{L.tr2}</text>
      <line x1={330} y1={128} x2={150} y2={128} stroke="var(--amber)" strokeDasharray="5 4" />
      <text x={128} y={132} textAnchor="middle" fill="var(--amber)" style={{ ...t, fontSize: 16 }}>✕</text>
      <text x={160} y={150} fill="var(--amber)" style={t}>{L.tr3}</text>
      <line x1={90} y1={190} x2={326} y2={190} stroke="var(--ink)" markerEnd="url(#a-ink)" />
      <text x={100} y={182} fill="var(--ink-2)" style={t}>{L.tr4}</text>

      <rect x={196} y={214} width={440} height={56} rx={10} fill="var(--amber-soft)" />
      <text x={212} y={236} fill="var(--amber)" style={{ ...t, fontWeight: 600 }}>{L.before}</text>
      <text x={212} y={256} fill="var(--ink)" style={t}>{L.trBefore}</text>

      <rect x={196} y={282} width={440} height={56} rx={10} fill="var(--signal-soft)" />
      <text x={212} y={304} fill="var(--signal)" style={{ ...t, fontWeight: 600 }}>{L.after}</text>
      <text x={212} y={324} fill="var(--ink)" style={t}>{L.trAfter}</text>
    </svg>
  );
}

function Idempotency({ L }: { L: Labels }) {
  const box = (x: number, y: number, w: number, label: string, sub?: string, tone = "var(--card)") => (
    <g>
      <rect x={x} y={y} width={w} height={sub ? 50 : 36} rx={10} fill={tone} stroke="var(--rule)" />
      <text x={x + w / 2} y={y + (sub ? 21 : 22)} textAnchor="middle" fill="var(--ink)" style={{ ...t, fontWeight: 600 }}>{label}</text>
      {sub && <text x={x + w / 2} y={y + 38} textAnchor="middle" fill="var(--muted)" style={t}>{sub}</text>}
    </g>
  );
  return (
    <svg viewBox="0 0 650 330" className="w-full" role="img" aria-label={L.ariaIdem}>
      <defs>
        <Arrow id="i-ink" color="var(--ink)" />
      </defs>
      {box(10, 20, 150, L.phone, L.phoneSub)}
      {box(250, 20, 150, "POST /bookings", "Idempotency-Key: k")}
      {box(470, 20, 170, L.lock, L.lockSub)}
      <line x1={160} y1={45} x2={246} y2={45} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      <line x1={400} y1={45} x2={466} y2={45} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      <line x1={555} y1={70} x2={555} y2={110} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      {box(445, 114, 220 - 25, L.keyUsed)}
      <line x1={470} y1={150} x2={330} y2={200} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      <line x1={555} y1={150} x2={555} y2={196} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      <text x={360} y={168} fill="var(--muted)" style={t}>{L.yes}</text>
      <text x={565} y={180} fill="var(--muted)" style={t}>{L.no}</text>
      {box(180, 200, 220, L.sameReq)}
      {box(450, 200, 190, "reserve_ride_seats()", L.legacy)}
      <line x1={250} y1={236} x2={170} y2={270} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      <line x1={330} y1={236} x2={360} y2={270} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      <line x1={545} y1={250} x2={545} y2={270} stroke="var(--ink)" markerEnd="url(#i-ink)" />
      {box(40, 274, 200, L.sameBooking, undefined, "var(--signal-soft)")}
      {box(260, 274, 170, L.conflict, undefined, "var(--amber-soft)")}
      {box(450, 274, 190, L.newBooking, undefined, "var(--signal-soft)")}
    </svg>
  );
}

function Horizon({ L }: { L: Labels }) {
  const days = Array.from({ length: 31 }, (_, i) => i);
  const x0 = 20;
  const w = 19.5;
  return (
    <svg viewBox="0 0 650 250" className="w-full" role="img" aria-label={L.ariaHorizon}>
      <text x={x0} y={22} fill="var(--muted)" style={t}>{L.today}</text>
      <text x={x0 + 5 * w} y={22} fill="var(--muted)" style={t}>{L.tomorrow}</text>
      {days.map((d) => (
        <rect key={d} x={x0 + d * w} y={34} width={w - 3} height={30} rx={4}
          fill={d === 0 ? "var(--rule)" : d < 9 ? "var(--signal-soft)" : "var(--signal)"}
          opacity={d === 0 ? 1 : d < 9 ? 1 : 0.8} />
      ))}
      <text x={x0 + w} y={86} fill="var(--ink-2)" style={t}>{L.skipped}</text>
      <text x={x0 + 9 * w} y={104} fill="var(--signal)" style={t}>{L.newDays}</text>

      <line x1={x0 + 4 * w} y1={124} x2={x0 + 4 * w} y2={150} stroke="var(--amber)" />
      <text x={x0 + 4 * w + 6} y={136} fill="var(--amber)" style={t}>{L.edits}</text>
      {days.map((d) => (
        <rect key={`b${d}`} x={x0 + d * w} y={156} width={w - 3} height={30} rx={4}
          fill={d === 0 ? "var(--rule)" : d < 1 ? "var(--signal-soft)" : "var(--amber-soft)"} stroke={d >= 1 ? "var(--amber)" : "none"} strokeOpacity={0.4} />
      ))}
      <text x={x0} y={210} fill="var(--ink)" style={t}>{L.invalidate}</text>
      <text x={x0} y={230} fill="var(--muted)" style={t}>{L.keyed}</text>
    </svg>
  );
}

export function Diagram({ k, locale }: { k: DiagramKey; locale: Locale }) {
  const L = labels[locale];
  return (
    <figure tabIndex={0} aria-label={L.figure} className="my-8 overflow-x-auto rounded-2xl border border-rule bg-card p-4 sm:p-6">
      <div className="min-w-[520px]">
        {k === "token-race" && <TokenRace L={L} />}
        {k === "idempotency" && <Idempotency L={L} />}
        {k === "horizon" && <Horizon L={L} />}
      </div>
    </figure>
  );
}
