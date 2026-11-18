// French text for the case studies. Code excerpts, diagrams and stacks are shared with
// the English version (case-studies.ts); sections are merged by position.
type SectionText = { heading: string; body: string[]; list?: string[] };
type CaseText = {
  kicker: string;
  title: string;
  org: string;
  period: string;
  role: string;
  summary: string;
  facts: { label: string; value: string }[];
  sections: SectionText[];
  stage: { label: string; detail: string };
  open: string[];
  evidence: string[];
};

export const caseStudiesFr: Record<string, CaseText> = {
  "nexma-attendance": {
    kicker: "Moteur métier · Planification · SaaS",
    title: "Un moteur de pointage qui garde 30 jours d'avance",
    org: "Nexma · Canada",
    period: "avr. 2026 – aujourd'hui",
    role: "Ingénieur backend, livrant du full-stack · 1er contributeur sur l'API et le web",
    summary:
      "Les équipes de Nexma pointent sur des contrats dont les créneaux, jours travaillés et règles changent sans cesse. J'ai construit le moteur qui garde chaque contrat inscrit planifié un mois à l'avance, replanifie sans risque à chaque changement et ne fait jamais attendre un pointage.",
    facts: [
      { label: "Mes PR fusionnées, API + web", value: "401" },
      { label: "Rang parmi les contributeurs", value: "1er sur les deux dépôts" },
      { label: "Horizon de planification", value: "30 jours" },
      { label: "En production", value: "nexma.org · Google Play" },
    ],
    sections: [
      {
        heading: "Contexte",
        body: [
          "Nexma est un SaaS de gestion du travail : organisations, postes, contrats, tâches, plannings, pointage et rapports, sur une application web et une application mobile. J'ai rejoint l'équipe comme ingénieur backend et j'ai pris en charge le pointage, la partie que les gens utilisent chaque jour de travail.",
        ],
      },
      {
        heading: "Le problème",
        body: [
          "Un pointage doit être comparé à ce que la personne devait faire ce jour-là. Calculer le planning au moment du pointage est lent et fragile. Le calculer une seule fois le rend obsolète dès qu'un manager modifie un planning, un jour travaillé ou une règle.",
        ],
      },
      {
        heading: "La conception",
        body: [
          "Une tâche d'horizon garde chaque contrat inscrit planifié 30 jours à l'avance. La planification commence demain et saute les jours déjà couverts, donc la relancer coûte peu. Quand une source de planification change, la base n'accepte qu'un planning refait depuis le premier jour couvert : la tâche republie les sources, invalide à partir de ce jour avec une révision attendue, puis replanifie.",
          "Chaque étape porte une clé d'idempotence dérivée du contrat, de sa révision et du dernier changement de source : une tâche relancée ne s'applique jamais deux fois. Un contrat en échec est journalisé et ignoré ; il n'arrête jamais les autres. La boucle laisse passer les écritures d'autorisation, pour que la planification ne bloque jamais un changement de permissions.",
        ],
      },
      {
        heading: "Ce que ça a changé pour les utilisateurs",
        body: [],
        list: [
          "Pointer sur un contrat inscrit n'attend jamais son planning.",
          "Les corrections faites sur le web s'appliquent comme des révisions du moteur : les contrats inscrits se corrigent comme les autres.",
          "La liste des pointages se pagine par curseur avec une vue en direct, au lieu de tout charger.",
          "Modifier un travail approuvé le fait réapprouver par l'éditeur, avec un seul avertissement avant d'enregistrer.",
        ],
      },
      {
        heading: "Autour du moteur",
        body: [
          "Le pointage touche à la localisation, alors j'ai traité la vie privée comme une fonctionnalité : les pointages sont vérifiés contre des zones de site dessinées en polygones, chaque session garde un historique de positions non modifiable, les positions sont supprimées après 90 jours sauf gel juridique, et toute modification d'un travail enregistré passe par un validateur indépendant. Les listes sont mises en cache dans Redis et invalidées à chaque changement de pointage, et les tableaux de bord lisent le jour ouvré de l'organisation plutôt que l'UTC.",
          "Des rôles et postes que l'on peut retirer même en usage, en déplaçant leurs titulaires, avec un audit de qui a transmis quels contrats et tâches. Des invitations groupées par e-mail avec un résultat par destinataire. Des envois de 100 Mo en streaming vers le stockage, avec des refus qui nomment la limite. Chaque refus dans l'application explique pourquoi et quoi faire ensuite.",
          "J'ai aussi écrit un contrôleur de mise en production qui fait tourner le trafic de l'API entre des emplacements vérifiés, journalise chaque phase et revient en arrière en cas d'échec, avec des migrations en ligne qui ne bloquent pas les pointages en cours. Il est en revue, pas encore en production.",
        ],
      },
    ],
    stage: {
      label: "Production",
      detail: "Le moteur de pointage est fusionné dans main et tourne sur nexma.org et l'application Google Play.",
    },
    open: ["Le contrôleur de mise en production par emplacements est encore en revue, pas fusionné dans main."],
    evidence: ["216 PR API fusionnées", "185 PR web fusionnées", "attendance-horizon.service.ts"],
  },

  "maisoncurtis-payments": {
    kicker: "Paiements · Invariants Postgres · Livraison client",
    title: "Des paiements par carte en production pour un salon en Belgique, sans double réservation",
    org: "Poky Group · client à Charleroi, Belgique",
    period: "oct. 2026 – aujourd'hui",
    role: "Seul ingénieur : base de données, Edge Functions, deux PWA, CI",
    summary:
      "Un barbier de Charleroi voulait que ses clients réservent et paient un acompte en ligne, en français, néerlandais ou anglais. J'ai conçu et livré la plateforme seul, en un mois : 52 pull requests fusionnées. Des paiements Stripe en production, une base de données qui refuse les doubles réservations, et un remboursement automatique dès qu'un client paie un créneau qu'il ne peut plus avoir.",
    facts: [
      { label: "Livré", value: "52 PR en 31 jours" },
      { label: "Assertions pgTAP", value: "396" },
      { label: "Tests E2E + unitaires", value: "89 + 178" },
      { label: "Paiements", value: "Stripe en production" },
    ],
    sections: [
      {
        heading: "Contexte",
        body: [
          "Maison Curtis est le premier client d'une plateforme de réservation en marque blanche que j'ai construite pour les barbiers : un site public et une PWA client, une PWA Console pour le barbier, et tout ce qui est propre à la marque gardé dans les données. Le client est en Belgique : cartes et Bancontact via Stripe, trois langues, et des fonctions hébergées à Paris.",
        ],
      },
      {
        heading: "Le problème",
        body: [
          "Deux clients peuvent choisir le même fauteuil à la même minute. Un paiement peut réussir après l'expiration de la réservation provisoire. Stripe renvoie ses webhooks et peut les livrer dans le désordre. Si l'on gère tout cela uniquement dans le code de l'application, on finit avec deux personnes sur un fauteuil ou un client débité pour rien.",
        ],
      },
      {
        heading: "La conception",
        body: [
          "La règle vit dans PostgreSQL, pas dans l'application : une contrainte d'exclusion rend impossibles deux réservations actives qui se chevauchent pour un même barbier, quel que soit le code qui les écrit. Choisir un horaire crée une réservation provisoire courte ; seul le webhook signé de Stripe peut la confirmer.",
          "Chaque événement de webhook est enregistré par identifiant dans la transaction même qui l'applique : le rejouer ne change rien. Si un paiement réussit après la perte de la réservation provisoire, la réservation est remboursée automatiquement ; les remboursements partent via un worker avec une clé d'idempotence par remboursement, donc une nouvelle tentative ne rembourse jamais deux fois.",
        ],
      },
      {
        heading: "Preuves",
        body: [],
        list: [
          "396 assertions pgTAP sur la base : pas de double réservation, sécurité au niveau des lignes, réservations provisoires et paiements, ordre des webhooks, tâches planifiées.",
          "Une matrice de cartes en mode test Stripe : refus générique, fonds insuffisants, carte perdue, volée, expirée, CVC erroné, erreur de traitement, 3-D Secure refusé. Chaque cas garde la réservation et ne débite rien.",
          "Charge et concurrence : 20 clients sur un même horaire obtiennent une seule réservation ; le même webhook envoyé 10 fois en même temps ne confirme qu'une fois ; 40 paiements simultanés passent tous.",
          "Ce test a révélé un vrai problème : Stripe limitait 12 requêtes sur 40. Les appels sans risque sont désormais relancés sur 429 et 5xx, et 40 sur 40 passent.",
        ],
      },
      {
        heading: "Ce que le client a reçu",
        body: [],
        list: [
          "La réservation en ligne avec acompte en production, le report jusqu'à 24 heures avant, et le remboursement automatique quand le salon annule.",
          "Une Console pour le barbier avec connexion par code e-mail et TOTP obligatoire pour le propriétaire, agenda, équipe et horaires.",
          "Notifications push et e-mail, PWA tolérantes au hors-ligne, sauvegardes chiffrées de la base chaque nuit.",
          "Des pages publiques tenues à un budget LCP de 2 secondes, vérifiées avec Lighthouse et axe dans la CI à chaque changement.",
        ],
      },
    ],
    stage: {
      label: "Production",
      detail: "En ligne sur maisoncurtis.com avec de vrais paiements Stripe. Les tests de charge ont tourné en mode test Stripe, sur le même code et le même formulaire.",
    },
    open: [
      "Le script de charge et de concurrence tourne en local avant chaque version des paiements, pas à chaque passage de la CI.",
      "Les volumes de réservation et le chiffre d'affaires appartiennent au client et ne sont pas publiés ici.",
    ],
    evidence: ["PR #31 · webhook Stripe et remboursements", "PR #47 · test de charge des paiements", "52 PR fusionnées"],
  },

  "theluxar-auth-race": {
    kicker: "Débogage · Authentification · Fintech",
    title: "Le test instable qui aurait déconnecté des clients",
    org: "Poky Group",
    period: "sept. 2026 – aujourd'hui",
    role: "Seul ingénieur : backend, trois frontends, CI",
    summary:
      "Un test de bout en bout échouait de temps en temps. En remontant la piste, j'ai vu qu'une navigation rapide pouvait pousser le serveur à révoquer la session d'un client légitime. TheLuxar n'est pas encore lancé : le problème a été attrapé en test, avant qu'un client ne le rencontre. Je l'ai corrigé avec une fenêtre de grâce qui accepte exactement un jeton précédent, pendant dix secondes, sans affaiblir la protection contre le vol.",
    facts: [
      { label: "Mes PR fusionnées, seul", value: "130" },
      { label: "Modules backend", value: "15" },
      { label: "Tests unitaires après correctif", value: "1 295 / 1 295" },
      { label: "Tests E2E après correctif", value: "598 / 598, lancés deux fois" },
    ],
    sections: [
      {
        heading: "Contexte",
        body: [
          "TheLuxar est une plateforme de commerce, de livraison et de finance pour le Cameroun : une boutique Next.js, une console d'administration et une application livreur Expo, sur un backend NestJS hexagonal. J'en suis le seul ingénieur.",
          "Les sessions clients utilisent la rotation des jetons de rafraîchissement : chaque rafraîchissement émet un nouveau jeton, et rejouer un jeton déjà utilisé est traité comme un vol, donc toute la famille de sessions est révoquée.",
        ],
      },
      {
        heading: "Le symptôme",
        body: [
          "Un test de bout en bout de la boutique échouait par intermittence. Sur une deuxième commande dans la même session, le bouton « Continuer » du paiement n'apparaissait jamais. La solution facile était de marquer le test comme instable et de le relancer. J'ai préféré remonter la piste.",
        ],
      },
      {
        heading: "La vraie cause",
        body: [
          "La boutique rafraîchit la session à chaque chargement complet de page. Quand un client navigue pendant que la requête de rafraîchissement de la page précédente est encore en cours, le navigateur l'annule. Mais le serveur a peut-être déjà fait tourner le jeton. Le navigateur ne reçoit jamais le nouveau ; son rafraîchissement suivant présente donc l'ancien, ce qui ressemble exactement au rejeu d'un jeton volé. Le serveur révoque la famille et un client légitime est déconnecté.",
        ],
      },
      {
        heading: "La décision",
        body: [
          "Désactiver la détection de réutilisation supprimerait la protection qui justifie la rotation. Corriger uniquement côté client ne servirait à rien, car l'annulation se produit pendant la navigation, hors du contrôle de l'application.",
          "La famille de sessions retient donc l'empreinte du jeton qu'elle vient de remplacer, et le moment du remplacement. Présenter exactement ce jeton dans les 10 secondes réussit et fait tourner à nouveau. Un jeton vieux de deux générations reste refusé et révoque toujours la famille. La grâce couvre une génération, rien de plus. Les sessions déjà stockées dans Redis restent valides et gagnent le champ à leur prochaine rotation.",
        ],
      },
      {
        heading: "Preuves",
        body: [],
        list: [
          "Tests unitaires pour la grâce réussie, le refus d'un jeton vieux de deux générations, la grâce face à une famille déjà révoquée, et la limite exacte des 10 secondes.",
          "Vérifié par mutation : j'ai retiré le contrôle de grâce, confirmé que le nouveau test échoue pour la bonne raison, puis je l'ai remis.",
          "E2E contre un vrai Redis en HTTP : un rejeu immédiat réussit, un rejeu périmé est refusé et la famille est révoquée.",
          "Suite unitaire complète 1 295/1 295 et suite e2e 598/598, chacune lancée deux fois pour écarter l'instabilité.",
        ],
      },
      {
        heading: "Deux autres exemples du même code",
        body: [
          "Limitation de débit (PR #52). Le limiteur global gardait ses compteurs dans la mémoire de chaque instance. La préproduction tourne sur deux machines Fly ou plus, donc le plafond réel était environ le double des 100 requêtes par minute annoncées, et il se remettait à zéro à chaque déploiement. Je l'ai déplacé sur la connexion Redis partagée. Un nouveau test e2e démarre deux instances sur un même Redis et prouve qu'épuiser le plafond sur l'une fait refuser à l'autre sa toute première requête. Il laisse passer en cas de panne, volontairement, car c'est un garde-fou contre l'inondation ; l'OTP et les envois de fichiers gardent leurs propres limites, plus strictes.",
          "Le travail de plateforme autour, aussi de moi : connexion par téléphone avec limites anti-pompage des OTP (une fraude SMS connue), connexion Google liée à une identité téléphonique, TOTP obligatoire pour les administrateurs, une chaîne média sur Cloudflare R2, Images et Stream, une recherche Meilisearch avec cache du catalogue dans Redis et ETags, Sentry et Axiom avec masquage des secrets, et une règle de lint qui empêche un module de lire les tables d'un autre.",
          "Paiements (PR #54). Un domaine de paiement indépendant du fournisseur, avec un connecteur pawaPay pour MTN MoMo et Orange Money, vérifié contre le vrai bac à sable pawaPay : succès, chaque motif d'échec documenté, un paiement bloqué sans rappel, et l'expiration du rapprochement au bout de 15 minutes. Les motifs d'échec reviennent sous forme de codes stables, jamais de texte du fournisseur, pour que les applications puissent les traduire. 630 tests répartis en 68 suites passent en local.",
        ],
      },
    ],
    stage: {
      label: "Préproduction · avant lancement",
      detail: "Reproduit et corrigé dans les suites de tests locales et de CI. TheLuxar n'a pas encore de trafic en production.",
    },
    open: [
      "TheLuxar n'est pas encore lancé ; il tourne en préproduction sur Fly.io.",
      "La limitation partagée doit encore être vérifiée en direct sur deux machines de préproduction (point ouvert dans la PR #52).",
    ],
    evidence: ["PR #51 · fenêtre de grâce", "PR #52 · limitation Redis", "PR #54 · paiements"],
  },

  "pikdrive-idempotency": {
    kicker: "Paiements · Réseaux mobiles · Postgres",
    title: "Un appui, une réservation, même quand la connexion coupe",
    org: "Poky Group",
    period: "janv. 2025 – aujourd'hui",
    role: "Seul ingénieur",
    summary:
      "Les passagers de PikDrive réservent des places et paient en mobile money, souvent sur des réseaux instables. Une requête relancée ne doit jamais réserver deux fois. J'ai rendu la création de réservation idempotente au niveau de la base de données, sans réécrire la logique de places dont dépendait déjà l'application web.",
    facts: [
      { label: "Commits", value: "~540, seul" },
      { label: "Tests de contrat", value: "57 réussis" },
      { label: "Opérateurs de paiement", value: "3, routés automatiquement" },
      { label: "En production", value: "pikdrive.com" },
    ],
    sections: [
      {
        heading: "Contexte",
        body: [
          "PikDrive met en relation chauffeurs et passagers. La plateforme gère le paiement mobile money avec choix automatique de l'opérateur, le versement aux chauffeurs après vérification d'un code, les remboursements partiels quand des places sont retirées, les règles d'absence, les avis dans les deux sens, et les notifications OneSignal et WhatsApp. Je la construis seul depuis janvier 2025.",
        ],
      },
      {
        heading: "Le problème",
        body: [
          "Un client natif relance quand le réseau coupe, et une file hors-ligne rejoue les requêtes plus tard. Sans protection, le même appui pouvait réserver des places deux fois et les faire payer deux fois.",
        ],
      },
      {
        heading: "La conception",
        body: [
          "POST /api/bookings exige désormais un Idempotency-Key, et les clients gardent la même clé dans leurs chemins de relance web et hors-ligne. En base, un index unique partiel rend une clé unique par passager. Une fonction d'enveloppe prend un verrou consultatif limité à la transaction pour ce passager et ce trajet, renvoie la réservation existante si la clé a déjà servi pour la même requête, la refuse si elle a servi pour une autre, et sinon appelle la logique de places existante sans la modifier.",
        ],
      },
      {
        heading: "Preuves",
        body: [],
        list: [
          "Tests de contrat de la route : non autorisé, clé manquante, transmission stable de la clé, clé réutilisée pour une autre requête.",
          "57 tests réussis, lint et typecheck propres.",
          "Migration testée à blanc, puis appliquée à la base de développement, avec un historique de migrations identique en local et en dev.",
          "API mobile v1 documentée : transport, authentification, relances et contrat des points d'accès.",
        ],
      },
    ],
    stage: {
      label: "Base de développement",
      detail: "Le code est fusionné dans la branche develop. La migration tourne sur la base de développement ; la recette et la production n'ont volontairement pas encore été modifiées.",
    },
    open: [
      "La migration d'idempotence est sur la base de développement ; la recette et la production n'ont volontairement pas encore été modifiées.",
      "Le reste des points d'accès versionnés (paiements, messagerie, chauffeur) a encore besoin des mêmes tests de contrat.",
    ],
    evidence: ["PR #20 · réservation idempotente"],
  },
};
