# 🎯 PROMPT COMPLET — collegelouisemichel.net
# À copier-coller intégralement dans Claude sur VS Code

---

Tu es un expert fullstack spécialisé en **Astro, Tailwind CSS, SEO et UX design**.
Je suis enseignant de technologie au Collège Louise Michel à Paris.
Mon site **collegelouisemichel.net** est un site pédagogique gratuit pour les élèves
de 5ème, 4ème et 3ème. Stack technique : **Astro + Tailwind CSS**, déployé sur **Netlify**.

Tu vas exécuter **5 missions dans l'ordre**, en attendant ma validation entre chaque.
Avant de toucher au moindre fichier :
1. Lis tout ce document
2. Résume en quelques lignes ce que tu vas faire pour chaque mission
3. Attends mon **"GO"** pour commencer

Après chaque mission, exécute `npm run build` et montre-moi le résultat.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 MISSION 1 — CORRECTIONS TECHNIQUES & SEO CRITIQUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ces corrections sont urgentes : sans elles, Google ne voit pas le site.

────────────────────────────────────────
1A — REDIRECTION 301 (.com → .net)
────────────────────────────────────────
Fichier : `netlify.toml`

Ajouter à la fin du fichier :
```toml
[[redirects]]
  from = "https://collegelouisemichel.com/*"
  to = "https://collegelouisemichel.net/:splat"
  status = 301
  force = true

[[redirects]]
  from = "https://www.collegelouisemichel.com/*"
  to = "https://collegelouisemichel.net/:splat"
  status = 301
  force = true
```

────────────────────────────────────────
1B — BALISE CANONICAL dans Layout.astro
────────────────────────────────────────
Fichier : `src/layouts/Layout.astro`

Dans le `<head>`, ajouter APRÈS les meta existantes :
```astro
<link rel="canonical" href={new URL(Astro.url.pathname, "https://collegelouisemichel.net").href} />
```

────────────────────────────────────────
1C — META DESCRIPTIONS UNIQUES par page
────────────────────────────────────────
Actuellement toutes les pages ont la même meta description.
Il faut que le composant Layout accepte une prop `description` unique.

Dans `src/layouts/Layout.astro`, vérifier que la prop `description` est bien
utilisée dans la balise `<meta name="description">` et n'est PAS hardcodée.

Puis mettre à jour ces pages avec des descriptions uniques :

- `src/pages/index.astro` :
  "Cours de technologie gratuits pour les collégiens : 5ème, 4ème, 3ème.
   Séquences, activités, quiz et préparation au Brevet — Collège Louise Michel Paris."

- `src/pages/3eme/brevet.astro` (ou équivalent) :
  "Prépare ton Brevet de technologie : sujets corrigés (serre automatisée,
   freinage ABS, sirop d'érable), fiches de révision et quiz interactifs."

- `src/pages/5eme/index.astro` :
  "Cours de technologie en 5ème : réseaux informatiques, objets techniques
   et modélisation 3D avec SketchUp. Fiches et activités gratuites."

- `src/pages/4eme/index.astro` :
  "Cours de technologie en 4ème : domotique, systèmes automatiques,
   Arduino et programmation. Séquences complètes gratuites."

- `src/pages/3eme/index.astro` :
  "Cours de technologie en 3ème : préparation au Brevet, projets avancés
   et orientation post-3ème. Ressources gratuites Collège Louise Michel."

- `src/pages/materiel-recommande.astro` (si existante) :
  "Matériel recommandé pour les cours de technologie au collège :
   kits Arduino, SketchUp, robotique et livres sélectionnés par notre enseignant."

────────────────────────────────────────
1D — TITLE TAGS OPTIMISÉS par page
────────────────────────────────────────
Remplacer les titles génériques par des titles avec mots-clés :

- Page d'accueil : "Cours Technologie Collège 5e 4e 3e | Collège Louise Michel Paris"
- Page 5ème : "Cours Technologie 5ème — Réseaux, SketchUp, Objets Techniques"
- Page 4ème : "Cours Technologie 4ème — Domotique, Arduino, Automatismes"
- Page 3ème : "Cours Technologie 3ème — Révisions Brevet, Orientation"
- Page Brevet : "Brevet Technologie — Sujets Corrigés & Fiches de Révision"
- Page Matériel : "Matériel Recommandé pour les Cours de Technologie Collège"

