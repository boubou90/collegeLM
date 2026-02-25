# 🎯 PROMPT V3 — collegelouisemichel.net
# Priorités Growth & SEO — Analyse consultant senior
# À copier dans Claude VS Code

---

Tu es un expert fullstack spécialisé en **Astro, Tailwind CSS, SEO et monétisation**.
Je suis enseignant au Collège Louise Michel à Paris.
Mon site est **collegelouisemichel.net** (Astro + Tailwind, déployé sur Netlify).

## ⚠️ CE QUI EST DÉJÀ FAIT (ne pas toucher)

- Hero animé avec dégradé et tagline "Découvre, comprends, crée 🚀"
- Couleurs par niveau (bleu 5ème, vert 4ème, orange 3ème)
- Quiz QCM sur la page d'accueil et la page Brevet
- Barre de recherche globale dans le header
- Page /materiel-recommande avec liens Amazon affiliés (tag=kennymac-21)
- Schema.org EducationalOrganization + WebSite + SearchAction dans le Layout
- Glossaire /glossaire avec 16 termes
- Meta descriptions uniques sur les pages principales
- Footer avec Politique de confidentialité + liens de soutien
- Balise canonical dans SEO.astro ✅
- Redirections 301 .com → .net dans netlify.toml ✅
- lastmod dans sitemap (astro.config.mjs) ✅
- Article parent /actualites/preparer-brevet-technologie ✅

## 📋 MISSION — 3 blocs prioritaires à implémenter

Lis tout ce document, résume chaque tâche en une ligne,
puis attends mon **"GO"** avant de commencer.
Après chaque tâche, fais `npm run build` et montre-moi le résultat.

---

## 🔴 BLOC A — FINITIONS TECHNIQUES (3 tâches restantes)

### TÂCHE A1 — Compteur de jours avant le Brevet (page 3ème)

**Fichier :** `src/pages/3eme/index.astro`

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
  const brevetDate = new Date('2026-06-26T08:00:00');
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

> ⚠️ La date du Brevet 2026 est le **26 juin 2026** (à mettre à jour chaque année).

---

### TÂCHE A2 — Sélecteur de profil (page d'accueil)

**Fichier :** `src/pages/index.astro`

Vérifie si une section "Je suis..." / "Bienvenue ! Tu es..." existe déjà.
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
      buttons.forEach(b => b.classList.remove('ring-2', 'ring-offset-2', 'ring-blue-500'));
      btn.classList.add('ring-2', 'ring-offset-2', 'ring-blue-500');
      localStorage.setItem('userProfile', btn.dataset.profile);
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
</script>
```

Ajoute les IDs manquants sur les sections existantes de index.astro :
- Section avec les cartes 5ème/4ème/3ème → `id="niveaux"`
- Section ressources pédagogiques (quiz, glossaire, etc.) → `id="ressources"`
- Section méthodologie ou pédagogie → `id="methodologie"`

---

### TÂCHE A3 — Schema.org Course sur les pages de séquences

**Fichier :** `src/layouts/Layout.astro`

Vérifie si le Layout accepte déjà une prop `isCourse`. Si non, ajoute la logique :

```astro
---
const { title, description, isCourse = false, level = '', canonicalURL } = Astro.props;
const pageCanonical = canonicalURL || new URL(Astro.url.pathname, 'https://collegelouisemichel.net');
---

<!-- Dans le <head>, après les schemas existants -->
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
    "url": typeof pageCanonical === 'string' ? pageCanonical : pageCanonical.href
  })} />
)}
```

Puis sur **une page de séquence par niveau** (3 fichiers), ajoute `isCourse={true}` :

```astro
<!-- Exemple pour une page 5ème -->
<Layout
  title="Séquence 1 — Les réseaux informatiques"
  description="Découvrir les composants d'un réseau informatique en 5ème"
  isCourse={true}
  level="5ème"
>
```

---

## 🟠 BLOC B — SEO HAUTE VALEUR (plus fort levier de trafic)

### TÂCHE B1 — 24 pages individuelles pour les sujets du Brevet

**Contexte :** La page `/3eme/brevet/` liste 24 sujets mais sans pages dédiées.
Or, les familles googlelent exactement : *"sujet brevet technologie 2019 corrigé"*.
Chaque page dédiée = une chance de se positionner sur cette requête.

**Action :** Créer un layout réutilisable `src/layouts/BrevetLayout.astro` :

```astro
---
import Layout from './Layout.astro';
const { title, description, annee, duree = '1h30', points = 50 } = Astro.props;
---
<Layout
  title={title}
  description={description}
  isCourse={true}
  level="3ème"
