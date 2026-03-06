// Types for professional high schools
export interface Formation {
  name: string;
  level: string;
  description: string;
}

export interface OpenHouse {
  date: string;
  time: string;
  description?: string;
  posterUrl?: string;
}

export interface MiniStage {
  dates: string[];
  duration: string;
  places: number;
  description: string;
}

export interface LyceeProf {
  name: string;
  website: string;
  type: 'public' | 'privé';
  specialties: string[];
  formations: Formation[];
  openHouse?: OpenHouse;
  miniStages?: MiniStage[];
  conventionUrl?: string;
}

export const lyceesProf: LyceeProf[] = [
  {
    name: "ESAA Duperré",
    website: "duperre.org",
    type: "public",
    specialties: ["Arts appliqués", "Design", "Métiers d'art"],
    formations: [
      { name: "DN MADE", level: "Bac+3", description: "Diplôme National des Métiers d'Art et du Design" }
    ]
  },
  {
    name: "LPO D'Alembert",
    website: "lyceedalembert.paris",
    type: "public",
    specialties: ["Santé", "Social", "Soins"],
    formations: [
      { name: "Bac Pro ASSP", level: "Niveau 4", description: "Accompagnement, Soins et Services à la Personne" }
    ]
  },
  {
    name: "LPO Diderot",
    website: "pia.ac-paris.fr/serail/jcms/s2_2938257/fr/accueil",
    type: "public",
    specialties: ["Électronique", "Électrotechnique", "Systèmes Numériques"],
    formations: [
      { name: "Bac Pro SN", level: "Niveau 4", description: "Systèmes Numériques" }
    ]
  },
  {
    name: "LPO Bâtiment St Lambert",
    website: "saint-lambert.org",
    type: "public",
    specialties: ["Bâtiment", "Construction", "Travaux publics"],
    formations: [
      { name: "Bac Pro TB", level: "Niveau 4", description: "Technicien du Bâtiment" }
    ]
  },
  {
    name: "LPO Dorian",
    website: "lycee-dorian.fr",
    type: "public",
    specialties: ["Mécanique", "Productique", "Maintenance"],
    formations: [
      { name: "Bac Pro MEI", level: "Niveau 4", description: "Maintenance des Équipements Industriels" }
    ]
  },
  {
    name: "LPO Paul Poiret",
    website: "lycee-paul-poiret.org",
    type: "public",
    specialties: ["Mode", "Vêtement", "Maroquinerie"],
    formations: [
      { name: "Bac Pro MMV", level: "Niveau 4", description: "Métiers de la Mode - Vêtements" }
    ]
  },
  {
    name: "LT Boulle",
    website: "ecole-boulle.org",
    type: "public",
    specialties: ["Ébénisterie", "Design", "Métiers d'art"],
    formations: [
      { name: "DN MADE", level: "Bac+3", description: "Diplôme National des Métiers d'Art et du Design" }
    ]
  },
  {
    name: "LPO Elisa Lemonnier",
    website: "elisa-lemonnier.fr",
    type: "public",
    specialties: ["Commerce", "Gestion", "Administration"],
    formations: [
      { name: "Bac Pro AGOrA", level: "Niveau 4", description: "Assistance à la Gestion des Organisations et de leurs Activités" }
    ]
  },
  {
    name: "LPO Nadaud",
    website: "pia.ac-paris.fr/serail/jcms/s6_204295/fr/accueil",
    type: "public",
    specialties: ["Bâtiment", "Énergétique", "Climatique"],
    formations: [
      { name: "Bac Pro TMSEC", level: "Niveau 4", description: "Technicien en Maintenance des Systèmes Énergétiques et Climatiques" }
    ]
  },
  {
    name: "LPO Edgar Quinet",
    website: "pia.ac-paris.fr/serail/jcms/s2_439045/fr/accueil",
    type: "public",
    specialties: ["Commerce", "Vente", "Accueil"],
    formations: [
      { name: "Bac Pro MCV", level: "Niveau 4", description: "Métiers du Commerce et de la Vente" }
    ]
  },
  {
    name: "LT Auguste Renoir",
    website: "ecole-lycee-renoir-paris.fr",
    type: "public",
    specialties: ["Arts appliqués", "Communication visuelle"],
    formations: [
      { name: "DN MADE", level: "Bac+3", description: "Diplôme National des Métiers d'Art et du Design" }
    ]
  },
  {
    name: "LPO François Villon",
    website: "citescolairevillon.paris",
    type: "public",
    specialties: ["Commerce", "Gestion", "Administration"],
    formations: [
      { name: "Bac Pro AGOrA", level: "Niveau 4", description: "Assistance à la Gestion des Organisations et de leurs Activités" }
    ]
  },
  {
    name: "LPO Raspail",
    website: "ldmraspail.fr",
    type: "public",
    specialties: ["Électrotechnique", "Maintenance", "Énergétique"],
    formations: [
      { name: "Bac Pro MELEC", level: "Niveau 4", description: "Métiers de l'Électricité et de ses Environnements Connectés" }
    ]
  },
  {
    name: "LPO Fresnel",
    website: "fresnel-lycee.fr",
    type: "public",
    specialties: ["Optique", "Photographie", "Audiovisuel"],
    formations: [
      { name: "Bac Pro Optique Lunetterie", level: "Niveau 4", description: "Monteur-Vendeur en Optique-Lunetterie" }
    ]
  },
  {
    name: "LPO Louis Armand",
    website: "pia.ac-paris.fr/serail/jcms/s1_111301/fr/accueil",
    type: "public",
    specialties: ["Électronique", "Numérique", "Réseaux"],
    formations: [
      { name: "Bac Pro SN", level: "Niveau 4", description: "Systèmes Numériques" }
    ]
  },
  {
    name: "LPO Léonard de Vinci",
    website: "pia.ac-paris.fr/serail/jcms/s2_101772/fr/accueil",
    type: "public",
    specialties: ["Électrotechnique", "Maintenance", "Énergétique"],
    formations: [
      { name: "Bac Pro MELEC", level: "Niveau 4", description: "Métiers de l'Électricité et de ses Environnements Connectés" }
    ]
  },
  {
    name: "LPO Jacques Monod",
    website: "pia.ac-paris.fr/serail/jcms/s6_203905/fr/accueil",
    type: "public",
    specialties: ["Santé", "Laboratoire", "Chimie"],
    formations: [
      { name: "Bac Pro LCQ", level: "Niveau 4", description: "Laboratoire Contrôle Qualité" }
    ]
  },
  {
    name: "LPO Jean Lurçat",
    website: "lycee-jean-lurcat.net",
    type: "public",
    specialties: ["Commerce", "Vente", "Accueil"],
    formations: [
      { name: "Bac Pro MCV", level: "Niveau 4", description: "Métiers du Commerce et de la Vente" }
    ]
  },
  {
    name: "LPO Guillaume Tirel",
    website: "lyceeguillaumetirel.fr/fr",
    type: "public",
    specialties: ["Hôtellerie", "Restauration", "Tourisme"],
    formations: [
      { name: "Bac Pro Cuisine", level: "Niveau 4", description: "Formation aux métiers de la cuisine" }
    ]
  },
  {
    name: "LPO Lucas de Nehou",
    website: "pia.ac-paris.fr/serail/jcms/s1_1879560/fr/accueil",
    type: "public",
    specialties: ["Arts du verre", "Vitrail", "Décoration sur verre"],
    formations: [
      { name: "CAP Arts et techniques du verre", level: "Niveau 3", description: "Formation aux techniques du verre" }
    ]
  }
];