Format dans Astro : `<title>{title} | La technologie au collège</title>`
S'assurer que chaque page passe bien sa propre valeur de `title`.

────────────────────────────────────────
1E — SCHEMA.ORG ENRICHI
────────────────────────────────────────
Fichier : `src/layouts/Layout.astro`

Remplacer le schema EducationalOrganization basique par ce schema enrichi :
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "name": "La technologie au collège — Collège Louise Michel",
      "description": "Ressources pédagogiques gratuites pour les cours de technologie au collège",
      "url": "https://collegelouisemichel.net",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Paris",
        "addressCountry": "FR"
      }
    },
    {
      "@type": "WebSite",
      "url": "https://collegelouisemichel.net",
      "name": "La technologie au collège",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://collegelouisemichel.net/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
```

Sur les pages de cours individuels, ajouter également :
```json
{
  "@type": "Course",
  "name": "[Titre de la séquence]",
  "description": "[Description de la séquence]",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Collège Louise Michel Paris"
  },
  "educationalLevel": "5ème / 4ème / 3ème",
  "isAccessibleForFree": true
}
```

────────────────────────────────────────
1F — DATES LASTMOD dans le Sitemap
────────────────────────────────────────
Dans la configuration du sitemap Astro (`astro.config.mjs`),
vérifier que l'intégration `@astrojs/sitemap` est configurée
pour inclure les dates de dernière modification.

Si ce n'est pas le cas, configurer :
```js
sitemap({
  lastmod: new Date(),
  changefreq: 'weekly',
  priority: 0.7,
})
```

────────────────────────────────────────
1G — MISE À JOUR robots.txt
────────────────────────────────────────
Fichier : `public/robots.txt`

Remplacer le contenu par :
```
User-agent: *
Allow: /

Sitemap: https://collegelouisemichel.net/sitemap-index.xml
```
Vérifier qu'il n'y a AUCUNE occurrence de "collegelouisemichel.com" dans ce fichier.

────────────────────────────────────────
1H — POLITIQUE DE CONFIDENTIALITÉ : compléter l'email
────────────────────────────────────────
Fichier : `src/pages/politique-confidentialite.astro`

Chercher le texte `[votre email]` et le remplacer par l'adresse email
professionnelle de contact. Me demander l'email exact avant de modifier.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 MISSION 2 — REDESIGN VISUEL & UX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Attendre ma validation de la Mission 1 avant de commencer.

────────────────────────────────────────
2A — HERO SECTION (page d'accueil)
────────────────────────────────────────
Fichier : `src/pages/index.astro`

Remplacer la section d'introduction par un hero visuel :
- Fond : dégradé animé de #1e3a5f (bleu nuit) vers #7c3aed (violet)
- Animation CSS : effet "shimmer" subtil sur le fond
- Titre H1 en blanc, grande taille, avec animation fadeIn au chargement
- Sous-titre : "Découvre, comprends, crée 🚀"
- Bouton principal CTA : "Accède à tes cours →"
  Style : fond blanc, texte violet, hover avec scale 1.05 + shadow
- Bouton secondaire : "Voir la préparation Brevet"
  Style : bordure blanche, texte blanc, hover fond blanc/20%
- Décoration : emojis flottants en arrière-plan (⚙️ 🤖 💡 🔬)
  positionnés en absolus, animation float lente

────────────────────────────────────────
2B — SYSTÈME DE COULEURS PAR NIVEAU
────────────────────────────────────────
Définir ces couleurs dans `tailwind.config.mjs` :
```js
colors: {
  '5eme': { DEFAULT: '#3B82F6', light: '#EFF6FF', dark: '#1D4ED8' },
  '4eme': { DEFAULT: '#10B981', light: '#ECFDF5', dark: '#047857' },
  '3eme': { DEFAULT: '#F97316', light: '#FFF7ED', dark: '#C2410C' },
}
```

Appliquer ces couleurs sur :
- Les cartes de navigation vers chaque niveau (bordure gauche colorée)
- Les badges de niveau sur les pages de cours
- Les boutons d'accès à chaque niveau
- Le fond de l'en-tête des pages de chaque niveau

────────────────────────────────────────
2C — CARTES DE COURS ENRICHIES
────────────────────────────────────────
Sur les pages de liste de séquences (5ème, 4ème, 3ème) :

Chaque carte de séquence doit avoir :
- Une icône SVG illustrée cohérente avec le sujet
  (réseau → 🌐, robot → 🤖, maison → 🏠, circuit → ⚡, etc.)
- Le numéro de séquence affiché en badge coloré (couleur du niveau)
- Le titre de la séquence en H3
- Une courte description (1-2 phrases)
- Barre de progression visuelle : "Séquence X / Y" avec barre colorée
- Effet hover : translateY(-4px) + box-shadow plus prononcée
- Transition : 0.2s ease

────────────────────────────────────────
2D — COMPTEUR BREVET (page 3ème)
────────────────────────────────────────
Fichier : `src/pages/3eme/index.astro` ou le layout 3ème

Ajouter en haut de la page, avant tout autre contenu :
```astro
<div class="bg-orange-500 text-white text-center p-4 rounded-lg mb-6">
  <p class="text-lg font-bold" id="brevet-countdown">
    ⏳ Brevet dans <span id="days-count">...</span> jours
    — Commence à réviser maintenant !
  </p>
