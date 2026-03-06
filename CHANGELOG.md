# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [2.0.0] - 2025-12-22

### 🎉 Ajouté

#### Nouvelles fonctionnalités
- **Système de recherche global** - Permet de rechercher des cours, séquences et activités
  - Recherche instantanée avec suggestions
  - Résultats filtrés par niveau (5ème, 4ème, 3ème)
  - Interface utilisateur moderne avec animations
  - Support du clavier (Escape pour fermer)

- **Mode sombre/clair** - Thème adaptatif avec préférence utilisateur
  - Bouton de bascule flottant
  - Sauvegarde de la préférence dans localStorage
  - Respect de la préférence système
  - Transitions fluides entre les thèmes
  - Variables CSS personnalisables

- **Composant Header réutilisable** - En-tête standardisé
  - Logos des institutions (Collège, Académie, PCN)
  - Animations au survol
  - Option pour afficher/masquer le bouton de connexion
  - Responsive et accessible

- **Composant ThemeToggle** - Bouton de changement de thème
  - Icônes animées (soleil/lune)
  - Position fixe en bas à droite
  - Accessible au clavier et lecteurs d'écran

#### Documentation
- **README.md complet** avec:
  - Badges de technologies
  - Table des matières
  - Instructions d'installation détaillées
  - Structure du projet documentée
  - Guide de contribution

- **GUIDE_UTILISATION.md** - Guide pour les nouveaux composants
  - Exemples d'utilisation
  - Documentation des props
  - Bonnes pratiques
  - Résolution de problèmes

- **CHANGELOG.md** - Historique des modifications

### ⚡ Amélioré

#### Performance
- **Configuration Astro optimisée**
  - Inline automatique des petits CSS
  - Service Sharp pour l'optimisation d'images
  - Support des images distantes

- **Configuration Vite améliorée**
  - Code splitting activé
  - Séparation des vendors React
  - Rollup optimisé pour la production

#### SEO
- **Composant SEO enrichi** avec:
  - Support des mots-clés personnalisés
  - Images Open Graph absolues
  - Meta tags Twitter Cards
  - Balises robots et googlebot
  - Preconnect aux domaines externes
  - Meta tag `theme-color`
  - Attribut `author`

#### Accessibilité
- **ARIA labels** ajoutés sur tous les boutons interactifs
- **Navigation au clavier** améliorée
- **Focus visible** sur tous les éléments interactifs
- **Attributs alt** sur toutes les images
- **Contraste** amélioré en mode sombre

#### Structure du code
- **.gitignore optimisé** avec:
  - Fichiers cache (.astro, .vercel)
  - Fichiers éditeur
  - Variables d'environnement
  - Fichiers temporaires

- **Repository Git initialisé**
- **Organisation des fichiers** améliorée

### 🗑️ Supprimé

- **Dossier `project/`** - Template Astro inutilisé supprimé
- **Code dupliqué** - Refactorisation pour éviter la duplication

### 🔧 Corrigé

- **Erreurs TypeScript** dans les scripts inline
  - Ajout de `is:inline` sur les scripts Google AdSense
  - Ajout de `is:inline` sur les données structurées

### 🎨 Style

- **Variables CSS** uniformisées pour le mode sombre
- **Transitions** ajoutées sur les changements de thème
- **Cartes** avec meilleur contraste en mode sombre
- **Boutons** avec animations au hover

### 📦 Dépendances

Aucune nouvelle dépendance ajoutée - utilisation optimale des packages existants:
- astro@4.15.3
- react@18.2.0
- @astrojs/tailwind@5.1.4
- sharp@0.33.2
- aos@2.3.4

## [1.0.0] - 2024-09-19

### Ajouté
- Version initiale du site
- Pages pour les 3 niveaux (5ème, 4ème, 3ème)
- Système de séquences pédagogiques
- Calculateur de notes pour le Brevet
- Guide d'orientation
- Quiz interactifs
- Intégration Google AdSense
- Déploiement sur Vercel

---

## Types de changements

- `Ajouté` pour les nouvelles fonctionnalités
- `Amélioré` pour les changements dans les fonctionnalités existantes
- `Déprécié` pour les fonctionnalités qui seront bientôt supprimées
- `Supprimé` pour les fonctionnalités supprimées
- `Corrigé` pour les corrections de bugs
- `Sécurité` pour les vulnérabilités corrigées
