export interface Lycee {
  name: string;
  website: string;
  successRate: number;
  specialties: string[];
  europeanSections?: string[];
  address?: string;
  arrondissement?: string;
  group?: 'Nord-Est' | 'Est' | 'Nord' | 'Ouest' | 'Sud';
}

export function getLyceesByGroup(group: string): Lycee[] {
  return lycees.filter(lycee => lycee.group === group);
}

export const lycees: Lycee[] = [
  // 3e arrondissement
  {
    name: "LGT Turgot",
    website: "lyc-turgot.ac-paris.fr",
    successRate: 95,
    specialties: ["Mathématiques", "Sciences Économiques et Sociales", "Histoire-géographie"],
    address: "69 rue de Turbigo",
    arrondissement: "3e",
    group: "Est"
  },
  {
    name: "Lycée Victor Hugo",
    website: "lyc-victor-hugo.ac-paris.fr",
    successRate: 96,
    specialties: ["Mathématiques", "SVT", "Histoire-géographie", "Sciences Économiques et Sociales"],
    address: "27 rue de Sévigné",
    arrondissement: "3e",
    group: "Est"
  },
  // 4e arrondissement
  {
    name: "Lycée Charlemagne",
    website: "lyc-charlemagne.ac-paris.fr",
    successRate: 97,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT", "Sciences Économiques et Sociales"],
    europeanSections: ["Anglais", "Allemand"],
    address: "14 rue Charlemagne",
    arrondissement: "4e",
    group: "Est"
  },
  {
    name: "LGT Sophie Germain",
    website: "lyc-sophie-germain.ac-paris.fr",
    successRate: 95,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT", "Sciences Économiques et Sociales"],
    address: "9 rue de Jouy",
    arrondissement: "4e",
    group: "Est"
  },
  // 5e arrondissement
  {
    name: "Lycée Henri IV",
    website: "lycee-henri4.com",
    successRate: 100,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT", "Sciences de l'Ingénieur", "Numérique et Sciences Informatiques"],
    europeanSections: ["Anglais", "Allemand"],
    address: "23 rue Clovis",
    arrondissement: "5e",
    group: "Sud"
  },
  {
    name: "Lycée Louis Le Grand",
    website: "lycee-saintlouis.ac-paris.fr",
    successRate: 100,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT", "Sciences de l'Ingénieur"],
    europeanSections: ["Anglais", "Allemand"],
    address: "123 rue Saint-Jacques",
    arrondissement: "5e",
    group: "Sud"
  },
  // 7e arrondissement
  {
    name: "Lycée Victor Duruy",
    website: "lyc-victor-duruy.ac-paris.fr",
    successRate: 98,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT", "Histoire-géographie"],
    europeanSections: ["Anglais", "Allemand"],
    address: "33 Boulevard des Invalides",
    arrondissement: "7e",
    group: "Ouest"
  },
  // 8e arrondissement
  {
    name: "LGT Chaptal",
    website: "lyc-chaptal.ac-paris.fr",
    successRate: 97,
    specialties: ["Mathématiques", "Physique-Chimie", "Sciences de l'Ingénieur"],
    address: "45 Boulevard des Batignolles",
    arrondissement: "8e",
    group: "Ouest"
  },
  {
    name: "LGT Jean Racine",
    website: "lyc-racine.ac-paris.fr",
    successRate: 96,
    specialties: ["Mathématiques", "Sciences Économiques et Sociales", "Humanités"],
    address: "20 rue du Rocher",
    arrondissement: "8e",
    group: "Ouest"
  },
  // 9e arrondissement
  {
    name: "Lycée Grand Condorcet",
    website: "lycee-condorcet.ac-paris.fr",
    successRate: 98,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT", "Histoire-géographie"],
    europeanSections: ["Anglais", "Allemand"],
    address: "8 rue du Havre",
    arrondissement: "9e",
    group: "Nord"
  },
  {
    name: "Lycée Jacques Decour",
    website: "lyc-jacques-decour.ac-paris.fr",
    successRate: 95,
    specialties: ["Mathématiques", "Sciences Économiques et Sociales", "Humanités"],
    address: "12 avenue Trudaine",
    arrondissement: "9e",
    group: "Nord"
  },
  {
    name: "Lycée Jules Ferry",
    website: "lyc-jules-ferry.ac-paris.fr",
    successRate: 94,
    specialties: ["Mathématiques", "SVT", "Histoire-géographie"],
    address: "77 boulevard de Clichy",
    arrondissement: "9e",
    group: "Nord"
  },
  {
    name: "Lycée Lamartine",
    website: "lyc-lamartine.ac-paris.fr",
    successRate: 93,
    specialties: ["Sciences Économiques et Sociales", "Humanités", "Arts"],
    address: "121 rue du Faubourg Poissonnière",
    arrondissement: "9e",
    group: "Nord"
  },
  // 10e arrondissement
  {
    name: "LGT Simone Weil",
    website: "lyc-simone-weil.ac-paris.fr",
    successRate: 92,
    specialties: ["Sciences Économiques et Sociales", "Histoire-géographie", "Humanités"],
    address: "7 rue de Poitou",
    arrondissement: "10e",
    group: "Nord"
  },
  {
    name: "Lycée Colbert",
    website: "lyc-colbert.ac-paris.fr",
    successRate: 91,
    specialties: ["Mathématiques", "Sciences Économiques et Sociales"],
    address: "27 rue du Château-Landon",
    arrondissement: "10e",
    group: "Nord"
  },
  // 11e arrondissement
  {
    name: "LGT Voltaire",
    website: "lyc-voltaire.ac-paris.fr",
    successRate: 94,
    specialties: ["Mathématiques", "Sciences Économiques et Sociales", "Histoire-géographie"],
    address: "101 Avenue de la République",
    arrondissement: "11e",
    group: "Est"
  },
  // 12e arrondissement
  {
    name: "Lycée Paul Valéry",
    website: "lyc-paulvalery.ac-paris.fr",
    successRate: 95,
    specialties: ["Mathématiques", "SVT", "Histoire-géographie", "Humanités"],
    europeanSections: ["Anglais", "Espagnol"],
    address: "38 Boulevard Soult",
    arrondissement: "12e",
    group: "Est"
  },
  {
    name: "LGT Arago",
    website: "lyc-arago.ac-paris.fr",
    successRate: 93,
    specialties: ["Mathématiques", "Sciences de l'Ingénieur", "Physique-Chimie"],
    address: "4 Place de la Nation",
    arrondissement: "12e",
    group: "Est"
  },
  // 13e arrondissement
  {
    name: "Lycée Gabriel Fauré",
    website: "lyc-gabriel-faure.ac-paris.fr",
    successRate: 92,
    specialties: ["Sciences Économiques et Sociales", "Histoire-géographie", "Arts"],
    address: "81 Avenue de Choisy",
    arrondissement: "13e",
    group: "Sud"
  },
  {
    name: "Lycée Claude Monet",
    website: "lyc-claude-monet.ac-paris.fr",
    successRate: 96,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT", "Arts"],
    europeanSections: ["Anglais", "Italien"],
    address: "1 rue du Docteur Magnan",
    arrondissement: "13e",
    group: "Sud"
  },
  {
    name: "Lycée Pierre-Gilles de Gennes",
    website: "lpgdg.fr",
    successRate: 96,
    specialties: ["Physique-Chimie", "Biotechnologies", "Génie biologique"],
    europeanSections: ["Anglais"],
    address: "11 rue Pirandello",
    arrondissement: "13e",
    group: "Sud"
  },
  // 14e arrondissement
  {
    name: "LGT Paul Bert",
    website: "lyc-paul-bert.ac-paris.fr",
    successRate: 94,
    specialties: ["Sciences Économiques et Sociales", "Histoire-géographie"],
    address: "7 rue Huyghens",
    arrondissement: "14e",
    group: "Sud"
  },
  {
    name: "LGT Emile Dubois",
    website: "lyc-emile-dubois.ac-paris.fr",
    successRate: 91,
    specialties: ["Sciences Économiques et Sociales", "Humanités"],
    address: "14 rue Emile Dubois",
    arrondissement: "14e",
    group: "Sud"
  },
  // 15e arrondissement
  {
    name: "Lycée Buffon",
    website: "lyc-buffon.ac-paris.fr",
    successRate: 95,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT"],
    address: "16 boulevard Pasteur",
    arrondissement: "15e",
    group: "Sud"
  },
  {
    name: "Lycée Camille See",
    website: "lyc-camille-see.ac-paris.fr",
    successRate: 94,
    specialties: ["Sciences Économiques et Sociales", "Humanités", "Arts"],
    address: "11 rue Léon Lhermitte",
    arrondissement: "15e",
    group: "Sud"
  },
  {
    name: "LGT Roger Verlomme",
    website: "lyc-roger-verlomme.ac-paris.fr",
    successRate: 92,
    specialties: ["Sciences Économiques et Sociales", "Management"],
    address: "24 rue Fondary",
    arrondissement: "15e",
    group: "Sud"
  },
  // 16e arrondissement
  {
    name: "LGT Claude Bernard",
    website: "lyc-claude-bernard.ac-paris.fr",
    successRate: 95,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT"],
    europeanSections: ["Anglais"],
    address: "1 Avenue du Parc des Princes",
    arrondissement: "16e",
    group: "Ouest"
  },
  {
    name: "Lycée Janson de Sailly",
    website: "lyc-janson-de-sailly.ac-paris.fr",
    successRate: 99,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT", "Sciences de l'Ingénieur"],
    europeanSections: ["Anglais", "Allemand"],
    address: "106 rue de la Pompe",
    arrondissement: "16e",
    group: "Ouest"
  },
  {
    name: "LGT Jean-Baptiste Say",
    website: "lyc-jb-say.ac-paris.fr",
    successRate: 97,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT", "Sciences de l'Ingénieur"],
    europeanSections: ["Anglais", "Allemand"],
    address: "11 bis rue d'Auteuil",
    arrondissement: "16e",
    group: "Ouest"
  },
  // 18e arrondissement
  {
    name: "LGT Rabelais",
    website: "lyc-rabelais.ac-paris.fr",
    successRate: 91,
    specialties: ["Sciences Économiques et Sociales", "Histoire-géographie"],
    address: "9 rue Francis de Croisset",
    arrondissement: "18e",
    group: "Nord"
  },
  // 19e arrondissement
  {
    name: "LGT Henri Bergson",
    website: "lyc-henri-bergson.ac-paris.fr",
    successRate: 95,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT"],
    europeanSections: ["Anglais"],
    address: "27 rue Édouard Pailleron",
    arrondissement: "19e",
    group: "Nord-Est"
  },
  // 20e arrondissement
  {
    name: "Lycée Hélène Boucher",
    website: "lyc-helene-boucher.ac-paris.fr",
    successRate: 97,
    specialties: ["Mathématiques", "Physique-Chimie", "SVT", "Histoire-géographie"],
    europeanSections: ["Anglais", "Espagnol"],
    address: "75 Cours de Vincennes",
    arrondissement: "20e",
    group: "Est"
  },
  {
    name: "LGT Maurice Ravel",
    website: "lyc-maurice-ravel.ac-paris.fr",
    successRate: 93,
    specialties: ["Sciences Économiques et Sociales", "Histoire-géographie", "Arts"],
    address: "89 cours de Vincennes",
    arrondissement: "20e",
    group: "Est"
  }
];