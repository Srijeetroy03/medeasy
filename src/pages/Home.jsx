import React,{useRef,useEffect, Suspense} from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar/Navbar'

function AppHome() {
  const {userInfo} = useSelector(state => state.userAuth)
  const navbar = useRef()
  const {pathname} = useLocation()
  const navigate = useNavigate()


  const nav = document.getElementById('navbar')

  useEffect(() => {
    nav && nav.classList.remove('md:py-2')
    nav && nav.classList.add('md:py-4')
  }, [])

  useEffect(() => {
    window.scrollTo(0,0)
    if(pathname === '/') navigate('/home')
  }, [pathname])
  
  nav && window.addEventListener('scroll', (e) => {
    if(window.scrollY > 0){
      nav && nav.classList.remove('md:py-4')
      nav && nav.classList.add('md:py-2')
    }else{
      nav && nav.classList.remove('md:py-2')
      nav && nav.classList.add('md:py-4')
    }
  })
  return (
    <>
    <div ref={navbar} id='navbar' className='relative md:sticky top-0 z-10 w-full bg-white py-2 md:py-4 pb-2  border-b-2 border-black/5 transition-all'>
      <Navbar/>
      </div>
    <div className='min-h-screen container p-4 md:p-0'>
      <Outlet/>
    </div>
    <div className='w-full border border-t-black bg-white py-2 md:py-12 pb-2 px-4 md:px-0 transition-all text-white'>
      <Footer/>
    </div>
    </>
  )
}

export default AppHome