import { useState, useEffect } from 'react';

interface SearchResult {
  title: string;
  url: string;
  description: string;
  level: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Données de recherche (à terme, pourrait être généré automatiquement)
  const searchData: SearchResult[] = [
    // 5ème
    { title: 'Réseaux informatiques', url: '/5eme/sequence-1', description: 'Introduction aux réseaux et leurs composants', level: '5ème' },
    { title: 'Évolution des objets techniques', url: '/5eme/sequence-3', description: 'Étude de l\'évolution des objets techniques', level: '5ème' },
    { title: 'Modélisation 3D', url: '/5eme/sequence-4', description: 'Initiation à SketchUp et modélisation', level: '5ème' },
    { title: 'Chaînes d\'énergie', url: '/5eme/sequence-7', description: 'Les différentes formes d\'énergie', level: '5ème' },

    // 4ème
    { title: 'Systèmes automatiques', url: '/4eme/sequence-3', description: 'Étude des systèmes automatiques et domotique', level: '4ème' },
    { title: 'Sources et formes d\'énergie', url: '/4eme/sequence-4', description: 'Conversion et gestion de l\'énergie', level: '4ème' },
    { title: 'Programmation et algorithmes', url: '/4eme/sequence-5', description: 'Initiation à la programmation', level: '4ème' },

    // 3ème
    { title: 'Préparation Brevet', url: '/3eme/brevet', description: 'Sujets et révisions pour le Brevet', level: '3ème' },
    { title: 'Orientation', url: '/3eme/orientation', description: 'Information sur les lycées et filières', level: '3ème' },
    { title: 'Chaîne d\'information', url: '/3eme/cours/cours-chaine-energie-information', description: 'Cours sur les chaînes d\'énergie et d\'information', level: '3ème' },
  ];

  useEffect(() => {
    if (query.length > 2) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.level.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher des cours, séquences..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          aria-label="Rechercher dans le site"
        />
        {query && (
          <button
            className="search-clear"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            aria-label="Effacer la recherche"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-results">
          {results.map((result, index) => (
            <a
              key={index}
              href={result.url}
              className="search-result-item"
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
            >
              <div className="result-level">{result.level}</div>
              <div className="result-content">
                <h3 className="result-title">{result.title}</h3>
                <p className="result-description">{result.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}

      {isOpen && results.length === 0 && query.length > 2 && (
        <div className="search-results">
          <div className="no-results">Aucun résultat trouvé pour "{query}"</div>
        </div>
      )}
    </div>
  );
}
