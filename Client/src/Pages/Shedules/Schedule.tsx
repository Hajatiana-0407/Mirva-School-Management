import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Plus, Calendar, Clock, Users, MapPin, Edit, Archive, School } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../Modal';
import Title from '../../Components/ui/Title';
import Input from '../../Components/ui/Input';
import Loading from '../../Components/ui/Loading';
import SheduleForm from '../../Components/Forms/SheduleForm';
import RightClickMenu from '../../Components/RightClickMenu';
import ConfirmDialog from '../ConfirmDialog';

import { AppDispatch } from '../../Redux/store';
import { getSheduleState } from './redux/SheduleSlice';
import { getAllShedule, deleteShedule } from './redux/SheduleAsyncThunk';
import { getSchoolYearState } from '../School-Year/redux/SchoolYearSlice';
import { getAllSchoolYear } from '../School-Year/redux/SchoolYearAsyncThunk';
import { getClasseState } from '../Classes/redux/ClasseSlice';
import { getAllClasse } from '../Classes/redux/ClasseAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';

import { hexToRgba, timeSlots } from '../../Utils/Utils';
import { SheduleByClasseType, SheduleType, ClasseType } from '../../Utils/Types';
import { getActionColor } from '../Table';
import { useHashPermission } from '../../Hooks/useHashPermission';
import { useActiveUser } from '../../Hooks/useActiveUser';
import { getAuthState } from '../Auth/redux/AuthSlice';


// ------------------------------
// Constantes
// ------------------------------
const days = [
  { cle: 1, label: 'Lundi' },
  { cle: 2, label: 'Mardi' },
  { cle: 3, label: 'Mercredi' },
  { cle: 4, label: 'Jeudi' },
  { cle: 5, label: 'Vendredi' }
];

export type EditingSlotType = {
  day: number;
  time: number;
  salle?: string;
  subject?: string;
  teacher?: string;
  classe?: ClasseType
};


