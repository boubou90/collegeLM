# 🧠 PROMPT — Mode Dyslexique
# À copier dans Claude VS Code

---

Tu es un expert Astro + Tailwind CSS.
Mon site est **collegelouisemichel.net** (Astro, déployé sur Netlify).

## 🎯 MISSION

Ajouter un bouton **"Mode Dyslexique"** accessible sur toutes les pages du site.
Ce mode utilise la police OpenDyslexic pour aider les élèves dyslexiques à mieux lire.

## 📋 CE QUE TU DOIS FAIRE

### ÉTAPE 1 — Lire les fichiers avant de toucher quoi que ce soit

Ouvre et lis ces fichiers :
- `src/layouts/Layout.astro` (structure globale)
- `src/styles/global.css` ou équivalent (pour savoir où mettre le CSS)
- Le composant Header si il existe (`src/components/Header.astro`)

Dis-moi ce que tu as trouvé avant de modifier quoi que ce soit.

---

### ÉTAPE 2 — Ajouter les styles CSS

Dans le fichier de styles globaux (global.css ou dans le `<style>` de Layout.astro),
ajoute ce code :

```css
/* Police OpenDyslexic */
@font-face {
  font-family: 'OpenDyslexic';
  src: url('https://cdn.jsdelivr.net/npm/opendyslexic@1.0.3/OpenDyslexic-Regular.otf');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Mode dyslexique activé */
body.dyslexic-mode {
  font-family: 'OpenDyslexic', sans-serif !important;
  font-size: 1.05rem !important;
  line-height: 1.8 !important;
  letter-spacing: 0.05em !important;
  word-spacing: 0.1em !important;
}

/* Style du bouton */
.dys-toggle {
  padding: 6px 12px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
  white-space: nowrap;
}
.dys-toggle.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}
```

---

### ÉTAPE 3 — Ajouter le bouton dans le header

Dans le composant Header (ou directement dans Layout.astro dans la zone `<header>`),
ajoute le bouton **à côté du dark mode** si il existe, sinon en haut à droite :

```html
<button
  id="dyslexic-toggle"
  class="dys-toggle"
  aria-label="Activer le mode dyslexique pour faciliter la lecture"
  title="Mode Dyslexique"
>
  Aa&nbsp;<span class="hidden sm:inline">Dyslexie</span>
</button>
```

---

### ÉTAPE 4 — Ajouter le script

Dans le `<body>` de Layout.astro (ou en bas de page), ajoute ce script :

```html
<script>
  const setupDyslexicMode = () => {
    const btn = document.getElementById('dyslexic-toggle');
    const body = document.body;

    // Restaurer le mode si déjà activé par l'utilisateur
    if (localStorage.getItem('dyslexicMode') === 'enabled') {
      body.classList.add('dyslexic-mode');
      btn?.classList.add('active');
    }

    // Gérer le clic
    btn?.addEventListener('click', () => {
      body.classList.toggle('dyslexic-mode');

      if (body.classList.contains('dyslexic-mode')) {
        localStorage.setItem('dyslexicMode', 'enabled');
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        localStorage.setItem('dyslexicMode', 'disabled');
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  };

  // Initialisation au chargement
  setupDyslexicMode();

  // ⚠️ IMPORTANT pour Astro View Transitions — ne pas supprimer cette ligne
  document.addEventListener('astro:after-swap', setupDyslexicMode);
</script>
```

---

### ÉTAPE 5 — Vérification

1. Lance `npm run build` et corrige les erreurs éventuelles
2. Lance `npm run dev` et vérifie visuellement :
   - Le bouton est visible dans le header sur desktop et mobile
   - Cliquer dessus change la police sur toute la page
   - Rechargement de page → le mode reste activé (localStorage)
   - Navigation vers une autre page → le mode reste activé (astro:after-swap)

---

## ⚙️ RÈGLES

- Ne jamais supprimer de code existant sans me montrer d'abord ce que tu veux supprimer
- Utiliser Tailwind CSS pour les classes utilitaires, le CSS custom uniquement pour la police
- Si tu ne trouves pas le fichier d'un style global, dis-le moi avant d'en créer un nouveau
- Committer à la fin : `git add -A && git commit -m "feat: ajout mode dyslexique OpenDyslexic"`

## 🚀 POUR DÉMARRER

1. Lis les fichiers listés dans l'Étape 1
2. Dis-moi ce que tu as trouvé (structure du header, fichier CSS global)
3. Attends mon **"GO"** avant de faire des modifications
