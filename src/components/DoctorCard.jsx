import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../images/avatar.png'

function DoctorCard({doc}) {
  return (
    <div className='flex px-4 py-6 border bg-white items-center hover:shadow-md transition-all rounded-xl gap-2 flex-col flex-1 md:flex-initial' style={{flexBasis:'20%'}}>
        <img draggable={false} className='rounded-full w-[80%] m-auto bg-gray-200 object-cover' style={{aspectRatio:1}} src={doc.img || Avatar}/>
        <h3 className='font-semibold text-lg'>Dr. {doc.name}</h3>
        <h4 className='font-medium'>{doc.speciality}</h4>
        {/* <h4 className='font-medium text-sm'>Years of Experience: {doc.experience}</h4> */}
        <h4 className='flex gap-2'>{doc?.degree && (doc?.degree).split(',').map(deg => <p className='p-2 rounded-lg hover:bg-green-600 hover:text-white text-xs border border-green-600 w-min'>{deg}</p>)}</h4>
        <p className='text-sm text-gray-500'>{doc?.state}, {doc?.country}</p>
        <Link className='bg-green-600 mt-2 text-white p-2 rounded' to={`/doctor/profile/${doc._id}`}>See Profile</Link>
    </div>
  )
}

export default DoctorCard