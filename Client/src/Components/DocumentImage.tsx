import clsx from "clsx"
import { Expand, Shrink, Eye, Download } from "lucide-react"
import { useState } from "react"

const DocumentImage = ({ url = '', label = 'Document', type = 'image' }: { url: string, label?: string, type?: 'image' | 'document' }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getFileIcon = () => {
        if (type === 'document') {
            return '📄';
        }
        return '🖼️';
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = label || 'document';
        link.click();
    };

    return (
        <div className={clsx(
            "group relative border-2 border-gray-200 rounded-xl bg-white transition-all duration-300 hover:border-primary-300",
            isExpanded ? "min-h-[400px]" : "h-48"
        )}>
            {/* Header avec informations */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{getFileIcon()}</span>
                    <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{label}</h3>
                        <p className="text-xs text-gray-500 capitalize">{type}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Bouton télécharger */}
                    <button
                        onClick={handleDownload}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group-hover:bg-primary-50 group-hover:text-primary-600"
                        title="Télécharger"
                    >
                        <Download className="w-4 h-4" />
                    </button>

                    {/* Bouton ouvrir dans nouvel onglet */}
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group-hover:bg-primary-50 group-hover:text-primary-600"
                        title="Ouvrir dans un nouvel onglet"
                    >
                        <Eye className="w-4 h-4" />
                    </a>

                    {/* Bouton expand/retract */}
                    <button
                        onClick={() => setIsExpanded(v => !v)}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group-hover:bg-primary-50 group-hover:text-primary-600"
                        title={isExpanded ? "Réduire" : "Agrandir"}
                    >
                        {isExpanded ? <Shrink className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Zone de contenu */}
            <div className={clsx(
                "p-4 transition-all duration-500",
                isExpanded ? "h-[320px]" : "h-28"
            )}>
                {isLoading && (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-pulse flex flex-col items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div className="text-sm text-gray-500">Chargement...</div>
                        </div>
                    </div>
                )}

                <div className={clsx(
                    "w-full h-full flex items-center justify-center transition-all duration-300",
                    isLoading ? "opacity-0" : "opacity-100",
                    isExpanded ? "scale-100" : "scale-95"
                )}>
                    {type === 'image' ? (
                        <img
                            src={url}
                            className={clsx(
                                "max-w-full max-h-full object-contain rounded-lg transition-all duration-300",
                                isExpanded ? "shadow-md" : "shadow-sm"
                            )}
                            alt={label}
                            onLoad={() => setIsLoading(false)}
                            onError={() => setIsLoading(false)}
                        />
                    ) : (
                        <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                            <div className="text-4xl mb-2">📄</div>
                            <p className="text-sm text-gray-600">Document numérique</p>
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                            >
                                Ouvrir le document
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Badge en bas à droite */}
            <div className="absolute bottom-3 right-3">
                <span className={clsx(
                    "px-2 py-1 rounded-full text-xs font-medium transition-colors",
                    isExpanded
                        ? "bg-primary-100 text-primary-700"
                        : "bg-gray-100 text-gray-600 group-hover:bg-primary-50 group-hover:text-primary-600"
                )}>
                    {isExpanded ? "Plein écran" : "Aperçu"}
                </span>
            </div>
        </div>
    )
}

export default DocumentImage;