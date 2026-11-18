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
const W = 11906, M = 960; // A4, 1.5 cm margins
const RIGHT = W - 2 * M;
const SKILL_COL = 2050; // skills values start in one column

const link = (text, url) =>
  new ExternalHyperlink({ link: url, children: [new TextRun({ text, style: "Hyperlink" })] });

const section = (t) => new Paragraph({ style: "Section", children: [new TextRun(t)] });

// "Org — Title<TAB>Dates"
// The employer name links to its website, without underline, so the line stays clean.
const role = (org, title, dates, url) =>
  new Paragraph({
    style: "Role",
    children: [
      url
        ? new ExternalHyperlink({ link: url, children: [new TextRun({ text: org, bold: true })] })
        : new TextRun({ text: org, bold: true }),
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
  new Paragraph({ style: "Skill", children: [new TextRun({ text: k, bold: true }), new TextRun({ children: [new Tab(), v] })] });

const doc = new Document({
  creator: "Jospen Wolongwo",
  title: "Jospen Wolongwo · Full-Stack Engineer · CV",
  styles: {
    default: { document: { run: { font: FONT, size: 21, color: INK } } },
    characterStyles: [
      { id: "Hyperlink", name: "Hyperlink", run: { color: INK, underline: {} } },
    ],
    paragraphStyles: [
      { id: "Name", name: "CV Name", run: { font: HEAD, size: 48, color: INK },
        paragraph: { spacing: { before: 0, after: 40 } } },
      { id: "Headline", name: "CV Headline", run: { size: 22, color: INK },
        paragraph: { spacing: { before: 0, after: 40 } } },
      { id: "Contact", name: "CV Contact", run: { size: 19, color: GREY },
        paragraph: { spacing: { before: 0, after: 0 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: INK, space: 8 } } } },
      { id: "Summary", name: "CV Summary", run: { size: 21 },
        paragraph: { spacing: { before: 170, after: 0, line: 268 } } },
      { id: "Section", name: "CV Section", run: { font: HEAD, size: 24, color: INK },
        paragraph: { spacing: { before: 210, after: 100 }, keepNext: true,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF", space: 3 } } } },
      { id: "Role", name: "CV Role", run: { size: 22 },
        paragraph: { spacing: { before: 135, after: 0 }, keepNext: true,
          tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }] } },
      { id: "Context", name: "CV Context", run: { size: 19, italics: true, color: GREY },
        paragraph: { spacing: { before: 10, after: 30 }, keepNext: true } },
      { id: "Bullet", name: "CV Bullet", run: { size: 21 },
        paragraph: { spacing: { before: 0, after: 55, line: 264 } } },
      { id: "Skill", name: "CV Skill", run: { size: 21 },
        paragraph: { spacing: { before: 0, after: 30 }, indent: { left: SKILL_COL, hanging: SKILL_COL },
          tabStops: [{ type: TabStopType.LEFT, position: SKILL_COL }] } },
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
    properties: { page: { size: { width: W, height: 16838 }, margin: { top: 760, bottom: 620, left: M, right: M } } },
    children: [
      new Paragraph({ style: "Name", children: [new TextRun("Jospen Wolongwo")] }),
      new Paragraph({ style: "Headline", children: [
        new TextRun({ text: "Full-Stack Product Engineer (TypeScript)", bold: true }),
        new TextRun("  ·  Open to remote roles worldwide  ·  Cameroon, UTC+1"),
      ] }),
      new Paragraph({ style: "Contact", children: [
        link("jospenwolongwo@gmail.com", "mailto:jospenwolongwo@gmail.com"), new TextRun("  ·  "),
        link("jospen.vercel.app", "https://jospen.vercel.app"), new TextRun("  ·  "),
        link("github.com/JospenWolongwo", "https://github.com/JospenWolongwo"), new TextRun("  ·  "),
        link("linkedin.com/in/jospen", "https://www.linkedin.com/in/jospen/"),
      ] }),

      new Paragraph({ style: "Summary", children: [
        new TextRun("Full-stack product engineer with over three years owning SaaS, payment and mobile products end to end, from PostgreSQL and TypeScript APIs to React Native releases and AWS. I have worked across borders, with teams and clients in Germany, Canada and Belgium. My focus is reliability: idempotent payments, rules enforced by the database, tested releases."),
      ] }),

      section("Experience"),

      role("Nexma", "Backend Engineer, delivering full-stack", "Apr 2026 – Present", "https://nexma.org"),
      context([new TextRun("Hybrid team across Canada and Cameroon  ·  work-management SaaS on web and Google Play")]),
      bullet("#1 contributor on the API and web app: ", b("401 merged pull requests"), " since April 2026."),
      bullet("Designed the attendance engine: contracts planned 30 days ahead and replanned safely, with idempotent retries."),
      bullet("Built privacy-aware location tracking: polygon site zones, append-only trails, 90-day retention with legal holds."),

      role("Poky Group SAS", "Co-founder and CTO", "Dec 2024 – Present", "https://pokygroup.com"),
      context([new TextRun("Co-founded in Dec 2024, incorporated as an SAS in Aug 2025. I lead engineering and write most of the code.")]),
      bullet(b("Maison Curtis"), " (", link("maisoncurtis.com", "https://maisoncurtis.com"), ", client in Belgium): sole engineer, delivered in a month. Live Stripe payments, double bookings blocked by a PostgreSQL constraint, automatic refunds."),
      bullet(b("PikDrive"), " (", link("pikdrive.com", "https://pikdrive.com"), "): sole engineer on ride-sharing with mobile-money payments, driver payouts and refunds."),
      bullet(b("TheLouk"), " (", link("thelouk.com", "https://thelouk.com"), ", Google Play): core mobile engineer on Expo: push, realtime chat, releases."),
      bullet(b("HopiMed"), " (", link("hopimed237.site", "https://hopimed237.site"), "): sole engineer; grounded AI assistant and prescription reading."),
      bullet(b("TheLuxar"), " (staging, pre-launch): 130 merged PRs, solo, on NestJS, Redis and BullMQ; fixed an auth race."),

      role("Contract work", null, "Mar 2026 – Present"),
      bullet(b("Gajo Livestock"), " (agritech, Google Play): led the landing page and admin console; built the web marketplace flow, catalogue to paid order."),
      bullet(b("Fintech platform"), " (pre-launch, Jul – Aug 2026): 13-app AWS environment in CDK, all 8 services healthy."),

      role("Kola Group", "Software Developer", "Oct 2025 – Jul 2026", "https://kolagroup.io"),
      bullet("Built payment-aggregator services for fintech clients: pay-ins, payouts and mass payments."),

      role("Hello Computing, Germany", "Junior Full-Stack Developer, remote", "Nov 2023 – Oct 2025", "https://hellocomputing.de"),
      bullet("Built an e-commerce store and a QR digital business card with NestJS, Angular and Redis."),

      role("CIA Consulting, Yaoundé", "Web Developer Intern", "May 2023 – Nov 2023", "https://cia-service.com"),
      bullet("First professional role: developed client web applications with Laravel and React."),

      section("Skills"),
      skill("Languages", "TypeScript, JavaScript, SQL, PHP  ·  English and French (professional)"),
      skill("Backend and data", "NestJS, Fastify, Prisma, Drizzle, PostgreSQL, Redis, BullMQ, Supabase, Laravel"),
      skill("Web and mobile", "Next.js, React, Angular, React Native (Expo), Tailwind CSS"),
      skill("Cloud and delivery", "AWS (CDK, ECS, Aurora), Vercel, Fly.io, Firebase, GitHub Actions, GitLab CI, Playwright"),
      skill("Payments and AI", "Stripe, PawaPay, MTN MoMo, Orange Money, OpenAI tools and vision"),

      section("Education"),
      role("Professional Bachelor's (Licence Professionnelle), Computer Engineering, Software Engineering option", null, "2023"),
      context([new TextRun("University of Dschang, Fotso Victor Institute of Technology (IUEs/INSAM)  ·  Grade: A (Excellent)")]),
      role("Higher National Diploma (HND), Computer Engineering, Software Engineering option", null, "2022"),
      context([new TextRun("Cameroon Ministry of Higher Education  ·  Grade: B+")]),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(process.argv[2], buf);
  console.log("wrote", process.argv[2]);
});
