# 📄 PROMPT — Visionneuse PDF intégrée (sans téléchargement forcé)
# À copier dans Claude VS Code

---

Tu es un expert Astro + Tailwind CSS.
Mon site est **collegelouisemichel.net** (Astro, déployé sur Netlify).

## 🎯 MISSION

Remplacer tous les liens de téléchargement PDF par une **visionneuse visuelle**
qui s'ouvre dans une modale directement sur la page.
L'élève ou le parent peut lire le PDF sans rien télécharger.
Un bouton de téléchargement reste disponible en fallback.

---

## 📋 ÉTAPE 1 — Inventaire (lire avant de modifier)

Cherche dans tout le projet les occurrences de liens PDF :

```bash
grep -r "\.pdf" src/ --include="*.astro" -l
```

Puis pour chaque fichier trouvé :

```bash
grep -n "\.pdf" src/pages/NOM_DU_FICHIER.astro
```

Dis-moi :
1. La liste de tous les fichiers qui contiennent des liens `.pdf`
2. Le chemin exact de chaque PDF (ex: `/pdfs/fiche-brevet.pdf`)
3. Le texte affiché pour chaque lien (ex: "Télécharger la fiche")

Attends mon **"GO"** avant de modifier quoi que ce soit.

---

## 📋 ÉTAPE 2 — Créer le composant PDFViewer

Crée le fichier `src/components/PDFViewer.astro` :

```astro
---
// src/components/PDFViewer.astro
interface Props {
  src: string;        // chemin du PDF ex: "/pdfs/fiche.pdf"
  label: string;      // texte du bouton ex: "Fiche de révision Brevet"
  description?: string; // optionnel : sous-titre
}
const { src, label, description } = Astro.props;

// ID unique pour chaque instance (si plusieurs PDF sur la même page)
const id = `pdf-${Math.random().toString(36).slice(2, 9)}`;
---

<!-- Bouton d'ouverture -->
<div class="pdf-viewer-wrapper my-4">
  <button
    data-pdf-src={src}
    data-pdf-id={id}
    class="pdf-open-btn flex items-center gap-3 w-full sm:w-auto
           bg-white border-2 border-blue-200 hover:border-blue-400
           rounded-xl p-4 transition-all duration-200 group
           hover:shadow-md text-left"
    aria-label={`Ouvrir le PDF : ${label}`}
  >
    <!-- Icône PDF -->
    <div class="flex-shrink-0 w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-red-500" fill="none"
           viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0
              01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>

    <!-- Texte -->
    <div class="flex-1 min-w-0">
      <p class="font-semibold text-gray-800 group-hover:text-blue-700 transition truncate">
        {label}
      </p>
      {description && (
        <p class="text-sm text-gray-500 mt-0.5 truncate">{description}</p>
      )}
    </div>

    <!-- Indicateur "Visualiser" -->
    <div class="flex-shrink-0 flex items-center gap-1.5 text-blue-600
                bg-blue-50 group-hover:bg-blue-100 px-3 py-1.5 rounded-full
                text-sm font-medium transition">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
           viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943
              9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
      </svg>
      <span class="hidden sm:inline">Visualiser</span>
    </div>
  </button>
</div>

<!-- Modale PDF -->
<div
  id={id}
  class="pdf-modal fixed inset-0 z-50 hidden items-center justify-center p-4"
  role="dialog"
  aria-modal="true"
  aria-label={`Visionneuse PDF : ${label}`}
>
  <!-- Fond sombre -->
  <div class="pdf-modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

  <!-- Fenêtre modale -->
  <div class="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl
              flex flex-col overflow-hidden z-10">

    <!-- Header modale -->
    <div class="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
      <div class="flex items-center gap-2 min-w-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500 flex-shrink-0"
             fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0
                01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="font-semibold text-gray-700 truncate text-sm">{label}</span>
      </div>

      <div class="flex items-center gap-2 flex-shrink-0">
        <!-- Bouton télécharger -->
        <a
          href={src}
          download
          class="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700
                 text-white px-3 py-1.5 rounded-lg transition font-medium"
          aria-label="Télécharger le PDF"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          <span class="hidden sm:inline">Télécharger</span>
        </a>

        <!-- Bouton fermer -->
        <button
          class="pdf-close-btn p-1.5 text-gray-400 hover:text-gray-700
                 hover:bg-gray-200 rounded-lg transition"
          aria-label="Fermer la visionneuse"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Visionneuse PDF -->
    <div class="flex-1 bg-gray-100 overflow-hidden">
      <!-- iframe (desktop — navigateurs avec lecteur PDF natif) -->
      <iframe
        class="pdf-iframe w-full h-full hidden sm:block"
        data-src={src}
        title={`PDF : ${label}`}
        loading="lazy"
      ></iframe>

      <!-- Fallback mobile -->
      <div class="pdf-mobile-fallback sm:hidden flex flex-col items-center
                  justify-center h-full p-6 text-center gap-4">
        <div class="text-6xl">📄</div>
        <p class="text-gray-600 font-medium">{label}</p>
        <p class="text-sm text-gray-500">
          La visionneuse PDF n'est pas disponible sur mobile.
        </p>
        <a
          href={src}
          download
          class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold
                 hover:bg-blue-700 transition text-sm"
        >
          📥 Télécharger le PDF
        </a>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:underline text-sm"
        >
          Ouvrir dans le navigateur →
        </a>
      </div>
    </div>
  </div>
</div>

<script>
  // Initialiser toutes les modales PDF de la page
  const initPDFViewers = () => {
    // Boutons d'ouverture
    document.querySelectorAll('.pdf-open-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.pdfId;
        const src = (btn as HTMLElement).dataset.pdfSrc;
        const modal = document.getElementById(id!);
        if (!modal) return;

        // Charger l'iframe seulement à l'ouverture (lazy)
        const iframe = modal.querySelector('.pdf-iframe') as HTMLIFrameElement;
        if (iframe && !iframe.src && src) {
          iframe.src = src;
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      });
    });

    // Boutons de fermeture
    document.querySelectorAll('.pdf-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.pdf-modal');
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
      });
    });

    // Clic sur le fond sombre = fermer
    document.querySelectorAll('.pdf-modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', () => {
        const modal = backdrop.closest('.pdf-modal');
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
      });
    });

    // Touche Échap = fermer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.pdf-modal.flex').forEach(modal => {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          document.body.style.overflow = '';
        });
      }
    });
  };

  initPDFViewers();

  // Pour Astro View Transitions
  document.addEventListener('astro:after-swap', initPDFViewers);
</script>
```

