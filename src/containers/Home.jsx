import React from 'react'
import HomeDateResult from '../components/home/HomeDateResult'

function Home() {
  return (
   <>
   <div className='h-screen bg-gray-100'>
    <div className='pt-15 ps-12'>
        <div className='text-4xl font-bold'>
            Set Your Specials Dates!!
        </div>
        <div className='text-md text-gray-600'>
            Set your special birthdays and loan dates, and I’ll remind you when they come.
        </div>

    </div>

    <div className='p-15'>
        <HomeDateResult />
    </div>

   </div>
   </>
  )
}

export default Home
