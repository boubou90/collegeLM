# 🖼️ Résolution des problèmes d'affichage des images PNG

## ❓ Pourquoi les fichiers PNG n'apparaissent plus?

Il y a plusieurs raisons possibles:

### 1. **Le serveur de développement n'est pas lancé** ⚠️

**Problème:** Les images statiques du dossier `public/` ne sont accessibles que lorsque le serveur Astro est en cours d'exécution.

**Solution:**
```bash
# Lancer le serveur de développement
npm run dev
```

Ensuite, ouvrez: http://localhost:4321

**Les images seront accessibles à:**
- `http://localhost:4321/images/logo-pcn.png`
- `http://localhost:4321/images/bete-a-cornes.png`
- etc.

### 2. **Les dépendances ne sont pas installées** ⚠️

**Problème:** Sharp (optimisation d'images) nécessite l'installation des dépendances.

**Solution:**
```bash
npm install
```

### 3. **Problème de cache** 🔄

**Problème:** Le navigateur ou Astro a mis en cache une ancienne version.

**Solution:**
```bash
# Supprimer le cache Astro
rm -rf .astro

# Relancer le serveur
npm run dev
```

**Dans le navigateur:**
- Chrome/Edge: `Cmd+Shift+R` (Mac) ou `Ctrl+Shift+R` (Windows)
- Firefox: `Cmd+Shift+R` (Mac) ou `Ctrl+F5` (Windows)

### 4. **Chemins d'images incorrects** 📁

**Problème:** Les chemins vers les images ne sont pas corrects.

**Vérification:**

Les images dans le dossier `public/` sont accessibles directement:

```astro
<!-- ✅ CORRECT -->
<img src="/images/logo-pcn.png" alt="Logo" />

<!-- ❌ INCORRECT -->
<img src="public/images/logo-pcn.png" alt="Logo" />
<img src="../public/images/logo-pcn.png" alt="Logo" />
```

### 5. **Configuration Sharp** 🔧

**Problème:** La configuration Sharp peut causer des problèmes si mal configurée.

**Solution temporaire** - Modifier `astro.config.mjs`:

```javascript
// Si vous avez des problèmes, commentez temporairement la section image:
export default defineConfig({
  // ... autres configs

  // Commentez temporairement cette section
  // image: {
  //   service: {
  //     entrypoint: 'astro/assets/services/sharp'
  //   },
  //   remotePatterns: [{ protocol: 'https' }]
  // },
})
```

Puis relancez:
```bash
npm run dev
```

## ✅ Vérification rapide

### Étape 1: Vérifier que les fichiers existent

```bash
ls -la public/images/*.png
```

Vous devriez voir:
```
bete-a-cornes.png
boites-action-test.png
chaines-integree.png
communication-reseau.png
exemple-robot.png
formes-energie.png
la-chaine-d-energie.png
la-chaine-d-information.png
logo-pcn.png
organigramme-exemple.png
organigramme-symboles.png
sources-energie.png
sous-problemes.png
utilisation-energie.png
```

### Étape 2: Lancer le serveur

```bash
npm run dev
```

### Étape 3: Tester l'accès direct

Ouvrez dans votre navigateur:
```
http://localhost:4321/images/logo-pcn.png
```

**Si l'image s'affiche:** ✅ Les images fonctionnent!
**Si erreur 404:** ⚠️ Problème de configuration

## 🔍 Diagnostic approfondi

### Vérifier le build

```bash
# Compiler le projet
npm run build

# Vérifier que les images sont copiées
ls -la dist/images/
```

Les images PNG devraient être dans `dist/images/`.

### Vérifier les permissions

```bash
# S'assurer que les images sont lisibles
chmod 644 public/images/*.png
```

### Vérifier la structure

```bash
tree public/images/
```

Structure attendue:
```
public/images/
├── logo-pcn.png
├── logo-college.svg
├── logo-academie.svg
├── bete-a-cornes.png
├── ...
└── autres fichiers
```

## 🐛 Problèmes spécifiques

### Les PNG ne s'affichent pas mais les SVG oui

**Cause:** Problème avec la configuration Sharp pour les PNG.

**Solution:**
1. Vérifier que Sharp est installé:
   ```bash
   npm list sharp
   ```

2. Réinstaller Sharp si nécessaire:
   ```bash
   npm install sharp@0.33.2 --save
   ```

3. Redémarrer le serveur:
   ```bash
   npm run dev
   ```

### Les images s'affichent en local mais pas en production

**Cause:** Les images ne sont pas incluses dans le build.

**Solution:**
1. Vérifier le build:
   ```bash
   npm run build
   ls dist/images/
   ```

2. S'assurer que `output: 'static'` est dans `astro.config.mjs`

### Erreur "Failed to optimize image"

**Cause:** Sharp a des problèmes avec certaines images.

**Solution temporaire:**
1. Désactiver l'optimisation Sharp (voir section 5 ci-dessus)
2. Ou convertir les PNG en WebP:
   ```bash
   npm install -g sharp-cli
   sharp -i public/images/*.png -o public/images/ -f webp
   ```

## 💡 Bonnes pratiques

### 1. Utiliser des chemins absolus

```astro
<!-- ✅ Recommandé -->
<img src="/images/logo.png" alt="Logo" />

<!-- ❌ À éviter -->
<img src="../images/logo.png" alt="Logo" />
```

### 2. Optimiser les images avant de les ajouter

```bash
# Réduire la taille avec ImageMagick
convert input.png -quality 85 output.png

# Ou avec pngquant
pngquant --quality=65-80 input.png
```

### 3. Spécifier les dimensions

```astro
<img
  src="/images/logo.png"
  alt="Logo"
  width="200"
  height="100"
/>
```

### 4. Utiliser le composant Image d'Astro (optionnel)

```astro
---
import { Image } from 'astro:assets';
import monImage from '../public/images/logo.png';
---

<Image src={monImage} alt="Logo" />
```

## 🚀 Solution rapide (Checklist)

- [ ] `npm install` exécuté
- [ ] `npm run dev` lancé
- [ ] Serveur accessible sur http://localhost:4321
- [ ] Cache navigateur vidé (`Cmd+Shift+R`)
- [ ] Cache Astro supprimé (`rm -rf .astro`)
- [ ] Chemins d'images corrects (`/images/...`)
- [ ] Fichiers PNG présents dans `public/images/`
- [ ] Permissions correctes (`chmod 644`)

## 📞 Si rien ne fonctionne

**Nettoyage complet:**

```bash
# 1. Arrêter le serveur (Ctrl+C)

# 2. Nettoyer tout
rm -rf node_modules .astro dist

# 3. Réinstaller
npm install

# 4. Relancer
npm run dev
```

## ✅ Test final

Une fois le serveur lancé, testez ces URLs:

1. http://localhost:4321/images/logo-pcn.png
2. http://localhost:4321/images/bete-a-cornes.png
3. http://localhost:4321/images/formes-energie.png

**Si ces 3 images s'affichent, tout fonctionne! 🎉**

---

**Cause la plus fréquente:** Le serveur n'est pas lancé (`npm run dev`)

**Solution la plus simple:**
```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:4321
