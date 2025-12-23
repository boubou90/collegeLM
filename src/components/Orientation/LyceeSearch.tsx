import React, { useState, useMemo, useCallback } from 'react';

interface Lycee {
  name: string;
  website: string;
  successRate: number;
  specialties: string[];
  europeanSections?: string[];
}

interface Props {
  lycees: Lycee[];
}

export default function LyceeSearch({ lycees }: Props) {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedEuropeanSections, setSelectedEuropeanSections] = useState<string[]>([]);

  // Memoize the unique specialties and sections
  const { allSpecialties, allEuropeanSections } = useMemo(() => {
    const specialtiesSet = new Set<string>();
    const sectionsSet = new Set<string>();
    
    lycees.forEach(lycee => {
      lycee.specialties.forEach(s => specialtiesSet.add(s));
      lycee.europeanSections?.forEach(s => sectionsSet.add(s));
    });

    return {
      allSpecialties: Array.from(specialtiesSet).sort(),
      allEuropeanSections: Array.from(sectionsSet).sort()
    };
  }, [lycees]);

  // Filter lycees based on selected options
  const filteredLycees = useMemo(() => {
    return lycees.filter(lycee => {
      const hasSpecialties = selectedSpecialties.length === 0 || 
        selectedSpecialties.every(s => lycee.specialties.includes(s));
      
      const hasSections = selectedEuropeanSections.length === 0 || 
        selectedEuropeanSections.every(s => lycee.europeanSections?.includes(s));

      return hasSpecialties && hasSections;
    });
  }, [lycees, selectedSpecialties, selectedEuropeanSections]);

  const handleSpecialtyChange = useCallback((specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  }, []);

  const handleEuropeanSectionChange = useCallback((section: string) => {
    setSelectedEuropeanSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  }, []);

  return (
    <div className="search-container">
      <div className="filters">
        <div className="filter-section">
          <h2>Spécialités</h2>
          <div className="filter-options">
            {allSpecialties.map(specialty => (
              <label key={specialty} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                />
                <span>{specialty}</span>
              </label>
            ))}
          </div>
        </div>

        {allEuropeanSections.length > 0 && (
          <div className="filter-section">
            <h2>Sections Européennes</h2>
            <div className="filter-options">
              {allEuropeanSections.map(section => (
                <label key={section} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedEuropeanSections.includes(section)}
                    onChange={() => handleEuropeanSectionChange(section)}
                  />
                  <span>{section}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="results">
        <h2>Résultats ({filteredLycees.length} lycées)</h2>
        <div className="lycees-grid">
          {filteredLycees.map(lycee => (
            <div key={lycee.name} className="lycee-card">
              <h3>{lycee.name}</h3>
              <p className="success-rate">Taux de réussite : {lycee.successRate}%</p>
              <div className="specialties">
                <h4>Spécialités :</h4>
                <ul>
                  {lycee.specialties.map(specialty => (
                    <li key={specialty}>{specialty}</li>
                  ))}
                </ul>
              </div>
              {lycee.europeanSections && (
                <div className="sections">
                  <h4>Sections Européennes :</h4>
                  <ul>
                    {lycee.europeanSections.map(section => (
                      <li key={section}>{section}</li>
                    ))}
                  </ul>
                </div>
              )}
              <a href={`https://${lycee.website}`} target="_blank" rel="noopener noreferrer" className="website-link">
                Visiter le site
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
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

          .lycee-card h3 {
            color: var(--primary);
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
          }

          .success-rate {
            color: #16a34a;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .specialties, .sections {
            margin-bottom: 1rem;
          }

          .specialties h4, .sections h4 {
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

          .website-link {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: var(--primary);
            color: white;
            text-decoration: none;
            border-radius: 0.5rem;
            font-size: 0.9rem;
            transition: all 0.2s ease;
          }

          .website-link:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
          }

          @media (max-width: 768px) {
            .search-container {
              padding: 1rem;
            }

            .filters {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}