import { Briefcase, FileText, Mail, MapPin, Phone, User } from "lucide-react";
import Input from "../ui/Input";
import HeadingSmall from "../ui/HeadingSmall";
import { StudentDetailsType } from "../../Utils/Types";
import * as Yup from "yup";
import CheckInput from "../ui/CheckInput";

export const personSchema = Yup.object({
    nom: Yup.string()
        .nullable(),

    prenom: Yup.string().when("nom", {
        is: (val: string | undefined) => val && val.trim().length > 0,
        then: (s) => s.required("Le prénom est obligatoire."),
        otherwise: (s) => s.notRequired(),
    }),

    profession: Yup.string().when("nom", {
        is: (val: string | undefined) => val && val.trim().length > 0,
        then: (s) => s.required("La profession est obligatoire."),
        otherwise: (s) => s.notRequired(),
    }),

    adresse: Yup.string().when("nom", {
        is: (val: string | undefined) => val && val.trim().length > 0,
        then: (s) => s.required("L’adresse est obligatoire."),
        otherwise: (s) => s.notRequired(),
    }),

    telephone: Yup.string().when("nom", {
        is: (val: string | undefined) => val && val.trim().length > 0,
        then: (schema) =>
            schema
                .required("Le numéro de téléphone est obligatoire.")
                .matches(/^[0-9]+$/, "Le numéro de téléphone doit contenir uniquement des chiffres.")
                .min(10, "Le numéro de téléphone doit comporter au moins 10 chiffres.")
                .max(15, "Le numéro de téléphone ne peut pas dépasser 15 chiffres."),
        otherwise: (schema) => schema.notRequired(),
    }),


    // email: Yup.string()
    //     .email("Veuillez saisir une adresse e-mail valide.")
    //     .when("nom", {
    //         is: (val: string | undefined) => val && val.trim().length > 0,
    //         then: (s) => s.required("L’adresse e-mail est obligatoire."),
    //         otherwise: (s) => s.notRequired(),
    //     }),

});

export const ParentSchema = Yup.object({
    pere: personSchema,
    mere: personSchema,
});

type ParentFormPropsType = { student?: StudentDetailsType, formErrors: any | undefined };
const ParentForm: React.FC<ParentFormPropsType> = ({ student, formErrors }) => {
    return (
        <div >
            <div className='space-y-4'>
                {/* Information sur le père  */}
                <HeadingSmall title="Information sur le père : " />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="hidden" name="pere[type]" value="père" />
                    <input type="hidden" name="pere[id_parent]" value={student?.pere?.id_parent} />
                    <Input
                        label="Nom du père"
                        name="pere[nom]"
                        defaultValue={student?.pere?.nom || ""}
                        icon={User}
                        errorMessage={formErrors?.["pere.nom"]}
                    />
                    <Input
                        label="Prénom du père"
                        name="pere[prenom]"
                        defaultValue={student?.pere?.prenom || ""}
                        icon={User}
                        errorMessage={formErrors?.["pere.prenom"]}
                    />
                    <div className="col-span-2 space-y-4">
                        <Input
                            label="Profession du père"
                            name="pere[profession]"
                            defaultValue={student?.pere?.profession || ""}
                            icon={Briefcase}
                            errorMessage={formErrors?.["pere.profession"]}
                        />
                        <Input
                            label="Adresse"
                            name="pere[adresse]"
                            defaultValue={student?.pere?.adresse || ""}
                            icon={MapPin}
                            errorMessage={formErrors?.["pere.adresse"]}
                        />
                    </div>
                    <Input
                        label="Téléphone du père"
                        name="pere[telephone]"
                        defaultValue={student?.pere?.telephone || ""}
                        icon={Phone}
                        errorMessage={formErrors?.["pere.telephone"]}
                    />
                    <Input
                        label="Email du père"
                        name="pere[email]"
                        defaultValue={student?.pere?.email || ""}
                        icon={Mail}
                        errorMessage={formErrors?.["pere.email"]}
                    />
                </div>
                <div className="space-y-4">
                    <Input
                        label="Photocopie CIN du père"
                        name="pere[pc_cin]"
                        icon={FileText}
                        iconColor="text-amber-500"
                        type="file"
                        errorMessage={formErrors?.["pere.pc_cin"]}
                    />
                    <CheckInput
                        label="Contact d’urgence"
                        description="Cocher cette case si ce parent doit être contacté en priorité en cas d’urgence."
                        name="pere[contact_urgence]"
                    />
                </div>



                {/* Information sur la mère */}
                <HeadingSmall title="Information sur la mère : " />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="hidden" name="mere[type]" value="mère" />
                    <input type="hidden" name="mere[id_parent]" value={student?.mere?.id_parent} />
                    <Input
                        label="Nom de la mère"
                        name="mere[nom]"
                        defaultValue={student?.mere?.nom || ""}
                        icon={User}
                        errorMessage={formErrors?.["mere.nom"]}
                    />
                    <Input
                        label="Prénom de la mère"
                        name="mere[prenom]"
                        defaultValue={student?.mere?.prenom || ""}
                        icon={User}
                        errorMessage={formErrors?.["mere.prenom"]}
                    />
                    <div className="col-span-2 space-y-4">
                        <Input
                            label="Profession de la mère"
                            name="mere[profession]"
                            defaultValue={student?.mere?.profession || ""}
                            icon={Briefcase}
                            errorMessage={formErrors?.["mere.profession"]}
                        />
                        <Input
                            label="Adresse"
                            name="mere[adresse]"
                            defaultValue={student?.mere?.adresse || ""}
                            icon={MapPin}
                            errorMessage={formErrors?.["mere.adresse"]}
                        />
                    </div>

                    <Input
                        label="Téléphone de la mère"
                        name="mere[telephone]"
                        defaultValue={student?.mere?.telephone || ""}
                        icon={Phone}
                        errorMessage={formErrors?.["mere.telephone"]}
                    />
                    <Input
                        label="Email de la mère"
                        name="mere[email]"
                        defaultValue={student?.mere?.email || ""}
                        icon={Mail}
                        errorMessage={formErrors?.["mere.email"]}
                    />
                </div>
                <div className="space-y-4">
                    <Input
                        label="Photocopie CIN de la mère"
                        name="mere[pc_cin]"
                        defaultValue={student?.mere?.pc_cin || ""}
                        icon={FileText}
                        iconColor="text-amber-500"
                        type="file"
                        errorMessage={formErrors?.["mere.pc_cin"]}
                    />
                    <CheckInput
                        label="Contact d’urgence"
                        description="Cocher cette case si ce parent doit être contacté en priorité en cas d’urgence."
                        name="mere[contact_urgence]"
                    />
                </div>

            </div>
        </div>
    )
}

export default ParentForm; 