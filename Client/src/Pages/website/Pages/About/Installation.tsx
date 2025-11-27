import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInstallationState } from '../../Redux/Slice/About/InstallationSlice'
import { AppDispatch } from '../../../../Redux/store';
import { getAllInstallation } from '../../Redux/AsyncThunk/AboutAsyncThunk';
import Loading from '../../../../Components/ui/Loading'

const Installation: React.FC = () => {
  const { datas:installations, action } = useSelector(getInstallationState);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (installations?.length == 0) {
      dispatch(getAllInstallation())
    }
    return () => {}
  }, [dispatch])

  console.log(installations);
  

  // Loading
  if (action.isLoading) return <Loading/>
  if (installations?.length == 0) return ''

  return (
    <section className="py-16 bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Nos Installations
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Des équipements modernes pour un apprentissage optimal
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {installations?.map(installation => (
              <div className="bg-primary-700 rounded-lg overflow-hidden hover:bg-primary-600 transition-colors duration-300">
                <img 
                  src={installation.image} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{installation.titre}</h3>
                  <p className="text-blue-100">{installation.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Installation
