# 📖 Guide d'utilisation des nouvelles fonctionnalités

Ce guide explique comment utiliser les nouveaux composants et fonctionnalités ajoutés au projet.

## 🔍 Système de recherche

### Utilisation

Le composant de recherche permet aux utilisateurs de trouver rapidement des cours, séquences et activités.

**Intégration dans une page:**

```astro
---
import Layout from '../layouts/Layout.astro';
import Search from '../components/Search';
---

<Layout title="Ma page">
  <!-- Importer le CSS de recherche -->
  <link rel="stylesheet" href="/src/styles/search.css" />

  <!-- Ajouter le composant de recherche -->
  <Search client:load />

  <!-- Reste du contenu -->
</Layout>
```

### Ajouter de nouvelles données de recherche

Modifiez le fichier [src/components/Search.tsx](src/components/Search.tsx:12-22):

```typescript
const searchData: SearchResult[] = [
  {
    title: 'Nouveau cours',
    url: '/niveau/sequence',
    description: 'Description du cours',
    level: '5ème' // ou '4ème', '3ème'
  },
  // ... autres entrées
];
```

## 🌓 Mode sombre

### Comment ça fonctionne

Le mode sombre est automatiquement activé grâce au composant [ThemeToggle.astro](src/components/ThemeToggle.astro:1).

- Le thème est sauvegardé dans le `localStorage`
- Respecte la préférence système de l'utilisateur
- Bouton flottant en bas à droite de l'écran

### Personnaliser les couleurs du mode sombre

Dans [src/layouts/Layout.astro](src/layouts/Layout.astro:75-82):

```css
[data-theme="dark"] {
  --primary: #3b82f6;           /* Couleur primaire en mode sombre */
  --primary-dark: #60a5fa;      /* Couleur primaire foncée */
  --background: #0f172a;        /* Fond général */
  --text: #f1f5f9;             /* Couleur du texte */
  --card-bg: #1e293b;          /* Fond des cartes */
  --border-color: #334155;     /* Couleur des bordures */
}
```

### Ajouter le support du mode sombre à vos composants

Pour qu'un composant supporte le mode sombre, utilisez les variables CSS:

```css
.mon-composant {
  background: var(--card-bg);
  color: var(--text);
  border: 1px solid var(--border-color);
}
```

## 📄 Composant Header

### Utilisation

Le composant [Header.astro](src/components/Header.astro:1) affiche l'en-tête avec les logos et le titre.

```astro
---
import Header from '../components/Header.astro';
---

<!-- Header avec bouton de connexion (par défaut) -->
<Header />

<!-- Header sans bouton de connexion -->
<Header showLoginButton={false} />
```

### Propriétés

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `showLoginButton` | `boolean` | `true` | Affiche ou cache le bouton de connexion |

## 🎨 Composant SEO amélioré

### Utilisation de base

```astro
---
import SEO from '../components/SEO.astro';
---

<SEO
  title="Titre de la page"
  description="Description de la page pour les moteurs de recherche"
/>
```

### Toutes les options

```astro
<SEO
  title="Titre de la page"
  description="Description de la page"
  image="/images/mon-image-og.jpg"
  keywords="mot-clé1, mot-clé2, mot-clé3"
  type="article"
  canonicalURL="https://collegelouisemichel.com/ma-page"
  noindex={false}
/>
```

### Propriétés

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `string` | **requis** | Titre de la page |
| `description` | `string` | **requis** | Description de la page |
| `image` | `string` | `/images/og-image.jpg` | Image Open Graph |
| `keywords` | `string` | `'technologie, collège...'` | Mots-clés SEO |
| `type` | `string` | `'website'` | Type Open Graph |
| `canonicalURL` | `string` | URL actuelle | URL canonique |
| `noindex` | `boolean` | `false` | Empêche l'indexation |

## 🎯 Bonnes pratiques

### SEO
- Toujours fournir un `title` et une `description` uniques pour chaque page
- Les descriptions doivent faire 150-160 caractères
- Les titres doivent faire 50-60 caractères
- Utiliser des mots-clés pertinents

### Accessibilité
- Utiliser `aria-label` sur les boutons sans texte
- Assurer un contraste de couleurs suffisant
- Tester la navigation au clavier (Tab, Enter, Escape)

### Performance
- Optimiser les images avant de les ajouter
- Utiliser le format WebP quand possible
- Limiter le nombre de composants React sur une page

## 🧪 Tester les améliorations

### Tester le mode sombre
1. Ouvrir le site en mode développement
2. Cliquer sur le bouton rond en bas à droite
3. Vérifier que tous les éléments changent de couleur
4. Actualiser la page - le thème doit être conservé

### Tester la recherche
1. Taper au moins 3 caractères dans la barre de recherche
2. Vérifier que les résultats s'affichent
3. Cliquer sur un résultat - doit rediriger vers la bonne page
4. Tester avec "Escape" - doit fermer les résultats

### Tester l'accessibilité
1. Naviguer avec Tab uniquement
2. Tous les éléments interactifs doivent être accessibles
3. Les focus doivent être visibles
4. Enter doit activer les boutons

## 🚀 Déploiement

Après avoir fait des modifications:

```bash
# Tester en local
npm run dev

# Builder pour vérifier qu'il n'y a pas d'erreurs
npm run build

# Prévisualiser le build
npm run preview

# Committer les changements
git add .
git commit -m "Description des changements"
git push
```

Vercel détectera automatiquement le push et déploiera le site.

## 🆘 Problèmes courants

### Le mode sombre ne fonctionne pas
- Vérifier que `ThemeToggle` est bien importé dans le Layout
- Vider le cache du navigateur
- Vérifier la console pour des erreurs JavaScript

### La recherche ne trouve rien
- Vérifier que les données dans `searchData` sont bien formatées
- Les recherches de moins de 3 caractères ne donnent pas de résultats

### Erreurs TypeScript
- Exécuter `npm install` pour s'assurer que toutes les dépendances sont installées
- Vérifier que les types sont correctement importés

## 📚 Ressources utiles

- [Documentation Astro](https://docs.astro.build)
- [Documentation React](https://react.dev)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Guide d'accessibilité WCAG](https://www.w3.org/WAI/WCAG21/quickref/)

---

Pour toute question, consultez la documentation officielle des frameworks ou ouvrez une issue sur GitHub.
