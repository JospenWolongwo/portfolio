// Every claim on this site maps to a commit, a merged PR or a live URL.
// Usage metrics stay `null` until a real number is pulled from a dashboard
// (Play Console, Supabase, analytics). A null metric never renders.

export const profile = {
  name: "Jospen Wolongwo",
  role: "Full-stack product engineer",
  headline: "I ship products people use, and keep them running.",
  intro:
    "TypeScript engineer who owns products end to end: data model, API, web and mobile clients, CI and cloud. I work remotely for Nexma, a Canadian SaaS company, deliver for a client in Belgium, and co-founded Poky Group. My focus is systems that must stay correct in production: payments, real-time features, mobile releases and AWS.",
  location: "Cameroon · UTC+1",
  availability: "Open to remote roles",
  email: "jospenwolongwo@gmail.com",
  github: "https://github.com/JospenWolongwo",
  linkedin: "https://www.linkedin.com/in/jospen/" as string | null,
  cv: "/Jospen-Wolongwo-CV.pdf" as string | null,
  site: "https://jospen.vercel.app",
  stack: ["TypeScript", "NestJS", "Next.js", "React Native", "PostgreSQL", "AWS"],
};

export type Status = "live" | "build" | "delivered";

export type Product = {
  slug: string;
  name: string;
  url: string | null;
  org: string;
  what: string;
  role: string;
  stack: string[];
  status: Status;
  play?: boolean;
  caseStudy?: string;
  shot?: string;
  metric?: { label: string; value: string | null };
};

export const products: Product[] = [
  {
    slug: "nexma",
    name: "Nexma",
    url: "https://nexma.org",
    org: "Nexma · Canada",
    what: "Work-management SaaS: teams, contracts, scheduling, attendance, reports.",
    role: "#1 contributor on API and web (401 merged PRs) · owns the attendance engine",
    stack: ["NestJS", "Prisma", "PostgreSQL", "MongoDB", "Redis", "Next.js"],
    status: "live",
    play: true,
    caseStudy: "nexma-attendance",
    shot: "/shots/nexma-desktop.jpg",
    metric: { label: "Check-ins recorded", value: null },
  },
  {
    slug: "pikdrive",
    name: "PikDrive",
    url: "https://pikdrive.com",
    org: "Poky Group",
    what: "Ride-sharing with mobile-money payments, driver payouts and refunds.",
    role: "Sole engineer since Jan 2025",
    stack: ["Next.js", "Supabase", "PawaPay", "MTN MoMo", "Orange Money"],
    status: "live",
    caseStudy: "pikdrive-idempotency",
    shot: "/shots/pikdrive-desktop.jpg",
    metric: { label: "Rides booked", value: null },
  },
  {
    slug: "thelouk",
    name: "TheLouk",
    url: "https://thelouk.com",
    org: "Poky Group",
    what: "Social app for meeting people at events: rooms, likes, chat.",
    role: "Core mobile engineer · push, realtime, releases",
    stack: ["Expo", "React Native", "Supabase", "EAS"],
    status: "live",
    play: true,
    shot: "/shots/thelouk-desktop.jpg",
    metric: { label: "Installs", value: null },
  },
  {
    slug: "maisoncurtis",
    name: "Maison Curtis",
    url: "https://maisoncurtis.com",
    org: "Poky Group",
    what: "White-label barber booking: client PWA, barber console and live Stripe deposits with automatic refunds.",
    role: "Sole engineer · live Stripe payments, webhook, refunds",
    caseStudy: "maisoncurtis-payments",
    stack: ["Next.js", "Supabase", "Stripe", "Turborepo", "pgTAP"],
    status: "live",
    shot: "/shots/maisoncurtis-desktop.jpg",
    metric: { label: "Appointments booked", value: null },
  },
  {
    slug: "hopimed",
    name: "HopiMed",
    url: "https://hopimed237.site",
    org: "Poky Group",
    what: "On-duty pharmacies and hospitals, with an AI assistant that reads prescriptions.",
    role: "Sole engineer · built the AI features",
    stack: ["Angular", "Supabase Edge Functions", "OpenAI tools + vision", "PWA"],
    status: "live",
    shot: "/shots/hopimed-desktop.jpg",
    metric: { label: "Pharmacies listed", value: null },
  },
  {
    slug: "gajo",
    name: "Gajo Livestock",
    url: "https://gajolivestock.com",
    org: "Gajo Livestock · contract",
    what: "Agritech marketplace: livestock, vet services, agri-credit.",
    role: "Owner of the admin console (79 of 85 commits)",
    stack: ["React 19", "TanStack Query", "Playwright", "GitLab CI"],
    status: "live",
    play: true,
    shot: "/shots/gajo-desktop.jpg",
  },
  {
    slug: "theluxar",
    name: "TheLuxar",
    url: "https://shop-five-mocha.vercel.app/fr",
    org: "Poky Group",
    what: "Commerce, delivery and finance platform: shop, admin console, rider app.",
    role: "Sole engineer · 130 merged PRs across backend and frontends",
    stack: ["NestJS", "Fastify", "Drizzle", "BullMQ", "Expo", "Fly.io"],
    status: "build",
    caseStudy: "theluxar-auth-race",
    shot: "/shots/theluxar-desktop.jpg",
  },
  {
    slug: "fintech-aws",
    name: "Fintech platform on AWS",
    url: null,
    org: "Contract · pre-launch",
    what: "Independent AWS environment for a 13-app fintech platform, built with CDK.",
    role: "Cloud engineer · 8/8 services healthy",
    stack: ["AWS CDK", "ECS", "Aurora", "Valkey", "ECR"],
    status: "delivered",
  },
];

