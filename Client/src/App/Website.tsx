import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/website/Pages/Home'
import Header from '../Components/Layout/Website/Header'
import Footer from '../Components/Layout/Website/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getSchoolState } from '../Pages/Settings/School/redux/SchoolSlice'
import { AppDispatch } from '../Redux/store'
import { getSchoolInfo } from '../Pages/Settings/School/redux/SchoolAsyncThunk'
import Loading from '../Components/ui/Loading'

const Website: React.FC = () => {
  const { datas: school , action: schoolAction } = useSelector(getSchoolState)
  const dispatch: AppDispatch = useDispatch();

  // Actions 
  const isLoading = schoolAction.isLoading ;

  useEffect(() => {
    if (!school.id_etablissement) {
      dispatch(getSchoolInfo());
    }

    return () => { }
  }, [dispatch])


  // Loading 
  if ( isLoading ) return <div className='h-screen flex items-center '><Loading/></div>

  return (
    <div className='relative bg-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default Website