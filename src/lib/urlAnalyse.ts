// Analyse d'une URL avec l'outil URL standard (disponible dans le navigateur et dans Node).

type Part = { key: string; name: string; value: string; what: string; absent?: boolean; cls: string };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const DEFAULT_PORTS: Record<string, string> = { 'http:': '80', 'https:': '443', 'ftp:': '21', 'ws:': '80', 'wss:': '443' };

export function analyse(raw: string) {
  let input = raw.trim();
  let note = '';
  if (!input) return { error: 'Le champ est vide. Tapez une adresse, par exemple https://www.lecornetdor.be/menu/.' };
  let url: URL;
  try {
    url = new URL(input);
    if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(input) && url.protocol !== 'mailto:') throw new Error('sans //');
  } catch {
    try {
      url = new URL('https://' + input);
      input = 'https://' + input;
      note = 'Il manquait le schéma : comme la barre d’adresse de votre navigateur, l’analyseur a ajouté https:// devant.';
    } catch {
      return { error: 'Ce texte n’est pas une URL valide. Une URL complète commence par un schéma, par exemple https://, suivi d’un nom de domaine.' };
    }
  }

  const hostname = url.hostname;
  const isIp = /^[\d.]+$/.test(hostname) || hostname.includes(':') || hostname.startsWith('[');
  const isWeb = /^(https?|ftp|wss?):$/.test(url.protocol);
  if (isWeb && !isIp && hostname !== 'localhost' && (!hostname.includes('.') || /%|\s/.test(hostname))) {
    return { error: 'Ce texte n’est pas une URL valide : le nom de domaine ne peut contenir ni espace ni accent non encodé, et il lui faut une extension, comme .be ou .com.' };
  }
  const labels = hostname.split('.');
  const sub = !isIp && labels.length > 2 ? labels.slice(0, -2).join('.') : '';
  const domain = sub ? labels.slice(-2).join('.') : hostname;
  const defaultPort = DEFAULT_PORTS[url.protocol];
  // L'outil URL efface le port quand c'est celui par défaut : on le retrouve dans le texte tapé.
  const typedPort = input.match(/^[a-z][a-z0-9+.-]*:\/\/(?:[^/?#@]*@)?(?:\[[^\]]*\]|[^/?#:]*):(\d+)/i)?.[1];
  const port = url.port || typedPort || '';
  const params = [...url.searchParams.entries()];

  const parts: Part[] = [
    {
      key: 'scheme', cls: 'scheme', name: 'Schéma (protocole)', value: url.protocol + '//',
      what: url.protocol === 'https:' ? 'Comment demander la page : HTTPS, la version chiffrée de HTTP.' : url.protocol === 'http:' ? 'Comment demander la page : HTTP, sans chiffrement. Les données circulent en clair.' : `Le protocole à utiliser : ${url.protocol.replace(':', '')}.`,
    },
    ...(sub ? [{ key: 'sub', cls: 'sub', name: 'Sous-domaine', value: sub + '.', what: 'Une partie du domaine, choisie par son propriétaire (www est le plus courant).' }] : []),
    {
      key: 'host', cls: 'host', name: isIp ? 'Adresse IP' : 'Nom de domaine', value: domain,
      what: isIp ? 'Le serveur est désigné directement par son adresse en chiffres.' : hostname === 'localhost' ? 'localhost désigne votre propre ordinateur : le site tourne en local, pas sur Internet.' : 'Chez qui : le serveur qui héberge la page. Le DNS le traduit en adresse IP (sujet 3).',
    },
    port
      ? { key: 'port', cls: 'port', name: 'Port', value: ':' + port, what: port === defaultPort ?`La porte d’entrée du serveur. Ici c’est la porte par défaut de ${url.protocol.replace(':', '').toUpperCase()} : on pourrait ne pas l’écrire.` : 'La porte d’entrée du serveur. Ce n’est pas la porte par défaut, il faut donc l’écrire.' }
      : { key: 'port', cls: 'port', name: 'Port', value: defaultPort ? `(${defaultPort})` : '(aucun)', absent: true, what: defaultPort ? `Pas écrit : le navigateur utilise la porte par défaut, ${defaultPort} pour ${url.protocol.replace(':', '').toUpperCase()}.` : 'Pas de port précisé.' },
    {
      key: 'path', cls: 'path', name: 'Chemin', value: url.pathname || '/',
      what: url.pathname && url.pathname !== '/' ? 'Quoi : la ressource demandée sur le serveur, comme un dossier puis un fichier.' : 'Juste « / » : la page d’accueil du site.',
    },
    params.length
      ? { key: 'query', cls: 'query', name: `Paramètres (${params.length})`, value: url.search, what: 'Des précisions envoyées au serveur, en paires clé=valeur séparées par &.' }
      : { key: 'query', cls: 'query', name: 'Paramètres', value: '(aucun)', absent: true, what: 'Pas de précisions : rien après un point d’interrogation.' },
    url.hash
      ? { key: 'hash', cls: 'hash', name: 'Ancre (fragment)', value: url.hash, what: 'Où dans la page : le navigateur fait défiler jusqu’à cet endroit. Cette partie n’est jamais envoyée au serveur.' }
      : { key: 'hash', cls: 'hash', name: 'Ancre', value: '(aucune)', absent: true, what: 'Pas d’ancre : la page s’ouvre en haut.' },
  ];

  const encoded = url.href !== input && /%[0-9A-F]{2}/i.test(url.href) && !/%[0-9A-F]{2}/i.test(input);
  return { url, parts, params, note, encoded, input };
}

// Construit le HTML du résultat. Utilisé au build (premier affichage) et dans le navigateur.
export function resultHtml(raw: string): string {
  const r = analyse(raw);
  if ('error' in r && r.error) {
    return `<p class="urllab__error" role="alert"><strong>Oups.</strong> ${esc(r.error)}</p>`;
  }
  const { url, parts, params, note, encoded } = r as Exclude<ReturnType<typeof analyse>, { error: string }>;
  const shown = parts.filter((p) => !p.absent);
  const big = shown.map((p, i) => `<span class="seg seg--${p.cls}">${esc(p.value)}<sup aria-hidden="true">${i + 1}</sup></span>`).join('');
  const list = parts
    .map((p) => {
      const n = shown.indexOf(p) + 1;
      const extra = p.key === 'query' && params.length ? `<ul class="urllab__params">${params.map(([k, v]) => `<li><b>${esc(k)}</b> = ${esc(v || '(vide)')}</li>`).join('')}</ul>` : '';
      return `<li class="${p.absent ? 'is-absent' : ''}"><span class="name">${n ? n + ' · ' : ''}${esc(p.name)}</span><code class="val seg seg--${p.cls}">${esc(p.value)}</code><span class="what">${esc(p.what)}</span>${extra}</li>`;
    })
    .join('');
  const path = url.pathname + url.search;
  const request = url.protocol.startsWith('http')
    ? `<div class="urllab__request"><p class="kicker">Ce que le navigateur envoie au serveur</p><pre>GET ${esc(path)} HTTP/1.1\nHost: ${esc(url.host)}</pre><p>${url.hash ? `L’ancre <strong>${esc(url.hash)}</strong> n’apparaît pas : elle reste dans le navigateur.` : 'Le nom de domaine sert d’adresse ; le chemin et les paramètres disent quelle ressource on veut.'}</p></div>`
    : '';
  return `
    ${note ? `<p class="urllab__note">${esc(note)}</p>` : ''}
    ${encoded ? `<p class="urllab__note">Les espaces et les accents ne sont pas permis tels quels dans une URL : le navigateur les a encodés (l’espace devient %20, « é » devient %C3%A9).</p>` : ''}
    <p class="visually-hidden">Analyse terminée : ${shown.length} parties trouvées dans ${esc(url.href)}.</p>
    <p class="urllab__big" aria-hidden="true">${big}</p>
    <ol class="urllab__parts">${list}</ol>
    ${request}`;
}
