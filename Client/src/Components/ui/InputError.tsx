import { AlertCircle  } from "lucide-react";

const InputError = ({ message = '' }: { message: string | undefined }) => {
    return (
        <>
            {
                message &&  <div className="text-red-500 px-1 p-[2px] mt-1 rounded text-sm bg-red-500/10 flex items-center">
                        <AlertCircle className="inline-block mr-1" size={18} />
                        <span>{message}</span>
                    </div>
            }
        </>
    )
}

export default InputError