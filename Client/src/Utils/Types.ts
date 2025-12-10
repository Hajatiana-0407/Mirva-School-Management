// ACTION
export type ActionType = {
    isLoading?: boolean;
    isDeleting?: boolean;
    isUpdating?: boolean;
    isFilterLoading?: boolean
}
export const ActionIntialValue: ActionType = {
    isLoading: false,
    isDeleting: false,
    isUpdating: false,
}

export type PaginationType = {
    data: any;
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    search?: string;
    filter?: {
        [key: string]: any;
    };
}

export const PaginationInitialValue: PaginationType = {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
    total_pages: 0
}

// APP
export type AppStateType = {
    hiddeTheModalActive: boolean;
    allClasses?: ClasseType[];
    allSchoolyears?: SchoolYearType[];
    allLevels?: levelType[] ; 
    allSubjects?: SubjectType[]
}
export const AppInitialValue: AppStateType = {
    hiddeTheModalActive: false,
}
export type MenuItemType = {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    path?: string;
    color?: string;
    children?: MenuItemType[];
}

export type Permission = {
    create: boolean;
    update: boolean;
    read: boolean;
    delete: boolean;
};
type PermissionsMap = Record<string, Permission>;
type InfoType = {
    nom: string,
    prenom: string,
    matricule?: string
    id_personnel?: number,
    id_eleve?: number,
    id_parent?: number,
    photo?: string,
}

export type TokenDecodeType = {
    user?: User;
    permissions: PermissionsMap;
    info?: InfoType
}
export type User = {
    id_user?: number;
    role_id?: 'admin' | 'teacher' | 'student' | 'parent' | string,
    identifiant: string | null;
    password?: string | null;
    role: 'admin' | 'secretaire' | 'proffesseur' | 'parent' | 'etudiant' | string | null;
    status: boolean;
    created_at?: string;
    last_login?: string | null;
}
export type AuthStateType = {
    isLoggedIn?: boolean;
    token?: string;
} & TokenDecodeType

export const AuthInitialValue: AuthStateType = {
    user: undefined,
    isLoggedIn: false,
    token: '',
    permissions: {}
}

// BACK'S OBJECT RETURN 
export type ApiReturnType = {
    error: boolean;
    message?: string,
    data?: any;
    pagination: PaginationType

}
export const ApiReturnInitial: ApiReturnType = {
    error: false,
    message: '',
    data: {},
    pagination: PaginationInitialValue
}

// MODULES ( COMPOSANTS ) //
export type ModuleType = {
    id_module?: number;
    nom: string;
    description: string;
    label: string
    is_for_all?: boolean,
    is_section?: boolean,
}

export const ModuleInitialValue: ModuleType = {
    description: '',
    label: '',
    nom: ''
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
    prefix?: string;

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
    classe?: { listes: ClasseType[], id_niveau?: number };
    matiere?: { listes: SubjectType[], id_niveau?: number };
    prof?: { listes: EmployeeType[], id_niveau?: number };
    created_at?: string
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
    niveau_id_niveau: number;
    niveau?: string;
    created_at?: string;
    matiere?: { listes: SubjectType[], id_niveau?: number };
    prof?: { listes: EmployeeType[], id_niveau?: number };
    eleve?: { listes: StudentType[], id_niveau?: number };
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
} & levelType & SubjectType



