# 🚀 Guide de Déploiement - CollegeLM

## ✅ Votre site est prêt à être déployé !

Toutes les fonctionnalités de monétisation sont en place :
- ✅ Publicités AdSense optimisées
- ✅ Composants Amazon, Donation et Newsletter créés
- ✅ Dark mode fonctionnel
- ✅ Barre de recherche optimisée

---

## 🎯 Option 1 : Déployer sur Vercel (RECOMMANDÉ - Gratuit)

**Pourquoi Vercel ?**
- ✅ Gratuit pour les projets personnels
- ✅ Déploiement automatique à chaque push
- ✅ HTTPS automatique
- ✅ Performance optimale
- ✅ Compatible Astro

### Étapes de déploiement :

#### 1. Créer un compte GitHub (si vous n'en avez pas)

```bash
# Aller sur https://github.com et créer un compte
```

#### 2. Créer un nouveau repository sur GitHub

1. Allez sur https://github.com/new
2. Nom du repository : `collegeLM`
3. Description : "Site de technologie pour le collège"
4. Visibilité : Public ou Private (votre choix)
5. Cliquez sur "Create repository"

#### 3. Lier votre projet au repository GitHub

```bash
# Dans votre terminal, depuis le dossier du projet
cd "/Users/admin/Downloads/collegeLM-main 2"

# Initialiser Git (si ce n'est pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer le commit initial
git commit -m "🚀 Site de monétisation optimisé

✅ Google AdSense sur toutes les pages
✅ Composant Amazon Affiliés
✅ Bouton de donation Buy Me a Coffee
✅ Popup de newsletter
✅ Dark mode complet
✅ Barre de recherche optimisée

🎉 Generated with Claude Code (https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Lier au repository GitHub (remplacez USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/USERNAME/collegeLM.git

# Renommer la branche en main
git branch -M main

# Pousser le code
git push -u origin main
```

#### 4. Déployer sur Vercel

1. **Allez sur https://vercel.com/**
2. **Cliquez sur "Sign Up" et connectez-vous avec GitHub**
3. **Cliquez sur "New Project"**
4. **Importez votre repository `collegeLM`**
5. **Configuration du projet :**
   - Framework Preset : **Astro**
   - Build Command : `npm run build`
   - Output Directory : `dist`
   - Install Command : `npm install`
6. **Cliquez sur "Deploy"**

**C'est tout ! 🎉** Votre site sera en ligne en 2-3 minutes.

---

## 🎯 Option 2 : Déployer sur Netlify (Alternative)

### Étapes :

1. **Créer un compte sur https://netlify.com/**
2. **Cliquer sur "Add new site" → "Import an existing project"**
3. **Connecter votre repository GitHub**
4. **Configuration :**
   - Build command : `npm run build`
   - Publish directory : `dist`
5. **Déployer**

---

## 🎯 Option 3 : Déployer sur GitHub Pages (Gratuit)

### Configuration :

1. **Créer le fichier de workflow GitHub Actions**

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. **Pousser le code**

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push
```

3. **Activer GitHub Pages**
   - Allez dans Settings → Pages
   - Source : GitHub Actions
   - Cliquez sur Save

---

## ⚙️ Configuration après déploiement

### 1. Mettre à jour l'URL du site dans astro.config.mjs

```javascript
export default defineConfig({
  site: 'https://VOTRE-SITE.vercel.app/', // Remplacez par votre vraie URL
  // ... reste de la config
});
```

### 2. Configurer Google AdSense

1. **Ajouter votre site dans AdSense :**
   - Allez sur https://www.google.com/adsense/
   - Sites → Ajouter un site
   - Entrez votre URL de production

2. **Vérifier le site :**
   - Google va vérifier que le code AdSense est présent
   - Attendez 24-48h pour l'approbation

### 3. Configurer Buy Me a Coffee

1. **Mettre à jour votre nom d'utilisateur dans Layout.astro :**

```astro
<DonationButton username="VOTRE-NOM-BUYMEACOFFEE" />
```

2. **Commit et push :**

```bash
git add src/layouts/Layout.astro
git commit -m "Update Buy Me a Coffee username"
git push
```

Vercel redéploiera automatiquement.

### 4. Configurer la Newsletter

Intégrez Mailchimp ou Sendinblue dans `NewsletterPopup.astro` (voir [ACTIONS_IMMEDIATES_FAIT.md](ACTIONS_IMMEDIATES_FAIT.md))

---

## 🔄 Workflow de mise à jour

Une fois déployé, pour chaque modification :

```bash
# 1. Faire vos modifications
# 2. Tester en local
npm run dev

# 3. Commit
git add .
git commit -m "Description de vos changements

🤖 Generated with Claude Code (https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 4. Push
git push

# ✅ Vercel/Netlify redéploie automatiquement en 2-3 minutes
```

---

## 📊 Vérifier que tout fonctionne

### Checklist post-déploiement :

- [ ] Le site est accessible
- [ ] Les publicités AdSense s'affichent
- [ ] Le bouton "Buy Me a Coffee" fonctionne
- [ ] La popup newsletter apparaît après 15 secondes
- [ ] Le dark mode fonctionne
- [ ] La barre de recherche est sticky
- [ ] Les pages de cours affichent 2 publicités
- [ ] Le site est responsive (mobile/desktop)

### Outils de vérification :

1. **Google PageSpeed Insights :**
   - https://pagespeed.web.dev/
   - Vérifiez les performances

2. **Google Search Console :**
   - https://search.google.com/search-console
   - Ajoutez votre site pour le SEO

3. **Google AdSense :**
   - Vérifiez que les impressions sont comptabilisées

---

## 🐛 Problèmes courants

### Les publicités ne s'affichent pas en production

**Cause :** Votre site n'est pas encore approuvé par AdSense

**Solution :**
1. Vérifiez que votre site est ajouté dans AdSense
2. Attendez 24-48h pour l'approbation
3. Vérifiez dans la console qu'il n'y a pas d'erreurs

### Le bouton "Buy Me a Coffee" ne redirige pas

**Cause :** Le nom d'utilisateur n'est pas mis à jour

**Solution :**
1. Ouvrez `src/layouts/Layout.astro`
2. Changez `username="votre-nom"` par votre vrai nom
3. Commit et push

### La popup newsletter ne s'affiche pas

**Cause :** Le localStorage empêche l'affichage

**Solution :**
1. Ouvrez la console du navigateur
2. Tapez : `localStorage.removeItem('newsletter-closed')`
3. Rechargez la page

---

## 🎉 Félicitations !

Votre site est maintenant déployé et prêt à générer des revenus !

**Prochaines étapes :**

1. ✅ Configurer Amazon Partenaires
2. ✅ Ajouter des recommandations Amazon
3. ✅ Configurer Mailchimp pour la newsletter
4. ✅ Promouvoir votre site
5. ✅ Analyser les statistiques AdSense

**Consultez :**
- [STRATEGIE_MONETISATION.md](STRATEGIE_MONETISATION.md) pour la stratégie complète
- [ACTIONS_IMMEDIATES_FAIT.md](ACTIONS_IMMEDIATES_FAIT.md) pour les configurations
- [GOOGLE_ADSENSE_GUIDE.md](GOOGLE_ADSENSE_GUIDE.md) pour AdSense

---

**Besoin d'aide pour le déploiement ?** Dites-moi où vous bloquez ! 🚀
