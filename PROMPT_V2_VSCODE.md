# 🎯 PROMPT V2 — collegelouisemichel.net
# Corrections restantes — À copier dans Claude VS Code

---

Tu es un expert fullstack spécialisé en **Astro, Tailwind CSS et SEO**.
Je suis enseignant au Collège Louise Michel à Paris.
Mon site est **collegelouisemichel.net** (Astro + Tailwind, déployé sur Netlify).

## ⚠️ IMPORTANT — Ce qui est DÉJÀ FAIT (ne pas toucher)
- Hero animé avec dégradé et tagline "Découvre, comprends, crée 🚀"
- Couleurs par niveau (bleu 5ème, vert 4ème, orange 3ème)
- Icônes emoji sur les cartes de séquences + barres de progression X/Y
- Quiz QCM sur la page d'accueil et la page Brevet
- Barre de recherche globale dans le header
- Page /materiel-recommande avec liens Amazon affiliés (tag=kennymac-21)
- Schema.org EducationalOrganization + WebSite dans le Layout
- Glossaire /glossaire avec 16 termes
- Meta descriptions uniques sur les pages principales
- Footer avec Politique de confidentialité + liens de soutien

## 📋 MISSION — Corriger ce qui manque encore

Lis tout ce document, résume chaque tâche en une ligne,
puis attends mon **"GO"** avant de commencer.
Après chaque tâche, fais `npm run build` et montre-moi le résultat.

---

## 🔴 TÂCHE 1 — Balise Canonical (CRITIQUE — absente sur toutes les pages)

**Fichier :** `src/layouts/Layout.astro`

Dans le `<head>`, cherche s'il existe déjà une balise `<link rel="canonical">`.
Si elle est absente, ajoute-la juste après les balises `<meta>` existantes :

```astro
---
// En haut du fichier, récupère l'URL canonique
const canonicalURL = new URL(Astro.url.pathname, "https://collegelouisemichel.net");
---

<!-- Dans le <head> -->
<link rel="canonical" href={canonicalURL.href} />
```

Vérifie ensuite que le canonical s'affiche correctement sur :
- La page d'accueil → doit afficher `https://collegelouisemichel.net/`
- Une page de cours → doit afficher l'URL complète sans `www`

---

## 🔴 TÂCHE 2 — Redirection 301 (.com → .net)

**Fichier :** `netlify.toml`

Ouvre le fichier et vérifie s'il contient déjà des redirections de
`collegelouisemichel.com` vers `collegelouisemichel.net`.

Si ces redirections sont absentes, ajoute-les à la fin du fichier :

```toml
[[redirects]]
  from = "https://collegelouisemichel.com/*"
  to   = "https://collegelouisemichel.net/:splat"
  status = 301
  force  = true

[[redirects]]
  from = "https://www.collegelouisemichel.com/*"
  to   = "https://collegelouisemichel.net/:splat"
  status = 301
  force  = true
```

Si elles existent déjà, indique-moi ce qui est déjà écrit.

---

## 🟠 TÂCHE 3 — Compteur de jours avant le Brevet (page 3ème)

**Fichier :** `src/pages/3eme/index.astro` (ou le fichier de la page 3ème)

Cherche si un compteur de jours existe déjà sur cette page.
Si absent, ajoute cette bannière **en tout premier**, avant tout autre contenu :

```astro
<!-- Compteur Brevet -->
<div class="bg-orange-500 text-white rounded-xl p-4 mb-8 text-center shadow-md">
  <p class="text-xl font-bold">
    ⏳ Brevet dans <span id="brevet-days" class="text-3xl">...</span> jours
  </p>
  <p class="text-sm mt-1 opacity-90">
    Commence à réviser maintenant — chaque jour compte !
  </p>
  <a href="/3eme/brevet/"
     class="inline-block mt-3 bg-white text-orange-600 font-semibold
            px-4 py-2 rounded-lg hover:bg-orange-50 transition text-sm">
    📚 Accéder aux sujets corrigés →
  </a>
</div>

<script>
  const brevetDate = new Date('2025-06-27T08:00:00');
  function updateCountdown() {
    const now = new Date();
    const diff = Math.ceil((brevetDate - now) / (1000 * 60 * 60 * 24));
    const el = document.getElementById('brevet-days');
    if (el) {
      el.textContent = diff > 0 ? diff : '0 — C\'est aujourd\'hui !';
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 60000);
</script>
```

---

## 🟠 TÂCHE 4 — Sélecteur de profil (page d'accueil)

**Fichier :** `src/pages/index.astro`

Vérifie si une section "Je suis..." existe déjà sur la page d'accueil.
Si elle est absente, ajoute-la **juste après le hero section** :

