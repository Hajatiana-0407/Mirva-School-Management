import { Users } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPilierState } from '../../Redux/Slice/About/PilierSlice'
import { AppDispatch } from '../../../../Redux/store'
import { getAllPilier } from '../../Redux/AsyncThunk/AboutAsyncThunk'
import Loading from '../../../../Components/ui/Loading';

const Values:React.FC = () => {

  const { action, datas: piliers } = useSelector(getPilierState);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (piliers?.length == 0) {
      dispatch(getAllPilier())
    }
    return () => {}
  }, [dispatch])
  
  
// Loading
if (action.isLoading) return  <Loading/>
if(piliers?.length == 0) return ''
  return (
    <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
              Nos Piliers Éducatifs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Les valeurs qui guident notre approche pédagogique au quotidien
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full max-w-6xl">
            {piliers?.map(pilier => (
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Users className={`h-8 w-8 `} />
                </div>
                <h4 className="text-lg font-semibold text-primary-800 mb-2">{pilier.titre}</h4>
                <p className="text-gray-600 text-sm">{pilier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default  Values

