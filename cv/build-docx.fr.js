// French one-page A4 CV (same layout as build-docx.js) built only from paragraph styles, bullets and a right tab stop:
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
const plain = (...runs) =>
  new Paragraph({ style: "Skill", children: runs.map((r) => (typeof r === "string" ? new TextRun(r) : r)) });
const skill = (k, v) =>
  new Paragraph({ style: "Skill", children: [new TextRun({ text: k, bold: true }), new TextRun({ children: [new Tab(), v] })] });

const doc = new Document({
  creator: "Jospen Wolongwo",
  title: "Jospen Wolongwo · Ingénieur full-stack · CV",
  styles: {
    default: { document: { run: { font: FONT, size: 21, color: INK, language: { value: "fr-FR" } } } },
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
        paragraph: { spacing: { before: 150, after: 70 }, keepNext: true,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF", space: 3 } } } },
      { id: "Role", name: "CV Role", run: { size: 22 },
        paragraph: { spacing: { before: 105, after: 0 }, keepNext: true,
          tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }] } },
      { id: "Context", name: "CV Context", run: { size: 19, italics: true, color: GREY },
        paragraph: { spacing: { before: 10, after: 30 }, keepNext: true } },
      { id: "Bullet", name: "CV Bullet", run: { size: 21 },
        paragraph: { spacing: { before: 0, after: 40, line: 264 } } },
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
    properties: { page: { size: { width: W, height: 16838 }, margin: { top: 680, bottom: 480, left: M, right: M } } },
    children: [
      new Paragraph({ style: "Name", children: [new TextRun("Jospen Wolongwo")] }),
      new Paragraph({ style: "Headline", children: [
        new TextRun({ text: "Ingénieur produit full-stack (TypeScript)", bold: true }),
        new TextRun("  ·  Ouvert au télétravail, partout dans le monde  ·  Cameroun, UTC+1"),
      ] }),
      new Paragraph({ style: "Contact", children: [
        link("jospenwolongwo@gmail.com", "mailto:jospenwolongwo@gmail.com"), new TextRun("  ·  "),
        link("jospen.vercel.app/fr", "https://jospen.vercel.app/fr/"), new TextRun("  ·  "),
        link("github.com/JospenWolongwo", "https://github.com/JospenWolongwo"), new TextRun("  ·  "),
        link("linkedin.com/in/jospen", "https://www.linkedin.com/in/jospen/"),
      ] }),

      new Paragraph({ style: "Summary", children: [
        new TextRun("Ingénieur produit full-stack : plus de trois ans à porter des produits SaaS, de paiement et mobiles de bout en bout, de PostgreSQL et TypeScript à React Native et AWS. Équipes et clients en Allemagne, au Canada et en Belgique. Ma priorité : la fiabilité (TDD en architecture hexagonale, paiements idempotents, règles en base)."),
      ] }),

      section("Expérience"),

      role("Nexma", "Ingénieur backend, livrant du full-stack", "avr. 2026 – aujourd'hui", "https://nexma.org"),
      context([new TextRun("Équipe hybride entre le Canada et le Cameroun  ·  SaaS de gestion du travail, web et Google Play")]),
      bullet("1er contributeur sur l'API et l'application web : ", b("401 pull requests fusionnées"), " depuis avril 2026."),
      bullet("Moteur de pointage : contrats planifiés 30 jours à l'avance et replanifiés sans risque, relances idempotentes."),
      bullet("Géolocalisation respectueuse de la vie privée : zones en polygones, historique infalsifiable, 90 jours, gel juridique."),

      role("Poky Group SAS", "Cofondateur et CTO", "déc. 2024 – aujourd'hui", "https://pokygroup.com"),
      context([new TextRun("Cofondée en déc. 2024, immatriculée en SAS en août 2025. Je dirige l'ingénierie et j'écris l'essentiel du code.")]),
      bullet(b("Maison Curtis"), " (", link("maisoncurtis.com", "https://maisoncurtis.com"), ", client en Belgique) : seul ingénieur, livré en un mois. Paiements Stripe en production, doubles réservations bloquées par PostgreSQL, remboursements automatiques."),
      bullet(b("PikDrive"), " (", link("pikdrive.com", "https://pikdrive.com"), ") : seul ingénieur ; covoiturage, mobile money, versements et remboursements."),
      bullet(b("TheLouk"), " (", link("thelouk.com", "https://thelouk.com"), ", Google Play) : ingénieur mobile principal sur Expo ; notifications, temps réel, publications."),
      bullet(b("HopiMed"), " (", link("hopimed237.site", "https://hopimed237.site"), ") : seul ingénieur ; assistant IA ancré dans les données, lecture d'ordonnances."),
      bullet(b("TheLuxar"), " (préproduction) : 130 PR fusionnées, seul, en NestJS, Redis et BullMQ ; faille d'authentification corrigée."),

      role("Missions", null, "févr. 2026 – aujourd'hui"),
      bullet(b("Gajo Livestock"), " (agritech, Google Play) : a mené landing page et console d'admin ; parcours d'achat web."),
      bullet(b("Plateforme fintech"), " (avant lancement, juil. – août 2026) : AWS en CDK, 13 applications, 8/8 services en ligne."),

      role("Kola Group", "Développeur logiciel", "oct. 2025 – juil. 2026", "https://kolagroup.io"),
      bullet("Services d'agrégation de paiements pour des clients fintech : encaissements, décaissements, paiements de masse."),

      role("Hello Computing, Allemagne", "Développeur full-stack junior, à distance", "nov. 2023 – oct. 2025", "https://hellocomputing.de"),
      bullet("Boutique e-commerce et carte de visite numérique à QR code, en NestJS, Angular et Redis."),

      role("CIA Consulting, Yaoundé", "Stagiaire développeur web, Laravel et React", "mai 2023 – nov. 2023", "https://cia-service.com"),

      section("Compétences"),
      skill("Backend et données", "TypeScript, NestJS, Fastify, Prisma, Drizzle, PostgreSQL, Redis, BullMQ, Supabase"),
      skill("Web et mobile", "Next.js, React, Angular, React Native (Expo), Tailwind CSS"),
      skill("Tests", "TDD en architecture hexagonale · Jest, Vitest, Testcontainers, Playwright, pgTAP"),
      skill("Cloud et livraison", "AWS (CDK, ECS, Aurora), Vercel, Fly.io, Firebase, GitHub Actions, GitLab CI"),
      skill("Paiements et IA", "Stripe, PawaPay, MTN MoMo, Orange Money, outils et vision OpenAI"),

      section("Formation"),
      role("Licence professionnelle, Génie informatique, option Génie logiciel", null, "2023"),
      context([new TextRun("Université de Dschang, IUT Fotso Victor (IUEs/INSAM)  ·  Mention : A (Excellent)")]),
      role("Higher National Diploma (HND), Génie informatique, option Génie logiciel", null, "2022"),
      context([new TextRun("Ministère de l'Enseignement supérieur du Cameroun  ·  Mention : B+")]),
      role("Certificat professionnel IBM DevOps and Software Engineering, Coursera (en cours)", null, "2026"),

      section("Langues"),
      plain(b("Français et anglais"), " · niveau professionnel      ", b("Allemand et néerlandais"), " · notions, en apprentissage"),

      section("Centres d'intérêt"),
      plain("Fintech et inclusion financière en Afrique  ·  création de produits  ·  musculation et natation"),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(process.argv[2], buf);
  console.log("wrote", process.argv[2]);
});
