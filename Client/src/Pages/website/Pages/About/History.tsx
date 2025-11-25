import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryState } from '../../Redux/Slice/About/HistorySlice';
import { AppDispatch } from '../../../../Redux/store';
import { getAllHistory } from '../../Redux/AsyncThunk/AboutAsyncThunk';
import { baseUrl } from '../../../../Utils/Utils';
import Loading from '../../../../Components/ui/Loading';



const History: React.FC = () => {
    const { action, datas:history } = useSelector(getHistoryState);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if(!history?.id_histoire) {
            dispatch(getAllHistory());
        }
        return () => {}
    }, [dispatch])    
    console.log(history);
    
    // Loading
    if(action.isLoading) return <Loading/>
    if(!history?.id_histoire) return ''
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-primary-800 mb-6">
                            {history.titre}
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            {history?.description}
                        </p>
                        <div className="bg-primary-50 p-6 rounded-lg">
                            <div className="flex items-center space-x-3 mb-3">
                                {/* <Award className="h-6 w-6 text-primary-600" /> */}
                                <span className="font-semibold text-primary-800">Établissement reconnu</span>
                            </div>
                            <p className="text-primary-700">
                                {history?.reconnaissance_par}
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src={baseUrl(history?.image)}
                            alt="École Lumière"
                            className="rounded-lg shadow-xl w-full h-96 object-cover"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-primary-500 text-white p-4 rounded-lg shadow-lg">
                            <p className="font-semibold text-lg">2024 - 2025</p>
                            <p className="text-sm">{history?.actif} ans d'excellence</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default History;