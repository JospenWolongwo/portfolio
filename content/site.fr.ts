// French content. Only text is translated here; URLs, stacks, screenshots and statuses
// come from site.ts, so the two languages can never disagree on facts.
import { experience as experienceEn, principles as principlesEn, products as productsEn, profile as profileEn } from "./site";
import type { Product, Role } from "./site";

export const profile = {
  ...profileEn,
  role: "Ingénieur produit full-stack",
  headline: "Je livre des produits que les gens utilisent, et je les fais tourner.",
  intro:
    "Ingénieur TypeScript qui prend en charge les produits de bout en bout : modèle de données, API, clients web et mobile, CI et cloud. Depuis 2023, je travaille au-delà des frontières : à distance pour une entreprise en Allemagne, dans une équipe répartie entre le Canada et le Cameroun, et pour un client en Belgique. J'ai cofondé Poky Group. Ma spécialité : des systèmes qui restent justes en production, des paiements au temps réel, en passant par les versions mobiles et AWS.",
  location: "Cameroun · UTC+1",
  availability: "Ouvert aux postes à distance, partout dans le monde",
  cv: "/Jospen-Wolongwo-CV-FR.pdf" as string | null,
};

const productText: Record<string, Pick<Product, "org" | "what" | "role"> & { metric?: string }> = {
  nexma: {
    org: "Nexma · Canada",
    what: "SaaS de gestion du travail : équipes, contrats, plannings, pointage, rapports.",
    role: "1er contributeur sur l'API et le web (401 PR fusionnées) · responsable du moteur de pointage",
    metric: "Pointages enregistrés",
  },
  pikdrive: {
    org: "Poky Group",
    what: "Covoiturage avec paiement mobile money, versements aux chauffeurs et remboursements.",
    role: "Seul ingénieur depuis janv. 2025",
    metric: "Trajets réservés",
  },
  thelouk: {
    org: "Poky Group",
    what: "Application sociale pour se rencontrer lors d'événements : salons, likes, messagerie.",
    role: "Ingénieur mobile principal · notifications, temps réel, publications",
    metric: "Installations",
  },
  maisoncurtis: {
    org: "Poky Group",
    what: "Réservation en marque blanche pour barbiers : PWA client, console du barbier, acomptes Stripe en production et remboursements automatiques.",
    role: "Seul ingénieur · paiements Stripe en production, webhook, remboursements",
    metric: "Rendez-vous réservés",
  },
  hopimed: {
    org: "Poky Group",
    what: "Pharmacies et hôpitaux de garde, avec un assistant IA qui lit les ordonnances.",
    role: "Seul ingénieur · a conçu les fonctionnalités IA",
    metric: "Pharmacies référencées",
  },
  gajo: {
    org: "Gajo Livestock · mission",
    what: "Marketplace agritech : bétail, services vétérinaires, crédit agricole.",
    role: "A mené la landing page et la console d'administration ; a construit le parcours d'achat web, du catalogue à la commande payée",
  },
  theluxar: {
    org: "Poky Group",
    what: "Plateforme de commerce, de livraison et de finance : boutique, console d'administration, application livreur.",
    role: "Seul ingénieur · 130 PR fusionnées, backend et frontends",
  },
  "fintech-aws": {
    org: "Mission · avant lancement",
    what: "Environnement AWS indépendant pour une plateforme fintech de 13 applications, construit avec CDK.",
    role: "Ingénieur cloud · 8 services sur 8 opérationnels",
  },
};

export const products: Product[] = productsEn.map((p) => {
  const t = productText[p.slug];
  if (!t) return p;
  return {
    ...p,
    org: t.org,
    what: t.what,
    role: t.role,
    metric: p.metric ? { ...p.metric, label: t.metric ?? p.metric.label } : undefined,
    name: p.slug === "fintech-aws" ? "Plateforme fintech sur AWS" : p.name,
  };
});

