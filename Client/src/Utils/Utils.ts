import { StudentFormDataType } from "./Types";

export const cycles =  ['Primaire', 'Collège', 'Lycée'];
export const hexToRgba = (hex: string , alpha = 1): string  => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const baseUrl = ( uri: string | undefined ) => {
  const serverUrl = 'http://localhost/Mirva-School-Management/Server/' ; 

  if ( uri !== undefined  ){ 
    return `${ serverUrl }${ uri }` ; 
  }else { 
    return `${ serverUrl }` ; 
  }
}

export const fakeStudentData: StudentFormDataType = {
  nom: { label: "Nom", value: "Rakoto" },
  prenom: { label: "Prénom", value: "Jean" },
  date_naissance: { label: "Date de naissance", value: "2008-05-12" },
  lieu_naissance: { label: "Lieu de naissance", value: "Antananarivo" },
  adresse: { label: "Adresse complète", value: "Lot II F 23, Andoharanofotsy" },
  telephone: { label: "Téléphone", value: "+261340000000" },
  email: { label: "Email", value: "jean.rakoto@example.com" },
  sexe: { label: "Sexe", value: "Homme" },
  nationalite: { label: "Nationalité", value: "Malagasy" },

  // Etape 2 (scolaire) - pas de select, donc que l’ancienne école
  ancienne_ecole: { label: "Ancienne école fréquentée", value: "Collège Sainte Marie" },
  niveau: { label: "Niveau", value: "5ème" },
  classe: { label: "Classe", value: "5A" },

  // Etape 3 (parents)
  pere_nom: { label: "Nom et prénoms du père", value: "Rakoto Be" },
  pere_profession: { label: "Profession du père", value: "Comptable" },
  pere_tel: { label: "Téléphone du père", value: "+261341111111" },
  mere_nom: { label: "Nom et prénoms de la mère", value: "Rasoa" },
  mere_profession: { label: "Profession de la mère", value: "Enseignante" },
  mere_tel: { label: "Téléphone de la mère", value: "+261342222222" },
  adresse_parents: { label: "Adresse des parents", value: "Lot II F 23, Andoharanofotsy" },
  tuteur_email: { label: "Email", value: "parents.rakoto@example.com" },

  // Si tuteur à la place des parents
  tuteur_nom: { label: "Nom et prénoms du tuteur légal", value: "Randria Paul" },
  tuteur_lien: { label: "Lien avec l’élève", value: "Oncle" },
  tuteur_tel: { label: "Téléphone du tuteur", value: "+261343333333" },
  tuteur_email_alt: { label: "Email du tuteur", value: "tuteur.randria@example.com" },

  // Etape 4 (médical)
  maladies: { label: "Alergies ou Maladies chroniques", value: "Asthme" },
  urgence_nom: { label: "Personne à contacter en cas d’urgence", value: "Rabe Joseph" },
  urgence_lien: { label: "Lien avec l’élève (urgence)", value: "Grand-père" },
  urgence_tel: { label: "Téléphone urgence", value: "+261344444444" },
};
