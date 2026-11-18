export type DiagramKey = "token-race" | "idempotency" | "horizon";

export type Section = {
  heading: string;
  body: string[];
  list?: string[];
  diagram?: DiagramKey;
  code?: { file: string; lang: string; source: string };
};

export type CaseStudy = {
  slug: string;
  kicker: string;
  title: string;
  product: string;
  org: string;
  period: string;
  role: string;
  summary: string;
  stack: string[];
  facts: { label: string; value: string }[];
  sections: Section[];
  stage: { label: string; detail: string };
  open: string[];
  evidence: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "nexma-attendance",
    kicker: "Domain engine · Scheduling · SaaS",
    title: "An attendance engine that stays 30 days ahead",
    product: "Nexma",
    org: "Nexma · Canada",
    period: "Apr 2026 – now",
    role: "Backend engineer, delivering full-stack · #1 contributor on API and web",
    summary:
      "Nexma's teams clock in against contracts with shifts, work days and policies that keep changing. I built the engine that keeps every enrolled contract planned a month ahead, replans safely when anything changes, and never makes a clock-in wait.",
    stack: ["NestJS (hexagonal)", "Prisma", "PostgreSQL", "MongoDB", "Redis + BullMQ", "Next.js 16"],
    facts: [
      { label: "My merged PRs, API + web", value: "401" },
      { label: "Contributor rank", value: "#1 on both repos" },
      { label: "Planning horizon", value: "30 days" },
      { label: "Live", value: "nexma.org · Google Play" },
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "Nexma is a work-management SaaS: organisations, positions, contracts, tasks, schedules, attendance and reports, on a web app and a mobile app. I joined as a backend engineer and took ownership of attendance, the part people touch every working day.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "A clock-in has to be checked against what the person was planned to do that day. Computing the plan at clock-in time is slow and fragile. Computing it once goes stale the moment a manager edits a schedule, a work day or a policy.",
        ],
      },
      {
        heading: "The design",
        body: [
          "A horizon job keeps every enrolled contract planned 30 days ahead. Planning starts tomorrow, already covered days are skipped, so reruns are cheap. When a planning source changes, the database only accepts a plan redone from the first covered day, so the job republishes the sources, invalidates from that day with an expected revision, and plans again.",
          "Every step carries an idempotency key derived from the contract, its revision and the last source change, so a retried job can never double-apply. One failing contract is logged and skipped; it never stops the others. The loop yields to authorization writers so planning never blocks someone changing permissions.",
        ],
        diagram: "horizon",
        code: {
          file: "attendance/application/attendance-horizon.service.ts",
          lang: "ts",
          source: `export const ATTENDANCE_HORIZON_DAYS = 30;

const key = (step: string) =>
  sha256(["horizon", step, contractId, revision, lastSourceChangeId]);

if (target.sourcesChanged) {
  fromDate = target.firstCoveredDate ?? tomorrow;
  await publishPlanningSources({ key: key("sources"), contractId });
  revision = await repository.invalidate({
    key: key("invalidate"),
    contractId,
    expectedRevision: target.revision, // optimistic check
    fromDate,
  });
}
await materialize({ revision, from: fromDate, to: tomorrow + 29 days });`,
        },
      },
      {
        heading: "What it changed for users",
        body: [],
        list: [
          "Clocking in on an enrolled contract never waits for its plan.",
          "Web corrections apply as engine revisions, so enrolled contracts are corrected like any other.",
          "The Pointages list pages by cursor with a live view, instead of loading everything.",
          "Edits to approved work re-approve it under the editor, with one warning before saving.",
        ],
      },
      {
        heading: "Around it",
        body: [
          "Attendance is location-sensitive, so I treated privacy as a feature: check-ins are verified against site zones drawn as polygons, each session keeps an append-only location trail, positions are deleted after 90 days unless a legal hold applies, and every change to recorded work goes through an independent reviewer. Listings are cached in Redis and retired on every attendance change, and dashboards read the organisation's business day rather than UTC.",
          "Roles and positions that can be retired while in use, by moving their holders, with an audit of who handed over which contracts and tasks. Bulk email invitations with per-recipient results. 100 MB uploads streamed to storage, with refusals that name the limit. Every refusal in the app says why and what to do next.",
          "I have also written a release controller that rotates API traffic through health-checked slots, journals each phase and rolls back on failure, with online migrations that don't block live clock-ins. It is in review, not yet in production.",
        ],
      },
    ],
    stage: { label: "Production", detail: "The attendance engine is merged to main and runs on nexma.org and the Google Play app." },
    open: [
      "The slot-based release controller is still in review, not merged to main.",
    ],
    evidence: ["216 merged API PRs", "185 merged web PRs", "attendance-horizon.service.ts"],
  },
  {
    slug: "maisoncurtis-payments",
    kicker: "Payments · Postgres invariants · Client delivery",
    title: "Live card payments for a salon in Belgium, with no double bookings",
    product: "Maison Curtis",
    org: "Poky Group · client in Charleroi, Belgium",
    period: "Oct 2026 – now",
    role: "Sole engineer: database, Edge Functions, two PWAs, CI",
    summary:
      "A barber in Charleroi wanted clients to book and pay a deposit online, in French, Dutch or English. I designed and delivered the platform alone in a month: 52 merged pull requests. Live Stripe payments, a database that refuses double bookings, and automatic refunds whenever a client pays for a slot they can no longer have.",
    stack: ["Next.js", "Supabase / PostgreSQL", "Stripe (cards, Bancontact)", "Edge Functions (Deno)", "Turborepo", "pgTAP + Playwright"],
    facts: [
      { label: "Delivered", value: "52 PRs in 31 days" },
      { label: "pgTAP assertions", value: "396" },
      { label: "E2E + unit tests", value: "89 + 178" },
      { label: "Payments", value: "Live Stripe" },
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "Maison Curtis is the first tenant of a white-label booking platform I built for barbershops: a public site and client PWA, a Console PWA for the barber, and everything brand-specific kept in data. The client is in Belgium, so cards and Bancontact through Stripe, three languages, and functions hosted in Paris.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "Two clients can pick the same chair at the same minute. A payment can succeed after the slot's hold expired. Stripe retries webhooks and can deliver them out of order. Any of these, handled in application code alone, ends with two people booked for one chair or a client charged for nothing.",
        ],
      },
      {
        heading: "The design",
        body: [
          "The rule lives in PostgreSQL, not in the app: an exclusion constraint makes overlapping active bookings for one barber impossible, whatever code path writes them. Choosing a time creates a short hold; only Stripe's signed webhook can confirm it.",
          "Every webhook event is recorded by id in the same transaction that applies it, so a replay changes nothing. If a payment succeeds after its hold was lost, the booking is refunded automatically; refunds go out through a worker with one idempotency key per refund, so a retry never refunds twice.",
        ],
        code: {
          file: "supabase/migrations/…_booking_schema.sql",
          lang: "sql",
          source: `create table public.bookings (
  -- ...
  constraint no_double_booking exclude using gist (
    staff_id with =,   -- same barber
    period   with &&   -- overlapping time
  ) where (status in ('held', 'confirmed', 'completed'))
);

-- webhook: record the event and apply it in one transaction
insert into public.stripe_events (id, type)
values (p_id, p_type)
on conflict (id) do nothing;   -- a replay is a no-op`,
        },
      },
      {
        heading: "Proof",
        body: [],
        list: [
          "396 pgTAP assertions on the database: no double booking, row-level security, holds and payments, webhook ordering, scheduled jobs.",
          "A card matrix in Stripe test mode: declined, insufficient funds, lost, stolen, expired, wrong CVC, processing error, 3-D Secure refused. Each keeps the hold and charges nothing.",
          "Load and concurrency: 20 clients on one time get one hold; the same webhook sent 10 times at once confirms once; 40 simultaneous payments all go through.",
          "That test found a real problem: Stripe rate-limited 12 of 40 requests. Safe calls now retry on 429 and 5xx, and 40 of 40 pass.",
        ],
      },
      {
        heading: "What the client got",
        body: [],
        list: [
          "Online booking with live deposits, rescheduling up to 24 hours before, and automatic refunds when the salon cancels.",
          "A Console for the barber with email-code sign-in and mandatory TOTP for the owner, agenda, team and schedule.",
          "Push and email notifications, offline-tolerant PWAs, nightly encrypted database backups.",
          "Public pages held to a 2-second LCP budget, checked with Lighthouse and axe in CI on every change.",
        ],
      },
    ],
    stage: { label: "Production", detail: "Live at maisoncurtis.com with real Stripe payments. The stress tests ran in Stripe test mode, against the same code and form." },
    open: [
      "The load and concurrency script runs locally before each payment release, not on every CI run.",
      "Booking volumes and revenue belong to the client and are not published here.",
    ],
    evidence: ["PR #31 · Stripe webhook and refunds", "PR #47 · payment stress test", "52 merged PRs"],
  },
  {
    slug: "theluxar-auth-race",
    kicker: "Debugging · Auth · Fintech",
    title: "The flaky test that would have logged customers out",
    product: "TheLuxar",
    org: "Poky Group",
    period: "Sep 2026 – now",
    role: "Sole engineer: backend, three frontends, CI",
    summary:
      "An end-to-end test failed now and then. Tracing it showed that a fast page navigation could make the server revoke a legitimate customer's session. TheLuxar is pre-launch, so this was caught in testing, before any customer could hit it. I fixed it with a grace window that accepts exactly one previous token, for ten seconds, and kept theft protection intact.",
    stack: ["NestJS on Fastify", "Redis", "Drizzle + PgBouncer", "Jest + Testcontainers", "Next.js"],
    facts: [
      { label: "My merged PRs, solo", value: "130" },
      { label: "Backend modules", value: "15" },
      { label: "Unit tests after the fix", value: "1,295 / 1,295" },
      { label: "E2E tests after the fix", value: "598 / 598, run twice" },
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "TheLuxar is a commerce, delivery and finance platform for Cameroon: a Next.js shop, an admin console and an Expo rider app on one hexagonal NestJS backend. I am its only engineer.",
          "Customer sessions use refresh-token rotation: every refresh issues a new token, and replaying a used one is treated as theft, so the whole session family is revoked.",
        ],
      },
      {
        heading: "The symptom",
        body: [
          "A shop end-to-end test failed intermittently. On a second order in the same session, the checkout's “Continuer” button never appeared. The easy move was to mark the test flaky and retry it. I traced it instead.",
        ],
      },
      {
        heading: "The real cause",
        body: [
          "The shop refreshes the session on every full page load. When a customer navigates while the previous page's refresh request is still in flight, the browser aborts that request. But the server may already have rotated the token. The browser never receives the new one, so its next refresh presents the old token, which looks exactly like a stolen token being replayed. The server revokes the family and a legitimate customer is logged out.",
        ],
        diagram: "token-race",
      },
      {
        heading: "The decision",
        body: [
          "Turning off reuse detection would remove the protection rotation exists for. Fixing it only in the client would not help, because the abort happens during navigation, outside the app's control.",
          "So the session family now remembers the hash of the token it just replaced and when. Presenting exactly that token within 10 seconds succeeds and rotates again. A token two generations old is still rejected and still revokes the family. The grace covers one generation, nothing more. Sessions already stored in Redis stay valid and gain the field at their next rotation.",
        ],
        code: {
          file: "iam/domain/session-family.entity.ts",
          lang: "ts",
          source: `const REFRESH_GRACE_MS = 10_000;

rotate(presented: string, next: string, now = new Date()): void {
  if (this.isRevoked()) throw new TokenReusedError();

  const withinGrace =
    presented === this.props.previousRefreshTokenHash &&
    this.props.rotatedAt !== undefined &&
    now.getTime() - this.props.rotatedAt.getTime() <= REFRESH_GRACE_MS;

  if (presented !== this.props.currentRefreshTokenHash && !withinGrace) {
    this.props = { ...this.props, revokedAt: now };
    throw new TokenReusedError(); // real replay: kill the family
  }
  // ...rotate: current becomes previous, record rotatedAt
}`,
        },
      },
      {
        heading: "Proof",
        body: [],
        list: [
          "Unit tests for the grace success, a two-generations-old rejection, grace versus an already revoked family, and the exact 10-second boundary.",
          "Mutation-checked: I removed the grace check, confirmed the new test fails for the right reason, then restored it.",
          "E2E against a real Redis over HTTP: an immediate replay succeeds, a stale replay is rejected and the family is revoked.",
          "Full unit suite 1,295/1,295 and e2e suite 598/598, each run twice to rule out flakiness.",
        ],
      },
      {
        heading: "Two more from the same codebase",
        body: [
          "Rate limiting (PR #52). The global limiter stored counts in each instance's memory. Staging runs two or more Fly machines, so the real cap was about double the documented 100 requests a minute, and it reset on every deploy. I moved it onto the shared Redis connection. A new e2e test boots two app instances on one Redis and proves that exhausting the cap on one makes the other refuse its very first request. It fails open by design, because it is a flood backstop; OTP and uploads keep their own stricter limits.",
          "Platform work around it, also mine: phone sign-in with OTP anti-pumping limits (a known SMS-fraud vector), Google sign-in linked to a phone identity, mandatory TOTP for admins, a media pipeline on Cloudflare R2, Images and Stream, Meilisearch search with a Redis catalogue cache and ETags, Sentry and Axiom with secret redaction, and a lint rule that stops one module from reading another's tables.",
          "Payments (PR #54). A provider-agnostic payment domain with a pawaPay connector for MTN MoMo and Orange Money, verified against the real pawaPay sandbox: success, every documented failure reason, a stuck payment with no callback, and the 15-minute reconciler expiry. Failure reasons come back as stable codes, never vendor text, so the apps can translate them. 630 tests across 68 suites passed locally.",
        ],
      },
    ],
    stage: { label: "Staging · pre-launch", detail: "Reproduced and fixed in the local and CI test suites. TheLuxar has no production traffic yet." },
    open: [
      "TheLuxar is not launched yet; it runs on staging on Fly.io.",
      "The shared rate limit still needs a live check on two staging machines (listed as open in PR #52).",
    ],
    evidence: ["PR #51 · grace window", "PR #52 · Redis rate limit", "PR #54 · payments"],
  },
  {
    slug: "pikdrive-idempotency",
    kicker: "Payments · Mobile networks · Postgres",
    title: "One tap, one booking, even on a dropped connection",
    product: "PikDrive",
    org: "Poky Group",
    period: "Jan 2025 – now",
    role: "Sole engineer",
    summary:
      "PikDrive passengers book seats and pay with mobile money, often on unstable networks. A retried request must never reserve twice. I made booking creation idempotent at the database level, without rewriting the seat logic the web app already relied on.",
    stack: ["Next.js 16", "Supabase / PostgreSQL", "PawaPay · MTN MoMo · Orange Money", "OneSignal", "Vercel"],
    facts: [
      { label: "Commits", value: "~540, solo" },
      { label: "Contract tests", value: "57 passing" },
      { label: "Payment providers", value: "3, routed automatically" },
      { label: "Live", value: "pikdrive.com" },
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "PikDrive connects drivers and passengers. It handles mobile-money payments with automatic provider routing, driver payouts on code verification, partial refunds when seats are reduced, no-show rules, two-way reviews, and OneSignal plus WhatsApp notifications. I have built it alone since January 2025.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "A native client retries when the network drops, and an offline queue replays requests later. Without protection, the same tap could reserve seats twice and charge for both.",
        ],
      },
      {
        heading: "The design",
        body: [
          "POST /api/bookings now requires an Idempotency-Key, and clients keep the same key through web and offline retry paths. In the database, a partial unique index makes a key unique per passenger. A wrapper function takes a transaction-scoped advisory lock for that passenger and ride, returns the existing booking if the key was already used for the same request, refuses it if the key was used for a different one, and otherwise calls the existing seat logic unchanged.",
        ],
        diagram: "idempotency",
        code: {
          file: "supabase/migrations/…_add_booking_idempotency.sql",
          lang: "sql",
          source: `CREATE UNIQUE INDEX bookings_user_idempotency_key_unique
  ON bookings (user_id, idempotency_key)
  WHERE idempotency_key IS NOT NULL;

-- inside reserve_ride_seats_idempotent(...)
PERFORM pg_advisory_xact_lock(hashtext(p_ride_id::text),
                              hashtext(p_user_id::text));

SELECT id, ride_id, seats INTO v_id, v_ride, v_seats
FROM bookings WHERE user_id = p_user_id
               AND idempotency_key = p_key;

IF v_id IS NOT NULL THEN
  -- same request: return the same booking; different: refuse
  ...
END IF;

SELECT * INTO v_result FROM reserve_ride_seats(...); -- legacy policy, untouched`,
        },
      },
      {
        heading: "Proof",
        body: [],
        list: [
          "Route contract tests: unauthorized, missing key, stable key forwarding, key reused for a different request.",
          "57 tests passing, lint and typecheck clean.",
          "Migration dry-run, then applied to the development database, with local and dev migration history matching.",
          "Mobile API v1 documented: transport, auth, retries and the endpoint contract.",
        ],
      },
    ],
    stage: { label: "Development database", detail: "The code is merged to the develop branch. The migration runs on the development database; UAT and production are deliberately unchanged so far." },
    open: [
      "The idempotency migration is on the development database; UAT and production were deliberately not changed yet.",
      "The rest of the versioned endpoint matrix (payments, chat, driver) still needs the same contract tests.",
    ],
    evidence: ["PR #20 · idempotent booking"],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