>
  <!-- Bannière sujet -->
  <div class="bg-orange-50 border-l-4 border-orange-500 rounded-xl p-4 mb-6">
    <div class="flex flex-wrap gap-4 text-sm text-orange-700">
      <span>📅 Session {annee}</span>
      <span>⏱️ Durée : {duree}</span>
      <span>📊 Coefficient : {points} points</span>
    </div>
  </div>

  <!-- Contenu de la page (slot) -->
  <slot />

  <!-- Navigation vers les autres sujets -->
  <div class="mt-12 p-4 bg-gray-50 rounded-xl text-center">
    <p class="text-gray-600 mb-3">Entraîne-toi sur d'autres sujets :</p>
    <a href="/3eme/brevet/" class="btn-orange">← Voir tous les sujets corrigés</a>
  </div>
</Layout>
```

**Puis créer les 3 premières pages** (les années les plus recherchées) :

- `src/pages/3eme/brevet/sujet-2023.astro`
- `src/pages/3eme/brevet/sujet-2022.astro`
- `src/pages/3eme/brevet/sujet-2019.astro`

Pour chaque page, le contenu minimum doit inclure :
1. **H1** : "Sujet Brevet Technologie [ANNÉE] — Corrigé complet"
2. **Introduction** (150 mots) : contexte de la session, thèmes abordés
3. **Thèmes du sujet** : liste des 3-4 grandes parties
4. **Points de cours à revoir** : liens vers les séquences correspondantes du site
5. **Méthodologie** : conseils pour aborder ce type de sujet
6. **Schema.org ExamCorrigé** si possible
7. **FAQ** (3 questions fréquentes sur la session)

**Title tags :**
- "Sujet Brevet Technologie 2023 Corrigé | Collège Louise Michel"
- "Brevet Technologie 2022 — Sujets et Corrections | 3ème"

---

### TÂCHE B2 — Correction du popup newsletter (timing + contenu)

**Problème :** Le popup apparaît après 15 secondes, ce qui est trop tôt
(l'utilisateur n'a pas encore eu le temps d'évaluer la valeur du site).

**Fichier :** Chercher dans `src/components/` le composant newsletter/popup.

**Modification 1 — Timing :** Passer de 15s à 45s (ou exit-intent) :

```js
// Avant
setTimeout(showPopup, 15000);

// Après (45 secondes)
setTimeout(showPopup, 45000);
```

**Modification 2 — Accroche :** Changer le texte d'accroche du popup :

```html
<!-- Avant -->
Rejoignez +500 élèves qui reçoivent chaque semaine

<!-- Après -->
📩 Reçois les révisions Brevet par email — gratuit
```

**Modification 3 — Lead magnet :** Si techniquement possible, remplacer
la promesse générique par une promesse spécifique :

```html
<!-- Avant -->
Nos dernières ressources pédagogiques

<!-- Après -->
Le planning de révision Brevet + les 5 sujets les plus tombés (PDF gratuit)
```

> 💡 Note : si le PDF n'existe pas encore, utiliser la promesse pour l'email
> de bienvenue automatique (à créer dans Brevo/Mailchimp).

---

### TÂCHE B3 — Enrichissement des pages de niveau (contenu thin content)

**Problème :** Les pages `/5eme/`, `/4eme/`, `/3eme/` font environ 350 mots.
Google considère cela comme du "thin content" (pénalité de positionnement).

**Objectif :** Amener chaque page à **700+ mots** avec du contenu utile.

**Pour chaque page de niveau, ajouter une section "Programme officiel" :**

```astro
<!-- Section programme officiel -->
<section class="mt-12 p-6 bg-blue-50 rounded-xl" id="programme">
  <h2 class="text-xl font-bold text-blue-800 mb-4">
    📚 Programme officiel de technologie en [NIVEAU]
  </h2>
  <p class="text-gray-700 mb-4">
    Conformément au programme du Ministère de l'Éducation Nationale,
    les élèves de [NIVEAU] étudient les thèmes suivants en technologie :
  </p>
  <!-- Contenu spécifique par niveau ci-dessous -->
