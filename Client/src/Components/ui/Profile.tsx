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
    identification?: string;
    addPhoto?: boolean
}
const Profile: React.FC<ProfilePropsType> = ({ photo, fullName, link, copy = true, identification, addPhoto = true }) => {

    const [copied, setCopied] = React.useState(false);
    if (!fullName) return '--';
    return (

        <div className="flex items-center space-x-3 relative">
            {addPhoto &&
                <div className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center overflow-hidden cursor-pointer">
                    {photo && <img src={baseUrl(photo)} alt="" className="w-full h-full object-cover" />}
                    {!photo && <img src={baseUrl('/public/images/user.png')} alt="" className="w-full h-full object-cover" />}
                </div>
            }
            <div>
                <div className={clsx({
                    'text-primary-500 hover:underline': link
                }, '')}>
                    {link ?
                        <Link to={`${link}`}>{fullName}</Link>
                        : fullName
                    }
                </div>
                <div className="text-xs text-secondary-500 ">
                    {identification}
                    {copy &&
                        <div className='relative w-max inline-block overflow-visible'>
                            <Copy
                                className='w-5 h-5 inline-block ml-3 cursor-pointer active:text-primary-400 '
                                onClick={() => {
                                    if (identification) {
                                        navigator.clipboard.writeText(identification);
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 200);
                                    }
                                }}
                            />
                            {copied && (
                                <div className="absolute z-20 -right-16 bottom-full mt-1 px-2 py-1 bg-secondary-500 text-light rounded-full rounded-bl-none text-sm shadow">
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