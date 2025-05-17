import React from 'react'
import HomeDateResult from '../components/home/HomeDateResult'

function Home() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='md:pt-10 px-4 sm:px-6 md:px-12 lg:px-16 text-center md:text-start'>
        <div className='text-2xl md:text-3xl font-bold text-gray-800'>
          Set Your Special Dates!!
        </div>
        <div className='text-sm sm:text-base text-gray-600 mt-2 max-w-2xl'>
          Set your special birthdays and loan dates, and I'll remind you when they come.
        </div>
      </div>

      <div className='p-4 sm:p-6 md:p-8 lg:p-12'>
        <div className='bg-white rounded-lg shadow-sm p-4 sm:p-6'>
          <HomeDateResult />
        </div>
      </div>

      <div className='pb-8 sm:pb-12'></div>
    </div>
  )
}

export default Home