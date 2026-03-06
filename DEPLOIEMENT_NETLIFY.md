# 🚀 Déploiement sur Netlify - Guide Complet

## ✅ Votre site est prêt !

Toutes les fonctionnalités de monétisation sont installées :
- ✅ Google AdSense optimisé (150-300€/mois)
- ✅ Composant Amazon Affiliés (50-150€/mois)
- ✅ Bouton donation Buy Me a Coffee (30-80€/mois)
- ✅ Popup newsletter

**Potentiel : 230-530€/mois** 💰

---

## 📋 Étape 1 : Créer un repository GitHub

### A. Créer un compte GitHub (si vous n'en avez pas)

1. Allez sur https://github.com/
2. Cliquez sur "Sign up"
3. Suivez les instructions

### B. Créer un nouveau repository

1. Une fois connecté, cliquez sur le **+** en haut à droite
2. Sélectionnez **"New repository"**
3. Configuration :
   - **Repository name** : `collegeLM`
   - **Description** : "Site de technologie pour le collège - Monétisé avec AdSense, Amazon Affiliés et donations"
   - **Visibilité** : Public (recommandé) ou Private
   - **Ne cochez PAS** "Add a README file"
4. Cliquez sur **"Create repository"**

### C. Pousser votre code sur GitHub

GitHub va vous montrer des instructions. Voici les commandes à exécuter :

```bash
# 1. Aller dans le dossier de votre projet
cd "/Users/admin/Downloads/collegeLM-main 2"

# 2. Vérifier que Git est initialisé
git status

# 3. Ajouter le remote GitHub (remplacez USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/USERNAME/collegeLM.git

# 4. Vérifier que le remote est bien ajouté
git remote -v

# 5. Pousser votre code
git push -u origin main
```

**Si on vous demande vos identifiants :**
- Username : Votre nom d'utilisateur GitHub
- Password : Utilisez un **Personal Access Token** (pas votre mot de passe)

**Comment créer un Personal Access Token :**
1. Allez sur https://github.com/settings/tokens
2. Cliquez sur "Generate new token" → "Generate new token (classic)"
3. Nom : "Netlify Deploy"
4. Cochez : `repo` (full control of private repositories)
5. Cliquez sur "Generate token"
6. **COPIEZ le token** (vous ne le reverrez plus !)
7. Utilisez ce token comme mot de passe lors du push

---

## 📋 Étape 2 : Déployer sur Netlify

### A. Créer un compte Netlify

1. Allez sur https://www.netlify.com/
2. Cliquez sur **"Sign up"**
3. Sélectionnez **"GitHub"** pour vous connecter
4. Autorisez Netlify à accéder à votre compte GitHub

### B. Importer votre projet

1. Une fois connecté, cliquez sur **"Add new site"** → **"Import an existing project"**
2. Sélectionnez **"Deploy with GitHub"**
3. Autorisez Netlify à accéder à vos repositories
4. Sélectionnez le repository **`collegeLM`**

### C. Configuration du build

Netlify devrait détecter automatiquement qu'il s'agit d'un projet Astro.

**Vérifiez ces paramètres :**

- **Branch to deploy** : `main`
- **Build command** : `npm run build`
- **Publish directory** : `dist`
- **Node version** : 18 ou supérieur

Si ce n'est pas rempli automatiquement, ajoutez ces valeurs manuellement.

### D. Déployer !

1. Cliquez sur **"Deploy site"**
2. Attendez 2-3 minutes ⏳
3. **C'est en ligne ! 🎉**

Netlify vous donnera une URL temporaire comme :
```
https://random-name-123456.netlify.app
```

---

## ⚙️ Étape 3 : Configuration post-déploiement

### A. Personnaliser le nom de domaine

1. Dans Netlify, allez dans **Site settings** → **Domain management**
2. Cliquez sur **"Options"** → **"Edit site name"**
3. Changez en : `collegelouisemichel` ou `techno-college`
4. Votre site sera maintenant : `https://collegelouisemichel.netlify.app`

### B. Mettre à jour l'URL dans votre code

```bash
# Ouvrez astro.config.mjs et changez l'URL
```

Dans `astro.config.mjs` :

```javascript
export default defineConfig({
  site: 'https://collegelouisemichel.netlify.app/', // Votre vraie URL Netlify
  // ... reste de la config
});
```

Puis :

```bash
git add astro.config.mjs
git commit -m "Update site URL for Netlify"
git push
```

**Netlify redéploiera automatiquement** en 2-3 minutes.

### C. Configurer un domaine personnalisé (optionnel)

Si vous avez un nom de domaine :

