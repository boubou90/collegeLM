#!/bin/bash

echo "🔍 Vérification des images PNG..."
echo ""

# Vérifier que les images existent
echo "📁 Fichiers PNG dans public/images/:"
ls -1 public/images/*.png 2>/dev/null | wc -l | xargs echo "   Nombre de fichiers PNG trouvés:"

# Lister les fichiers
echo ""
echo "📋 Liste des fichiers PNG:"
ls -1 public/images/*.png 2>/dev/null | sed 's/public\/images\//   - /'

# Vérifier les permissions
echo ""
echo "🔒 Vérification des permissions:"
ls -la public/images/*.png 2>/dev/null | head -3 | tail -2

# Vérifier si node_modules existe
echo ""
if [ -d "node_modules" ]; then
    echo "✅ node_modules/ existe (dépendances installées)"
else
    echo "❌ node_modules/ n'existe pas"
    echo "   👉 Exécutez: npm install"
fi

# Vérifier si .astro existe
echo ""
if [ -d ".astro" ]; then
    echo "✅ .astro/ existe (serveur a déjà été lancé)"
else
    echo "⚠️  .astro/ n'existe pas (serveur jamais lancé)"
    echo "   👉 Exécutez: npm run dev"
fi

echo ""
echo "🚀 Pour lancer le serveur:"
echo "   npm run dev"
echo ""
echo "📱 Ensuite testez cette URL:"
echo "   http://localhost:4321/images/logo-pcn.png"
