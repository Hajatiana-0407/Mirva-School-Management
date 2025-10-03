import { Focus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../Utils/Utils';


type ImageProfilePropsType = {
    name?: string;
    isInput?: boolean;
    url?: string;
    setUrl?: (url: string) => void;
    uri?: string
}

const ImageProfile: React.FC<ImageProfilePropsType> = ({ name = 'photo', isInput = true, url, setUrl = () => { }, uri }) => {
    const [photoPreview, setPhotoPreview] = useState('');


    useEffect(() => {
        if (uri) {
            setPhotoPreview(uri);
        } else if (url) {
            setPhotoPreview(baseUrl(url));
        }
    }, [uri, url])


    return (
        <div className="relative flex flex-col items-center justify-center h-full">
            <label
                htmlFor="photo-upload"
                className={`cursor-pointer flex flex-col items-center justify-center w-full h-full rounded-md bg-gray-100 border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-all`}>
                {photoPreview ? (
                    <img
                        src={photoPreview}
                        alt="Photo"
                        className={`w-[90%] h-[90%] rounded-md object-cover`}
                    />
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <Focus className="w-20 h-20 text-gray-400 mb-1" />
                        <span className="text-gray-400 text-sm">Aucune photo trouvé</span>
                    </div>
                )}

                {isInput &&
                    <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        name={name}
                        onChange={e => {
                            const file = e.target.files && e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setPhotoPreview(reader.result as string);
                                    setUrl(reader.result as string)
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                }


            </label>
        </div>
    )
}

export default ImageProfile