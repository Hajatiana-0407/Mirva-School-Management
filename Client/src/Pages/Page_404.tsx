import { ArrowLeft } from "lucide-react"
import React from "react";
import { useNavigate } from "react-router-dom"

type Page404PropsType = {
  message?: string
}
const Page_404: React.FC<Page404PropsType> = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full">
      <div className="">
        <h2 className="text-4xl text-center text-gray-600 uppercase">404 not found</h2>
        <p className="text-center text-lg text-gray-500">{message ? message : 'La page est introuvable'} </p>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="bg-blue-600 text-white px-2 py-1 sm:px-4 smpy-2 _classe rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 me-1 inline-block" />
          <span>Revenir</span>
        </button>
      </div>
    </div >
  )
}

export default Page_404