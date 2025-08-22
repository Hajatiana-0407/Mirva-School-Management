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
    niveau_id_niveau: number ; 
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
    id_type_personnel: undefined ,
    created_at: ''
} ; 
