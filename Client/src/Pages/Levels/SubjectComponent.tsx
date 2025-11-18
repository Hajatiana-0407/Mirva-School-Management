import { useState, useEffect } from 'react';
import { LevelSubjectType, SubjectType } from '../../Utils/Types';
import { hexToRgba } from '../../Utils/Utils';
import {  Plus, Trash2 } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';
import clsx from 'clsx';

type Props = {
    subject: SubjectType;
    levelSubject?: LevelSubjectType;
    nameKey: string;
    onDelete: (id: number) => void;
    type?: "addition" | 'update'
};

/**
 * Composant pour le modification de coefficient 
 * @param param0 
 * @returns 
 */
const SubjectComponent = ({ subject, levelSubject, nameKey, onDelete, type = "update" }: Props) => {
    const coefficient = levelSubject?.coefficient ?? 2;
    const [value, setValue] = useState<number>(2);
    const [isShowConfirm, setIsShowConfirm] = useState(false)


    useEffect(() => {
        setValue(coefficient);
    }, [coefficient]);

    const handleDelete = () => {
        setIsShowConfirm(true);
    }
    const handleConfirmeDelete = () => {
        if (subject) {
            onDelete(subject.id_matiere as number)
        }
        setIsShowConfirm(false);
    }
    const handleClose = () => {
        setIsShowConfirm(false);
    }

    return (
        <div key={`${nameKey}`} className="w-100 min-h-10 gap-1 grid grid-cols-12 my-2 border-r">
            <div
                className={clsx(
                    { 'border-primary-200': type !== "update" },
                    "col-span-4 flex items-center justify-center border relative"
                )}
                style={{ backgroundColor: hexToRgba(subject.couleur, 0.1) }}
            >
                <span className='absolute top-0 right-0 text-xl'>
                    {type !== "update" &&
                        <Plus size={20} className='text-primary-500' />
                    }
                </span>
                {subject.denomination}
            </div>
            <input
                type="number"
                min={1}
                className="px-3 py-2 border col-span-7 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Coefficient..."
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
                name={`${nameKey}`}
                required
            />
            <div
                className='col-span-1 cursor-pointer transition-all duration-200 text-red-600 hover:text-red-700 flex justify-center items-center'
                onClick={() => { handleDelete() }}
            >
                <Trash2 />
            </div>
            <ConfirmDialog
                title='Suppression du matière'
                message={`Êtes-vous sûr de vouloir la supprimer la matiere "${subject.denomination}" ?`}
                isOpen={isShowConfirm}
                onClose={handleClose}
                onConfirm={handleConfirmeDelete}
            />
        </div>
    );
};

export default SubjectComponent 
