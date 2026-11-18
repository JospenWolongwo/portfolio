// One-page A4 CV built only from paragraph styles, bullets and a right tab stop:
// no tables, text boxes or columns, so editing it in Word never breaks the layout.
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, TabStopType, AlignmentType,
  LevelFormat, BorderStyle, Tab,
} = require("docx");

const FONT = "Calibri";
const HEAD = "Georgia";
const INK = "1A1A1A";
const GREY = "5A5A5A";
const W = 11906, M = 850; // A4, 1.5 cm margins
const RIGHT = W - 2 * M;

const link = (text, url) =>
  new ExternalHyperlink({ link: url, children: [new TextRun({ text, style: "Hyperlink" })] });

const section = (t) => new Paragraph({ style: "Section", children: [new TextRun(t)] });

// "Org — Title<TAB>Dates"
const role = (org, title, dates) =>
  new Paragraph({
    style: "Role",
    children: [
      new TextRun({ text: org, bold: true }),
      new TextRun({ text: title ? `  ·  ${title}` : "" }),
      new TextRun({ children: [new Tab(), dates], color: GREY }),
    ],
  });

const context = (runs) => new Paragraph({ style: "Context", children: runs });
const bullet = (...runs) =>
  new Paragraph({
    style: "Bullet",
    numbering: { reference: "dash", level: 0 },
    children: runs.map((r) => (typeof r === "string" ? new TextRun(r) : r)),
  });
const b = (t) => new TextRun({ text: t, bold: true });
const skill = (k, v) =>
  new Paragraph({ style: "Skill", children: [new TextRun({ text: `${k}:  `, bold: true }), new TextRun(v)] });

