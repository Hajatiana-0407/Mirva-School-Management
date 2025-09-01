// ACTION
export type ActionType = {
    isLoading?: boolean;
    isDeleting?: boolean;
    isUpdating?: boolean;
}
export const ActionIntialValue: ActionType = {
    isLoading: false,
    isDeleting: false,
    isUpdating: false,
}

// APP
export type AppStateType = {
    hiddeTheModalActive: boolean
}
export const AppInitialValue: AppStateType = {
    hiddeTheModalActive: false
}

// BACK'S OBJECT RETURN 
export type ApiReturnType = {
    'error': boolean;
    'message'?: string,
    'data'?: any
}
export const ApiReturnInitial: ApiReturnType = {
    'error': false,
    'message': '',
    'data': {}
}

// SCHOOL MANAGEMENT SYSTEM TYPES //
export type ShoolInfoType = {
    id_etablissement?: number;
    nom: string;
    code: string;
    slogan?: string;
    adresse: string;
    telephone: string;
    email: string;
    logo?: string;
    created_at?: string;
    description?: string;

    // Optional - Social Media Links
    site_web?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
}

export const SchoolInfoInitialValue: ShoolInfoType = {
    id_etablissement: undefined,
    nom: '',
    code: '',
    slogan: '',
    adresse: '',
    telephone: '',
    email: '',
    logo: '',
    created_at: '',
    description: '',

    site_web: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: ''
};

// LEVEL ( NIVEAU )
export type levelType = {
    id_niveau?: number;
    niveau: string;
    cycle: string;
    description: string;
}
export const levelInitial: levelType = {
    niveau: '',
    cycle: '',
    description: '',
}

// Subjects ( MATIERE )
export type SubjectType = {
    id_matiere?: number;
    denomination: string;
    abbreviation: string;
    description?: string;
    couleur: string;
    created_at: string
};
export const subjectInitialValue: SubjectType = {
    id_matiere: undefined,
    denomination: '',
    abbreviation: '',
    description: '',
    couleur: '',
    created_at: ''
}

// Classes ( CLASSSE )
export type ClasseType = {
    id_classe?: number;
    denomination: string;
    niveau_id_niveau: number
}

export const classeInitialState: ClasseType = {
    id_classe: undefined,
    denomination: '',
    niveau_id_niveau: 0
}

// Level / Subject 
export type LevelSubjectType = {
    matiere_id_matiere: number;
    niveau_id_niveau: number;
    coefficient: number
}



// Employee ( EMPLOYE )
export type EmployeeType = {
    id_personnel?: number;
    nom: string;
    prenom: string;
    addresse: string;
    telephone: string;
    date_naissance: string;
    sexe: string;
    email?: string;
    engagement?: string;
    password?: string;
    pc_cin?: string;
    photo?: string;
    id_type_personnel?: number;
    status?: 'Actif' | 'Suspendu' | 'Démissionnaire';
    date_embauche?: string;
    salaire_base?: number;
    created_at?: string;
}

export const employeeInitialValue: EmployeeType = {
    id_personnel: undefined,
    nom: '',
    prenom: '',
    addresse: '',
    telephone: '',
    date_naissance: '',
    sexe: '',
    email: '',
    engagement: '',
    password: '',
    pc_cin: '',
    photo: '',
    id_type_personnel: undefined,
    status: 'Actif',
    date_embauche: '',
    salaire_base: 0,
    created_at: ''
};


// Type Personnel ( TYPE PERSONNEL )
export type TypePersonnelType = {
    id_type_personnel?: number;
    type: string;
    description?: string;
}
export const TypePersonnelInitialValue: TypePersonnelType = {
    id_type_personnel: undefined,
    type: '',
    description: ''
};

// School Year ( ANNEE SCOLAIRE )
export type SchoolYearType = {
    id_annee_scolaire?: number;
    nom: string;
    date_debut: string;
    date_fin: string;
    description?: string;
    isActif?: string;
};

export const schoolYearInitialValue: SchoolYearType = {
    nom: '',
    date_debut: '',
    date_fin: '',
    description: '',
};
