import { CalendarCheck, CalendarHeart, GraduationCap, Plus, Save } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getSchoolYearState } from "../../School-Year/redux/SchoolYearSlice"
import Input from "../../../Components/ui/Input"
import { SchoolYearType } from "../../../Utils/Types"
import { object } from "yup"
import useForm from "../../../Hooks/useForm"
import { AppDispatch } from "../../../Redux/store"
import { changeActiveSchoolYear } from "../../School-Year/redux/SchoolYearAsyncThunk"
import React, { useEffect, useState } from "react"
import Modal from "../../Modal"
import SchoolYearForm from "../../../Components/Forms/SchoolYearForm"
import { getAppState } from "../../../Redux/AppSlice"

const SchoolYearSchema = object({
});
const GeneralSettings = () => {
    const { activeSchoolYear, datas: schoolYearData, action: schoolYearAction } = useSelector(getSchoolYearState)
    const { onSubmite } = useForm<{ id_annee_scolaire: null | number }>(SchoolYearSchema, { id_annee_scolaire: null })
    const dispatch: AppDispatch = useDispatch();
    const [theActiveSchoolYear, setTheActiveSchoolYear] = useState<SchoolYearType | null>(null);
    const [showModalSchoolYear, setShowModalSchoolYear] = useState(false)
    const { hiddeTheModalActive } = useSelector(getAppState);
    const [schoolYearOptions, setSchoolYearOptions] = useState<any[]>([]);

    useEffect(() => {
        if (activeSchoolYear) {
            setTheActiveSchoolYear(activeSchoolYear);
        } return () => { }
    }, [activeSchoolYear])


    // Handlers 
    const handleSchoolYearChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData) => {
            if (validateData.id_annee_scolaire != activeSchoolYear?.id_annee_scolaire) {
                dispatch(changeActiveSchoolYear(validateData))
            }
        }, e)
    }

    const handleCloseModalSchoolYear = () => {
        setShowModalSchoolYear(false);
    }

    const handleChangeSchoolYears = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const id_annee_scolaire = parseInt(e.target.value);
        for (let i = 0; i < schoolYearData.length; i++) {
            const element = schoolYearData[i];
            if (element.id_annee_scolaire == id_annee_scolaire) {
                setTheActiveSchoolYear(element);
                break;
            }
        }
    }
    useEffect(() => {
        if (showModalSchoolYear && hiddeTheModalActive) {
            handleCloseModalSchoolYear();
        }
    }, [hiddeTheModalActive]);

    useEffect(() => {
        if (schoolYearData.length > 0) {
            setSchoolYearOptions(schoolYearData.map(schoolYear => ({
                value: schoolYear.id_annee_scolaire,
                label: schoolYear.nom
            })))
        }
        return () => { }
    }, [schoolYearData.length])
    return (
        <div className="space-y-6">
            <form onSubmit={handleSchoolYearChangeSubmit} className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-lg space-x-2 text-gray-900 font-medium">
                        <div className="bg-green-500 w-4 h-4 rounded-full"></div>
                        <h3 className="">Année scolaire actif</h3>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => setShowModalSchoolYear(true)}
                            className="flex items-center gap-1 text-blue-600 underline"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Nouvelle année scolaire</span>
                        </button>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 gap-4">
                    <div className="flex-1">
                        <Input
                            type="select"
                            name='id_annee_scolaire'
                            label="Année scrolaire"
                            icon={GraduationCap}
                            options={schoolYearOptions}
                            onChange={handleChangeSchoolYears}
                        />
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                        <div className="flex items-center ">
                            <p>du</p>
                        </div>
                        <Input
                            label=""
                            name=""
                            value={theActiveSchoolYear ? new Date(theActiveSchoolYear.date_debut).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) : 'N/A'}
                            icon={CalendarHeart}
                            readonly
                        />
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                        <div className="flex items-center ">
                            <p>au</p>
                        </div>
                        <Input
                            label=""
                            name=""
                            value={theActiveSchoolYear ? new Date(theActiveSchoolYear.date_fin).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) : 'N/A'}
                            icon={CalendarCheck}
                            readonly
                        />
                    </div>
                </div>
                <div className="">
                    <textarea
                        rows={3}
                        readOnly
                        value={theActiveSchoolYear?.description || ""}
                        placeholder='Accune déscription'
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg space-x-2 hover:bg-blue-700 transition-colors flex items-center"
                    >
                        {schoolYearAction.isLoading || schoolYearAction.isUpdating
                            ? <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                            <Save className="w-4 h-4" />
                        }
                        <span>Enregistrer</span>
                    </button>
                </div>
            </form>
            <Modal
                isOpen={showModalSchoolYear}
                onClose={handleCloseModalSchoolYear}
                title={'Nouvelle année scolaire'}
            >
                <SchoolYearForm handleClose={handleCloseModalSchoolYear} />
            </Modal>


            {/* <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Sauvegarde et restauration</h3>
                <div className="flex space-x-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Exporter les données</span>
                    </button>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Importer les données</span>
                    </button>
                </div>
            </div> */}
        </div>

    )
}

export default GeneralSettings