// ------------------------------
// Component
// ------------------------------
const Schedule: React.FC = () => {

  // --------------------
  // States
  // --------------------
  const [showModal, setShowModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<EditingSlotType | null>(null);
  const [sheduleEditing, setSheduleEditing] = useState<SheduleType | null>(null);
  const [sheduleDeleting, setSheduleDeleting] = useState<SheduleType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [rightClickMenu, setRightClickMenu] = useState({
    isOpen: false,
    x: 0,
    y: 0,
    item: null as SheduleType | null
  });

  // --------------------
  // Redux
  // --------------------
  const dispatch: AppDispatch = useDispatch();
  const { action: shedule_action, datas: shedules } = useSelector(getSheduleState);
  const { datas: annee_scolaires, activeSchoolYear, action: annee_action } = useSelector(getSchoolYearState);
  const { datas: classes, action: classe_action } = useSelector(getClasseState);
  const { hiddeTheModalActive } = useSelector(getAppState);
  const { isAdmin, isTeacher } = useActiveUser();
  const { datas: { info: user } } = useSelector(getAuthState)

  const permission = useHashPermission();


  // ------------------------------
  // Actions du menu contextuel
  // ------------------------------
  const rawActions = useMemo(() => [
    { icon: Edit, type: 'update', label: 'Modifier', color: 'green', onClick: (item: SheduleType) => { setSheduleEditing(item); setShowModal(true); } },
    { icon: Archive, type: 'delete', label: 'Supprimer', color: 'red', onClick: (item: SheduleType) => handleDelete(item) }
  ], []);


  const getRightClickActions = useCallback(() => {
    if (!rightClickMenu.item) return [];
    return rawActions.map(action => ({
      ...action,
      color: getActionColor(action.color),
      onClick: () => {
        action.onClick(rightClickMenu.item as SheduleType);
        closeRightClickMenu();
      }
    }));
  }, [rightClickMenu.item, rawActions]);


  // ------------------------------
  // Handlers
  // ------------------------------
  const handleDelete = useCallback((item: SheduleType) => {
    setSheduleDeleting(item);
    setShowConfirmDialog(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (sheduleDeleting) {
      isTeacher ? dispatch(deleteShedule({ id_edt: sheduleDeleting.id_edt as number, id_personnel: user?.id_personnel as number, id_classe: undefined }))
        : dispatch(deleteShedule({ id_edt: sheduleDeleting.id_edt as number, id_classe: sheduleDeleting.id_classe, id_personnel: undefined }));
    }
    setSheduleDeleting(null);
    setShowConfirmDialog(false);
  }, [sheduleDeleting, dispatch]);

  const handleRightClick = (event: React.MouseEvent, item: SheduleType) => {
    event.preventDefault();
    event.stopPropagation();
    setRightClickMenu({ isOpen: true, x: event.clientX, y: event.clientY, item });
  };

  const closeRightClickMenu = () => {
    setRightClickMenu(prev => ({ ...prev, isOpen: false }));
  };

  const handleEditSlot = (classe: ClasseType, day: number, time: number, subject?: string, teacher?: string, salle?: string) => {
    setEditingSlot({ day, time, subject, teacher, salle, classe });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSlot(null);
    setSheduleEditing(null);
  };


  // ------------------------------
  // Options
  // ------------------------------
  const classes_options = useMemo(
    () => classes?.map(c => ({ label: c.denomination, value: c.id_classe as number })) ?? [],
    [classes]
  );

  const school_year_options = useMemo(() => {
    if (!annee_scolaires || !activeSchoolYear) return [];
    const list = annee_scolaires
      .filter(a => a.id_annee_scolaire !== activeSchoolYear.id_annee_scolaire)
      .map(a => ({ label: a.nom, value: a.id_annee_scolaire as number }));

    return [
      { label: activeSchoolYear.nom, value: activeSchoolYear.id_annee_scolaire as number },
      ...list
    ];
  }, [annee_scolaires, activeSchoolYear]);


  // ------------------------------
  // Fetch Data
  // ------------------------------
  useEffect(() => {
    if (!shedule_action.isLoading && shedules?.length === 0) dispatch(getAllShedule());
    if (!annee_action.isLoading && annee_scolaires?.length === 0) dispatch(getAllSchoolYear());
    if (!classe_action.isLoading && classes?.length === 0) dispatch(getAllClasse());
  }, [
    dispatch,
    shedules, shedule_action.isLoading,
    annee_scolaires, annee_action.isLoading,
    classes, classe_action.isLoading
  ]);


  useEffect(() => {
    if (showModal && hiddeTheModalActive) handleCloseModal();
  }, [hiddeTheModalActive]);


  // ------------------------------
  // Render
  // ------------------------------
  return (
    <div className="space-y-6">

      <Title
        title="Emploi du Temps"
        description="Plan détaillé des cours et activités."
        fixed
      >
        {isAdmin &&
          <div className="flex gap-2 md:gap-4">
            <Input name="classe" label="Classe" icon={Users} type="select" options={classes_options} />
            <Input name="schoolYear" label="Année scolaire" icon={Calendar} type="select" options={school_year_options} />
          </div>
        }
      </Title>


      {shedule_action.isLoading && <Loading />}


      <div className="space-y-6">
        {shedules?.map((shedule: SheduleByClasseType) => {
          const classe = classes?.find(c => c.id_classe === shedule?.id_classe);

          return (
            <div key={shedule?.id_classe} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border">

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">{classe?.denomination ? classe.denomination : shedule.nom  ? `${shedule.nom} ${shedule.prenom}` : ''}</h3>
                {permission.create &&
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition disabled:bg-primary-400"
                    onClick={() => {
                      if (permission.create) {
                        handleEditSlot(shedule, 1, 1);
                        setShowModal(true);
                      }
                    }}
                    disabled={!permission.create}
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Ajouter un cours</span>
                  </button>
                }
              </div>


              {/* Table */}
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full border-collapse">

                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border p-4 text-left font-semibold min-w-[100px]">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>Heure</span>
                        </div>
                      </th>

                      {days.map(day => (
                        <th key={day.cle} className="border p-4 text-center font-semibold min-w-[180px]">
                          {day.label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {timeSlots.map((time, idx) => (
                      <tr key={time.value} className="hover:bg-gray-50 transition">
                        {/* Heure */}
                        <td className="border p-4 bg-gray-50 text-center font-semibold">
                          {time.denomination}
                        </td>

                        {/* Jours */}
                        {days.map(day => {
                          const slot = shedule?.edt.find(edt =>
                            edt.jour_id == day.cle && edt.heure_index == idx + 1
                          );

                          return (
                            <td key={day.cle} className="border p-1 h-20">

                              {/* Slot rempli */}
                              {slot ? (
                                <div
                                  className="h-full p-3 rounded-lg text-sm cursor-pointer transition hover:shadow-md"
                                  onClick={() => {
                                    if (permission.update) {
                                      handleEditSlot(shedule, day.cle, idx + 1, slot.matiere, `${slot.nom} ${slot.prenom}`, slot.salle);
                                      setSheduleEditing(slot);
                                      setShowModal(true);
                                    }
                                  }}
                                  onContextMenu={e => {
                                    handleRightClick(e, slot);
                                    handleEditSlot(shedule, day.cle, idx + 1);
                                  }}
                                  style={{
                                    minHeight: "80px",
                                    borderLeft: `6px solid ${hexToRgba(slot.couleur)}`,
                                    background: hexToRgba(slot.couleur, 0.3)
                                  }}
                                >
                                  <div className="font-bold mb-1">{slot.matiere}</div>

                                  {shedule.id_classe &&
                                    <div className="flex items-center text-xs mb-1">
                                      <Users className="w-3 h-3 mr-1" />
                                      {slot.nom} {slot.prenom}
                                    </div>
                                  }
                                  {shedule.id_personnel &&
                                    <div className="flex items-center text-xs mb-1">
                                      <School className="w-3 h-3 mr-1" />
                                      {slot.classe}
                                    </div>
                                  }

                                  <div className="flex items-center text-xs">
                                    <MapPin className="w-3 h-3 mr-1" /> Salle: {slot.salle}
                                  </div>
                                </div>
                              ) : (<>
                                {permission.create ?
                                  <div
                                    className="h-full p-3 rounded-lg text-sm text-gray-400 border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50"
                                    onClick={() => {
                                      handleEditSlot(shedule, day.cle, idx + 1);
                                      setShowModal(true);
                                    }}
                                    style={{ minHeight: "80px" }}
                                  >
                                    <Plus className="w-4 h-4 mr-1" /> Ajouter
                                  </div>
                                  : <div className='text-secondary-400 italic text-sm text-center'>Libre</div>
                                }
                              </>

                              )}

                            </td>
                          );
                        })}

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            </div>
          );
        })}
      </div>


      {/* MODAL */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={
          editingSlot?.subject
            ? `Modifier le cours (${editingSlot?.classe?.denomination || sheduleEditing?.nom})`
            : `Ajouter un cours ${editingSlot?.classe?.denomination ? '(' + editingSlot?.classe?.denomination + ')' : ''}`
        }
        size="md"
      >
        <SheduleForm
          editingSlot={editingSlot as EditingSlotType}
          handleClose={handleCloseModal}
          shedule={sheduleEditing}
        />
      </Modal>


      {/* MENU CONTEXTUEL */}
      <RightClickMenu
        isOpen={rightClickMenu.isOpen}
        positionX={rightClickMenu.x}
        positionY={rightClickMenu.y}
        idModule="schedule"
        actions={getRightClickActions()}
        onClose={closeRightClickMenu}
      />


      {/* DIALOG SUPPRESSION */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => { setShowConfirmDialog(false); setSheduleDeleting(null); }}
        onConfirm={handleConfirmDelete}
        title="Suppression du cours"
        message="Êtes-vous sûr de vouloir archiver ce cours ?"
      />
    </div>
  );
};

export default Schedule;
