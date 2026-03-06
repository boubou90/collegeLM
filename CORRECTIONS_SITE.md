# 📋 Corrections à apporter — collegelouisemichel.net
> Site éducatif construit avec **Astro**, déployé sur **Netlify**
> À transmettre à Claude dans VS Code pour appliquer les corrections

---

## 🔴 CORRECTION 1 — Fichier `robots.txt` (Priorité critique — SEO)

**Problème :** L'URL du sitemap dans `robots.txt` pointe vers un mauvais domaine (`collegelouisemichel.com`) alors que le site est maintenant sur `collegelouisemichel.net`. Google ne trouve pas le sitemap, ce qui nuit gravement au référencement.

**Fichier à modifier :** `public/robots.txt`

**Chercher :**
```
Sitemap: https://collegelouisemichel.com/sitemap-index.xml
```

**Remplacer par :**
```
Sitemap: https://collegelouisemichel.net/sitemap-index.xml
```

**Vérifier aussi** que toutes les autres occurrences de `collegelouisemichel.com` dans le projet sont remplacées par `collegelouisemichel.net` (faire un Ctrl+Shift+F dans VS Code pour chercher dans tout le projet).

---

## 🔴 CORRECTION 2 — Page de Politique de Confidentialité RGPD (Priorité critique — Légal / AdSense)

**Problème :** Le site utilise Google AdSense et une newsletter, et s'adresse à des mineurs (collégiens). La loi RGPD et les conditions AdSense imposent une page de politique de confidentialité. Son absence peut entraîner la suspension du compte AdSense.

**Action :** Créer une nouvelle page `src/pages/politique-confidentialite.astro` avec le contenu suivant :

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Politique de confidentialité — Collège Louise Michel">
  <main class="max-w-3xl mx-auto px-4 py-12">
    <h1>Politique de confidentialité</h1>
    <p><em>Dernière mise à jour : février 2026</em></p>

    <h2>1. Responsable du traitement</h2>
    <p>Ce site est édité par un enseignant du Collège Louise Michel, Paris. Contact : [votre email]</p>

    <h2>2. Données collectées</h2>
    <p>Ce site peut collecter les données suivantes :</p>
    <ul>
      <li>Adresse email (via le formulaire de newsletter, sur la base du consentement)</li>
      <li>Données de navigation anonymisées via Google Analytics (si activé)</li>
      <li>Données publicitaires via Google AdSense</li>
    </ul>

    <h2>3. Cookies et publicités</h2>
    <p>Ce site utilise Google AdSense pour afficher des publicités. Google peut utiliser des cookies pour personnaliser les annonces. Vous pouvez gérer vos préférences publicitaires sur <a href="https://adssettings.google.com" target="_blank">adssettings.google.com</a>.</p>

    <h2>4. Public concerné</h2>
    <p>Ce site s'adresse aux élèves, parents et enseignants. Conformément au RGPD, les mineurs de moins de 15 ans doivent obtenir le consentement d'un parent ou tuteur légal avant de s'inscrire à la newsletter.</p>

    <h2>5. Durée de conservation</h2>
    <p>Les adresses email collectées via la newsletter sont conservées jusqu'à désinscription.</p>

    <h2>6. Vos droits</h2>
    <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à : [votre email]</p>

    <h2>7. Hébergement</h2>
    <p>Ce site est hébergé par Netlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, CA 94104, USA.</p>
  </main>
</Layout>
```

**Ajouter ensuite un lien vers cette page** dans le footer du site (fichier footer ou layout principal) :
```html
<a href="/politique-confidentialite">Politique de confidentialité</a>
```

---

## 🟠 CORRECTION 3 — Mettre à jour le domaine dans toute la configuration (SEO / AdSense)

**Problème :** Le site a été migré de `collegelouisemichel.netlify.app` vers `collegelouisemichel.net` mais plusieurs fichiers de configuration contiennent encore l'ancienne URL.

**Action :** Faire une recherche globale dans VS Code (Ctrl+Shift+F) et remplacer toutes les occurrences de :
- `collegelouisemichel.netlify.app` → `collegelouisemichel.net`
- `collegelouisemichel.com` → `collegelouisemichel.net`

**Fichiers typiquement concernés dans un projet Astro :**
- `astro.config.mjs` → propriété `site:`
- `public/robots.txt` → ligne `Sitemap:`
- `src/layouts/Layout.astro` → balises `<meta>` og:url, canonical
- `src/components/` → tout composant contenant l'ancienne URL en dur

**Exemple dans `astro.config.mjs` :**
```js
// Avant
export default defineConfig({
  site: 'https://collegelouisemichel.netlify.app',
})

