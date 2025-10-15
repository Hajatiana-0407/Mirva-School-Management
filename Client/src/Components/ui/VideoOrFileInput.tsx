import React, { useRef, useState } from "react";
import { FileText, X, Video, Image as ImageIcon, FileSpreadsheet, FileArchive, FileAudio, FileCode, File, FileImage, FileVideo } from "lucide-react";
import InputError from "./InputError";
import word from '../../assets/word.png';
import exel from '../../assets/excel.png';
import pdf from '../../assets/pdf.png';

type VideoOrFileInputProps = {
    name: string;
    label?: string;
    errorMessage?: string;
    accept?: string;
    onChange?: (file: File | null) => void;
    defaultValue?: string
};

export const getFileIcon = (fileName: string, size = 12) => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";

    // Groupes d'extensions par type
    const imageExt = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "tiff", "webp", "heic"];
    const videoExt = ["mp4", "mkv", "webm", "ogg", "avi", "mov", "flv", "wmv"];
    const audioExt = ["mp3", "wav", "aac", "flac", "ogg", "m4a"];
    const pdfExt = ["pdf"];
    const wordExt = ["doc", "docx", "odt", "rtf"];
    const excelExt = ["xls", "xlsx", "ods", "csv"];
    const pptExt = ["ppt", "pptx", "odp"];
    const codeExt = ["js", "ts", "tsx", "jsx", "json", "html", "css", "scss", "java", "py", "php", "cpp", "c", "rb", "sql", "xml", "sh", "yaml", "yml"];
    const archiveExt = ["zip", "rar", "7z", "tar", "gz", "bz2"];
    const textExt = ["txt", "log", "md"];

    if (imageExt.includes(ext))
        return <FileImage className={`w-${size} h-${size} text-green-400`} />;

    if (videoExt.includes(ext))
        return <FileVideo className={`w-${size} h-${size} text-blue-400`} />;

    if (audioExt.includes(ext))
        return <FileAudio className={`w-${size} h-${size} text-purple-500`} />;

    if (pdfExt.includes(ext))
        return <div>
            <img src={pdf} alt="word" className={`w-${size} h-${size}`} />
        </div>;

    if (wordExt.includes(ext))
        return <div>
            <img src={word} alt="word" className={`w-${size} h-${size}`} />
        </div>;

    if (excelExt.includes(ext))
        return <div>
            <img src={exel} alt="word" className={`w-${size} h-${size}`} />
        </div>;

    if (pptExt.includes(ext))
        return <FileText className={`w-${size} h-${size} text-orange-600`} />;

    if (archiveExt.includes(ext))
        return <FileArchive className={`w-${size} h-${size} text-yellow-600`} />;

    if (codeExt.includes(ext))
        return <FileCode className={`w-${size} h-${size} text-indigo-500`} />;

    if (textExt.includes(ext))
        return <FileText className={`w-${size} h-${size} text-gray-500`} />;

    // Fichier inconnu
    return <File className={`w-${size} h-${size} text-gray-400`} />;
};

const isImage = (fileName: string) =>
    /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(fileName);

const isVideo = (fileName: string) =>
    /\.(mp4|webm|ogg)$/i.test(fileName);

const VideoOrFileInput: React.FC<VideoOrFileInputProps> = ({
    name,
    label,
    errorMessage,
    accept,
    onChange,
    defaultValue
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<string | null>(defaultValue ||  null  );
    const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValue || null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile?.name || null);
        if (selectedFile) {
            if (isImage(selectedFile?.name ) || isVideo(selectedFile?.name )) {
                setPreviewUrl(URL.createObjectURL(selectedFile));
            } else {
                setPreviewUrl(null);
            }
            if (onChange) onChange(selectedFile);
        } else {
            setPreviewUrl(null);
            if (onChange) onChange(null);
        }
    };

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        setPreviewUrl(null);
        if (inputRef.current) inputRef.current.value = "";
        if (onChange) onChange(null);
    };

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            )}
            <div
                className="flex items-center justify-center border-2 border-dashed rounded-lg h-52 bg-gray-50 cursor-pointer relative"
                onClick={() => inputRef.current?.click()}
            >
                {!file ? (
                    <div className="flex flex-col items-center text-gray-400">
                        <FileText className="w-28 h-28 mb-2" />
                        <span className="text-xs">Cliquez pour ajouter un fichier</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full h-full relative">
                        {isVideo(file) && previewUrl ? (
                            <video src={previewUrl} controls className="h-48 rounded shadow" />
                        ) : isImage(file) && previewUrl ? (
                            <img src={previewUrl} alt="aperçu" className="h-48 rounded shadow object-contain" />
                        ) : (
                            <div className="text-xl">
                                {getFileIcon(file, 28)}
                            </div>
                        )}
                        <button
                            type="button"
                            className="absolute right-3 top-2 text-sm text-red-400 bg-gray-50 rounded cursor-pointer border"
                            onClick={handleRemoveFile}
                        >
                            <X />
                        </button>
                    </div>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    name={name}
                    accept={accept}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            {file && (
                <div className="text-xs text-gray-600 mt-2 text-center truncate">{file.split('/').pop()}</div>
            )}
            {errorMessage && (
                <InputError message={errorMessage} />
            )}
        </div>
    );
};

export default VideoOrFileInput;