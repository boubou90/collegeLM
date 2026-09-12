// Types for PDF resources
export interface PDFResource {
  title: string;
  description: string;
  pdfUrl: string;
}

export interface SequenceResources {
  courseResources: PDFResource[];
  studentResources: PDFResource[];
}

// Sequence 1 Resources
export const sequence1Resources: SequenceResources = {
  courseResources: [
    {
      title: "Le réseau local et Internet",
      description: "Comprendre la différence entre un réseau local et le réseau mondial (Internet)",
      pdfUrl: "/documents/5eme/sequence-1/resources/fiche-1-reseaux.pdf"
    },
    {
      title: "Les composants d'un réseau",
      description: "Le rôle d'un terminal, d'une carte réseau, des liaisons (filaires ou non filaires), d'un commutateur, d'un routeur, d'un serveur",
      pdfUrl: "/documents/5eme/sequence-1/resources/fiche-2-composants.pdf"
    },
    {
      title: "Les adresses IP et le routage",
      description: "Le rôle et la structure d'une adresse IP, des tables de routage",
      pdfUrl: "/documents/5eme/sequence-1/resources/fiche-3-adresses-ip.pdf"
    }
  ],
  studentResources: [
    {
      title: "Trame Page de Garde",
      description: "Modèle de page de garde à utiliser pour vos documents",
      pdfUrl: "/documents/5eme/sequence-1/resources/trame-pdg.pdf"
    },
    {
      title: "Guide de prise de notes",
      description: "Comment organiser vos notes de cours efficacement",
      pdfUrl: "/documents/5eme/sequence-1/resources/guide-notes.pdf"
    },
    {
      title: "Fiche méthode - Schéma réseau",
      description: "Comment réaliser un schéma de réseau clair et précis",
      pdfUrl: "/documents/5eme/sequence-1/resources/methode-schema-reseau.pdf"
    },
    {
      title: "Exercices supplémentaires",
      description: "Exercices d'entraînement sur les réseaux",
      pdfUrl: "/documents/5eme/sequence-1/resources/exercices-supplementaires.pdf"
    }
  ]
};

// Sequence 2 Resources
export const sequence2Resources: SequenceResources = {
  courseResources: [
    {
      title: "Sécurité des données",
      description: "Les principes fondamentaux de la sécurité numérique",
      pdfUrl: "/documents/5eme/sequence-2/resources/securite-donnees.pdf"
    },
    {
      title: "Organisation des fichiers",
      description: "Guide complet sur l'organisation et la sauvegarde des données",
      pdfUrl: "/documents/5eme/sequence-2/resources/organisation-fichiers.pdf"
    },
    {
      title: "Cybersécurité",
      description: "Les bonnes pratiques de la cybersécurité",
      pdfUrl: "/documents/5eme/sequence-2/resources/cybersecurite.pdf"
    }
  ],
  studentResources: [
    {
      title: "Trame Page de Garde",
      description: "Modèle de page de garde à utiliser pour vos documents",
      pdfUrl: "/documents/5eme/sequence-2/resources/trame-pdg.pdf"
    },
    {
      title: "Guide - Protection des données",
      description: "Comment protéger ses données personnelles",
      pdfUrl: "/documents/5eme/sequence-2/resources/guide-protection.pdf"
    },
    {
      title: "Fiche méthode - Mots de passe",
      description: "Comment créer et gérer des mots de passe sécurisés",
      pdfUrl: "/documents/5eme/sequence-2/resources/methode-mdp.pdf"
    },
    {
      title: "Exercices supplémentaires",
      description: "Exercices d'entraînement sur la sécurité numérique",
      pdfUrl: "/documents/5eme/sequence-2/resources/exercices-supplementaires.pdf"
    }
  ]
};

// Activity Documents
export interface ActivityDocument {
  title: string;
  pdfUrl: string;
}
