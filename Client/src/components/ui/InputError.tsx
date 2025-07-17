import { AlertTriangle } from "lucide-react";

const InputError = ({ message = '' }: { message: string | undefined }) => {
    return (
        <>
            {
                message && <div className="text-red-500 px-1 p-[2px] flex items-center gap-1  mt-1 rounded text-sm bg-red-500/10">
                    <AlertTriangle className="inline-block" size={18} />
                    <span>{message}</span>
                </div>
            }
        </>
    )
}

export default InputError