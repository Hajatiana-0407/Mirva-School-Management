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