const roleText: Record<string, Omit<Role, "url">> = {
  "Poky Group SAS": {
    org: "Poky Group SAS",
    title: "Cofondateur & CTO",
    period: "déc. 2024 – aujourd'hui",
    note: "Projet lancé en déc. 2024 ; société Poky Group SAS immatriculée en août 2025.",
    points: [
      "Je dirige l'ingénierie de cinq produits : PikDrive, TheLouk, HopiMed, Maison Curtis et TheLuxar. Seul ingénieur sur quatre d'entre eux, dont Maison Curtis pour un client en Belgique, livré en un mois.",
      "Paiements de bout en bout : mobile money (PawaPay, MTN MoMo, Orange Money) avec versements et rapprochement sur PikDrive, et acomptes Stripe en production avec webhook signé et remboursements automatiques sur Maison Curtis.",
      "J'ai fixé le niveau d'exigence des mises en production : contrôles CI sur les migrations, publications Play Store via EAS, mises à jour OTA bloquées dès que le code natif change.",
    ],
  },
  "Nexma · Canada · hybrid, distributed team": {
    org: "Nexma · Canada · équipe hybride et répartie",
    title: "Ingénieur backend (livrant du full-stack)",
    period: "avr. 2026 – aujourd'hui",
    points: [
      "1er contributeur sur l'API et l'application web : 401 pull requests fusionnées (216 API, 185 web) depuis avril 2026.",
      "Responsable du moteur de pointage : contrats planifiés 30 jours à l'avance, corrections appliquées comme révisions du moteur, vues paginées par curseur et mises à jour en direct.",
      "Pointage géolocalisé conçu pour la vie privée : zones de site en polygones, historique de positions non modifiable, conservation de 90 jours avec gel juridique, validation indépendante de chaque modification.",
      "Rôles et postes avec passations auditées, invitations groupées et envois de fichiers de 100 Mo en streaming.",
    ],
  },
  "Gajo Livestock": {
    org: "Gajo Livestock",
    title: "Ingénieur frontend · mission",
    period: "mars 2026 – aujourd'hui",
    points: [
      "Parcours d'achat de l'application web : accueil, catalogue et fiches produit, panier, validation de commande, enregistrement du paiement, commandes et livraison, formules d'abonnement.",
      "Responsable de la landing page (environ 70 % du code) et de la console d'administration React 19 (95 % des commits) : abonnements, suivi des quotas IA par utilisateur, crédit et statistiques.",
      "Tests de bout en bout Playwright et contrôles de mise en production dans GitLab CI, avec déploiements Firebase par environnement.",
    ],
  },
  "Fintech platform (pre-launch)": {
    org: "Plateforme fintech (avant lancement)",
    title: "Ingénieur cloud · mission",
    period: "juil. – août 2026",
    points: [
      "Mise en place d'un environnement AWS indépendant avec CDK : VPC, Aurora, Valkey, S3, ECR et trois clusters ECS derrière HTTPS. 8 services sur 8 opérationnels.",
      "Documentation pour l'ingénieur suivant : ADR, registre des risques daté, runbooks et garde-fou de facturation.",
    ],
  },
  "Kola Group": {
    org: "Kola Group",
    title: "Développeur logiciel",
    period: "oct. 2025 – juil. 2026",
    points: ["Services d'agrégation de paiements pour des clients fintech : encaissements, décaissements, paiements de masse et autres mouvements de fonds."],
  },
  "Hello Computing · Germany (remote)": {
    org: "Hello Computing · Allemagne (à distance)",
    title: "Développeur full-stack junior",
    period: "nov. 2023 – oct. 2025",
    points: ["Boutique e-commerce et carte de visite numérique avec scan QR, en NestJS, Angular, Redis et SCSS."],
  },
  "CIA Consulting · Yaoundé": {
    org: "CIA Consulting · Yaoundé",
    title: "Stagiaire développeur web",
    period: "mai – nov. 2023",
    points: ["Premier poste : développement d'applications web pour des clients, en Laravel et React."],
  },
};

export const experience: Role[] = experienceEn.map((r) => {
  const t = roleText[r.org];
  return t ? { ...t, url: r.url } : r;
});

const principleText = [
  {
    title: "Une nouvelle tentative doit être sans risque.",
    body: "Les réseaux mobiles perdent des requêtes. Une réservation ou un paiement envoyé deux fois doit quand même n'avoir lieu qu'une fois.",
    proof: "PikDrive · réservations idempotentes",
  },
  {
    title: "Trouver la vraie cause, puis corriger au plus juste.",
    body: "Un test instable en préproduction a révélé une concurrence sur les jetons qui aurait déconnecté des clients. Le correctif accepte une seule génération de jeton, pendant dix secondes.",
    proof: "TheLuxar · PR #51",
  },
  {
    title: "Dire ce qui n'est pas encore vérifié.",
    body: "Mes pull requests distinguent ce qui a été testé en local, ce qui a tourné en bac à sable et ce qui reste à valider en préproduction.",
    proof: "TheLuxar · PR #52",
  },
  {
    title: "L'écrire pour l'ingénieur suivant.",
    body: "ADR, runbooks et registres de risques datés, pour qu'un système survive à la personne qui l'a construit.",
    proof: "Mission AWS · 11 domaines de préparation",
  },
];

export const principles = principlesEn.map((p, i) => ({
  ...p,
  ...principleText[i],
  href: p.href ? `/fr${p.href}` : null,
}));
