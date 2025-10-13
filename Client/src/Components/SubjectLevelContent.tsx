import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { hexToRgba } from "../Utils/Utils";
import { TeacherType } from "../Utils/Types";

interface SubjectLevelContentProps {
    value: any[];
    item: TeacherType;
}

const SubjectLevelContent = ({ value, item }: SubjectLevelContentProps) => {
    const [isShowAll, setIsShowAll] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            {value.length > 0 &&
                item.classes?.slice(0, (!isShowAll ? 3 : item.classes.length + 1)).map((classe, index) => (
                    <div key={index} className="border-b border-gray-300 last:border-0 text-sm flex">
                        <div className="font-semibold border-r pe-2 py-2 min-w-24">{classe.denomination}</div>
                        <div className="ml-2 py-2 flex gap-1 items-center min-w-40  max-w-52 flex-wrap">
                            {classe.matieres?.map((subject) => (
                                <div
                                    key={subject.id_matiere}
                                    className="px-2 py-1 rounded text-xs font-medium hover:opacity-80"
                                    style={{ backgroundColor: hexToRgba(subject.couleur, 0.5) }}
                                >
                                    <span>{subject.abbreviation}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            {item.classes && item.classes.length > 3 && (
                <div className="flex justify-between mt-2">
                    <div className="text-sm text-gray-500">
                        {!isShowAll && <>et {item.classes.length - 3} autre{item.classes.length - 3 > 1 ? 's' : ''}...</>}
                    </div>
                    <div
                        className="text-sm px-2 py-0.5 text-white flex items-center gap-1 cursor-pointer bg-cyan-500 rounded"
                        onClick={() => setIsShowAll((v) => !v)}
                    >
                        {!isShowAll ? "Tout afficher" : "Masquer"}
                        {!isShowAll ? <ChevronDown size={19} /> : <ChevronUp size={19} />}
                    </div>
                </div>
            )}

            {!value.length && (
                <div
                    className="p-2 rounded text-xs text-gray-400 hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate("/teachers/" + item.matricule_personnel)}
                >
                    + Ajouter
                </div>
            )}
        </div>
    );
}
export default SubjectLevelContent; 