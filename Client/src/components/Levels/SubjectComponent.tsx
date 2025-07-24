import { useState, useEffect } from 'react';
import { LevelSubjectType, SubjectType } from '../../Utils/Types';
import { hexToRgba } from '../../Utils/Utils';
import { Archive, Pencil, Plus, SquarePen } from 'lucide-react';

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
    const coefficient = levelSubject?.coefficient ?? 1;
    const [value, setValue] = useState<number | null>(null);

    useEffect(() => {
        setValue(coefficient);
    }, [coefficient]);

    return (
        <div key={`${nameKey}`} className="w-100 h-10 grid grid-cols-12">
            <div
                className="col-span-4 text-gray-500 flex items-center justify-center border relative"
                style={{ backgroundColor: hexToRgba(subject.couleur, 0.1) }}
            >
                <span className='absolute top-0 right-0 text-xl'>
                    {type === "update" ?
                        <Pencil size={15} className='text-green-500' /> :
                        <Plus size={15} className='text-blue-500' />
                    }
                </span>
                {subject.denomination}
            </div>
            <input
                type="number"
                min={1}
                className="px-3 py-2 border col-span-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Coefficient..."
                value={value ?? 1}
                onChange={(e) => setValue(parseInt(e.target.value))}
                name={`${nameKey}`}
            />
            <div
                className='col-span-1 cursor-pointer border border-l-0 bg-gray-100 hover:bg-gray-200 transition-all duration-200 text-red-600 hover:text-red-800 flex justify-center items-center'
                onClick={() => { onDelete(subject.id_matiere as number) }}
            >
                <Archive />
            </div>
        </div>
    );
};

export default SubjectComponent 