</div>

<script>
  const brevetDate = new Date('2025-06-27');
  const today = new Date();
  const diff = Math.ceil((brevetDate - today) / (1000 * 60 * 60 * 24));
  document.getElementById('days-count').textContent = diff > 0 ? diff : '0';
</script>
```

────────────────────────────────────────
2E — SÉLECTEUR DE PROFIL (page d'accueil)
────────────────────────────────────────
Après le hero, ajouter une section :
```
Tu es... ?
[👦 Élève]  [👨‍👩‍👧 Parent]  [👩‍🏫 Enseignant]
```

Comportement :
- Clic sur "Élève" → scroll vers les cartes de niveaux
- Clic sur "Parent" → scroll vers la section Brevet + orientation
- Clic sur "Enseignant" → scroll vers les ressources pédagogiques
- Stocker le choix dans localStorage pour mémoriser entre les visites
- Au chargement, si choix mémorisé → surligner le bouton correspondant

────────────────────────────────────────
2F — BARRE DE RECHERCHE GLOBALE
────────────────────────────────────────
Dans le header, ajouter une barre de recherche :
- Input avec icône loupe 🔍
- Liste statique JSON de toutes les pages (titre + URL + niveau)
- Filtrage en temps réel sur le titre au fur et à mesure de la saisie
- Résultats en dropdown avec le niveau coloré en badge
- Clic sur un résultat → navigation vers la page
- Fermeture du dropdown au clic en dehors ou touche Echap

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 MISSION 3 — INTERACTIVITÉ & ENGAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Attendre ma validation de la Mission 2 avant de commencer.

────────────────────────────────────────
3A — COMPOSANT QUIZ QCM RÉUTILISABLE
────────────────────────────────────────
Créer `src/components/Quiz.astro` (ou Quiz.jsx si React) :

Props attendues :
```ts
interface QuizProps {
  questions: {
    question: string;
    options: string[];
    correct: number; // index de la bonne réponse
    explanation?: string;
  }[];
  title?: string;
}
```

Comportement :
- Afficher une question à la fois avec les options en boutons
- Bonne réponse → bouton vert + message encourageant + explication
- Mauvaise réponse → bouton rouge + la bonne réponse s'affiche en vert
- Bouton "Question suivante →"
- Score final affiché : "Tu as eu X/Y ! 🎉"
- Messages personnalisés selon le score :
  - 5/5 : "Parfait ! Tu maîtrises ce cours 🌟"
  - 3-4/5 : "Très bien ! Relis les parties manquées 📚"
  - 0-2/5 : "Courage ! Reprends le cours et réessaie 💪"
- Bouton "Recommencer" à la fin
- Stocker le meilleur score en localStorage par quiz

Intégrer ce composant Quiz avec des questions réelles sur ces 3 pages :
1. Une séquence de 5ème (sur les réseaux)
2. Une séquence de 4ème (sur la domotique ou Arduino)
3. La page Brevet de 3ème (questions type DNB)

────────────────────────────────────────
3B — IMAGES ALT TEXT (accessibilité + SEO)
────────────────────────────────────────
Faire un grep dans tout le projet pour trouver les balises `<img`
sans attribut `alt` ou avec `alt=""`.

Pour chaque image trouvée, ajouter un alt text descriptif et
contenant si possible un mot-clé (ex: alt="Schéma d'un réseau
informatique pour cours de technologie 5ème").

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 MISSION 4 — MONÉTISATION PASSIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Attendre ma validation de la Mission 3 avant de commencer.

────────────────────────────────────────
4A — PAGE MATÉRIEL RECOMMANDÉ
────────────────────────────────────────
Vérifier si `src/pages/materiel-recommande.astro` existe déjà.
Si oui, l'enrichir. Si non, la créer.

Contenu de la page :
- Titre H1 : "Matériel recommandé pour les cours de technologie"
- Intro : "En tant qu'enseignant, voici le matériel que j'utilise
  et recommande à mes élèves. Ces liens sont des liens affiliés
  Amazon — vous ne payez pas plus, et vous soutenez ce site gratuit."
- Section 5ème :
  • Câble réseau RJ45 (lien Amazon affilié — placeholder [LIEN_AMAZON_5])
  • Livre "Les réseaux informatiques pour les nuls" (placeholder)
  • Logiciel SketchUp (lien vers version gratuite officielle)
- Section 4ème :
  • Kit Arduino Uno starter kit (placeholder [LIEN_AMAZON_4A])
  • Kit domotique prise connectée Tapo (placeholder [LIEN_AMAZON_4B])
  • Câbles et breadboard électronique (placeholder [LIEN_AMAZON_4C])
- Section 3ème :
  • Annales Brevet technologie (placeholder [LIEN_AMAZON_3])
  • Calculatrice scientifique Casio (placeholder [LIEN_AMAZON_3B])
- Mention légale en bas de page :
  "Ce site participe au Programme Partenaires d'Amazon EU.
   Les liens ci-dessus sont des liens affiliés."
- Ajouter un lien vers /materiel-recommande dans la navigation principale

Note : Les placeholders [LIEN_AMAZON_X] seront remplacés manuellement
par le propriétaire du site après inscription au programme Amazon Partenaires.

────────────────────────────────────────
4B — OPTIMISATION ADSENSE
────────────────────────────────────────
Sur toutes les pages de cours (séquences et activités) :

Ajouter un bloc publicitaire AdSense dans le contenu :
- Position : après le 1er paragraphe de cours (zone la plus rentable)
- Format : responsive (data-full-width-responsive="true")
- Vérifier que l'attribut `data-full-width-responsive="true"` est présent
  sur TOUS les blocs AdSense existants

Si le composant AdSense est centralisé, modifier ce composant.
Si les blocs sont en dur dans chaque page, créer un composant
`src/components/AdBanner.astro` et l'utiliser partout.

────────────────────────────────────────
4C — SECTION SOUTIEN DANS LE FOOTER
────────────────────────────────────────
Fichier : `src/layouts/Layout.astro` (section footer)

Enrichir le footer avec une section "Soutenir le site" :
```html
<div class="support-section text-center py-6 border-t border-gray-200 mt-8">
  <p class="text-gray-600 mb-3">
    📚 Ce site est <strong>100% gratuit</strong> et sans pub intrusive.<br>
    Si ces ressources vous ont aidé, un petit geste est toujours bienvenu !
  </p>
  <div class="flex gap-4 justify-center flex-wrap">
    <a href="https://fr.tipeee.com/[COMPTE_TIPEEE]"
       target="_blank"
       class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
      💜 Soutenir sur Tipeee
    </a>
    <a href="https://www.buymeacoffee.com/[COMPTE_BMC]"
       target="_blank"
       class="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition">
      ☕ Offrir un café
    </a>
  </div>
