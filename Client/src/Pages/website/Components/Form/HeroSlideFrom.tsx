import React from 'react';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { BookMarked, Check, Link, PenBox, Tag, X } from 'lucide-react';
import { HeroSlideInitialValue, HeroSlideType } from '../../Type';
import { AppDispatch } from '../../../../Redux/store';
import { getHeroState } from '../../Redux/Slice/Home/HeroSlice';
import InputError from '../../../../Components/ui/InputError';
import useForm from '../../../../Hooks/useForm';
import VideoOrFileInput from '../../../../Components/ui/VideoOrFileInput';
import { baseUrl } from '../../../../Utils/Utils';
import Input from '../../../../Components/ui/Input';
import { createSlide, updateSlide } from '../../Redux/AsyncThunk/HomeAsyncThunk';
import CheckInput from '../../../../Components/ui/CheckInput';

// Validation de donnée avec yup 
const slideSchema = object({
    titre: string().required('Le titre est obligatoire.'),
    soustitre: string().required('Le sous-titre est obligatoire.'),
    cta: string().required('Le label pour le bouton est obligatoire.'),
    cta_link: string().required('Le lien pour le bouton est obligatoire.'),
    // image: string().required("L'image de fond est obligatoire."),
})

type HeroSlideFromPropsType = {
    handleClose?: () => void;
    slide?: HeroSlideType | null;
    idLevelToAddClasse?: number
}
const HeroSlideFrom: React.FC<HeroSlideFromPropsType> = ({ slide, handleClose }) => {
    const dispatch: AppDispatch = useDispatch();
    const { action, error } = useSelector(getHeroState);
    const { onSubmite, formErrors } = useForm<HeroSlideType>(slideSchema, HeroSlideInitialValue);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            slide ? dispatch(updateSlide({ id: slide.id_slide as number, dataToUpdate: validateData })) : dispatch(createSlide(validateData));
        }, e)
    }

    // ? Option pour le lien du cta
    const cta_link_options = [
        { label: 'À propos', value: '/about' },
        { label: 'Formations', value: '/programs' },
        { label: 'Équipe', value: '/team' },
        { label: 'Actualités', value: '/news' },
        { label: 'Contact', value: '/contact' },
    ]

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <InputError message={error} />
            <div>
                <VideoOrFileInput
                    name="image"
                    key={'Ficher'}
                    errorMessage={formErrors?.image}
                    defaultValue={slide?.image ? baseUrl(slide?.image) : undefined}
                />
            </div>
            <div className="grid grid-cols-1 gap-4">
                <Input
                    label="Titre"
                    name="titre"
                    defaultValue={slide?.titre || ""}
                    icon={BookMarked}
                    errorMessage={formErrors?.titre}
                />
                <div>
                    <textarea
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-secondary-900 bg-secondary-50 rounded-lg border border-secondary-300 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Écrivez ici une description pour cette slider..."
                        name="soustitre"
                        defaultValue={slide?.soustitre}
                    >
                    </textarea>
                    <InputError message={formErrors?.soustitre} />
                </div>
                <Input
                    label="Label du bouton"
                    name="cta"
                    defaultValue={slide?.cta || ""}
                    icon={Tag}
                    errorMessage={formErrors?.cta}
                />
                <Input
                    label="Lien du bouton"
                    name="cta_link"
                    defaultValue={slide?.cta_link || ""}
                    icon={Link}
                    errorMessage={formErrors?.cta_link}
                    type='select'
                    options={cta_link_options}
                />

                <CheckInput
                    name='actif'
                    defaultValue={ slide?.actif ? slide.actif == '1' : true }
                    label='Publié cette slide'
                    description="Si oui le slide seras visible dans la page d'acuueil du site."
                />
            </div>


            {/* Boutons */}
            <div className="flex justify-end space-x-3 pt-4">
                {handleClose !== undefined &&
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-2 py-1 sm:px-4 sm:py-2 _slide text-secondary-600 border border-secondary-300 rounded-lg hover:bg-secondary-50"
                    >
                        <X className='inline-block w-5 h-5 me-1' />
                        Annuler
                    </button>
                }
                <button
                    type="submit"
                    className="px-2 py-1 sm:px-4 sm:py-2 _slide bg-primary-600 text-light rounded-lg hover:bg-primary-700 flex items-center"
                >
                    {action.isLoading || action.isUpdating ?
                        <div className="w-5 h-5 me-1 inline-block border-4 border-light border-t-transparent rounded-full animate-spin"></div> :
                        <>
                            {slide ?
                                <PenBox className='inline-block w-5 h-5 me-1' /> :
                                <Check className='inline-block w-5 h-5 me-1' />
                            }
                        </>
                    }
                    {slide ? 'Modifier' : 'Ajouter'}
                </button>
            </div>
        </form>
    )
}

export default HeroSlideFrom