</section>
```

**Contenu pour 5ème :**
Les réseaux informatiques (Internet, protocoles, sécurité), les objets techniques
(analyse fonctionnelle, schémas), initiation à la modélisation 3D (Onshape/Tinkercad),
principes de la programmation avec Scratch.

**Contenu pour 4ème :**
Les systèmes automatiques et robots (capteurs, actionneurs), programmation Python
et algorithmique, analyse fonctionnelle avancée, chaîne d'énergie et d'information.

**Contenu pour 3ème :**
Préparation au Brevet DNB (50 points en technologie), projets techniques pluridisciplinaires,
développement durable et éco-conception, orientation et métiers de la technologie.

---

## 🟡 BLOC C — OPTIMISATION MONÉTISATION

### TÂCHE C1 — Section "Ressources premium" dans materiel-recommande

**Fichier :** `src/pages/materiel-recommande.astro`

Ajoute en haut de la page (avant les produits Amazon) une section
mettant en avant les ressources gratuites du site :

```astro
<!-- Bandeau valeur gratuite -->
<div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6 mb-8">
  <h2 class="text-xl font-bold mb-2">
    🎯 Avant d'acheter du matériel...
  </h2>
  <p class="opacity-90 mb-4">
    Les ressources gratuites du site couvrent 90% des besoins en révision.
    Commence par explorer nos sujets corrigés et fiches de cours !
  </p>
  <div class="flex flex-wrap gap-3">
    <a href="/3eme/brevet/" class="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition">
      📚 24 sujets corrigés →
    </a>
    <a href="/glossaire/" class="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition">
      📖 Glossaire →
    </a>
  </div>
</div>
```

**Puis mettre à jour les produits Amazon** pour prioriser les articles
à plus forte valeur (> €40) qui génèrent de meilleures commissions :
- Calculatrice scientifique Casio Graph 35+ (~€50)
- Casque audio pour e-learning (~€40-60)
- Tableau blanc A3 effaçable (~€15-25)
- Imprimante compacte pour fiches (~€80-100)

---

### TÂCHE C2 — Pied de page "À propos de l'auteur"

**Fichier :** `src/layouts/Layout.astro` ou composant Footer

Ajoute juste avant le footer une section courte d'autorité :

```astro
<!-- Autorité auteur -->
<section class="bg-gray-50 py-8 mt-12">
  <div class="max-w-3xl mx-auto px-4 flex items-start gap-4">
    <div class="text-4xl">👨‍🏫</div>
    <div>
      <p class="font-bold text-gray-800">
        Créé par un enseignant de technologie
      </p>
      <p class="text-gray-600 text-sm mt-1">
        Ce site est conçu par un professeur de technologie au Collège Louise Michel
        à Paris. Toutes les ressources sont alignées sur le programme officiel
        de l'Éducation Nationale et testées avec de vrais élèves.
      </p>
      <a href="/actualites/preparer-brevet-technologie/"
         class="text-blue-600 hover:underline text-sm mt-2 inline-block">
        Lire le guide complet pour préparer le Brevet →
      </a>
    </div>
  </div>
</section>
```

---

## ⚙️ RÈGLES À RESPECTER

- Exécuter `npm run build` après chaque tâche et corriger les erreurs
- Ne jamais supprimer de contenu pédagogique existant
- Utiliser uniquement Tailwind CSS (pas de CSS custom inline)
- Me montrer les fichiers modifiés à la fin de chaque tâche
- Committer après chaque tâche validée :
  `git add -A && git commit -m "TâcheXX — [description courte]"`
- Me demander si tu n'es pas certain d'un fichier avant de le modifier

## 🎯 ORDRE DE PRIORITÉ RECOMMANDÉ

1. **A1** Compteur Brevet (rapide, fort impact UX)
2. **A2** Sélecteur de profil (rapide, fort impact UX)
3. **B2** Popup newsletter (rapide, fort impact conversion)
4. **B1** Pages sujets Brevet individuelles (long, fort impact SEO)
5. **B3** Enrichissement pages de niveau (moyen, impact SEO)
6. **A3** Schema Course (rapide, impact SEO technique)
7. **C1** Section ressources premium (rapide, impact monétisation)
8. **C2** Section auteur (rapide, impact confiance/autorité)

---

## 🚀 POUR DÉMARRER

1. Lis tout ce document
2. Résume chaque tâche en une ligne (8 tâches au total)
3. Liste les fichiers que tu vas ouvrir pour la Tâche A1
4. Attends mon **"GO"**