export type Role = {
  org: string;
  title: string | null;
  period: string;
  note?: string;
  points: string[];
};

export const experience: Role[] = [
  {
    org: "Poky Group SAS",
    title: "Co-founder & General Director · CTO",
    period: "2025 – now",
    points: [
      "Lead engineering across five products: PikDrive, TheLouk, HopiMed, Maison Curtis and TheLuxar. Sole engineer on four, including Maison Curtis for a client in Belgium, delivered in a month.",
      "Built payments end to end: mobile money (PawaPay, MTN MoMo, Orange Money) with payouts and reconciliation on PikDrive, and live Stripe deposits with a signed webhook and automatic refunds on Maison Curtis.",
      "Set the release standard: CI gates on migrations, Play Store releases through EAS, OTA updates blocked when native code changes.",
    ],
  },
  {
    org: "Nexma · Canada (remote)",
    title: "Backend Engineer (delivering full-stack)",
    period: "Apr 2026 – now",
    points: [
      "#1 contributor on both the API and the web app: 401 merged pull requests (216 API, 185 web) since April 2026.",
      "Own the attendance engine: contracts planned 30 days ahead, corrections applied as engine revisions, live cursor-paginated views.",
      "Built location-aware attendance with privacy built in: polygon site zones, append-only location trails, 90-day retention with legal holds, independent review of every change.",
      "Built roles and positions with audited hand-overs, bulk invitations and 100 MB streamed uploads.",
    ],
  },
  {
    org: "Gajo Livestock",
    title: "Frontend Engineer · contract",
    period: "Mar 2026 – now",
    points: [
      "Own the React 19 admin console: subscription plans, per-user AI quota tracking, credit flows and statistics.",
      "Added Playwright end-to-end tests to GitLab CI, with Firebase deployments per environment.",
    ],
  },
  {
    org: "Fintech platform (pre-launch)",
    title: "Cloud Engineer · contract",
    period: "Jul – Aug 2026",
    points: [
      "Stood up an independent AWS environment with CDK: VPC, Aurora, Valkey, S3, ECR and three ECS clusters behind HTTPS. 8 of 8 services healthy.",
      "Documented it for the next engineer: ADRs, a dated risk register, runbooks and a billing guardrail.",
    ],
  },
  {
    org: "Kola Group",
    title: "Software Developer",
    period: "Oct 2025 – Jul 2026",
    points: ["Built payment-aggregator services for fintech clients: pay-ins, payouts, mass payments and other money-movement operations."],
  },
  {
    org: "Hello Computing",
    title: "Junior Full-stack Developer",
    period: "Nov 2023 – 2025",
    points: ["Built an e-commerce store and a digital business card with QR scanning, using NestJS, Angular, Redis and SCSS."],
  },
  {
    org: "CIA Consulting · Yaoundé",
    title: "Web Developer Intern",
    period: "May – Nov 2023",
    points: ["First professional role: developed client web applications with Laravel and React."],
  },
];

export const principles = [
  {
    title: "Retries must be safe.",
    body: "Mobile networks drop requests. A booking or a payment sent twice must still happen once.",
    proof: "PikDrive · idempotent bookings",
    href: "/work/pikdrive-idempotency/",
  },
  {
    title: "Find the real cause, then fix it narrowly.",
    body: "A flaky test on staging led to a token race that would have logged customers out. The fix accepts exactly one token generation, for ten seconds.",
    proof: "TheLuxar · PR #51",
    href: "/work/theluxar-auth-race/",
  },
  {
    title: "Say what isn't verified yet.",
    body: "My pull requests separate what was tested locally, what ran on a sandbox and what still needs staging.",
    proof: "TheLuxar · PR #52",
    href: "/work/theluxar-auth-race/#more",
  },
  {
    title: "Write it down for the next engineer.",
    body: "ADRs, runbooks and dated risk registers, so a system survives the person who built it.",
    proof: "AWS contract · 11 readiness domains",
    href: null,
  },
];
