import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getValueState } from '../../Redux/Slice/Home/ValueSlice';
import { AppDispatch } from '../../../../Redux/store';
import { getAllValue } from '../../Redux/AsyncThunk/HomeAsyncThunk';
import Loading from '../../../../Components/ui/Loading';

const Value: React.FC = () => {
  const { datas: values , action } = useSelector(getValueState);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!values?.length) {
      dispatch(getAllValue())
    }
    return () => { }
  }, [dispatch])

  if (action.isLoading )return <Loading/>
  if ( values?.length == 0 ) return '' ; 
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
            Nos Valeurs
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values?.map(value => (
            <div
              key={`${value?.id_valeur}-valeur`}
              className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* <Award className="h-8 w-8 text-primary-600" /> */}
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                {value?.titre}
              </h3>
              <p className="text-gray-600">
                {value?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

  )
}

export default Value;