# 🚀 Guide d'installation - Projet CollegeLM

## ⚠️ Important - Première étape

**Avant toute chose, vous DEVEZ installer les dépendances:**

```bash
npm install
```

Cette commande va:
- ✅ Installer toutes les dépendances du projet
- ✅ Créer le dossier `node_modules/`
- ✅ Résoudre les erreurs TypeScript
- ✅ Préparer le projet pour le développement

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir:

- **Node.js 18.x ou supérieur** ([Télécharger](https://nodejs.org/))
- **npm** (inclus avec Node.js)
- Un éditeur de code (VSCode recommandé)

### Vérifier votre version de Node

```bash
node --version  # Doit afficher v18.x ou supérieur
npm --version   # Doit afficher 9.x ou supérieur
```

## 🔧 Installation complète

### Étape 1: Installation des dépendances

```bash
cd "/Users/admin/Downloads/collegeLM-main 2"
npm install
```

**Durée:** 2-3 minutes

**Ce qui est installé:**
- Astro 4.15.3
- React 18.2.0
- Tailwind CSS 3.4.17
- Sharp (optimisation d'images)
- AOS (animations)
- Supabase (base de données)
- Et toutes les autres dépendances

### Étape 2: Vérification de l'installation

```bash
# Vérifier qu'Astro est bien installé
npx astro --version
```

Vous devriez voir: `astro v4.15.3` (ou similaire)

### Étape 3: Lancer le serveur de développement

```bash
npm run dev
```

Le serveur démarre sur: **http://localhost:4321**

## 🐛 Résolution des problèmes

### Erreur: "astro/tsconfigs/strict introuvable"

**Cause:** Les dépendances ne sont pas installées.

**Solution:**
```bash
npm install
```

Puis redémarrez VSCode ou votre éditeur.

### Erreur: "Module 'react' introuvable"

**Cause:** Les dépendances React ne sont pas installées.

**Solution:**
```bash
npm install
```

### Erreur: "Command not found: astro"

**Cause:** Node.js n'est pas installé ou les dépendances ne sont pas installées.

**Solution:**
1. Vérifier Node.js: `node --version`
2. Si absent, installer Node.js depuis [nodejs.org](https://nodejs.org/)
3. Installer les dépendances: `npm install`

### Erreurs TypeScript dans VSCode

**Solution:**
1. Installer les dépendances: `npm install`
2. Redémarrer VSCode: `Cmd+Shift+P` → "Reload Window"
3. Si ça persiste: Supprimer `node_modules` et réinstaller
   ```bash
   rm -rf node_modules
   npm install
   ```

### Port 4321 déjà utilisé

**Solution:**
```bash
# Utiliser un autre port
npm run dev -- --port 3000
```

Ou tuer le processus qui utilise le port 4321:
```bash
# Mac/Linux
lsof -ti:4321 | xargs kill -9
```

## 📦 Structure après installation

```
collegeLM-main 2/
├── node_modules/          ← ✅ Créé après npm install
│   ├── astro/
│   ├── react/
│   ├── tailwindcss/
│   └── ... (1000+ packages)
├── .astro/               ← ✅ Créé au premier lancement
├── dist/                 ← ✅ Créé après npm run build
├── src/
├── public/
└── package.json
```

## 🎯 Commandes disponibles

Une fois les dépendances installées:

```bash
# Développement
npm run dev              # Lance le serveur (localhost:4321)

# Production
npm run build           # Compile le projet
npm run preview         # Prévisualise le build

# Utilitaires
npm run astro           # Commandes Astro CLI
npm run astro check     # Vérifie TypeScript
```

## ✅ Checklist d'installation

- [ ] Node.js 18+ installé
- [ ] Projet téléchargé/cloné
- [ ] `npm install` exécuté avec succès
- [ ] `npm run dev` fonctionne
- [ ] Site accessible sur http://localhost:4321
- [ ] Aucune erreur TypeScript dans VSCode

## 🚀 Prochaines étapes

Une fois l'installation terminée:

1. **Tester la barre de recherche**
   - Tapez au moins 3 caractères
   - Vérifiez que les résultats s'affichent

2. **Tester le mode sombre**
   - Cliquez sur le bouton en bas à droite
   - Vérifiez que tout fonctionne

3. **Explorer la documentation**
   - [DEMARRAGE_RAPIDE.md](DEMARRAGE_RAPIDE.md)
   - [GUIDE_UTILISATION.md](GUIDE_UTILISATION.md)
   - [EXEMPLE_INTEGRATION.md](EXEMPLE_INTEGRATION.md)

## 💡 Conseils

### Pour VSCode

**Extensions recommandées** (installées automatiquement si `.vscode/extensions.json` existe):
- Astro
- Tailwind CSS IntelliSense
- ESLint
- Prettier

**Pour forcer VSCode à recharger TypeScript:**
1. Ouvrir un fichier `.ts` ou `.tsx`
2. `Cmd+Shift+P` (Mac) ou `Ctrl+Shift+P` (Windows)
3. Taper: "TypeScript: Restart TS Server"

### Nettoyage complet

Si vous rencontrez des problèmes persistants:

```bash
# Supprimer tous les fichiers générés
rm -rf node_modules .astro dist

# Réinstaller
npm install

# Relancer
npm run dev
```

## 📊 Temps d'installation estimé

- **npm install:** 2-3 minutes
- **Premier lancement:** 10-15 secondes
- **Build production:** 30-60 secondes

## 🆘 Besoin d'aide?

Si vous rencontrez des problèmes:

1. **Vérifier la console** pour les messages d'erreur
2. **Consulter** [DEMARRAGE_RAPIDE.md](DEMARRAGE_RAPIDE.md)
3. **Vérifier** que Node.js 18+ est installé
4. **Réinstaller** les dépendances si nécessaire

## 🎊 Installation réussie!

Si vous voyez ce message dans votre terminal:

```
  🚀  astro  v4.15.3 started in XXms

  ┃ Local    http://localhost:4321/
  ┃ Network  use --host to expose

  watching for file changes...
```

**Félicitations! Le projet est prêt! 🎉**

Ouvrez votre navigateur sur **http://localhost:4321** pour voir le site.

---

**Prochaine étape:** Lisez [DEMARRAGE_RAPIDE.md](DEMARRAGE_RAPIDE.md) pour découvrir les nouvelles fonctionnalités!