const doc = new Document({
  creator: "Jospen Wolongwo",
  title: "Jospen Wolongwo · Full-Stack Engineer · CV",
  styles: {
    default: { document: { run: { font: FONT, size: 19, color: INK } } },
    characterStyles: [
      { id: "Hyperlink", name: "Hyperlink", run: { color: INK, underline: {} } },
    ],
    paragraphStyles: [
      { id: "Name", name: "CV Name", run: { font: HEAD, size: 44, color: INK },
        paragraph: { spacing: { before: 0, after: 40 } } },
      { id: "Headline", name: "CV Headline", run: { size: 21, color: INK },
        paragraph: { spacing: { before: 0, after: 40 } } },
      { id: "Contact", name: "CV Contact", run: { size: 18, color: GREY },
        paragraph: { spacing: { before: 0, after: 0 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: INK, space: 8 } } } },
      { id: "Summary", name: "CV Summary", run: { size: 20 },
        paragraph: { spacing: { before: 200, after: 0, line: 264 } } },
      { id: "Section", name: "CV Section", run: { font: HEAD, size: 21, color: INK },
        paragraph: { spacing: { before: 230, after: 90 }, keepNext: true,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF", space: 3 } } } },
      { id: "Role", name: "CV Role", run: { size: 21 },
        paragraph: { spacing: { before: 115, after: 0 }, keepNext: true,
          tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }] } },
      { id: "Context", name: "CV Context", run: { size: 18, italics: true, color: GREY },
        paragraph: { spacing: { before: 10, after: 30 }, keepNext: true } },
      { id: "Bullet", name: "CV Bullet", run: { size: 19 },
        paragraph: { spacing: { before: 0, after: 30, line: 252 } } },
      { id: "Skill", name: "CV Skill", run: { size: 19 },
        paragraph: { spacing: { before: 0, after: 30 }, indent: { left: 0 } } },
    ],
  },
  numbering: {
    config: [{
      reference: "dash",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 260, hanging: 200 } }, run: { color: GREY } } }],
    }],
  },
  sections: [{
    properties: { page: { size: { width: W, height: 16838 }, margin: { top: 780, bottom: 700, left: M, right: M } } },
    children: [
      new Paragraph({ style: "Name", children: [new TextRun("Jospen Wolongwo")] }),
      new Paragraph({ style: "Headline", children: [
        new TextRun({ text: "Full-Stack Product Engineer (TypeScript)", bold: true }),
        new TextRun("  ·  Remote from Cameroon (UTC+1)"),
      ] }),
      new Paragraph({ style: "Contact", children: [
        link("jospenwolongwo@gmail.com", "mailto:jospenwolongwo@gmail.com"), new TextRun("  ·  "),
        link("jospen.vercel.app", "https://jospen.vercel.app"), new TextRun("  ·  "),
        link("github.com/JospenWolongwo", "https://github.com/JospenWolongwo"), new TextRun("  ·  "),
        link("linkedin.com/in/jospen", "https://www.linkedin.com/in/jospen/"),
      ] }),

      new Paragraph({ style: "Summary", children: [
        new TextRun("Product engineer (TypeScript, NestJS, Next.js, React Native, PostgreSQL, AWS) with three years of professional experience, currently working remotely for Nexma, a Canadian SaaS company. I build and run products end to end, from database to mobile release: six are live, three on Google Play. My focus is systems that must stay correct in production: payments (Stripe and mobile money), real-time features, mobile releases and AWS."),
      ] }),

      section("Experience"),

      role("Nexma", "Backend Engineer, delivering full-stack", "Apr 2026 – Present"),
      context([new TextRun("Remote, Canada  ·  "), link("nexma.org", "https://nexma.org"), new TextRun(", work-management SaaS on web and Google Play  ·  NestJS, PostgreSQL, Next.js")]),
      bullet("Top committer on the API and web app, with ", b("95 merged pull requests"), " on the API."),
      bullet("Designed the attendance engine: every contract planned ", b("30 days ahead"), ", replanned safely when a schedule changes, with revision checks and idempotency keys so retries never apply twice."),
      bullet("Built roles and positions with audited hand-overs, bulk invitations and streamed uploads up to 100 MB."),

      role("Poky Group SAS", "Co-founder, General Director and CTO", "2025 – Present"),
      context([new TextRun("Product company I co-founded. I lead engineering and write most of the code.")]),
      bullet(b("PikDrive"), " (", link("pikdrive.com", "https://pikdrive.com"), "): sole engineer on ride-sharing with mobile-money payments (MTN MoMo and Orange Money via PawaPay), driver payouts and refunds. Idempotent booking creation in PostgreSQL, rolling out from development."),
      bullet(b("TheLouk"), " (", link("thelouk.com", "https://thelouk.com"), ", Google Play): core mobile engineer on Expo and React Native. Push notifications, realtime chat and EAS release pipeline."),
      bullet(b("TheLuxar"), " (staging, pre-launch): commerce and delivery platform on NestJS, Fastify, Redis and BullMQ, with 1,295 unit and 598 end-to-end tests. Fixed a token-rotation race that would have logged customers out."),
      bullet(b("Maison Curtis"), " (", link("maisoncurtis.com", "https://maisoncurtis.com"), "): sole engineer. Stripe deposits with a signed, replay-safe webhook and automatic refunds, stress-tested under concurrency."),
      bullet(b("HopiMed"), " (", link("hopimed237.site", "https://hopimed237.site"), "): sole engineer. AI assistant grounded in live data via OpenAI tool calling; prescription reading that flags doubt instead of guessing."),

      role("Contract work", null, "Mar 2026 – Present"),
      bullet(b("Gajo Livestock"), " (agritech, Google Play): own the React admin console, 79 of 85 commits. Subscription plans, AI usage quotas, and Playwright end-to-end tests in GitLab CI."),
      bullet(b("Fintech platform"), " (pre-launch, Jul – Aug 2026): built an AWS environment with CDK for 13 apps (VPC, Aurora, Valkey, ECR, three ECS clusters). All 8 services healthy at hand-over, with ADRs and runbooks."),

      role("Kola Group", "Software Developer", "Oct 2025 – Jul 2026"),
      bullet("Built payment-aggregator services for fintech clients: pay-ins, payouts, mass payments and other money-movement operations."),

      role("Hello Computing", "Junior Full-Stack Developer", "Nov 2023 – 2025"),
      bullet("Built an e-commerce store and a digital business card with QR scanning, using NestJS, Angular, Redis and SCSS."),

      role("CIA Consulting, Yaoundé", "Web Developer Intern", "May 2023 – Nov 2023"),
      bullet("First professional role: developed client web applications with Laravel and React."),

      section("Skills"),
      skill("Programming", "TypeScript, JavaScript, SQL, PHP"),
      skill("Backend", "NestJS, Fastify, Prisma, Drizzle, Redis, BullMQ, Supabase, Laravel"),
      skill("Frontend and mobile", "Next.js, React, Angular, React Native with Expo, Tailwind CSS"),
      skill("Data and cloud", "PostgreSQL, MongoDB, AWS (CDK, ECS, Aurora), Vercel, Fly.io, Firebase"),
      skill("Delivery", "GitHub Actions, GitLab CI, Playwright, Testcontainers, pgTAP"),
      skill("Payments and AI", "Stripe, PawaPay, MTN MoMo, Orange Money; OpenAI tool calling and vision"),

      skill("Spoken", "English and French, professional working proficiency"),

      section("Education"),
      role("Professional Bachelor's in Software Engineering", "University of Dschang, via IUEs/INSAM · Excellent", "2023"),
      role("HND in Software Engineering", "IUEs/INSAM · Excellent", "2022"),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(process.argv[2], buf);
  console.log("wrote", process.argv[2]);
});
