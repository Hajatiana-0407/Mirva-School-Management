import { jwtDecode } from "jwt-decode";
import { StudentFormDataType, TokenDecodeType } from "./Types";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import api from "./api";
import { toast } from "react-toastify";



export const cycles = ['Primaire', 'Collège', 'Lycée'];
export const hexToRgba = (hex: string, alpha = 1): string => {
  const r = parseInt(hex?.slice(1, 3), 16);
  const g = parseInt(hex?.slice(3, 5), 16);
  const b = parseInt(hex?.slice(5, 7), 16);
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
  data: TokenDecodeType;
}
export const decodeToken = (token: string): DecodePropsType => {
  const tokenDecode: {
    exp: number;
    iat: number;
    data: TokenDecodeType;
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

/**
 * 
 * @param titre Le text a transformer en nom de dossier
 * @returns Nom de dossier valide 
 */
export function formatFolderName(titre: string): string {
  return titre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .toLowerCase();
}


type DowloadPropsType = {
  title: string;
  principalFileUrl: string;
  supportFileUrl?: string;
  description?: string;
}

const downloadUrl = 'admin/download';
export const download = async (
  fileInfo: DowloadPropsType,
  onProgress?: (percent: number, step: string) => void
) => {
  const zip = new JSZip();
  const folderName = formatFolderName(fileInfo.title);
  const folder = zip.folder(folderName);
  if (!folder) throw new Error("Impossible de créer le dossier dans le zip");

  let error = false;

  //  Progression initiale
  onProgress?.(0, "Préparation du dossier...");

  //  Ajouter le fichier info.txt
  const infoContent = `Titre : ${fileInfo.title}\nDescription : ${fileInfo.description}`;
  folder.file("info.txt", infoContent);

  //  Télécharger le fichier principal
  try {
    onProgress?.(10, "Téléchargement du fichier principal...");
    const response = await api.get(downloadUrl, {
      params: { filePath: fileInfo.principalFileUrl },
      responseType: "blob",
      onDownloadProgress: (e) => {
        if (e.total) {
          const percent = Math.round((e.loaded / e.total) * 60);
          onProgress?.(percent, "Téléchargement du fichier principal...");
        }
      },
    });

    const mainBlob = response.data;
    const ext = fileInfo.principalFileUrl.split(".").pop() || "txt";
    folder.file(`${folderName}.${ext}`, mainBlob);
  } catch (err) {
    console.error("Erreur lors du téléchargement :", err);
    error = true;
  }

  //  Télécharger le fichier de support si présent
  if (fileInfo.supportFileUrl) {
    onProgress?.(70, "Téléchargement du fichier de support...");
    const optionalUrl = baseUrl(fileInfo.supportFileUrl);
    try {
      const response = await api.get(downloadUrl, {
        params: { filePath: fileInfo.supportFileUrl },
        responseType: "blob",
      });
      const optionalBlob = response.data;
      const ext = fileInfo.supportFileUrl.split(".").pop() || "txt";
      folder.file(`support.${ext}`, optionalBlob);
    } catch (err) {
      error = true;
      console.warn(
        `Fichier optionnel non trouvé ou impossible à télécharger : ${optionalUrl}`
      );
    }
  }

  //  Génération du ZIP avec suivi de progression
  if (!error) {
    onProgress?.(80, "Compression du fichier ZIP...");
    const zipBlob = await zip.generateAsync(
      { type: "blob" },
      (metadata) => {
        const percent = 80 + Math.round((metadata.percent * 20) / 100);
        onProgress?.(percent, "Compression du fichier ZIP...");
      }
    );

    onProgress?.(100, "Téléchargement terminé");
    saveAs(zipBlob, `${folderName}.zip`);
    toast("Téléchargement effectué");
  } else {
    onProgress?.(100, "Erreur lors du téléchargement");
    toast.error("Erreur lors du téléchargement.");
  }
};




export const timeSlots = [
  { denomination : '7h - 8h', label   : '07:00', value: 1 },
  { denomination : '8h - 9h', label   : '08:00', value: 2 },
  { denomination : '9h - 10h', label   : '09:00', value: 3 },
  { denomination : '10h - 11h', label   : '10:00', value: 4 },
  { denomination : '11h - 12h', label   : '11:00', value: 5 },
  { denomination : '12h - 13h', label   : '12:00', value: 6 },
  { denomination : '13h - 14h', label   : '13:00', value: 7 },
  { denomination : '14h - 15h', label   : '14:00', value: 8 },
  { denomination : '15h - 16h', label   : '15:00', value: 9 },
  { denomination : '16h - 17h', label   : '16:00', value: 10 },
];


