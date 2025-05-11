import React from 'react'
import SideHeader from '../pages/SideHeader'
import { Outlet } from 'react-router-dom'
import CalenderSection from '../pages/CalenderSection'

function MainDashboard() {
  return (
   <>
   <div className='grid grid-cols-12 h-screen'>
        <div className='md:block hidden col-span-2'>
            <SideHeader />
        </div>

        <div className='col-span-12 md:col-span-7'>
            <Outlet />

        </div>

        <div className='col-span-3 md:block hidden'>
            <CalenderSection />
        </div>

   </div>
   </>
  )
}

export default MainDashboard
