import React, { useState } from 'react';
import * as lucideIcons from 'lucide-react'; // ✅ CORRECTION ICI
import { Search } from 'lucide-react';

type IconPickerProps = {
    value?: string;
    color?: string;
    onChange: (iconName: string, color: string) => void;
};

const ICONS = Object.keys(lucideIcons).filter(
    (name) => /^[A-Z]/.test(name)
);

const COLORS = [
    'text-gray-800', 'text-blue-500', 'text-green-500', 'text-pink-500', 'text-yellow-500',
    'text-purple-500', 'text-orange-500', 'text-cyan-500', 'text-red-500'
];

const COLOR_NAMES = [
    'black', 'Bleu', 'Vert', 'Rose', 'Jaune', 'Violet', 'Orange', 'Cyan', 'Rouge'
];

const PAGE_SIZE = 48;

const IconPicker: React.FC<IconPickerProps> = ({ value, color = COLORS[0], onChange }) => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(color);

    const filteredIcons = ICONS.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredIcons.length / PAGE_SIZE);
    const iconsToShow = filteredIcons.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const handleColorChange = (clr: string) => {
        setSelectedColor(clr);
        if (value) onChange(value, clr);
    };

    const handleIconClick = (iconName: string) => {
        onChange(iconName, selectedColor);
    };

    return (
        <div className="w-full">
            {/* Palette de couleurs */}
            <div className="mb-4 flex flex-wrap gap-2 items-center">
                {COLORS.map((clr, idx) => (
                    <button
                        key={clr}
                        type="button"
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition
              ${selectedColor === clr ? 'border-blue-500 scale-110' : 'border-gray-200'}
            `}
                        onClick={() => handleColorChange(clr)}
                        title={COLOR_NAMES[idx]}
                    >
                        <span className={`${clr} text-xl`}>●</span>
                    </button>
                ))}
            </div>

            {/* Recherche */}
            <div className="mb-3 flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Rechercher une icône..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(0);
                    }}
                    className="bg-transparent outline-none w-full text-gray-700"
                />
            </div>

            {/* Grille */}
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-3 max-h-64 overflow-y-auto">
                {iconsToShow.length > 0 ? (
                    iconsToShow.map((iconName) => {
                        const LucideIcon = (lucideIcons as any)[iconName];
                        if (!LucideIcon) return null;

                        const isSelected = value === iconName;
                        return (
                            <button
                                key={iconName}
                                type="button"
                                title={iconName}
                                onClick={() => handleIconClick(iconName)}
                                className={`flex flex-col items-center justify-center rounded-lg p-2 border transition
                  ${isSelected ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-200 hover:bg-blue-50'}
                  focus:outline-none`}
                            >
                                <LucideIcon className={`w-7 h-7 ${selectedColor} mb-1`} />
                                <span className="text-[10px] text-gray-500 truncate">{iconName}</span>
                            </button>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center text-gray-400 py-6">
                        Aucune icône trouvée.
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-4">
                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                    >
                        <lucideIcons.ChevronLeft/>
                    </button>
                    <span className="text-sm text-gray-500">
                        Page {page + 1} / {totalPages}
                    </span>
                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                        disabled={page === totalPages - 1}
                        className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600  disabled:opacity-50"
                    >
                        <lucideIcons.ChevronRight/>
                    </button>
                </div>
            )}

            {/* Icône sélectionnée */}
            {value && (
                <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm text-gray-600">Icône sélectionnée :</span>
                    {React.createElement((lucideIcons as any)[value], {
                        className: `w-6 h-6 ${selectedColor}`,
                    })}
                    <span className="text-xs text-gray-500">{value}</span>
                </div>
            )}
        </div>
    );
};

export default IconPicker;
