import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getValueState } from '../../Redux/Slice/Home/ValueSlice';
import { AppDispatch } from '../../../../Redux/store';
import { getAllValue } from '../../Redux/AsyncThunk/HomeAsyncThunk';
import Loading from '../../../../Components/ui/Loading';
import DynamicLucideIcon from '../../Components/DynamicLucideIcon';
import { ValueType } from '../../Type';
import { Link } from 'react-router-dom';
import { PenBox } from 'lucide-react';
import { useHashPermission } from '../../../../Hooks/useHashPermission';

const Value: React.FC = () => {
  const { datas, action } = useSelector(getValueState);
  const [values, setValues] = useState<ValueType[]>([])
  const dispatch: AppDispatch = useDispatch();
  const adminPermission = useHashPermission({ id: "homepage-settings" });


  useEffect(() => {
    if (datas?.length == 0) {
      dispatch(getAllValue())
    }
    return () => { }
  }, [dispatch])

  useEffect(() => {
    if (datas) {
      const valueActive = datas.filter(data => data.actif == '1');
      setValues(valueActive);
    }
    return () => { }
  }, [datas])

  if (action.isLoading) return <Loading />
  if (values?.length == 0) return '';
  return (
    <section className="py-16 bg-primary-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bouton vers le dashbord pour modifier si l'utilisateur a le droit */}
        {adminPermission.read &&
          <Link
            to={'/back-office/homepage-settings?section=admin-value'}
            className="bg-lime-600 text-light px-3 py-2 rounded-lg flex items-center space-x-2 hover:bg-lime-700 transition-colors absolute top-5 right-4 sm:right-6 lg:right-8 z-40"
          >
            <PenBox className="w-5 h-5" />
            <span>Modifier cette section</span>
          </Link>
        }
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
            Nos Valeurs
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values?.map(value => (
            <div
              key={`${value?.id_valeur}-valeur`}
              className="text-center bg-light p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DynamicLucideIcon iconName={value.icone as string} color='primary' size='7' />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                {value?.titre}
              </h3>
              <p className="text-secondary-600">
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