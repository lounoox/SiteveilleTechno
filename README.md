# Le Web en cornet

Site de veille Web réalisé par **Louis Denis** pour l'examen de l'UE *Environnement et technologies Web* (5XENV), section Web Developer, IFOSUP, octobre 2026.

Cinq sujets, une page chacun, avec une illustration, un élément interactif et des sources :

| Page | Sujet | Élément interactif |
| --- | --- | --- |
| `/timeline-du-web/` | La timeline du Web, de 1969 à 2026 | Frise filtrable + quiz « Devinez l'année » |
| `/url/` | L'URL, l'adresse exacte d'une page | Analyseur d'URL |
| `/noms-de-domaine/` | Les noms de domaine et le DNS | Requête DNS pas à pas + vrai résolveur DNS |
| `/standards/` | Les standards du Web | Mini-page à allumer : HTML, puis CSS, puis JavaScript |
| `/securite/` | La sécurité sur le Web | Espion du Wi-Fi (HTTP/HTTPS) + jeu « Repérez l'hameçon » |
| `/sources/` | Toutes les sources, les outils utilisés (dont l'IA), l'accessibilité | — |

Le fil rouge, « Le Cornet d'Or », est une friterie inventée : le domaine `lecornetdor.be` n'existe pas.

## Technique

- [Astro](https://astro.build/) 7, un générateur de site statique (SSG) : toutes les pages sont fabriquées au moment du build.
- HTML, CSS et JavaScript sans framework : chaque élément interactif est un composant Astro avec un petit script.
- Polices auto-hébergées (licence SIL OFL) : Bricolage Grotesque, Atkinson Hyperlegible, JetBrains Mono.
- Illustrations en SVG, dessinées pour le site.
- Thème clair et sombre, navigation au clavier, animations coupées si le système le demande.

Vérifications faites sur le site construit (7 octobre 2026) :

- validateur HTML du W3C : 0 erreur sur les 8 pages ;
- axe-core (WCAG 2.2 AA) : 0 violation, en thème clair et sombre ;
- Lighthouse : accessibilité, bonnes pratiques et SEO à 100 sur toutes les pages (mobile et ordinateur).

## Lancer le site sur son ordinateur

```bash
npm install
npm run dev      # site de développement sur http://localhost:4321
npm run build    # fabrique le site final dans le dossier dist/
npm run preview  # affiche le site final
```

## Mise en ligne

Le site est hébergé sur [Vercel](https://vercel.com/) : un projet importé depuis ce dépôt GitHub est reconnu automatiquement comme un projet Astro (commande `npm run build`, dossier `dist`).

## Sources et usage de l'IA

Toutes les sources sont listées dans `src/data/sources.ts` et sur la page `/sources/` du site. Chaque information est recoupée dans au moins deux sources, consultées en octobre 2026.

Le site a été construit avec l'aide d'un assistant IA (Claude, d'Anthropic, dans Claude Code) pour la recherche de sources, la structure, le code et un premier jet des textes. Le détail est dans le carnet d'usage de l'IA.
