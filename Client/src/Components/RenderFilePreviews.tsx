import { useEffect, useState } from "react";

type RenderFilePreviewProps = {
    url: string;
    className?: string;
};



export const RenderFilePreview = ({ url, className = "" }: RenderFilePreviewProps) => {
    if (!url) return null;

    const ext = url.split(".").pop()?.toLowerCase() || "";
    const safeUrl = encodeURI(url);

    const commonClasses = "rounded-xl shadow-md border border-gray-200 " + className;

    const isVideo = ["mp4", "webm", "ogg", "mov", "avi", "mkv"].includes(ext);
    const isAudio = ["mp3", "wav", "aac", "flac", "ogg"].includes(ext);
    const isImage = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"].includes(ext);
    const isPdf = ext === "pdf";
    const isWord = ["doc", "docx"].includes(ext);
    const isExcel = ["xls", "xlsx"].includes(ext);
    const isPowerPoint = ["ppt", "pptx"].includes(ext);
    const isOffice = isWord || isExcel || isPowerPoint;
    const isHtml = ["html", "htm"].includes(ext);
    const isText = ["txt", "csv", "json", "xml", "md"].includes(ext);

    // Options pour les fichiers Office
    const getOfficePreviewUrl = (fileUrl: string, fileExt: string) => {
        const encodedUrl = encodeURIComponent(fileUrl);
        
        // Option 1: Google Docs Viewer (plus fiable)
        if (["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(fileExt)) {
            return `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;
        }
        
        // Option 2: Microsoft Online Viewer (alternative)
        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`;
    };

    if (isVideo) {
        return (
            <video
                src={safeUrl}
                controls
                preload="metadata"
                className={`${commonClasses} w-full aspect-video bg-black`}
            >
                Votre navigateur ne supporte pas la lecture vidéo.
            </video>
        );
    }

    if (isAudio) {
        return (
            <audio src={safeUrl} controls className={`${commonClasses} w-full`}>
                Votre navigateur ne supporte pas la lecture audio.
            </audio>
        );
    }

    if (isImage) {
        return (
            <img
                src={safeUrl}
                alt="Aperçu"
                loading="lazy"
                decoding="async"
                className={`${commonClasses} w-full max-h-96 object-contain`}
                onError={(e) => {
                    (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/400x300?text=Image+non+disponible";
                }}
            />
        );
    }

    if (isPdf) {
        return (
            <div className="relative w-full">
                <iframe
                    src={`${safeUrl}#view=fitH`}
                    title="Aperçu PDF"
                    className={`${commonClasses} w-full h-[32rem]`}
                    sandbox="allow-same-origin allow-scripts allow-popups"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    PDF
                </div>
            </div>
        );
    }

    if (isOffice) {
        const officeUrl = getOfficePreviewUrl(url, ext);
        
        return (
            <div className="relative w-full">
                <iframe
                    src={officeUrl}
                    title={`Aperçu ${ext.toUpperCase()}`}
                    className={`${commonClasses} w-full h-[32rem]`}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {ext.toUpperCase()}
                </div>
                <div className="absolute bottom-2 left-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                    Prévisualisation - <a href={safeUrl} download className="underline">Télécharger</a>
                </div>
            </div>
        );
    }

    if (isHtml) {
        return (
            <iframe
                src={safeUrl}
                title="Aperçu HTML"
                className={`${commonClasses} w-full h-[32rem]`}
                sandbox="allow-same-origin allow-scripts allow-popups"
            />
        );
    }

    if (isText) {
        return (
            <div className={`${commonClasses} p-4 bg-gray-50`}>
                <TextFilePreview url={url} />
            </div>
        );
    }

    return (
        <div className={`${commonClasses} p-6 text-center`}>
            <FileIcon extension={ext} className="mx-auto mb-2" />
            <a
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
            >
                Télécharger le fichier
            </a>
            <p className="text-sm text-gray-500 mt-1">Type: {ext || "inconnu"}</p>
        </div>
    );
};

// Composant pour afficher le contenu des fichiers texte
const TextFilePreview = ({ url }: { url: string }) => {
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTextContent = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Erreur de chargement');
                const text = await response.text();
                setContent(text.slice(0, 5000)); // Limiter la taille
            } catch (err) {
                setError('Impossible de charger le contenu');
            } finally {
                setLoading(false);
            }
        };

        fetchTextContent();
    }, [url]);

    if (loading) return <div className="text-gray-500">Chargement...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <pre className="whitespace-pre-wrap break-words text-sm max-h-64 overflow-y-auto">
            {content}
        </pre>
    );
};

// Composant pour les icônes de fichiers
const FileIcon = ({ extension, className = "" }: { extension: string; className?: string }) => {
    const icons: { [key: string]: string } = {
        doc: "📄",
        docx: "📄",
        xls: "📊",
        xlsx: "📊",
        ppt: "📽️",
        pptx: "📽️",
        pdf: "📕",
        zip: "📦",
        rar: "📦",
        txt: "📝",
        csv: "📋",
        json: "⚙️",
        xml: "📋"
    };

    return (
        <span className={`text-2xl ${className}`}>
            {icons[extension] || "📁"}
        </span>
    );
};