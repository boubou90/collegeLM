import React, { useState, useMemo } from 'react';
import type { LyceeProf } from '../../data/lyceesProf';

interface Props {
  lycees: LyceeProf[];
}

// Helper function to ensure proper URL formatting
function formatWebsiteUrl(website: string): string {
  if (!website.startsWith('http://') && !website.startsWith('https://')) {
    return `https://${website}`;
  }
  return website;
}

export default function LyceeProfSearch({ lycees }: Props) {
  const [selectedType, setSelectedType] = useState<'public' | 'privé' | ''>('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  // Get unique specialties and levels
  const { allSpecialties, allLevels } = useMemo(() => {
    const specialtiesSet = new Set<string>();
    const levelsSet = new Set<string>();
    
    lycees.forEach(lycee => {
      lycee.specialties.forEach(s => specialtiesSet.add(s));
      lycee.formations.forEach(f => levelsSet.add(f.level));
    });

    return {
      allSpecialties: Array.from(specialtiesSet).sort(),
      allLevels: Array.from(levelsSet).sort()
    };
  }, [lycees]);

  // Filter lycees based on selected options
  const filteredLycees = useMemo(() => {
    return lycees.filter(lycee => {
      const matchesType = !selectedType || lycee.type === selectedType;
      const matchesSpecialties = selectedSpecialties.length === 0 || 
        selectedSpecialties.every(s => lycee.specialties.includes(s));
      const matchesLevels = selectedLevels.length === 0 || 
        selectedLevels.some(l => lycee.formations.some(f => f.level === l));

      return matchesType && matchesSpecialties && matchesLevels;
    });
  }, [lycees, selectedType, selectedSpecialties, selectedLevels]);

  return (
    <div className="search-container">
      <div className="filters">
        <div className="filter-section">
          <h2>Type d'établissement</h2>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="type"
                checked={selectedType === ''}
                onChange={() => setSelectedType('')}
              />
              <span>Tous</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="type"
                checked={selectedType === 'public'}
                onChange={() => setSelectedType('public')}
              />
              <span>Public</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="type"
                checked={selectedType === 'privé'}
                onChange={() => setSelectedType('privé')}
              />
              <span>Privé</span>
            </label>
          </div>
        </div>

        <div className="filter-section">
          <h2>Spécialités</h2>
          <div className="filter-options">
            {allSpecialties.map(specialty => (
              <label key={specialty} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => {
                    setSelectedSpecialties(prev =>
                      prev.includes(specialty)
                        ? prev.filter(s => s !== specialty)
                        : [...prev, specialty]
                    );
                  }}
                />
                <span>{specialty}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h2>Niveaux de formation</h2>
          <div className="filter-options">
            {allLevels.map(level => (
              <label key={level} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedLevels.includes(level)}
                  onChange={() => {
                    setSelectedLevels(prev =>
                      prev.includes(level)
                        ? prev.filter(l => l !== level)
                        : [...prev, level]
                    );
                  }}
                />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="results">
        <h2>Résultats ({filteredLycees.length} lycées)</h2>
        <div className="lycees-grid">
          {filteredLycees.map(lycee => (
            <div key={lycee.name} className="lycee-card">
              <div className="card-header">
                <h3>{lycee.name}</h3>
                <span className={`type-badge ${lycee.type}`}>
                  {lycee.type}
                </span>
              </div>

              <div className="specialties">
                <h4>Spécialités :</h4>
                <ul>
                  {lycee.specialties.map(specialty => (
                    <li key={specialty}>{specialty}</li>
                  ))}
                </ul>
              </div>

              <div className="formations">
                <h4>Formations :</h4>
                <ul>
                  {lycee.formations.map((formation, index) => (
                    <li key={index}>
                      <strong>{formation.name}</strong> ({formation.level})
                      <p className="formation-desc">{formation.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {lycee.openHouse && (
                <div className="open-house">
                  <h4>Journée Portes Ouvertes :</h4>
                  <p>{lycee.openHouse.date} - {lycee.openHouse.time}</p>
                  <p>{lycee.openHouse.description}</p>
                  {lycee.openHouse.posterUrl && (
                    <a href={lycee.openHouse.posterUrl} className="download-link" target="_blank" rel="noopener noreferrer">
                      Télécharger l'affiche
                    </a>
                  )}
                </div>
              )}

              {lycee.miniStages && (
                <div className="mini-stages">
                  <h4>Mini-stages :</h4>
                  {lycee.miniStages.map((stage, index) => (
                    <div key={index} className="mini-stage">
                      <p><strong>Dates :</strong> {stage.dates.join(', ')}</p>
                      <p><strong>Durée :</strong> {stage.duration}</p>
                      <p><strong>Places :</strong> {stage.places}</p>
                      <p>{stage.description}</p>
                    </div>
                  ))}
                  {lycee.conventionUrl && (
                    <a href={lycee.conventionUrl} className="download-link" target="_blank" rel="noopener noreferrer">
                      Télécharger la convention de stage
                    </a>
                  )}
                </div>
              )}

              <a 
                href={formatWebsiteUrl(lycee.website)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="website-link"
              >
                Visiter le site
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .search-container {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }

        .filters {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .filter-section h2 {
          color: var(--primary-dark);
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: #f8fafc;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-option:hover {
          background: #f1f5f9;
        }

        .results h2 {
          color: var(--primary-dark);
          margin-bottom: 1.5rem;
          font-size: 1.4rem;
        }

        .lycees-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .lycee-card {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .lycee-card h3 {
          color: var(--primary);
          font-size: 1.2rem;
          margin: 0;
        }

        .type-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .type-badge.public {
          background: #dcfce7;
          color: #166534;
        }

        .type-badge.privé {
          background: #dbeafe;
          color: #1e40af;
        }

        .specialties, .formations, .open-house, .mini-stages {
          margin-bottom: 1rem;
        }

        h4 {
          color: #4b5563;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        ul {
          list-style: none;
          padding-left: 1rem;
        }

        li {
          position: relative;
          padding-left: 1rem;
          margin-bottom: 0.25rem;
          color: #4b5563;
          font-size: 0.9rem;
        }

        li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--primary);
        }

        .formation-desc {
          margin-left: 1rem;
          font-size: 0.85rem;
          color: #6b7280;
        }

        .mini-stage {
          background: #fff;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .website-link, .download-link {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: var(--primary);
          color: white;
          text-decoration: none;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          margin-top: 1rem;
        }

        .website-link:hover, .download-link:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }

        .download-link {
          background: #4b5563;
          margin-right: 0.5rem;
        }

        .download-link:hover {
          background: #374151;
        }

        @media (max-width: 768px) {
          .search-container {
            padding: 1rem;
          }

          .filters {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}