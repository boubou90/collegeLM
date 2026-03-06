# 🚀 Guide de démarrage rapide

Ce guide vous permet de démarrer rapidement avec le projet amélioré.

## ⚡ Installation et premier lancement

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir votre navigateur sur:
# http://localhost:4321
```

## 🎨 Tester les nouvelles fonctionnalités

### 1. Barre de recherche
- Allez sur la page d'accueil
- Tapez au moins 3 caractères dans la barre de recherche
- Cliquez sur un résultat pour naviguer

### 2. Mode sombre
- Cliquez sur le bouton rond en bas à droite (icône soleil/lune)
- Le site bascule entre mode clair et sombre
- Votre préférence est sauvegardée automatiquement

### 3. Navigation au clavier
- Utilisez la touche `Tab` pour naviguer
- `Enter` pour activer les boutons
- `Escape` pour fermer la recherche

## 📂 Fichiers importants créés

### Composants
- `src/components/Search.tsx` - Barre de recherche
- `src/components/Header.astro` - En-tête réutilisable
- `src/components/ThemeToggle.astro` - Bouton mode sombre

### Styles
- `src/styles/search.css` - Styles de la recherche

### Types
- `src/types/aos.d.ts` - Types TypeScript pour AOS

### Documentation
- `README.md` - Documentation complète
- `GUIDE_UTILISATION.md` - Guide des composants
- `EXEMPLE_INTEGRATION.md` - Exemples de code
- `CHANGELOG.md` - Historique des changements
- `DEMARRAGE_RAPIDE.md` - Ce fichier

## 🔧 Personnalisation rapide

### Modifier les couleurs du mode sombre

Éditez `src/layouts/Layout.astro`:

```css
[data-theme="dark"] {
  --primary: #3b82f6;        /* Changez cette couleur */
  --background: #0f172a;     /* Changez le fond */
  --text: #f1f5f9;          /* Changez la couleur du texte */
}
```

### Ajouter des données à la recherche

Éditez `src/components/Search.tsx`:

```typescript
const searchData: SearchResult[] = [
  {
    title: 'Mon nouveau cours',
    url: '/chemin/vers/page',
    description: 'Description du cours',
    level: '5ème' // ou '4ème', '3ème'
  },
  // ... autres entrées
];
```

### Utiliser la recherche sur une autre page

```astro
---
import Search from '../components/Search';
---

<Layout title="Ma page">
  <Search client:load />
  <!-- Votre contenu -->
</Layout>
```

## 📦 Commandes disponibles

```bash
# Développement
npm run dev              # Démarre le serveur (http://localhost:4321)

# Production
npm run build           # Compile le site
npm run preview         # Prévisualise le build

# Autres
npm run astro           # Commandes Astro CLI
```

## 🐛 Résolution de problèmes

### La recherche ne s'affiche pas
1. Vérifiez que `Search` est importé: `import Search from '../components/Search'`
2. Vérifiez que `client:load` est présent: `<Search client:load />`
3. Ouvrez la console du navigateur pour voir les erreurs

### Le mode sombre ne fonctionne pas
1. Vérifiez que `ThemeToggle` est dans le Layout
2. Videz le cache du navigateur (Cmd+Shift+R ou Ctrl+Shift+R)
3. Vérifiez la console pour des erreurs JavaScript

### Erreurs de build
1. Supprimez `node_modules` et `.astro`: `rm -rf node_modules .astro`
2. Réinstallez: `npm install`
3. Relancez: `npm run dev`

### Erreurs TypeScript
1. Vérifiez que le fichier `src/types/aos.d.ts` existe
2. Redémarrez VSCode ou votre éditeur

## 🎯 Prochaines étapes

1. **Explorez les exemples**: Lisez [EXEMPLE_INTEGRATION.md](EXEMPLE_INTEGRATION.md)
2. **Personnalisez**: Adaptez les couleurs et le contenu à vos besoins
3. **Ajoutez du contenu**: Créez de nouvelles pages avec les composants
4. **Testez**: Vérifiez sur mobile, tablette et desktop
5. **Déployez**: Pushez sur Git, Vercel déploiera automatiquement

## 📚 Documentation complète

- **[README.md](README.md)** - Documentation technique complète
- **[GUIDE_UTILISATION.md](GUIDE_UTILISATION.md)** - Guide d'utilisation des composants
- **[EXEMPLE_INTEGRATION.md](EXEMPLE_INTEGRATION.md)** - Exemples de code
- **[CHANGELOG.md](CHANGELOG.md)** - Liste des changements

## 💡 Conseils

- **Utilisez les variables CSS** pour garantir la compatibilité mode sombre
- **Testez toujours** en mode clair ET sombre
- **Ajoutez des `aria-label`** sur les boutons sans texte
- **Optimisez les images** avant de les ajouter au projet
- **Écrivez des descriptions SEO** uniques pour chaque page

## 🆘 Besoin d'aide ?

1. Consultez la documentation dans les fichiers `.md`
2. Vérifiez la console du navigateur pour les erreurs
3. Assurez-vous que toutes les dépendances sont installées

---

**Bon développement ! 🎉**

Le site est maintenant équipé de:
- ✅ Recherche intelligente
- ✅ Mode sombre automatique
- ✅ SEO optimisé
- ✅ Accessibilité améliorée
- ✅ Performance maximale
