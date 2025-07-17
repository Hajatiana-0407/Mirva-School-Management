export type ActionType = {
    isLoading?: boolean,
    isDeleting?: boolean,
    isUpdating?: boolean
}


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
// Level
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

