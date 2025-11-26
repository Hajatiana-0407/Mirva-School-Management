import React, { useEffect, useState } from 'react';
import { Plus, Calendar, Clock, Users, MapPin } from 'lucide-react';
import Modal from '../Modal';
import Title from '../../Components/ui/Title';
import { AppDispatch } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getSheduleState } from './redux/SheduleSlice';
import { getAllShedule } from './redux/SheduleAsyncThunk';
import Input from '../../Components/ui/Input';
import { getSchoolYearState } from '../School-Year/redux/SchoolYearSlice';
import { getAllSchoolYear } from '../School-Year/redux/SchoolYearAsyncThunk';
import { getClasseState } from '../Classes/redux/ClasseSlice';
import Loading from '../../Components/ui/Loading';
import { getAllClasse } from '../Classes/redux/ClasseAsyncThunk';
import { SheduleByClasseType, SheduleType, ClasseType } from '../../Utils/Types';
import SheduleForm from '../../Components/Forms/SheduleForm';
import { hexToRgba, timeSlots } from '../../Utils/Utils';
import { getAppState } from '../../Redux/AppSlice';


// Jours de la semaine
const days: { cle: number; label: string }[] = [
  { cle: 1, label: 'Lundi' },
  { cle: 2, label: 'Mardi' },
  { cle: 3, label: 'Mercredi' },
  { cle: 4, label: 'Jeudi' },
  { cle: 5, label: 'Vendredi' }
];

export type EditingSlotType = {
  day: number;
  time: number;
  subject?: string;
  teacher?: string;
  salle?: string;
  classe?: ClasseType
};

const Schedule: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<EditingSlotType | null>(null);
  const [sheduleEditing, setSheduleEditing] = useState<SheduleType | null>(null)

  const { action: shedule_action, datas: shedules } = useSelector(getSheduleState);
  const dispatch: AppDispatch = useDispatch();
  const { datas: annee_scolaires, activeSchoolYear, action: annee_scolaire_action } = useSelector(getSchoolYearState);
  const { datas: classes, action: classe_action } = useSelector(getClasseState);
  const { hiddeTheModalActive } = useSelector(getAppState);

  // Récupération des données
  useEffect(() => {
    if (shedules?.length === 0 && !shedule_action.isLoading) {
      dispatch(getAllShedule());
    }
    if (annee_scolaires?.length === 0 && !annee_scolaire_action.isLoading) {
      dispatch(getAllSchoolYear());
    }
    if (classes?.length === 0 && !classe_action.isLoading) {
      dispatch(getAllClasse());
    }
  }, [dispatch, shedules, shedule_action.isLoading, annee_scolaires, annee_scolaire_action.isLoading, classes, classe_action.isLoading]);
  // Options pour l'année scolaire
  let school_year_options = annee_scolaires?.filter((annee_scolaire) => annee_scolaire?.id_annee_scolaire !== activeSchoolYear?.id_annee_scolaire)
    .map((annee_scolaire) => ({ label: annee_scolaire.nom, value: annee_scolaire.id_annee_scolaire as number }));
  school_year_options?.unshift({ label: activeSchoolYear?.nom as string, value: activeSchoolYear?.id_annee_scolaire as number });

  // Options pour les classes
  let classes_options = classes?.map((classe: ClasseType) => ({ label: classe.denomination, value: classe.id_classe as number }));

  // Couleur par matière


  // Ouvre le modal d'édition
  const handleEditSlot = (
    classe: ClasseType,
    day: number,
    time: number,
    subject?: string,
    teacher?: string,
    salle?: string,
  ) => {
    setEditingSlot({ day, time, subject, teacher, salle, classe });
    setShowModal(true);
  };

  // Ferme le modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSlot(null);
  };

  // Modal
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);



  return (
    <div className="space-y-6">
      <Title
        title="Emploi du Temps"
        description="Plan détaillé des cours et activités pour mieux gérer votre journée."
        fixed
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              name="classe"
              label="Classe"
              icon={Users}
              type="select"
              options={classes_options}
            />
          </div>
          <div className="flex-1">
            <Input
              name="schoolYear"
              label="Année scolaire"
              icon={Calendar}
              type="select"
              options={school_year_options}
            />
          </div>
        </div>
      </Title>

      {/* Loading */}
      {shedule_action.isLoading && <Loading />}

      <div className="space-y-6">
        {shedules?.map((shedule: SheduleByClasseType) => (
          <div key={shedule.id_classe} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                {classes?.find(c => c.id_classe === shedule.id_classe)?.denomination}
              </h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Ajouter un cours</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-4 text-left font-semibold text-gray-700 min-w-[100px]">
                      <div className="flex items-center font-bold space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Heure</span>
                      </div>
                    </th>
                    {days.map(day => (
                      <th key={day.label} className="border border-gray-200 p-4 text-center font-bold text-gray-700 min-w-[180px]">
                        {day.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time, idx) => {
                    return (
                      <tr key={time.value} className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-200 p-4 font-semibold  text-gray-700 bg-gray-50">
                          <div className="flex justify-center">
                            <span className="font-semibold"> {time.denomination} </span>
                          </div>
                        </td>
                        {days.map(day => {
                          // Cherche le cours qui commence à cette heure pour ce jour
                          const slot: SheduleType | undefined = shedule.edt.find(
                            (edt: SheduleType) =>
                              edt.jour_id == day.cle && (idx + 1) == edt.heure_index
                          );
                          return (
                            <td key={`${day.label}-${time}`} className="border border-gray-200 p-1 align-top h-20">
                              {slot ? (
                                <div
                                  className={`h-full p-3 rounded-lg text-sm cursor-pointer transition-all hover:shadow-md text-gray-700`}
                                  onClick={() => {
                                    handleEditSlot(
                                      shedule,
                                      day.cle,
                                      (idx + 1),
                                      slot.matiere,
                                      `${slot.nom} ${slot.prenom}`,
                                      slot.salle,
                                    );
                                    setSheduleEditing(slot);
                                  }}
                                  style={{
                                    height: '100%',
                                    minHeight: '80px',
                                    borderLeft: `6px solid ${hexToRgba(slot.couleur)}`,
                                    background: hexToRgba(slot.couleur , 0.3)
                                  }}
                                >
                                  <div className="font-bold mb-1 text-sm">{slot.matiere}</div>
                                  <div className="flex items-center space-x-1 mb-1">
                                    <Users className="w-3 h-3" />
                                    <span className="text-xs">{slot.nom} {slot.prenom}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span className="text-xs">Salle: {slot.salle}</span>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="h-full p-3 rounded-lg text-sm text-gray-400 hover:bg-gray-50 cursor-pointer transition-all border-2 border-dashed border-gray-200 hover:border-gray-300 flex items-center justify-center"
                                  onClick={() => {
                                    handleEditSlot(shedule, day.cle, (idx + 1));
                                  }}
                                  style={{
                                    height: '100%',
                                    minHeight: '80px'
                                  }}
                                >
                                  <Plus className="w-4 h-4 mr-1" />
                                  <span>Ajouter</span>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour ajouter/modifier un cours */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingSlot?.subject ? `Modifier le cours ( ${editingSlot?.classe?.denomination} )` : `Ajouter un cours ( ${editingSlot?.classe?.denomination} )`}
        size="md"
      >
        <SheduleForm editingSlot={editingSlot as EditingSlotType} handleClose={handleCloseModal} shedule={sheduleEditing} />
      </Modal>
    </div>
  );
};

export default Schedule;