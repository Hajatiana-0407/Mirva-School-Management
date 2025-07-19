// ACTION
export type ActionType = {
    isLoading?: boolean;
    isDeleting?: boolean;
    isUpdating?: boolean;
}
export const ActionIntialValue: ActionType  = {
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

