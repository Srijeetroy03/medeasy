import React, { useEffect, useState } from 'react'
import { doctorSpecialities } from '../../static/doctorSpeciality'
import { Link, Outlet, useNavigate,useLocation } from 'react-router-dom'
import Chip from '../../components/Chip'
import FilterListIcon from '@mui/icons-material/FilterList';

function Doctor() {
  const navigate = useNavigate()
  const {pathname} = useLocation()

  const [showChips,setShowChips] = useState(false)

  useEffect(() => {
    if(pathname === '/doctor' || pathname === '/doctor/') navigate(`/doctor/${doctorSpecialities[0].name}`)
  }, [])

  return (
    <div className='pt-4 flex flex-col font-manrope'>
        <div className={`flex flex-wrap gap-2  transition-all overflow-hidden ${showChips ? 'h-full pb-4' : 'h-0'}`}>
            {doctorSpecialities.map(speciality => speciality.name!== 'Other' && <div className={`px-2 py-1 rounded-full border border-gray-500 text-gray-500 text-sm hover:bg-green-600 hover:text-white transition-all ${pathname.includes(speciality.name) && 'bg-green-600 text-white border-green-600'} `} onClick={()=>setShowChips(!showChips)}><Chip title={speciality.name}/></div>)}
        </div>
        <div className='w-full flex items-center justify-between'>
        <h3 className='font-bold w-fit'>Showing Results for <span className=''>{pathname.replace('/doctor/','')}</span></h3>
        <button title='Filter List By Speciality' className='bg-green-600 text-white self-end rounded p-1' onClick={()=> setShowChips(!showChips)}><FilterListIcon/></button>
        </div>
        <Outlet/>
    </div>
  )
}

export default Doctor