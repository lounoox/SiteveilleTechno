// Réglages généraux du site.

export const SITE = {
  name: 'Le Web en cornet',
  tagline: 'Cinq sujets pour comprendre le Web',
  author: 'Louis Denis',
  school: 'IFOSUP · Section Web Developer',
  course: 'UE Environnement et technologies Web (5XENV)',
  year: '2026',
  consulted: '7 octobre 2026',
  // Lien du dépôt GitHub public : à remplir une fois le dépôt créé.
  repoUrl: '',
};

export type Subject = {
  n: number;
  slug: string;
  short: string;
  title: string;
  theme: string;
  question: string;
  teaser: string;
};

export const SUBJECTS: Subject[] = [
  {
    n: 1,
    slug: '/timeline-du-web/',
    short: 'Timeline',
    title: 'La timeline du Web',
    theme: 'Histoire',
    question: "D'où vient le Web ?",
    teaser: 'De 1969 à 2026, seize dates clés sur une frise à explorer, avec un quiz pour tester sa mémoire.',
  },
  {
    n: 2,
    slug: '/url/',
    short: 'URL',
    title: "L'URL, l'adresse exacte d'une page",
    theme: 'Adresses',
    question: "Comment écrire l'adresse exacte d'une page ?",
    teaser: "Un analyseur découpe n'importe quelle adresse en parties et explique le rôle de chacune.",
  },
  {
    n: 3,
    slug: '/noms-de-domaine/',
    short: 'Domaines',
    title: 'Les noms de domaine et le DNS',
    theme: 'Annuaire',
    question: 'Comment un nom devient-il une adresse IP ?',
    teaser: 'On suit une requête DNS étape par étape, puis on interroge un vrai serveur DNS.',
  },
  {
    n: 4,
    slug: '/standards/',
    short: 'Standards',
    title: 'Les standards du Web',
    theme: 'Règles communes',
    question: 'Pourquoi un site marche-t-il dans tous les navigateurs ?',
    teaser: 'On allume HTML, puis CSS, puis JavaScript sur une vraie mini-page pour voir le rôle de chacun.',
  },
  {
    n: 5,
    slug: '/securite/',
    short: 'Sécurité',
    title: 'La sécurité sur le Web',
    theme: 'Se protéger',
    question: 'Comment protéger un site et ses visiteurs ?',
    teaser: "On regarde ce qu'un espion du Wi-Fi peut lire, puis on apprend à repérer les faux liens.",
  },
];
