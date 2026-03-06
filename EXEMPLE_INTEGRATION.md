# 📝 Exemples d'intégration des nouveaux composants

Ce fichier montre comment intégrer les nouveaux composants dans vos pages.

## 🔍 Intégration du composant de recherche

### Page d'accueil (déjà intégré)

Le composant de recherche a été intégré dans [src/pages/index.astro](src/pages/index.astro:41):

```astro
---
import Search from '../components/Search';
---

<Layout title="Ma page">
  <!-- La barre de recherche s'affiche ici -->
  <Search client:load />
</Layout>
```

### Dans une page de classe (5ème, 4ème, 3ème)

```astro
---
import ClassLayout from '../../layouts/ClassLayout.astro';
import Search from '../../components/Search';
---

<ClassLayout title="5ème - Séquence 1" level="5ème">
  <!-- Ajouter la recherche en haut de page -->
  <Search client:load />

  <!-- Votre contenu -->
  <section>
    <h1>Ma séquence</h1>
    <!-- ... -->
  </section>
</ClassLayout>
```

### Dans une page d'activité

```astro
---
import Layout from '../../../layouts/Layout.astro';
import Search from '../../../components/Search';
---

<Layout title="Activité 1" description="Description de l'activité">
  <main>
    <!-- Recherche en haut -->
    <Search client:load />

    <!-- Contenu de l'activité -->
    <article>
      <h1>Activité 1</h1>
      <!-- ... -->
    </article>
  </main>
</Layout>
```

## 🎨 Utilisation du composant Header

Le composant Header remplace le code HTML de l'en-tête répété sur plusieurs pages.

### Avant (ancien code)

```astro
<header class="hero" data-aos="fade-down">
  <div class="hero-content">
    <div class="logos">
      <a href="...">
        <img src="/images/logo-college.svg" alt="Logo du collège" />
      </a>
      <!-- ... autres logos -->
    </div>
    <h1 class="title">La technologie au collège</h1>
    <button id="openLoginModal" class="login-button">Connexion</button>
  </div>
</header>
```

### Après (nouveau code)

```astro
---
import Header from '../components/Header.astro';
---

<!-- Avec bouton de connexion (par défaut) -->
<Header />

<!-- OU sans bouton de connexion -->
<Header showLoginButton={false} />
```

### Exemple complet

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Search from '../components/Search';
---

<Layout title="Ma page">
  <main>
    <!-- En-tête avec logos -->
    <Header />

    <!-- Barre de recherche -->
    <Search client:load />

    <!-- Votre contenu -->
    <section>
      <h2>Mon contenu</h2>
      <p>Texte...</p>
    </section>
  </main>
</Layout>
```

## 🌓 Le mode sombre

Le mode sombre est **automatiquement disponible** sur toutes les pages via le composant ThemeToggle dans le Layout.

Rien à faire ! Le bouton apparaît automatiquement en bas à droite.

### Pour supporter le mode sombre dans vos styles personnalisés

```css
/* Vos styles */
.mon-element {
  /* Mode clair */
  background: var(--card-bg);
  color: var(--text);
  border: 1px solid var(--border-color);
}

/* Le mode sombre s'appliquera automatiquement grâce aux variables CSS */
```

### Variables CSS disponibles

```css
:root {
  --primary: #2563eb;          /* Couleur primaire */
  --primary-dark: #1e3a8a;     /* Couleur primaire foncée */
  --background: #f8fafc;       /* Fond de page */
  --text: #1e293b;            /* Couleur du texte */
  --card-bg: #ffffff;         /* Fond des cartes */
  --border-color: #e2e8f0;    /* Couleur des bordures */
}

/* En mode sombre, ces valeurs changent automatiquement */
```

## 📄 Optimisation SEO

Chaque page doit avoir des meta tags uniques.

### Utilisation de base

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout
  title="Titre unique de ma page"
  description="Description unique de ma page pour les moteurs de recherche (150-160 caractères)"
>
  <!-- Contenu -->
</Layout>
```

### Utilisation avancée avec SEO personnalisé

```astro
---
import Layout from '../layouts/Layout.astro';
import SEO from '../components/SEO.astro';
---

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />

    <SEO
      title="Mon titre spécifique"
      description="Ma description spécifique"
      keywords="mot-clé1, mot-clé2, technologie, 5ème"
      image="/images/mon-image-specifique.jpg"
      type="article"
    />
  </head>
  <body>
    <!-- Contenu -->
  </body>
</html>
```

## 🎯 Exemple complet d'une nouvelle page

Créons une nouvelle page avec tous les nouveaux composants:

```astro
---
// src/pages/nouvelle-page.astro
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Search from '../components/Search';
import BackButton from '../components/BackButton.astro';
---

<Layout
  title="Ma nouvelle page"
  description="Description de ma nouvelle page pour le SEO"
>
  <main>
    <!-- Bouton retour -->
    <BackButton href="/" />

    <!-- En-tête avec logos -->
    <Header showLoginButton={true} />

    <!-- Barre de recherche -->
    <Search client:load />

    <!-- Contenu principal -->
    <section class="content-section" data-aos="fade-up">
      <h2>Titre de ma section</h2>
      <p>Contenu de ma page...</p>

      <!-- Les cartes supportent automatiquement le mode sombre -->
      <div class="card">
        <h3>Titre de la carte</h3>
        <p>Contenu de la carte</p>
      </div>
    </section>
  </main>
</Layout>

<style>
  .content-section {
    padding: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  .card {
    /* Utilisez les variables CSS pour le mode sombre */
    background: var(--card-bg);
    color: var(--text);
    border: 1px solid var(--border-color);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-top: 1rem;
  }
</style>
```

## ✅ Checklist pour une nouvelle page

Lors de la création d'une nouvelle page, vérifiez:

- [ ] Le composant `Layout` est importé avec `title` et `description` uniques
- [ ] Le composant `Search` est ajouté si la page nécessite une recherche
- [ ] Le composant `Header` est ajouté si vous voulez l'en-tête standard
- [ ] Les styles utilisent les variables CSS (`var(--primary)`, etc.)
- [ ] Les animations AOS sont ajoutées avec `data-aos="fade-up"` si souhaité
- [ ] Les images ont des attributs `alt` descriptifs
- [ ] Les boutons interactifs ont des `aria-label`
- [ ] La page est testée en mode sombre et clair

## 🚀 Tester vos changements

```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:4321

# Tester:
# 1. La recherche (taper au moins 3 caractères)
# 2. Le mode sombre (bouton en bas à droite)
# 3. La navigation au clavier (Tab, Enter)
# 4. Le responsive (redimensionner la fenêtre)
```

## 📚 Ressources

- [Guide d'utilisation complet](GUIDE_UTILISATION.md)
- [Changelog](CHANGELOG.md)
- [README](README.md)

---

Bon développement ! 🎉
