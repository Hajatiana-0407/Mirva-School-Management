
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMissionState } from '../../Redux/Slice/About/MissionSlice';
import { AppDispatch } from '../../../../Redux/store';
import { getAllMission } from '../../Redux/AsyncThunk/AboutAsyncThunk';
import Loading from '../../../../Components/ui/Loading';
import { Target } from 'lucide-react';

const Mission: React.FC = () => {
    const {datas: slogans, action } = useSelector(getMissionState);
    const dispatch: AppDispatch = useDispatch();
    
    useEffect(() => {
      if (slogans?.length == 0) {
        dispatch(getAllMission())
      }
      return () => { }
    }, [dispatch])

    if (action.isLoading) return <Loading/>
    if (slogans?.length == 0) return '';
    return (
        <section className="py-16 bg-blue-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full max-w-6xl">
            {slogans?.map(slogan => (
            <div  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-8 w-8 text-primary-600" />
                <h3 className="text-2xl font-bold text-primary-800">
                  {slogan?.titre}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {slogan?.description}
              </p>
            </div>

            ))}
          </div>
        </div>
      </section>
    );
};

export default Mission;

