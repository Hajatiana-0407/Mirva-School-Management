import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Remplacez par vos propres slices pour SchoolYear
import { getSchoolYearState } from '../../Pages/School-Year/redux/SchoolYearSlice';
import useForm from '../../Hooks/useForm';
import { object, string } from 'yup';
import { AppDispatch } from '../../Redux/store';
import { createSchoolYear, updateSchoolYear } from '../../Pages/School-Year/redux/SchoolYearAsyncThunk';
import InputError from '../../Components/ui/InputError';
import { schoolYearInitialValue, SchoolYearType } from '../../Utils/Types';
import { Check, PenBox, X } from 'lucide-react';


// Validation
const SchoolYearSchema = object({
  nom: string().required('Le nom de l\'année scolaire est obligatoire.'),
  date_debut: string().required('La date de début est obligatoire.'),
  date_fin: string().required('La date de fin est obligatoire.'),
});


type SchoolYearFormPropsType = {
  schoolYear?: SchoolYearType | null;
  handleClose?: () => void
}
const SchoolYearForm: React.FC<SchoolYearFormPropsType> = ({ schoolYear, handleClose }) => {
  const { action, error } = useSelector(getSchoolYearState);
  const { onSubmite, formErrors } = useForm<SchoolYearType>(SchoolYearSchema, schoolYearInitialValue);
  const dispatch: AppDispatch = useDispatch();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmite((validateData) => {
      schoolYear
        ? dispatch(updateSchoolYear({ schoolYear: validateData, id: schoolYear?.id_annee_scolaire as number }))
        : dispatch(createSchoolYear(validateData));
    }, e);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <InputError message={error} />
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Nom de l'année scolaire</label>
        <input
          name='nom'
          type="text"
          defaultValue={schoolYear?.nom || ''}
          placeholder='2023-2024'
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <InputError message={formErrors?.nom} />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
        <textarea
          rows={3}
          name="description"
          defaultValue={schoolYear?.description || ""}
          placeholder='Décrivez brièvement cette année scolaire'
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <InputError message={formErrors?.description} />
      </div>
      <div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Date de début</label>
            <input
              name='date_debut'
              type="date"
              defaultValue={schoolYear?.date_debut || ''}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Date de fin</label>
            <input
              name='date_fin'
              type="date"
              defaultValue={schoolYear?.date_fin || ''}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <InputError message={formErrors?.date_debut || formErrors?.date_fin ? "Les dates de debut et fin sont obligatoire." : ''} />
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={handleClose}
          className="px-2 py-1 sm:px-4 sm:py-2 _classe text-secondary-600 border border-secondary-300 rounded-lg hover:bg-secondary-50"
        >
          <X className='inline-block w-5 h-5 me-1' />
          Annuler
        </button>
        <button
          type="submit"
          className="px-2 py-1 sm:px-4 sm:py-2 _classe bg-primary-600 text-light rounded-lg hover:bg-primary-700 flex items-center"
        >
          {action.isLoading || action.isUpdating ?
            <div className="w-5 h-5 me-1 inline-block border-4 border-light border-t-transparent rounded-full animate-spin"></div> :
            <>
              {schoolYear ?
                <PenBox className='inline-block w-5 h-5 me-1' /> :
                <Check className='inline-block w-5 h-5 me-1' />
              }
            </>
          }
          {schoolYear ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  )
}

export default SchoolYearForm