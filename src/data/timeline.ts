// Les dates de la frise. Chaque événement cite deux sources (voir sources.ts).

export type Category = 'internet' | 'web' | 'standards' | 'societe';

export const CATEGORIES: Record<Category, string> = {
  internet: 'Réseau Internet',
  web: 'Naissance du Web',
  standards: 'Standards',
  societe: 'Usages et société',
};

export type Event = {
  id: string;
  date: string;
  iso: string; // date lisible par les machines (attribut datetime)
  year: number;
  cat: Category;
  title: string;
  text: string;
  sources: [string, string];
};

export const EVENTS: Event[] = [
  {
    id: 'arpanet',
    iso: '1969-10-29',
    date: '29 octobre 1969',
    year: 1969,
    cat: 'internet',
    title: 'Premier message sur ARPANET',
    text: "Un ordinateur de l'université UCLA envoie un message à celui du Stanford Research Institute. Le premier essai fait planter l'ordinateur d'arrivée, le second fonctionne. ARPANET est l'ancêtre d'Internet.",
    sources: ['chm-1960s', 'isoc-brief'],
  },
  {
    id: 'email',
    iso: '1971',
    date: '1971',
    year: 1971,
    cat: 'internet',
    title: "Le premier e-mail en réseau et l'arobase",
    text: "L'ingénieur Ray Tomlinson envoie un message d'un ordinateur à un autre sur ARPANET. Il choisit le signe @ pour séparer le nom de la personne du nom de l'ordinateur : nom@machine.",
    sources: ['raytheon-tomlinson', 'npr-tomlinson'],
  },
  {
    id: 'tcpip',
    iso: '1983-01-01',
    date: '1er janvier 1983',
    year: 1983,
    cat: 'internet',
    title: 'ARPANET passe au TCP/IP',
    text: "Tous les ordinateurs du réseau adoptent le même protocole, TCP/IP, le même jour. C'est la langue commune qui permet encore aujourd'hui à des réseaux différents de se parler : la naissance d'Internet tel qu'on le connaît.",
    sources: ['isoc-brief', 'chm-1980s'],
  },
  {
    id: 'dns',
    iso: '1983-11',
    date: 'novembre 1983',
    year: 1983,
    cat: 'internet',
    title: 'Invention du DNS',
    text: 'Paul Mockapetris, Jon Postel et Craig Partridge conçoivent le système de noms de domaine. On peut écrire un nom au lieu de retenir une adresse en chiffres. Les premières extensions (.com, .org, .edu, .gov…) sont mises en service dans la foulée.',
    sources: ['chm-1980s', 'isoc-brief'],
  },
  {
    id: 'proposition',
    iso: '1989-03',
    date: 'mars 1989',
    year: 1989,
    cat: 'web',
    title: 'Tim Berners-Lee propose le Web',
    text: "Au CERN, près de Genève, ce chercheur britannique rédige « Information Management: A Proposal » : relier des documents entre eux par des liens, quel que soit l'ordinateur où ils sont stockés.",
    sources: ['cern-short', 'w3c-history'],
  },
  {
    id: 'premier-site',
    iso: '1990',
    date: 'fin 1990',
    year: 1990,
    cat: 'web',
    title: 'Le premier site : info.cern.ch',
    text: "Avec l'ingénieur belge Robert Cailliau, la proposition devient un projet officiel en novembre 1990. Fin 1990, le premier serveur Web et le premier navigateur tournent au CERN, sur un ordinateur NeXT.",
    sources: ['cern-short', 'w3c-history'],
  },
  {
    id: 'public',
    iso: '1991-08-06',
    date: '6 août 1991',
    year: 1991,
    cat: 'web',
    title: 'Le Web sort du CERN',
    text: "Tim Berners-Lee annonce le projet sur le forum Usenet alt.hypertext. Tout le monde peut désormais récupérer le logiciel et créer son propre serveur.",
    sources: ['w3c-history', 'cern-short'],
  },
  {
    id: 'domaine-public',
    iso: '1993-04-30',
    date: '30 avril 1993',
    year: 1993,
    cat: 'web',
    title: 'Le Web devient gratuit pour tous',
    text: "Le CERN déclare que la technologie du Web peut être utilisée par n'importe qui, sans payer de droits. Fin 1993, on compte déjà plus de 500 serveurs Web connus.",
    sources: ['cern-short', 'cern-timeline-1993'],
  },
  {
    id: 'mosaic',
    iso: '1993',
    date: '1993',
    year: 1993,
    cat: 'web',
    title: 'Mosaic popularise le Web',
    text: "Le NCSA, un centre de recherche américain, sort le navigateur graphique Mosaic, d'abord pour Unix, puis pour Windows et Mac. Le Web n'est plus réservé aux chercheurs : il gagne le grand public.",
    sources: ['w3c-history', 'cern-short'],
  },
  {
    id: 'w3c',
    iso: '1994-10',
    date: 'octobre 1994',
    year: 1994,
    cat: 'standards',
    title: 'Fondation du W3C',
    text: 'Tim Berners-Lee quitte le CERN pour le MIT, aux États-Unis, et fonde le World Wide Web Consortium. Son rôle : écrire les standards ouverts du Web.',
    sources: ['w3c-history', 'w3c-about-history'],
  },
  {
    id: 'javascript',
    iso: '1995-05',
    date: 'mai 1995',
    year: 1995,
    cat: 'standards',
    title: 'JavaScript créé en dix jours',
    text: 'Chez Netscape, Brendan Eich écrit en dix jours la première version du langage qui rend les pages interactives. Il sera ensuite standardisé par Ecma International sous le nom ECMAScript.',
    sources: ['oreilly-js'],
  },
  {
    id: 'html5',
    iso: '2014-10-28',
    date: '28 octobre 2014',
    year: 2014,
    cat: 'standards',
    title: 'HTML5 devient une recommandation du W3C',
    text: "La cinquième grande version du langage des pages Web est officiellement publiée. Vidéo et audio s'intègrent dans la page sans module externe.",
    sources: ['w3c-html5-pr'],
  },
  {
    id: 'mobile',
    iso: '2016-10',
    date: 'octobre 2016',
    year: 2016,
    cat: 'societe',
    title: "Le mobile dépasse l'ordinateur",
    text: "Pour la première fois, smartphones et tablettes représentent la majorité de l'utilisation d'Internet dans le monde : 51,3 % contre 48,7 % pour les ordinateurs.",
    sources: ['statcounter-2016', 'ctv-2016'],
  },
  {
    id: 'rgpd',
    iso: '2018-05-25',
    date: '25 mai 2018',
    year: 2018,
    cat: 'societe',
    title: "Le RGPD s'applique en Europe",
    text: "Le règlement (UE) 2016/679 protège les données personnelles des Européens. Un site doit dire quelles données il collecte, pourquoi, et permettre de les faire effacer.",
    sources: ['eurlex-rgpd', 'inami-rgpd'],
  },
  {
    id: 'chatgpt',
    iso: '2022-11-30',
    date: '30 novembre 2022',
    year: 2022,
    cat: 'societe',
    title: "ChatGPT ouvre l'ère de l'IA générative",
    text: "OpenAI met en ligne un assistant conversationnel accessible à tous dans le navigateur. Les assistants d'IA changent la façon de chercher, d'écrire et de coder.",
    sources: ['chcomputing-chatgpt', 'pressecitron-chatgpt'],
  },
  {
    id: '400-millions',
    iso: '2026-06',
    date: 'juin 2026',
    year: 2026,
    cat: 'societe',
    title: 'Plus de 400 millions de noms de domaine',
    text: "À la fin du deuxième trimestre 2026, on compte 401,6 millions de noms de domaine enregistrés dans le monde. C'est la première fois que la barre des 400 millions est franchie.",
    sources: ['verisign-q2-2026', 'dnib-q2-2026'],
  },
];