```astro
<!-- Sélecteur de profil -->
<section class="py-8 px-4 max-w-2xl mx-auto text-center">
  <p class="text-gray-500 text-sm uppercase tracking-wider mb-4 font-medium">
    Bienvenue ! Tu es...
  </p>
  <div class="flex flex-wrap gap-3 justify-center" id="profile-selector">
    <button
      data-profile="eleve"
      data-target="#niveaux"
      class="profile-btn px-6 py-3 rounded-full border-2 border-blue-400
             text-blue-700 font-semibold hover:bg-blue-50 transition text-lg">
      👦 Élève
    </button>
    <button
      data-profile="parent"
      data-target="#ressources"
      class="profile-btn px-6 py-3 rounded-full border-2 border-green-400
             text-green-700 font-semibold hover:bg-green-50 transition text-lg">
      👨‍👩‍👧 Parent
    </button>
    <button
      data-profile="enseignant"
      data-target="#methodologie"
      class="profile-btn px-6 py-3 rounded-full border-2 border-purple-400
             text-purple-700 font-semibold hover:bg-purple-50 transition text-lg">
      👩‍🏫 Enseignant
    </button>
  </div>
</section>

<script>
  // Mémoriser et restaurer le profil choisi
  const saved = localStorage.getItem('userProfile');
  const buttons = document.querySelectorAll('.profile-btn');

  if (saved) {
    buttons.forEach(btn => {
      if (btn.dataset.profile === saved) {
        btn.classList.add('ring-2', 'ring-offset-2', 'ring-blue-500');
      }
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Réinitialiser les styles
      buttons.forEach(b => b.classList.remove('ring-2', 'ring-offset-2', 'ring-blue-500'));
      // Appliquer le style actif
      btn.classList.add('ring-2', 'ring-offset-2', 'ring-blue-500');
      // Sauvegarder
      localStorage.setItem('userProfile', btn.dataset.profile);
      // Scroll vers la section cible
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
</script>
```

Ajoute les IDs correspondants aux sections existantes de la page :
- Section niveaux (5ème/4ème/3ème) → `id="niveaux"`
- Section ressources pédagogiques → `id="ressources"`
- Section méthodologie → `id="methodologie"`

---

## 🟠 TÂCHE 5 — Schema.org Course sur les pages de séquences

**Fichier :** `src/layouts/Layout.astro` ou un layout spécifique aux pages de cours

Après le schema EducationalOrganization existant, ajoute une logique conditionnelle
pour insérer un schema `Course` sur les pages de séquences.

Si le Layout accepte déjà des props comme `title` et `description`, utilise-les :

```astro
---
// Props disponibles dans le Layout
const { title, description, isCourse = false, level = '', sequence = '' } = Astro.props;
---

<!-- Dans le <head>, après le schema existant -->
{isCourse && (
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": title,
    "description": description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Collège Louise Michel Paris",
      "url": "https://collegelouisemichel.net"
    },
    "educationalLevel": level,
    "isAccessibleForFree": true,
    "inLanguage": "fr",
    "url": canonicalURL.href
  })} />
)}
```

Puis sur 3 pages de séquences (une par niveau), passer la prop `isCourse={true}` :
```astro
---
// En-tête de la page
import Layout from '../../layouts/Layout.astro';
---
<Layout
  title="Séquence 1 — Les réseaux informatiques"
  description="Découvrir les composants d'un réseau informatique au collège"
  isCourse={true}
  level="5ème"
>
```

---

## 🟡 TÂCHE 6 — Dates lastmod dans le Sitemap

**Fichier :** `astro.config.mjs`

Ouvre le fichier et montre-moi la configuration actuelle de `@astrojs/sitemap`.
Si la date de modification n'est pas configurée, mets à jour :

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://collegelouisemichel.net',
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.8,
    }),
  ],
});
```

---

## 🟡 TÂCHE 7 — Article pour les parents

**Fichier à créer :** `src/pages/actualites/preparer-brevet-technologie.astro`

Crée un article de **900 mots minimum** avec ce contenu :

**Title :** "Comment aider son enfant à préparer le Brevet de technologie ?"
**Meta description :** "Guide complet pour les parents : programme, sujets qui tombent, méthode de révision mois par mois et ressources gratuites pour le Brevet de technologie."

**Structure de l'article (rédige le contenu complet) :**

1. **Introduction** — Pourquoi la technologie est souvent négligée et pourquoi c'est une erreur (50 points au Brevet)
2. **Ce qui est évalué au Brevet** — Chaîne d'énergie, chaîne d'information, logigrammes, dessin technique, analyse fonctionnelle
3. **Calendrier de révision** — Que faire en janvier, février, mars, avril, mai, juin
4. **Les erreurs classiques à éviter** — Ne pas réviser seulement la 3ème, négliger les schémas
5. **Ressources gratuites sur ce site** — Lien vers /3eme/brevet/ avec les 21 sujets corrigés, lien vers le glossaire, lien vers les quiz
6. **Conclusion** — Encouragement + appel à la newsletter

Ajoute ce lien dans la section "Actualités" de la page d'accueil.

---

## ⚙️ RÈGLES À RESPECTER

- Exécuter `npm run build` après chaque tâche
- Ne jamais supprimer de contenu pédagogique existant
- Utiliser uniquement Tailwind CSS
- Me montrer les fichiers modifiés à la fin de chaque tâche
- Committer après chaque tâche validée :
  `git add -A && git commit -m "Tâche X — [description courte]"`
- Me demander si tu n'es pas certain d'un fichier avant de le modifier

---

## 🚀 POUR DÉMARRER

1. Lis tout ce document
2. Résume chaque tâche en une ligne (7 lignes au total)
3. Liste les fichiers que tu vas ouvrir pour la Tâche 1
4. Attends mon **"GO"**
