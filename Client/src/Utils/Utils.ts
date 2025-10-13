import { jwtDecode } from "jwt-decode";
import { AuthStateType, StudentFormDataType } from "./Types";

export const cycles = ['Primaire', 'Collège', 'Lycée'];
export const hexToRgba = (hex: string, alpha = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const baseUrl = (uri: string | undefined) => {
  const serverUrl = import.meta.env.VITE_API_URL;

  if (uri !== undefined) {
    return `${serverUrl}${uri}`;
  } else {
    return `${serverUrl}`;
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


export const getAge = (dateNaissance: string) => {
  const birthDate = new Date(dateNaissance);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Ajuster si la date d'anniversaire n'est pas encore passée cette année
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
};


export const getLongDate = (date: string) => {
  if (date !== '') {
    const theDate = new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    return theDate;
  } else {
    return 'N/A';
  }
}
export const getShortDate = (date: string) => {
  if (date !== '') {
    const theDate = new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
    return theDate;
  } else {
    return 'N/A';
  }
}

// ? format de numbre 
export const NumberFormat = (
  amount: number,
): string => {
  return amount ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : '0';
}



/**
 * Transforme un objet plat contenant des clés de type "parent[child]"
 * en un objet imbriqué { parent: { child: value } } compatible avec Yup.
 *
 * Exemple :
 *   const flatData = {
 *     "pere[nom]": "Jean",
 *     "pere[prenom]": "Paul",
 *     "mere[nom]": "Marie"
 *   };
 *
 *   const nested = nestData(flatData);
 *   console.log(nested);
 *    {
 *      pere: { nom: "Jean", prenom: "Paul" },
 *      mere: { nom: "Marie" }
 *    }
 *
 * @param flatData - Objet plat provenant du formulaire, avec des noms d'input type "parent[child]"
 * @returns Objet imbriqué prêt pour la validation avec Yup
 */
export const nestData = (flatData: Record<string, any>): Record<string, any> => {
  const nestedData: Record<string, any> = {};

  Object.keys(flatData).forEach((key) => {
    // Cherche les clés de type "parent[child]"
    const match = key.match(/^(\w+)\[(\w+)\]$/);
    if (match) {
      const parent = match[1]; // "pere"
      const child = match[2];  // "nom"
      if (!nestedData[parent]) nestedData[parent] = {};
      nestedData[parent][child] = flatData[key];
    } else {
      // Si pas de crochet, garde la clé telle quelle
      nestedData[key] = flatData[key];
    }
  });

  return nestedData;
};


type DecodePropsType = {
  exp: number;
  iat: number;
  data: AuthStateType['user'];
}
export const decodeToken = (token: string): DecodePropsType => {
  const tokenDecode: {
    exp: number;
    iat: number;
    data: AuthStateType['user'];
  } = jwtDecode(token);
  return tokenDecode;
}


export const generatePassword = (length = 12) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};