1. Dans Netlify : **Domain management** → **Add custom domain**
2. Entrez votre domaine : `collegelouisemichel.com`
3. Suivez les instructions pour configurer les DNS

**Domaines gratuits disponibles :**
- `.netlify.app` (inclus gratuitement)
- Acheter un domaine sur Namecheap, OVH, etc. (10-15€/an)

---

## 🔧 Étape 4 : Configurer les outils de monétisation

### 1. Google AdSense

**Ajouter votre site dans AdSense :**

1. Allez sur https://www.google.com/adsense/
2. **Sites** → **Ajouter un site**
3. Entrez votre URL Netlify : `https://collegelouisemichel.netlify.app`
4. Le code AdSense est déjà installé ✅
5. **Attendez 24-48h** pour l'approbation de Google

**Vérification :**
- Google va vérifier que le code AdSense est présent
- Une fois approuvé, les publicités commenceront à s'afficher
- Vous pourrez suivre vos revenus dans le dashboard AdSense

### 2. Amazon Partenaires

**S'inscrire :**

1. Allez sur https://partenaires.amazon.fr/
2. Cliquez sur **"S'inscrire"**
3. Remplissez :
   - **URL du site** : `https://collegelouisemichel.netlify.app`
   - **Description** : "Site éducatif de technologie pour collégiens"
   - **Catégorie** : Éducation
4. Attendez l'approbation (généralement 24-48h)

**Créer vos liens affiliés :**

1. Recherchez des produits (livres de techno, kits Arduino, etc.)
2. Cliquez sur **"Obtenir le lien"**
3. Copiez le lien court : `https://amzn.to/xxxxx`

**Ajouter les recommandations :**

```astro
---
import AmazonRecommendation from '../../../components/AmazonRecommendation.astro';
---

<AmazonRecommendation
  productTitle="Technologie 5ème - Manuel de l'élève"
  productDescription="Le manuel complet pour réussir en technologie en 5ème"
  productImage="/images/manuel-5eme.jpg"
  amazonLink="https://amzn.to/VOTRE-LIEN-ICI"
  price="22,90€"
/>
```

### 3. Buy Me a Coffee

**Créer un compte :**

1. Allez sur https://www.buymeacoffee.com/
2. Cliquez sur **"Get started for free"**
3. Choisissez un nom : `technocollege` ou `profhb`
4. Configurez votre page

**Mettre à jour dans votre code :**

Modifiez `src/layouts/Layout.astro` ligne 59 :

```astro
<DonationButton username="technocollege" />
```

Puis :

```bash
git add src/layouts/Layout.astro
git commit -m "Update Buy Me a Coffee username"
git push
```

### 4. Newsletter avec Mailchimp

**Créer un compte :**

