// === hero_slide ===
export type HeroSlideType = {
    id_slide?: number;
    titre: string;
    soustitre?: string;
    image?: string;
    cta?: string;
    cta_link?: string;
    actif: boolean;
};

export const HeroSlideInitialValue = {
    titre: '',
    soustitre: '',
    image: '',
    cta: '',
    cta_link: '',
    actif: true,
};

// === presentation ===
export type PresentationType = {
    id_presentation?: number;
    titre: string;
    description: string;
    image?: string;
    nombre_eleves: number;
    nombre_professeurs: number;
    annees_experience: number;
    taux_reussite: number;
    actif: boolean;
};

export const PresentationInitialValue = {
    titre: '',
    description: '',
    image: '',
    nombre_eleves: 0,
    nombre_professeurs: 0,
    annees_experience: 0,
    taux_reussite: 0.0,
    actif: true,
};

// === slogan ===
export type SloganType = {
    id_slogan?: number;
    titre: string;
    description?: string;
    icone?: string;
    actif: boolean;
};

export const SloganInitialValue = {
    titre: '',
    description: '',
    icone: '',
    actif: true,
};

// === notre_histoire ===
export type HistoryType = {
    id_histoire?: number;
    titre: string;
    description: string;
    reconnaissance_par?: string;
    image?: string;
    actif: boolean;
};

export const HistoryInitialValue = {
    titre: '',
    description: '',
    reconnaissance_par: '',
    image: '',
    actif: true,
};

// === valeur ===
export type ValueType = {
    id_valeur?: number;
    titre: string;
    description: string;
    icone?: string;
    actif: boolean;
};

export const ValueInitialValue = {
    titre: '',
    description: '',
    icone: '',
    actif: true,
};

// === pilier_educatif ===
export type EducationalPillarType = {
    id_pilier?: number;
    titre: string;
    description: string;
    icone?: string;
    actif: boolean;
};

export const EducationalPillarInitialValue = {
    titre: '',
    description: '',
    icone: '',
    actif: true,
};

// === installation ===
export type InstallationType = {
    id_installation?: number;
    titre: string;
    description: string;
    image?: string;
    actif: boolean;
};

export const InstallationInitialValue = {
    titre: '',
    description: '',
    image: '',
    actif: true,
};

// === programme_pedagogique ===
export type PedagogicalProgramType = {
    id_point?: number;
    titre: string;
    contenu: string;
    ordre: number;
    actif: boolean;
};

export const PedagogicalProgramInitialValue = {
    titre: '',
    contenu: '',
    ordre: 0,
    actif: true,
};

// === activite_prescolaire ===
export type PreschoolActivityType = {
    id_activite?: number;
    label: string;
    icone?: string;
    actif: boolean;
};

export const PreschoolActivityInitialValue = {
    label: '',
    icone: '',
    actif: true,
};

// === actualite ===
export type NewsType = {
    id_actualite?: number;
    titre: string;
    contenu: string;
    date_publication?: string;
    image?: string;
    publie: boolean;
};

export const NewsInitialValue = {
    titre: '',
    contenu: '',
    date_publication: '',
    image: '',
    publie: true,
};

// === evenement ===
export type EventType = {
    id_evenement?: number;
    titre: string;
    description?: string;
    date_evenement?: string;
    lieu?: string;
    image?: string;
    publie: boolean;
};

export const EventInitialValue = {
    titre: '',
    description: '',
    date_evenement: '',
    lieu: '',
    image: '',
    publie: true,
};

// === galerie ===
export type GalleryType = {
    id_image?: number;
    titre?: string;
    url?: string;
    categorie?: string;
    id_evenement?: number;
    publie: boolean;
};

export const GalleryInitialValue = {
    titre: '',
    url: '',
    categorie: '',
    id_evenement: undefined,
    publie: true,
};

// === message_contact ===
export type ContactMessageType = {
    id_message?: number;
    nom: string;
    email: string;
    message: string;
    date_message?: string;
    lu: boolean;
};

export const ContactMessageInitialValue = {
    nom: '',
    email: '',
    message: '',
    date_message: '',
    lu: false,
};
