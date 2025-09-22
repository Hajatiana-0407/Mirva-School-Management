import React from 'react'
import { baseUrl } from '../../Utils/Utils'
import { Link } from 'react-router-dom'
import { Copy } from 'lucide-react';
import clsx from 'clsx';

type ProfilePropsType = {
    photo: string;
    link?: string;
    fullName: string;
    copy?: boolean;
    identification?: string
}
const Profile: React.FC<ProfilePropsType> = ({ photo, fullName, link, copy = true, identification }) => {

    const [copied, setCopied] = React.useState(false);
    return (
        <div className="flex items-center space-x-3 relative">
            {photo &&
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer">
                    {photo && <img src={baseUrl(photo)} alt="" className="w-full h-full object-cover" />}
                </div>
            }
            <div>
                <div className={clsx({
                    'text-blue-500 hover:underline': link
                }, '')}>
                    {link ?
                        <Link to={`${link}`}>{fullName}</Link>
                        : fullName
                    }
                </div>
                <div className="text-xs text-gray-500 ">
                    {identification}
                    {copy &&
                        <div className='relative w-max inline-block overflow-visible'>
                            <Copy
                                className='w-5 h-5 inline-block ml-3 cursor-pointer active:text-blue-400 '
                                onClick={() => {
                                    if (identification) {
                                        navigator.clipboard.writeText(identification);
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 200);
                                    }
                                }}
                            />
                            {copied && (
                                <div className="absolute z-20 -right-16 bottom-full mt-1 px-2 py-1 bg-gray-500 text-white rounded-full rounded-bl-none text-sm shadow">
                                    Copié !
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile