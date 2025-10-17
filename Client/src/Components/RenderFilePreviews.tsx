type RenderFilePreviewProps = {
    url: string;
    className?: string;
};

export const RenderFilePreview = ({ url, className = "" }: RenderFilePreviewProps) => {
    if (!url) return null;

    const ext = url.split(".").pop()?.toLowerCase() || "";
    const safeUrl = encodeURI(url); // sécurisation minimale de l’URL

    const commonClasses = "rounded-xl shadow-md border border-gray-200 " + className;

    const isVideo = ["mp4", "webm", "ogg", "mov", "avi", "mkv"].includes(ext);
    const isAudio = ["mp3", "wav", "aac", "flac", "ogg"].includes(ext);
    const isImage = ["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(ext);
    const isPdf = ext === "pdf";
    const isOffice = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext);
    const isHtml = ["html", "htm"].includes(ext);

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
            <iframe
                src={safeUrl}
                title="Aperçu PDF"
                className={`${commonClasses} w-full h-[32rem]`}
                sandbox="allow-same-origin allow-scripts allow-popups"
            />
        );
    }

    if (isOffice) {
        return (
            <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
                title="Aperçu Office"
                className={`${commonClasses} w-full h-[32rem]`}
                sandbox="allow-same-origin allow-scripts allow-popups"
            />
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

    return (
        <div className="text-center">
            <a
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
            >
                Télécharger ou ouvrir le fichier
            </a>
            <p className="text-sm text-gray-500 mt-1">Type de fichier non pris en charge ({ext})</p>
        </div>
    );
};
