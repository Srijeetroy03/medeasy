import React from 'react'
import Avatar from '../images/avatar.png'
import { useSelector } from 'react-redux'
import VideoChatOutlinedIcon from '@mui/icons-material/VideoChatOutlined';
import { Link } from 'react-router-dom'

function AppointmentCard({appointment,key}) {
    const {userInfo} = useSelector(state => state.userAuth)
  return (
    <div key={key} className='flex flex-row items-center gap-4 w-max p-4 rounded-2xl border transition-all hover:shadow-lg'>
        <img src={userInfo?.role ==='Doctor' ? appointment?.patient?.img : appointment?.doctor?.img || Avatar} style={{aspectRatio:1}} className='w-24 object-cover rounded-full'/>
        <div className='w-full flex flex-col items-start gap-2'>
            <h2 className='font-bold'>{userInfo?.role ==='Doctor' ? appointment?.patient?.name : appointment?.doctor?.name} {userInfo?.role !== 'Doctor' && <span className='font-medium'>| {appointment?.doctor?.speciality}</span>}</h2>
            {userInfo?.role !== 'Doctor' && <p className=''>Doc Timings: {appointment?.doctor?.timing?.timeFrom} - {appointment?.doctor?.timing?.timeTo}</p>}
            <Link to={`/meet/${appointment?.doctor?.roomId}`} className='text-green-600' title='Start Meet'>{appointment?.doctor?.roomId} <VideoChatOutlinedIcon/></Link>
        </div>
    </div>
  )
}

export default AppointmentCard