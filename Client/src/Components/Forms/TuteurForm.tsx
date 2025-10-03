import { Briefcase, FileText, Mail, MapPin, Phone, User } from "lucide-react";
import Input from "../ui/Input";
import * as Yup from "yup";
import { StudentDetailsType } from "../../Utils/Types";
import { personSchema } from "./ParentForm";
import HeadingSmall from "../ui/HeadingSmall";
import CheckInput from "../ui/CheckInput";

// ! FORMULAIRE POUR LE TYPE TUTEUR
// Validation de donnée avec yup 
export const TuteurSchema = Yup.object({
    tuteur: personSchema,
});

type TuteurFormPropsType = { student?: StudentDetailsType, formErrors: any | undefined };
const TuteurForm: React.FC<TuteurFormPropsType> = ({ student, formErrors }) => {

    return (
        <div className="space-y-4">
            <HeadingSmall title="Information sur le Tuteur : " />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="hidden" name="tuteur[type]" value="tuteur" />
                <input type="hidden" name="tuteur[id_parent]" value={student?.tuteur?.id_parent} />
                <Input
                    label="Nom du Tuteur"
                    name="tuteur[nom]"
                    defaultValue={student?.tuteur?.nom || ""}
                    icon={User}
                    errorMessage={formErrors?.["tuteur.nom"]}
                />
                <Input
                    label="Prénom du Tuteur"
                    name="tuteur[prenom]"
                    defaultValue={student?.tuteur?.prenom || ""}
                    icon={User}
                    errorMessage={formErrors?.["tuteur.prenom"]}
                />
                <div className="col-span-2 space-y-4">
                    <Input
                        label="Profession du Tuteur"
                        name="tuteur[profession]"
                        defaultValue={student?.tuteur?.profession || ""}
                        icon={Briefcase}
                        errorMessage={formErrors?.["tuteur.profession"]}
                    />
                    <Input
                        label="Adresse"
                        name="tuteur[adresse]"
                        defaultValue={student?.tuteur?.adresse || ""}
                        icon={MapPin}
                        errorMessage={formErrors?.["tuteur.adresse"]}
                    />
                </div>

                <Input
                    label="Téléphone du Tuteur"
                    name="tuteur[telephone]"
                    defaultValue={student?.tuteur?.telephone || ""}
                    icon={Phone}
                    errorMessage={formErrors?.["tuteur.telephone"]}
                />
                <Input
                    label="Email du Tuteur"
                    name="tuteur[email]"
                    defaultValue={student?.tuteur?.email || ""}
                    icon={Mail}
                    errorMessage={formErrors?.["tuteur.email"]}
                />
            </div>
            <div className="space-y-4">
                <Input
                    label="Photocopie CIN du Tuteur"
                    name="tuteur[pc_cin]"
                    defaultValue={student?.tuteur?.pc_cin || ""}
                    icon={FileText}
                    iconColor="text-amber-500"
                    type="file"
                    errorMessage={formErrors?.["tuteur.pc_cin"]}
                />
                <CheckInput
                    label="Contact d’urgence"
                    description="Cocher cette case si ce tuteur doit être contacté en priorité en cas d’urgence."
                    name="tuteur[contact_urgence]"
                />
            </div>
        </div>
    )
}

export default TuteurForm