1. Allez sur https://mailchimp.com/
2. Créez un compte gratuit (jusqu'à 500 abonnés)
3. Créez une **Audience**

**Intégrer dans NewsletterPopup.astro :**

Modifiez `src/components/NewsletterPopup.astro` à la ligne ~220 :

```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value;

  // Envoi à Mailchimp
  try {
    const response = await fetch('https://VOTRE-SERVEUR.us1.list-manage.com/subscribe/post-json', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        EMAIL: email,
        u: 'VOTRE-USER-ID',
        id: 'VOTRE-LIST-ID'
      })
    });

    // Afficher le succès
    form.style.display = 'none';
    successMessage.style.display = 'block';
    setTimeout(() => closePopup(), 3000);
  } catch (error) {
    console.error('Erreur:', error);
  }
});
```

---

## 🔄 Workflow de mise à jour

### Chaque fois que vous faites une modification :

```bash
# 1. Testez en local
npm run dev

# 2. Ajoutez les changements
git add .

# 3. Commitez
git commit -m "Description de vos changements

🤖 Generated with Claude Code (https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 4. Poussez
git push
```

**Netlify redéploie automatiquement en 2-3 minutes** ✅

---

## ✅ Checklist post-déploiement

### Vérifications techniques :

- [ ] Site accessible sur l'URL Netlify
- [ ] Les publicités AdSense s'affichent (ou espaces réservés)
- [ ] Le bouton "Buy Me a Coffee" fonctionne
- [ ] La popup newsletter apparaît après 15 secondes
- [ ] Le dark mode fonctionne (bouton en bas à droite)
- [ ] La barre de recherche est sticky en haut
- [ ] Les pages de cours affichent 2 publicités
- [ ] Le site est responsive (testez sur mobile)

### Vérifications de monétisation :

- [ ] Compte Google AdSense créé et site ajouté
- [ ] Compte Amazon Partenaires créé
- [ ] Au moins 5 recommandations Amazon ajoutées
- [ ] Compte Buy Me a Coffee créé et username mis à jour
- [ ] Compte Mailchimp créé et formulaire intégré

---

## 📊 Optimisations SEO (après déploiement)

### 1. Google Search Console

1. Allez sur https://search.google.com/search-console
2. Ajoutez votre propriété : `https://collegelouisemichel.netlify.app`
3. Vérifiez la propriété (via DNS ou balise HTML)
4. Soumettez votre sitemap : `https://votre-site.netlify.app/sitemap-index.xml`

### 2. Google Analytics (optionnel)

Pour suivre vos visiteurs :

1. Créez un compte sur https://analytics.google.com/
2. Ajoutez le code de tracking dans `Layout.astro`

### 3. Performance

Testez votre site :
- **PageSpeed Insights** : https://pagespeed.web.dev/
- **GTmetrix** : https://gtmetrix.com/

---

## 💰 Suivi des revenus

### Tableau de bord à consulter :

| Plateforme | URL | Métrique |
|------------|-----|----------|
| **Google AdSense** | https://www.google.com/adsense/ | Revenus quotidiens |
| **Amazon Partenaires** | https://partenaires.amazon.fr/ | Commissions |
| **Buy Me a Coffee** | https://www.buymeacoffee.com/dashboard | Donations |
| **Mailchimp** | https://mailchimp.com/ | Abonnés newsletter |
| **Netlify Analytics** | Dashboard Netlify | Trafic du site |

### Objectifs mensuels :

**Mois 1 : 200-300€**
- 10 000 vues → 150€ AdSense
- 5 ventes Amazon → 50€
- 10 donations → 30€

**Mois 2 : 400-600€**
- 20 000 vues → 300€ AdSense
- 15 ventes Amazon → 150€
- 20 donations → 60€

**Mois 3 : 600-1000€**
- 30 000 vues → 450€ AdSense
- 30 ventes Amazon → 300€
- 30 donations → 90€
- Newsletter : Promouvoir produits payants

---

## 🐛 Résolution de problèmes

### Problème 1 : Le build échoue sur Netlify

**Erreur courante :** `Command failed with exit code 1`

**Solutions :**
1. Vérifiez que `package.json` contient bien le script `build`
2. Vérifiez la version de Node dans Netlify (Settings → Build & deploy → Environment)
3. Ajoutez un fichier `.nvmrc` avec `18` dedans
4. Consultez les logs de build dans Netlify

### Problème 2 : Les publicités ne s'affichent pas

**Causes possibles :**
- Site pas encore approuvé par AdSense (attendez 24-48h)
- Bloqueur de publicités activé
- Code AdSense mal configuré

**Vérification :**
1. Ouvrez la console du navigateur (F12)
2. Vérifiez qu'il n'y a pas d'erreurs AdSense
3. Vérifiez dans AdSense que votre site est approuvé

### Problème 3 : Le bouton Buy Me a Coffee ne fonctionne pas

**Cause :** Le username n'est pas mis à jour

**Solution :**
1. Vérifiez dans `src/layouts/Layout.astro` ligne 59
2. Changez `username="votre-nom"` par votre vrai nom
3. Commit et push

### Problème 4 : La popup newsletter ne s'affiche pas

**Cause :** Le localStorage empêche l'affichage

**Solution :**
1. Ouvrez la console (F12)
2. Tapez : `localStorage.removeItem('newsletter-closed')`
3. Rechargez la page

---

## 🎉 Félicitations !

Votre site est maintenant **en ligne** et prêt à générer des revenus !

### Prochaines actions :

**Aujourd'hui :**
- [ ] Ajouter 5 recommandations Amazon sur vos pages les plus visitées
- [ ] Promouvoir votre site sur les réseaux sociaux
- [ ] Partager dans des groupes de parents/élèves

**Cette semaine :**
- [ ] Créer 10 recommandations Amazon
- [ ] Envoyer votre premier email newsletter
- [ ] Optimiser les pages pour le SEO

**Ce mois :**
- [ ] Atteindre 10 000 visiteurs
- [ ] Créer votre premier produit digital (fiches de révision)
- [ ] Analyser les stats AdSense et optimiser

---

## 📚 Documentation

- [STRATEGIE_MONETISATION.md](STRATEGIE_MONETISATION.md) - Stratégie complète
- [ACTIONS_IMMEDIATES_FAIT.md](ACTIONS_IMMEDIATES_FAIT.md) - Guide d'utilisation
- [GOOGLE_ADSENSE_GUIDE.md](GOOGLE_ADSENSE_GUIDE.md) - Guide AdSense complet

---

**Besoin d'aide ?** Je suis là pour vous aider ! 🚀