</div>
```

Remplacer [COMPTE_TIPEEE] et [COMPTE_BMC] par les vrais noms de compte.
Me demander ces informations avant de modifier.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 MISSION 5 — CONTENU & SEO LONG TERME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Attendre ma validation de la Mission 4 avant de commencer.

────────────────────────────────────────
5A — ARTICLE PARENT : "Comment préparer le Brevet de technologie"
────────────────────────────────────────
Créer `src/pages/actualites/preparer-brevet-technologie.astro`

Contenu (à rédiger en Astro/markdown, 900+ mots) :
- Titre H1 : "Comment aider son enfant à préparer le Brevet de technologie ?"
- Meta description : "Guide complet pour les parents : programme du Brevet de
  technologie, sujets tombés, méthode de révision et ressources gratuites."
- Sommaire avec ancres :
  1. Qu'est-ce que le Brevet de technologie ?
  2. Ce qui est évalué (chaîne d'énergie, logigrammes, dessin technique…)
  3. Comment organiser les révisions mois par mois
  4. Les ressources gratuites disponibles sur ce site
  5. Les sujets qui tombent souvent
- CTA en fin d'article vers la page Brevet du site

────────────────────────────────────────
5B — PAGE GLOSSAIRE TECHNOLOGIE
────────────────────────────────────────
Créer `src/pages/glossaire.astro`

- Titre H1 : "Glossaire de technologie au collège"
- Meta description : "Définitions de tous les termes du cours de technologie
  au collège : logigramme, chaîne d'énergie, cahier des charges, domotique..."
- Termes à inclure (par ordre alphabétique) :
  Adressage IP, Automatisme, Cahier des charges, Chaîne d'énergie,
  Chaîne d'information, Domotique, Flowchart / Logigramme, Grafcet,
  Maquette numérique, Modélisation 3D, Objet technique, Protocole réseau,
  Réseau informatique, SketchUp, Système automatisé, Tout ou rien (TOR)
- Format : terme en H3, définition courte (2-3 phrases), exemple concret
- Ajouter un lien depuis chaque terme vers la séquence correspondante du site
- Ajouter un lien vers /glossaire dans le footer

────────────────────────────────────────
5C — ENRICHISSEMENT DES PAGES DE SÉQUENCES
────────────────────────────────────────
Pour les 5 séquences ayant le moins de contenu (< 400 mots) :

Sur chaque page, ajouter APRÈS le contenu existant (sans modifier l'existant) :
- Une section "🎯 Objectifs pédagogiques" (liste de 3-5 compétences)
- Une section "❓ Questions de cours" (3 questions ouvertes type Brevet)
- Une section "🔗 Pour aller plus loin" avec liens vers :
  • La séquence précédente
  • La séquence suivante
  • Le quiz correspondant (si créé en Mission 3)
  • La page Brevet si c'est une notion au programme

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ RÈGLES IMPÉRATIVES — À RESPECTER ABSOLUMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ À FAIRE :
- Exécuter `npm run build` après chaque mission et corriger les erreurs
- Utiliser UNIQUEMENT Tailwind CSS (pas de CSS externe, pas de <style> inline)
- Tester la responsivité mobile de chaque composant créé
- Committer les changements après chaque mission validée :
  `git add . && git commit -m "Mission X — [description]"`
- Me montrer un résumé des fichiers modifiés/créés à la fin de chaque mission
- Me demander avant de modifier un fichier que tu n'as pas encore lu

❌ À NE PAS FAIRE :
- Ne jamais supprimer du contenu pédagogique existant (cours, séquences, PDF)
- Ne jamais toucher aux fichiers de configuration Netlify existants
  sans me le signaler d'abord
- Ne jamais modifier `package.json` sans me demander
- Ne pas commencer une nouvelle mission sans ma validation explicite

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 POUR COMMENCER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Lis tout ce document
2. Résume ce que tu vas faire pour chaque mission (5 lignes max par mission)
3. Liste les fichiers que tu vas modifier en Mission 1
4. Attends mon "GO" pour démarrer

---
*Document généré par analyse complète de collegelouisemichel.net*
*Couvre : SEO technique, design UX, interactivité, monétisation passive, contenu*
