#!/bin/bash

echo "🔍 Vérification de la structure du projet..."
echo ""

# Vérifier les fichiers images dans src/pages
echo "📁 Vérification: Images dans src/pages/ (ne devrait pas y en avoir)..."
IMAGES_IN_PAGES=$(find src/pages -type f \( -name "*.PNG" -o -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.webp" \) 2>/dev/null)

if [ -z "$IMAGES_IN_PAGES" ]; then
    echo "   ✅ Aucune image trouvée dans src/pages/ (correct!)"
else
    echo "   ❌ Images trouvées dans src/pages/ (à déplacer!):"
    echo "$IMAGES_IN_PAGES" | sed 's/^/      /'
    echo ""
    echo "   💡 Déplacez ces fichiers vers public/images/"
fi

echo ""

# Vérifier les fichiers PDF dans src/pages
echo "📄 Vérification: PDFs dans src/pages/ (ne devrait pas y en avoir)..."
PDFS_IN_PAGES=$(find src/pages -type f -name "*.pdf" 2>/dev/null)

if [ -z "$PDFS_IN_PAGES" ]; then
    echo "   ✅ Aucun PDF trouvé dans src/pages/ (correct!)"
else
    echo "   ❌ PDFs trouvés dans src/pages/ (à déplacer!):"
    echo "$PDFS_IN_PAGES" | sed 's/^/      /'
    echo ""
    echo "   💡 Déplacez ces fichiers vers public/documents/"
fi

echo ""

# Vérifier les fichiers vidéo dans src/pages
echo "🎥 Vérification: Vidéos dans src/pages/ (ne devrait pas y en avoir)..."
VIDEOS_IN_PAGES=$(find src/pages -type f \( -name "*.mp4" -o -name "*.webm" -o -name "*.avi" \) 2>/dev/null)

if [ -z "$VIDEOS_IN_PAGES" ]; then
    echo "   ✅ Aucune vidéo trouvée dans src/pages/ (correct!)"
else
    echo "   ❌ Vidéos trouvées dans src/pages/ (à déplacer!):"
    echo "$VIDEOS_IN_PAGES" | sed 's/^/      /'
    echo ""
    echo "   💡 Déplacez ces fichiers vers public/videos/"
fi

echo ""

# Statistiques
echo "📊 Statistiques du projet:"
echo "   Pages Astro: $(find src/pages -name "*.astro" 2>/dev/null | wc -l | xargs)"
echo "   Composants: $(find src/components -name "*.astro" 2>/dev/null | wc -l | xargs)"
echo "   Images (public): $(find public/images -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.svg" \) 2>/dev/null | wc -l | xargs)"
echo "   Documents PDF: $(find public/documents -name "*.pdf" 2>/dev/null | wc -l | xargs)"

echo ""

# Vérifier node_modules et .astro
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules/ n'existe pas"
    echo "   👉 Exécutez: npm install"
    echo ""
fi

if [ ! -d ".astro" ]; then
    echo "ℹ️  .astro/ n'existe pas (normal si jamais lancé)"
    echo "   👉 Lancez le serveur: npm run dev"
    echo ""
fi

echo "✨ Vérification terminée!"
echo ""
echo "📚 Pour plus d'informations:"
echo "   - CORRECTION_IMAGES.md (correction appliquée)"
echo "   - IMAGES_TROUBLESHOOTING.md (guide de résolution)"
