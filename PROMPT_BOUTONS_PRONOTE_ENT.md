# 🔴 PROMPT — Boutons CTA Pronote & ENT
# À copier dans Claude VS Code

---

Tu es un expert Astro + Tailwind CSS.
Mon site est **collegelouisemichel.net** (Astro, déployé sur Netlify).

## 🎯 MISSION

Ajouter deux boutons CTA bien visibles **tout en haut du site** pour
les liens **Pronote** et **ENT** (Espace Numérique de Travail).
Ces boutons doivent être immédiatement repérables par les parents
qui cherchent ces accès en urgence.

---

## 📋 ÉTAPE 1 — Lire avant de modifier

Ouvre et lis ces fichiers :
- `src/layouts/Layout.astro`
- `src/components/Header.astro` (s'il existe)
- `src/pages/index.astro` (pour voir la structure de la page d'accueil)

Dis-moi :
1. Où se trouve actuellement le header ?
2. Y a-t-il déjà des liens vers Pronote ou ENT quelque part ?
3. Quelle est la couleur dominante du header actuel ?

Attends mon **"GO"** avant de modifier quoi que ce soit.

---

## 📋 ÉTAPE 2 — Créer une barre d'accès rapide

Ajoute **au-dessus du header principal** (tout en haut du `<body>`)
une fine barre de liens rapides :

```astro
<!-- Barre accès rapide Pronote / ENT -->
<div class="w-full bg-gray-900 text-white py-2 px-4">
  <div class="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-2">

    <!-- Message contextuel -->
    <p class="text-xs text-gray-400 hidden sm:block">
      📚 Accès directs pour les élèves et les parents
    </p>

    <!-- Boutons CTA -->
    <div class="flex gap-2 flex-wrap">

      <!-- Bouton Pronote -->
      <a
        href="https://0750654h.index-education.net/pronote/"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500
               text-white text-xs font-bold px-3 py-1.5 rounded-full
               transition-all duration-200 hover:scale-105 shadow-sm"
        aria-label="Accéder à Pronote — espace élève et parent"
      >
        <span>🔵</span>
        <span>Pronote</span>
        <span class="opacity-70 text-xs">↗</span>
      </a>

      <!-- Bouton ENT -->
      <a
        href="https://ent.iledefrance.fr/"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400
               text-white text-xs font-bold px-3 py-1.5 rounded-full
               transition-all duration-200 hover:scale-105 shadow-sm"
        aria-label="Accéder à l'ENT Île-de-France"
      >
        <span>🟠</span>
        <span>ENT</span>
        <span class="opacity-70 text-xs">↗</span>
      </a>

    </div>
  </div>
</div>
```

> ⚠️ Vérifie les URLs exactes de Pronote et ENT pour le Collège Louise Michel
> avant de les mettre. Si tu ne les connais pas, laisse des commentaires
> `<!-- URL À CONFIRMER -->` à la place.

---

## 📋 ÉTAPE 3 — Version alternative sur mobile

Sur mobile, la barre doit rester visible mais compacte.
Vérifie que les boutons s'affichent bien sur un écran 375px de large.
Si les deux boutons débordent, utilise `justify-center` sur le container mobile.

---

## 📋 ÉTAPE 4 — Optionnel : section dédiée sur la page d'accueil

Si la page `src/pages/index.astro` a une section "Pour les parents"
ou une section d'accès rapide, ajoute-y aussi des cartes plus grandes
pour Pronote et ENT :

```astro
<!-- Cartes accès rapide (section page d'accueil) -->
<section class="py-8 px-4 max-w-4xl mx-auto">
  <h2 class="text-lg font-bold text-gray-700 mb-4 text-center">
    🔗 Accès rapides
  </h2>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">

    <a href="https://0750654h.index-education.net/pronote/"
       target="_blank" rel="noopener noreferrer"
       class="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100
              border-2 border-blue-200 rounded-xl transition group">
      <span class="text-3xl">🔵</span>
      <span class="font-bold text-blue-700 text-sm">Pronote</span>
      <span class="text-xs text-blue-500">Notes & absences</span>
    </a>

    <a href="https://ent.iledefrance.fr/"
       target="_blank" rel="noopener noreferrer"
       class="flex flex-col items-center gap-2 p-4 bg-orange-50 hover:bg-orange-100
              border-2 border-orange-200 rounded-xl transition group">
      <span class="text-3xl">🟠</span>
      <span class="font-bold text-orange-700 text-sm">ENT</span>
      <span class="text-xs text-orange-500">Espace numérique</span>
    </a>

    <a href="https://www.education.gouv.fr/le-brevet-des-colleges-325448"
       target="_blank" rel="noopener noreferrer"
       class="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100
              border-2 border-green-200 rounded-xl transition group">
      <span class="text-3xl">📋</span>
      <span class="font-bold text-green-700 text-sm">Brevet DNB</span>
      <span class="text-xs text-green-500">Infos officielles</span>
    </a>

  </div>
</section>
```

---

## ⚙️ RÈGLES

- Ne pas supprimer le header existant
- Utiliser uniquement Tailwind CSS
- Vérifier que ça ne casse pas l'affichage mobile
- Lancer `npm run build` après chaque modification
- Committer à la fin :
  `git add -A && git commit -m "feat: barre accès rapide Pronote et ENT"`

## 🚀 POUR DÉMARRER

1. Lis les fichiers de l'Étape 1
2. Dis-moi ce que tu as trouvé
3. Confirme les URLs Pronote et ENT avec moi si tu n'es pas sûr
4. Attends mon **"GO"**