// Employee ( EMPLOYE )
export type EmployeeType = {
    id_personnel?: number;
    matricule_personnel?: string;
    nom: string;
    prenom: string;
    addresse: string;
    telephone: string;
    date_naissance: string;
    lieu_naissance: string;
    sexe: string;
    email?: string;
    engagement?: string;
    password?: string;
    pc_cin?: string;
    photo?: string;
    id_type_personnel?: number;
    type_personnel?: string;
    type?: string;

    status?: 'Actif' | 'Suspendu' | 'Démissionnaire';
    numero_cin: string,
    nationalite: string,
    type_contrat: string,
    specialisation?: string,
    certification?: string,

    // ? Urgence 
    urgence_nom?: string,
    urgence_lien?: string,
    urgence_tel?: string,
    urgence_email?: string,

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
    lieu_naissance: '',
    nationalite: 'Malagasy',
    numero_cin: '',
    type_contrat: '',
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

export type SubjectClasseAssignmentsType = ClasseType & { matieres?: SubjectType[] }
export type TeacherType = EmployeeType & { classes?: SubjectClasseAssignmentsType[] };


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

// Parents ( Parent )
export type ParentType = {
    id_parent?: number;
    nom: string;
    prenom: string;
    type?: string;
    telephone: string;
    email?: string;
    adresse: string;
    profession: string;
    employeur?: string;
    telephone_travail?: string;
    contact_urgence?: string;
    pc_cin?: string;
    created_at?: string;
    updated_at?: string;
}

export const ParentInitialValue: ParentType = {
    id_parent: undefined,
    nom: '',
    prenom: '',
    type: '',
    telephone: '',
    email: '',
    adresse: '',
    profession: '',
    employeur: '',
    telephone_travail: '',
    contact_urgence: '',
    pc_cin: '',
    created_at: '',
    updated_at: '',
}
// Students ( Eleve )
export type StudentType = {
    id_eleve?: number;
    matricule_etudiant?: string;
    nom: string;
    prenom: string;
    adresse?: string;
    telephone?: string;
    classe?: string;
    nationalite?: string;
    parent_id_parent?: number;
    date_naissance: string;
    lieu_naissance: string;
    sexe: string;
    maladie?: string;
    photo?: string;
    created_at?: string;
    email?: string;

    pc_pi?: string;
    pc_act_naissance?: string;
    bulletin?: string;

    maladies?: string;
    urgence_nom?: string;
    urgence_tel?: string;
    urgence_lien?: string;
}

export const StudentInitialValue: StudentType = {
    id_eleve: undefined,
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    classe: "",
    nationalite: "",
    parent_id_parent: undefined,
    date_naissance: "",
    lieu_naissance: "",
    sexe: "",
    maladie: "",
    photo: "",
    created_at: "",
    email: "",
    pc_pi: "",
};

// Student details 
export type StudentDetailsType = StudentType & levelType & ClasseType & { mere?: ParentType, pere?: ParentType, tuteur?: ParentType }

// Registration ( INSCRIPTION )
export type RegistrationType = {
    id_inscription?: number;
    date_inscription?: string
    // Élève
    matricule_etudiant?: string;
    nom: string;
    nom_eleve?: string;
    prenom: string;
    sexe: string;
    date_naissance: string;
    lieu_naissance: string;
    nationalite: string;
    adresse: string;
    telephone: string;
    email: string;
    identifiant: string;
    certificat_naissance: string;
    // Scolarité
    niveau: string;
    classe: string;
    annee_scolaire: string;
    langue_vivante?: string;
    ancienne_ecole?: string;
    diplome?: string;
    // Parents / Tuteur
    pere_nom?: string;
    pere_profession?: string;
    pere_tel?: string;
    pere_email?: string;
    mere_nom?: string;
    mere_profession?: string;
    mere_tel?: string;
    mere_email?: string;
    adresse_parents?: string;
    tuteur_nom?: string;
    tuteur_lien?: string;
    tuteur_tel?: string;
    tuteur_email?: string;
    // Médical
    maladies?: string;
    urgence_nom?: string;
    urgence_lien?: string;
    urgence_tel?: string;
    // Administratif / Financier
    paiement?: string;
    bourse?: string;
    payeur_nom?: string;
    payeur_coord?: string;
    // Pièces jointes
    acte_naissance: string;
    piece_identite: string;
    photo_recente: string;
    bulletin?: string;
    vaccination?: string;
    // Autres
    photo?: string;
    id_eleve?: number;
};

export const registrationInitialValue: RegistrationType = {
    id_eleve: undefined,
    nom: '',
    prenom: '',
    sexe: '',
    date_naissance: '',
    lieu_naissance: '',
    nationalite: '',
    adresse: '',
    telephone: '',
    email: '',
    identifiant: '',
    certificat_naissance: '',
    niveau: '',
    classe: '',
    annee_scolaire: '',
    langue_vivante: '',
    ancienne_ecole: '',
    diplome: '',
    pere_nom: '',
    pere_profession: '',
    pere_tel: '',
    pere_email: '',
    mere_nom: '',
    mere_profession: '',
    mere_tel: '',
    mere_email: '',
    adresse_parents: '',
    tuteur_nom: '',
    tuteur_lien: '',
    tuteur_tel: '',
    tuteur_email: '',
    maladies: '',
    urgence_nom: '',
    urgence_lien: '',
    urgence_tel: '',
    paiement: '',
    bourse: '',
    payeur_nom: '',
    payeur_coord: '',
    acte_naissance: '',
    piece_identite: '',
    photo_recente: '',
    bulletin: '',
    vaccination: '',
    photo: '',
};


// STUDENTS FORM REGISTER TYPE 
type Field = {
    label: string;
    value: string;
};
export type StudentFormDataType = {
    matricule_etudiant?: Field;
    photo?: string;
    nom: Field;
    prenom: Field;
    date_naissance: Field;
    lieu_naissance: Field;
    adresse: Field;
    telephone: Field;
    email: Field;
    sexe: Field;
    nationalite: Field;

    // Étape 2 (scolaire)
    ancienne_ecole: Field;
    niveau: Field;
    classe: Field;

    // Étape 3 (parents)
    pere_nom: Field;
    pere_profession: Field;
    pere_tel: Field;
    mere_nom: Field;
    mere_profession: Field;
    mere_tel: Field;
    adresse_parents: Field;
    tuteur_email: Field;

    // Si tuteur
    tuteur_nom: Field;
    tuteur_lien: Field;
    tuteur_tel: Field;
    tuteur_email_alt: Field;

    // Étape 4 (médical)
    maladies: Field;
    urgence_nom: Field;
    urgence_lien: Field;
    urgence_tel: Field;
};

export const StudentFormDataInitialValue: StudentFormDataType = {
    nom: { label: "", value: "" },
    prenom: { label: "", value: "" },
    date_naissance: { label: "", value: "" },
    lieu_naissance: { label: "", value: "" },
    adresse: { label: "", value: "" },
    telephone: { label: "", value: "" },
    email: { label: "", value: "" },
    sexe: { label: "", value: "" },
    nationalite: { label: "", value: "" },

    ancienne_ecole: { label: "", value: "" },
    niveau: { label: "", value: "" },
    classe: { label: "", value: "" },

    pere_nom: { label: "", value: "" },
    pere_profession: { label: "", value: "" },
    pere_tel: { label: "", value: "" },
    mere_nom: { label: "", value: "" },
    mere_profession: { label: "", value: "" },
    mere_tel: { label: "", value: "" },
    adresse_parents: { label: "", value: "" },
    tuteur_email: { label: "", value: "" },

    tuteur_nom: { label: "", value: "" },
    tuteur_lien: { label: "", value: "" },
    tuteur_tel: { label: "", value: "" },
    tuteur_email_alt: { label: "", value: "" },

    maladies: { label: "", value: "" },
    urgence_nom: { label: "", value: "" },
    urgence_lien: { label: "", value: "" },
    urgence_tel: { label: "", value: "" },
};



// ===================== Lessons ===================== //
export type LessonType = {
    id_lecon?: number;
    slug: string;
    titre: string;
    lecon_description: string;
    contenu?: string;
    ficher_principale?: string;
    fichier_support?: string;
    id_matiere?: number;
    id_prof?: number;
    id_niveau?: number;
    created_at?: any;
    published?: number
} & EmployeeType & SubjectType & levelType;

export const LessonInitialValue: LessonType = {
    titre: '',
    slug: '',
    lecon_description: '',
    ...employeeInitialValue,
    ...subjectInitialValue,
    ...levelInitial

}
// ===================== Exercice ===================== //
export type ExerciceType = {
    id_exercice?: number;
    slug: string;
    titre: string;
    exercice_description: string;
    contenu?: string;
    ficher_principale?: string;
    fichier_support?: string;
    id_matiere?: number;
    id_prof?: number;
    id_niveau?: number;
    created_at?: any;
    published?: number
} & EmployeeType & SubjectType & levelType;

export const ExerciceInitialValue: ExerciceType = {
    titre: '',
    slug: '',
    exercice_description: '',
    ...employeeInitialValue,
    ...subjectInitialValue,
    ...levelInitial

}


// ===================== Roles ===================== //
export type RoleType = {
    id_role?: number;
    identification: string;
    nom: string;
    description: string;
    is_restrict: string;
    couleur: string;
    total_utilisateur: number;
    permissions: Record<number, Permission & { label: string, is_for_all?: boolean, is_section?: boolean, }>;
};
export const RoleInitialValue: RoleType = {
    identification: '',
    nom: '',
    description: '',
    is_restrict: '',
    couleur: '',
    total_utilisateur: 0,
    permissions: {}
}

// ===================== Employe du temps  ===================== //
export type SheduleType = {
    id_edt?: number;
    assignation_id: number;
    jour_id: number;
    heure_debut: string;
    heure_fin: string;
    salle: string;
    heure_index?: number;
    annee_scolaire_id: number;

    id_matiere: number;
    denomination: string;
    abbreviation: string;
    description: string;
    couleur: string;
    matiere: string;

    id_classe: number;
    niveau_id_niveau: number;
    classe: string;

    id_personnel: number;
    nom: string;
    prenom: string;

    created_at: string;
}
export const SheduleInitialeValue: SheduleType = {
    assignation_id: 0,
    jour_id: 0,
    heure_debut: "",
    heure_fin: "",
    salle: "",
    annee_scolaire_id: 0,

    id_matiere: 0,
    denomination: "",
    abbreviation: "",
    description: "",
    couleur: "",
    matiere: "",

    id_classe: 0,
    niveau_id_niveau: 0,
    classe: "",

    id_personnel: 0,
    nom: "",
    prenom: "",

    created_at: "",
};

export type SheduleByClasseType = ClasseType & EmployeeType & { edt: SheduleType[] };
export const SheduleClasseIntialeValue: SheduleByClasseType = { ...classeInitialState, ...employeeInitialValue, edt: [] }

export type AssignationType = {
    // colonnes de la table 'classe'
    id_assignation?: number;
    id_classe: number;
    denomination: string;
    description?: string | null;
    abreviation?: string | null;
    niveau_id?: number | null;
    // ajoute ici les autres colonnes réelles de ta table 'classe'

    // alias supplémentaires
    classe: string; // c.denomination as classe

    // données du personnel
    nom: string;
    prenom: string;
    id_personnel: number;

    // données de la matière
    matiere: string;       // m.denomination as matiere
    abbreviation: string;  // m.abbreviation
    id_matiere: number;
}




