// Types for PDF resources
export interface PDFResource {
  title: string;
  description: string;
  pdfUrl: string;
}

// Activity Documents
export const activityDocuments = {
  activity1: [
    {
      title: "Évolution des objets techniques",
      description: "Document de lancement sur l'évolution des objets",
      pdfUrl: "/documents/5eme/sequence-3/activite-1/evolution-objets.pdf"
    }
  ],
  activity2: [
    {
      title: "Méthodes de recherche historique",
      description: "Guide pour la collecte et l'analyse de données historiques",
      pdfUrl: "/documents/5eme/sequence-3/activite-2/methodes-recherche.pdf"
    }
  ],
  activity3: [
    {
      title: "Comparaison des principes techniques",
      description: "Méthodes pour comparer les objets techniques",
      pdfUrl: "/documents/5eme/sequence-3/activite-3/comparaison-technique.pdf"
    }
  ]
};

// Resources Documents
export const resourceDocuments = {
  courseResources: [
    {
      title: "Fiche ressource évolution",
      description: "Document détaillé sur l'évolution des objets techniques",
      pdfUrl: "/documents/5eme/sequence-3/resources/Fiche ressource évolution activité 3.pdf"
    },
    {
      title: "Frise chronologique",
      description: "Frise chronologique de l'évolution des objets techniques",
      pdfUrl: "/documents/5eme/sequence-3/resources/Frise chrono.pdf"
    },
    {
      title: "Familles d'objets",
      description: "Classification et listes des familles d'objets",
      pdfUrl: "/documents/5eme/sequence-3/resources/Image 2 listes familles objets.pdf"
    }
  ],
  studentResources: [
    {
      title: "Trame Page de Garde",
      description: "Modèle de page de garde à utiliser pour vos documents",
      pdfUrl: "/documents/5eme/sequence-1/resources/trame-pdg.pdf" // Reusing existing template
    },
    {
      title: "Guide de recherche historique",
      description: "Comment effectuer des recherches sur l'histoire des objets",
      pdfUrl: "/documents/5eme/sequence-3/activite-2/methodes-recherche.pdf" // Reusing activity document
    },
    {
      title: "Fiche méthode - Analyse comparative",
      description: "Comment comparer efficacement différents objets techniques",
      pdfUrl: "/documents/5eme/sequence-3/activite-3/comparaison-technique.pdf" // Reusing activity document
    }
  ]
};