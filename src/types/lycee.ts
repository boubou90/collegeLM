export interface Lycee {
  name: string;
  address: string;
  arrondissement: string;
  website: string;
  specialties: string[];
  group: 'Nord-Est' | 'Est' | 'Nord' | 'Ouest' | 'Sud';
}