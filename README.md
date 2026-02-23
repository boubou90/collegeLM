# 🎓 La Technologie au Collège Louise Michel

Site web éducatif pour les cours de technologie au collège, conçu avec Astro et déployé sur Vercel.

[![Astro](https://img.shields.io/badge/Astro-4.15.3-FF5D01?style=flat&logo=astro)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)

## 📋 Table des matières

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Scripts disponibles](#scripts-disponibles)
- [Déploiement](#déploiement)
- [Améliorations récentes](#améliorations-récentes)
- [Contribution](#contribution)

## 🎯 Présentation

Ce site web propose des ressources pédagogiques complètes pour les cours de technologie du Collège Louise Michel à Paris. Il couvre les trois niveaux de collège (5ème, 4ème, 3ème) avec des séquences d'apprentissage, des activités pratiques, et des outils de préparation au Brevet.

**URL du site** : [https://collegelouisemichel.com](https://collegelouisemichel.com)

## ✨ Fonctionnalités

### 📚 Contenu pédagogique
- **Séquences structurées** pour chaque niveau (5ème, 4ème, 3ème)
- **Documents PDF** téléchargeables pour chaque activité
- **Ressources vidéo** et supports multimédias
- **Fiches de révision** pour le Brevet

### 🔍 Outils interactifs
- **Système de recherche** pour trouver rapidement des cours et activités
- **Calculateur de notes** pour le Brevet
- **Quiz interactifs** pour tester les connaissances
- **Guide d'orientation** avec informations sur les lycées parisiens

### 🎨 Interface moderne
- **Design responsive** adapté mobile, tablette et desktop
- **Mode sombre/clair** avec préférence système
- **Animations au scroll** avec AOS (Animate On Scroll)
- **Accessibilité** améliorée (ARIA labels, navigation clavier)

### ⚡ Performance
- **Site statique** généré avec Astro pour un chargement ultra-rapide
- **Optimisation des images** avec Sharp
- **Code splitting** et minification automatique
- **SEO optimisé** avec meta tags complets

## 🛠️ Technologies

### Framework & Build
- **[Astro 4.15.3](https://astro.build)** - Framework de génération de sites statiques
- **[Vite](https://vitejs.dev)** - Build tool moderne et rapide

### Frontend
- **[React 18.2.0](https://react.dev)** - Pour les composants interactifs
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique
- **[Tailwind CSS 3.4.17](https://tailwindcss.com)** - Framework CSS utilitaire

### Librairies & outils
- **[AOS](https://michalsnik.github.io/aos/)** - Animations au scroll
- **[Sharp](https://sharp.pixelplumbing.com/)** - Optimisation d'images
- **[Supabase](https://supabase.com)** - Backend (authentification)
- **[Bootstrap Icons](https://icons.getbootstrap.com/)** - Icônes

### Déploiement
- **[Vercel](https://vercel.com)** - Hébergement et déploiement continu

## 📦 Installation

> ⚠️ **Important:** Pour un guide d'installation détaillé avec résolution des problèmes, consultez **[INSTALLATION.md](INSTALLATION.md)**

### Prérequis
- Node.js 18.x ou supérieur
- npm ou yarn

### Installation rapide

```bash
# Cloner le repository
git clone https://github.com/votre-username/collegeLM.git
cd collegeLM

# ⚠️ ÉTAPE OBLIGATOIRE: Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:4321](http://localhost:4321)

> 💡 **Note:** L'exécution de `npm install` est **obligatoire** avant le premier lancement pour installer toutes les dépendances nécessaires.

## 📁 Structure du projet

```
collegeLM/
├── public/                      # Fichiers statiques
│   ├── documents/              # PDFs organisés par niveau et séquence
│   │   ├── 5eme/
│   │   ├── 4eme/
│   │   └── 3eme/
│   ├── images/                 # Images et logos
│   └── videos/                 # Ressources vidéo
│
├── src/
│   ├── components/             # Composants réutilisables
│   │   ├── Brevet/            # Composants pour le Brevet
│   │   ├── Orientation/       # Composants d'orientation
│   │   ├── Header.astro       # En-tête avec logos
│   │   ├── Search.tsx         # Barre de recherche
│   │   ├── SEO.astro          # Meta tags SEO
│   │   └── ThemeToggle.astro  # Bouton mode sombre
│   │
│   ├── data/                   # Données structurées
│   │   ├── lycees.ts          # Liste des lycées généraux
│   │   ├── lyceesProf.ts      # Liste des lycées professionnels
│   │   └── quizzes.ts         # Données des quiz
│   │
│   ├── layouts/                # Templates de pages
│   │   ├── Layout.astro       # Layout principal
│   │   └── ClassLayout.astro  # Layout pour les classes
│   │
│   ├── pages/                  # Pages du site (routing)
│   │   ├── index.astro        # Page d'accueil
│   │   ├── 5eme/              # Pages pour la 5ème
│   │   ├── 4eme/              # Pages pour la 4ème
│   │   ├── 3eme/              # Pages pour la 3ème
│   │   └── actualites/        # Articles d'actualités
│   │
│   ├── styles/                 # Styles CSS
│   │   ├── search.css         # Styles de recherche
│   │   ├── colors.ts          # Palette de couleurs
│   │   └── sequence-colors.ts # Couleurs par séquence
│   │
│   ├── utils/                  # Fonctions utilitaires
│   │   ├── brevet.ts          # Calculs pour le Brevet
│   │   └── quiz.ts            # Logique des quiz
│   │
│   └── types/                  # Types TypeScript
│       └── lycee.ts
│
├── astro.config.mjs            # Configuration Astro
├── tailwind.config.mjs         # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
└── package.json                # Dépendances
```

## 🚀 Scripts disponibles

```bash
# Développement
npm run dev              # Lance le serveur de développement

# Build
npm run build           # Compile le site pour la production
npm run preview         # Prévisualise le build de production

# Astro
npm run astro           # Commandes Astro CLI
```

## 🌐 Déploiement

Le site est automatiquement déployé sur Vercel à chaque push sur la branche `main`.

### Déploiement manuel

```bash
# Build pour la production
npm run build

# Le dossier dist/ contient le site statique prêt à être déployé
```

### Configuration Vercel

Le fichier `vercel.json` contient la configuration spécifique pour Vercel.

## 🎉 Améliorations récentes

### Optimisations de performance ⚡
- ✅ Configuration Vite optimisée avec code splitting
- ✅ Optimisation des images avec Sharp
- ✅ Minification et tree-shaking activés
- ✅ Inline des petits CSS automatique

### Nouvelles fonctionnalités 🆕
- ✅ **Système de recherche** pour trouver rapidement du contenu
- ✅ **Mode sombre** avec préférence système
- ✅ **Composant Header réutilisable** pour maintenir la cohérence
- ✅ **Composant ThemeToggle** pour changer de thème

### Améliorations SEO 📈
- ✅ Meta tags enrichis (Open Graph, Twitter Cards)
- ✅ Support des mots-clés personnalisés
- ✅ Preconnect aux domaines externes
- ✅ Images OG absolues
- ✅ Balises robots et googlebot

### Accessibilité ♿
- ✅ Labels ARIA sur tous les boutons interactifs
- ✅ Navigation au clavier améliorée
- ✅ Focus visible sur les éléments interactifs
- ✅ Attributs `aria-label` ajoutés

### Structure du code 🏗️
- ✅ .gitignore optimisé
- ✅ Dossier project inutile supprimé
- ✅ Repository Git initialisé
- ✅ README complet et détaillé

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. **Créer** une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### Guidelines
- Suivre la structure de code existante
- Tester en local avant de commit
- Documenter les nouvelles fonctionnalités
- Optimiser les performances

## 📝 Licence

Ce projet est destiné à un usage éducatif pour le Collège Louise Michel.

## 👥 Auteurs

- **Collège Louise Michel** - Paris
- **Académie de Paris**

## 📧 Contact

Pour toute question concernant le site ou les ressources pédagogiques, veuillez contacter le collège.

---

**Fait avec ❤️ pour l'éducation**
