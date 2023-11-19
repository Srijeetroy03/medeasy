import React,{useEffect, useState} from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { Link } from 'react-router-dom'
import '../styles/form.css'
import { useSelector, useDispatch } from 'react-redux'
import { completeProfile } from '../redux/actions/userAuthActions'
// import { completeProfile} from '../redux/apis/registerUser'
import { showAlert } from '../redux/actions/alertActions'
import { useNavigate } from 'react-router-dom'
import ErrorIcon from '@mui/icons-material/Error';
import { doctorSpecialities } from '../static/doctorSpeciality'

function ProfileForm() {
  const {userInfo} = useSelector(state => state.userAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [img, setImg] = useState(null)
  const [imgName, setImgName] = useState(null)
  const [error,setError] = useState('')
  const [role,setRole] = useState(null)
  const [Speciality,setSpeciality] = useState(null)
  const [experience,setExperience] = useState(null)
  const [degree,setDegree] = useState(null)
  const [address,setAddress] = useState(null)
  const [phone,setPhone] = useState(null)
  const [timingFrom,setTimingFrom] = useState(null)
  const [timingTo,setTimingTo] = useState(null)
  const [days,setDays] = useState(null)
  const [city,setCity] = useState(null)
  const [state,setState] = useState(null)
  const [country,setCountry] = useState(null)

  const _onSelect = (option) => {
    console.log(option.value);
    setSpeciality(option.value)
  }

  useEffect(() => {
    if(!userInfo) navigate('/user-authentication/signup')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(name === '' || username === ''){
      setError(prev=>'Please fill all the fields')
      return
    }
    try{
      console.log('password: ', userInfo);
      await dispatch(completeProfile({...userInfo,name,username,img,imgName,role,speciality:Speciality, experience, degree,phone, timing: {timeFrom:timingFrom,timeTo:timingTo}, address, days: (days && days.includes(',')) ? days.split(',') : '',city,state,country}))
      navigate('/home')
  }
    catch(err) {
      console.log(err.message);
      setError(prev=>err.message)
      dispatch(showAlert({msg: err.message, type: 'error'}))
    }
    
  }

  const handleImage = async (e) => {
    const img = e.target.files[0]
    const imgBase64 = await convertTobase64(img)
    console.log(img);
    console.log(imgBase64);
    setImg(prev => imgBase64)
    setImgName(img.name)
}

const convertTobase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

  const handleName = (e) => {
    setName(prev=>e.target.value)
  }

  const handleUsername = (e) => {
    setUsername(prev=>e.target.value)
  }


  useEffect(() => {
    console.log(typeof(timingFrom), typeof(timingTo));
    console.log(timingFrom, timingTo);
  }, [timingFrom,timingTo])



  return (
<>
    {userInfo && !role && <div className='flex flex-col w-full p-10 px-6 md:p-10 gap-8 font-manrope'>
    <h2 className='font-manrope font-bold text-3xl capitalize text-center'>Select a role that perfectly fits for you</h2>
    <div className='flex flex-col md:flex-row gap-4 w-full items-center justify-evenly pt-8'>
         <button onClick={()=>setRole('Normal')} className='border w-56 h-56 hover:scale-110 hover:bg-green-500 text-white bg-green-600 rounded transition-all p-2' type='submit'>Normal User</button>  
         <button onClick={()=>setRole('Doctor')} className='border w-56 h-56 hover:scale-110 hover:bg-green-500 text-white bg-green-600 rounded transition-all p-2' type='submit'>Doctor</button>  
    </div>
    </div>}


    {userInfo && role && <div className='flex flex-col w-full font-manrope p-10 px-6 md:p-10 gap-8'>
        <h2 className='font-manrope font-bold text-3xl'>You're just one step away from finishing the resgistration process!</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col input-grp relative animate-form '>
            <label className='' htmlFor='email'>Name</label>
            <input required onChange={handleName} placeholder='Enter Full Name' className={`focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2 ${role==='Doctor' && 'pl-12'}`} type='text' name='name' id='name'/>
            {role==='Doctor' && <p className='absolute bottom-0 left-0 p-2'>Dr.</p>}
            </div>
            <div className='flex flex-col input-grp relative animate-form delay-15'>
            <label className='' htmlFor='email'>Username</label>
            <input required  onChange={handleUsername} placeholder='username' className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2 pl-12' type='text' name='username' id='username'/>
            <p className='absolute bottom-0 left-0 p-2'>@</p>
            </div>
            {role==='Doctor' && <Dropdown options={doctorSpecialities.map(spec=>spec.name)} onChange={_onSelect} value={doctorSpecialities.map(spec=>spec.name)[0]} placeholder={'Select Your Speciality'}/>}
            {Speciality==='Other' && role==='Doctor' && <div className='flex flex-col input-grp relative animate-form delay-15'>
              <label className='' htmlFor='speciality'>Please specify your Speciality</label>
              <input required  onChange={(e)=>_onSelect(e.target.value)} placeholder='Enter your speciality' className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2' type='text' name='speciality' id='speciality'/>
            </div>}
            {role==='Doctor' && <div className='flex flex-col input-grp relative animate-form delay-15'>
              <label className='' htmlFor='experience'>Years of Experience</label>
              <input required min={0}  onChange={(e)=>setExperience(e.target.value)} placeholder='Enter your years of Experience' className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2' type='number' name='experience' id='experience'/>
            </div>}
            {role==='Doctor' && <div className='flex flex-col input-grp relative animate-form delay-15'>
              <label className='' htmlFor='degree'>Degree</label>
              <input required  onChange={(e)=>setDegree(e.target.value)} placeholder='Enter comma separated Degrees' className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2' type='text' name='degree' id='degree'/>
            </div>}
            {role==='Doctor' && <div className='flex flex-col input-grp relative animate-form delay-15'>
              <label>Timings</label>
              <div className='flex flex-row w-full items-center justify-between gap-2'>
                <div className='flex flex-col input-grp delay-15 animate-form w-full'>
                  <label className='' htmlFor='timeFrom'>From</label>
                  <input required  onChange={(e)=>setTimingFrom(e.target.value)} placeholder='' className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2' type='time' name='timeFrom' id='timeFrom'/>
                </div>
                <div className='flex flex-col input-grp delay-15 animate-form w-full'>
                  <label className='' htmlFor='timeTo'>To</label>
                  <input required  onChange={(e)=>setTimingTo(e.target.value)} placeholder='' className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2' type='time' name='timeTo' id='timeTo'/>
                </div>
              </div>
            </div>}
            {role==='Doctor' && <div className='flex flex-col input-grp relative animate-form delay-15'>
              <label className='' htmlFor='days'>Days of availability</label>
              <input required  onChange={(e)=>setDays(e.target.value)} placeholder='Enter Comma Separated Days' className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2' type='text' name='days' id='days'/>
            </div>}
            {role==='Doctor' && <div className='flex flex-col input-grp relative animate-form delay-15'>
              <label className='' htmlFor='address'>Address</label>
              <textarea required  onChange={(e)=>setAddress(e.target.value)} placeholder='Enter your Address' className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2' name='address' id='address'/>
            </div>}
            {role==='Doctor' && <div className='flex flex-col input-grp relative animate-form delay-15'>
              <label className='' htmlFor='address'>City</label>
              <input type={'text'} required  onChange={(e)=>setCity(e.target.value)} placeholder='Enter your city' className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2' name='address' id='address'/>
            </div>}
            {role==='Doctor' && <div className='flex flex-col input-grp relative animate-form delay-15'>
              <label className='' htmlFor='address'>State</label>
              <input type={'text'} required  onChange={(e)=>setState(e.target.value)} placeholder='Enter your state' className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2' name='address' id='address'/>
            </div>}
            {role==='Doctor' && <div className='flex flex-col input-grp relative animate-form delay-15'>
              <label className='' htmlFor='address'>Country</label>
              <input type={'text'} required  onChange={(e)=>setCountry(e.target.value)} placeholder='Enter your country' className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2' name='address' id='address'/>
            </div>}
            <div className='flex flex-col input-grp relative animate-form delay-15'>
              <label className='' htmlFor='phone'>Contact Number</label>
              <input required  onChange={(e)=>setPhone(e.target.value)} placeholder='Enter your contact mumber' className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2' type='tel' name='phone' id='phone'/>
            </div>

            <div className='flex flex-col input-grp relative animate-form delay-3'>
              <label className='' htmlFor='email'>Email</label>
              <p className='focus:outline-0 border-b-2 focus:border-b-green-600 transition-colors p-2'>{userInfo.email}</p>
            </div>
            <div className='flex flex-col input-grp relative animate-form gap-1 delay-45'>
                <label htmlFor='image' className='bg-gray-100 hover:outline-0 hover:border-b-2 hover:border-b-black transition-colors p-2'>{img ? <img className='w-40 focus:border-b-green-600 h-40 object-cover object-center' src={img}/> : 'Upload Avatar Image'}</label>
                <input required onChange={handleImage} type='file' className='hidden' name='image' id='image' accept='.png, .jpg, .jpeg'/>
            </div>
            <p className='text-red-700'>{error}</p>
            <button className='btn focus:border-b-green-600 bg-green-600 hover:bg-green-500 rounded text-white px-4 py-2 transition-all' type='submit'>Submit</button>
        </form>
      </div>}
      </>
  )
}


export default ProfileForm