---

## 📋 ÉTAPE 3 — Remplacer les liens existants

Pour chaque lien PDF trouvé à l'Étape 1, remplace la syntaxe :

**Avant (lien téléchargement) :**
```astro
<a href="/pdfs/fiche-brevet.pdf" download>
  📥 Télécharger la fiche Brevet
</a>
```

**Après (visionneuse) :**
```astro
---
import PDFViewer from '../components/PDFViewer.astro';
---

<PDFViewer
  src="/pdfs/fiche-brevet.pdf"
  label="Fiche de révision Brevet"
  description="À imprimer ou consulter en ligne"
/>
```

---

## 📋 ÉTAPE 4 — Vérification

1. Lance `npm run dev`
2. Vérifie sur un fichier qui avait un lien PDF :
   - Le bouton s'affiche correctement
   - Le clic ouvre la modale
   - Le PDF se charge dans l'iframe
   - La touche Échap ferme la modale
   - Le bouton "Télécharger" fonctionne toujours
3. Vérifie en mode mobile (DevTools → responsive 375px) :
   - Le fallback mobile s'affiche à la place de l'iframe
4. Lance `npm run build` — corrige les erreurs TypeScript éventuelles

---

## ⚙️ RÈGLES

- Ne pas supprimer les PDFs du dossier `/public/`
- Garder toujours le bouton téléchargement dans la modale (accessibilité)
- Utiliser uniquement Tailwind CSS
- Tester sur au moins 2 pages différentes
- Committer à la fin :
  `git add -A && git commit -m "feat: visionneuse PDF intégrée avec modale"`

## 🚀 POUR DÉMARRER

1. Lance le grep de l'Étape 1 pour lister tous les PDFs
2. Montre-moi la liste complète
3. Attends mon **"GO"**