// Après
export default defineConfig({
  site: 'https://collegelouisemichel.net',
})
```

---

## 🟠 CORRECTION 4 — Différencier le contenu des pages par niveau

**Problème :** Les pages `/cours/5eme/`, `/cours/4eme/`, et `/cours/3eme/` affichent le même contenu générique. Les élèves ne voient pas de différence réelle entre les niveaux.

**Action :** Dans chaque page de niveau, s'assurer que :
- L'introduction est spécifique au niveau
- Les cours, séquences et activités listés sont propres à ce niveau
- Le titre de la page `<title>` inclut le niveau (ex: "Cours de technologie — 4ème")
- Les balises `<meta description>` sont uniques pour chaque niveau

**Exemple de meta description personnalisée par niveau :**
```html
<!-- 5ème -->
<meta name="description" content="Cours de technologie en 5ème : réseaux informatiques, objets techniques et initiation à la modélisation 3D. Collège Louise Michel, Paris." />

<!-- 4ème -->
<meta name="description" content="Cours de technologie en 4ème : systèmes automatiques, programmation Python et analyse fonctionnelle. Collège Louise Michel, Paris." />

<!-- 3ème -->
<meta name="description" content="Cours de technologie en 3ème : préparation au Brevet, projets techniques avancés et orientation post-3ème. Collège Louise Michel, Paris." />
```

---

## 🟡 CORRECTION 5 — Articles d'actualité fictifs

**Problème :** La section "Actualités" contient 6 articles génériques non réels (Projet Robotique 2024, Concours de Technologie, etc.) qui peuvent nuire à la crédibilité du site auprès des parents et de l'administration.

**Action (au choix) :**
- **Option A (recommandée) :** Remplacer ces articles par de vraies actualités de la classe
- **Option B :** Supprimer entièrement la section "Actualités" de la page d'accueil jusqu'à avoir du contenu réel
- **Option C :** Renommer la section "Exemples de projets" ou "Projets types" pour que ce soit clair que c'est illustratif

---

## 🟡 CORRECTION 6 — Chiffre newsletter à vérifier

**Problème :** Le popup newsletter affiche "+500 élèves inscrits". Si ce chiffre est inexact, le corriger.

**Fichier :** Chercher dans les composants le texte `500 élèves` et mettre à jour avec le vrai chiffre, ou remplacer par une formulation neutre comme :

```html
<!-- Remplacer -->
Rejoignez +500 élèves qui reçoivent chaque semaine

<!-- Par -->
Rejoignez nos élèves qui reçoivent chaque semaine
```

---

## ✅ VÉRIFICATIONS FINALES après les corrections

Une fois toutes les corrections appliquées et le site redéployé sur Netlify :

1. **Vérifier le sitemap** : Ouvrir `https://collegelouisemichel.net/sitemap-index.xml` dans le navigateur — il doit s'afficher
2. **Vérifier robots.txt** : Ouvrir `https://collegelouisemichel.net/robots.txt` — la ligne Sitemap doit pointer vers `.net`
3. **Vérifier la page confidentialité** : `https://collegelouisemichel.net/politique-confidentialite` doit s'afficher
4. **Soumettre le nouveau sitemap dans Google Search Console** : Aller sur search.google.com/search-console → Sitemaps → Soumettre `https://collegelouisemichel.net/sitemap-index.xml`
5. **Mettre à jour l'URL du site dans Google AdSense** : Paramètres → Sites → Vérifier que l'URL est bien `collegelouisemichel.net`

---

## 🚨 PROBLÈME GOOGLE ADSENSE — À faire manuellement (pas dans le code)

**Contexte :** Google AdSense coupe les publicités car il détecte des clics suspects depuis l'IP du collège (même adresse IP pour l'enseignant et les élèves en classe).

**Solution :** Filtrer l'IP du collège dans AdSense :
1. Depuis un ordinateur du collège, aller sur [whatismyip.com](https://whatismyip.com) et noter l'IP
2. Se connecter sur [adsense.google.com](https://adsense.google.com)
3. Aller dans : **Sécurité et confidentialité** → **Blocage d'accès** → **Filtrage des IP**
4. Ajouter l'IP du collège → **Sauvegarder**
5. Si le compte est déjà suspendu : remplir le formulaire d'appel AdSense en expliquant la situation (enseignant utilisant le site en classe)

---

*Document généré pour le site collegelouisemichel.net — Collège Louise Michel, Paris*
