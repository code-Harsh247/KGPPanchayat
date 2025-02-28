import React from 'react'
import PromptBar from '@/Components/PromptBar'

const Page = () => {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      {/* Left Section (Hidden on Mobile) */}
      <div className="hidden md:flex w-[45%] h-full ">
      <img src="./Images/HomepageAuntie.png" className='w-full object-contain'/>
      </div>

      {/* Right Section (Full Width on Mobile) */}
      <div className="w-full md:w-[55%] h-full flex flex-col justify-start md:justify-center pb-24">
        <div className="w-4/5 md:w-[90%] lg:w-3/4 mx-auto">
          {/* Mobile Image (Hidden on Desktop) */}
          <img src="./Images/Welcome-mobile.svg" className="w-full h-full object-contain md:hidden" />
          {/* Desktop Image (Hidden on Mobile) */}
          <img src="./Images/Welcome.svg" className="w-full h-full object-contain hidden md:block" />
        </div>
      </div>
      <div className='absolute bottom-56 sm:bottom-24 md:bottom-0 left-1/2 
              w-[90%] md:w-4/5 lg:w-1/2 
              sm:h-52 md:h-auto 
              -translate-x-1/2 rounded-sm bg-white 
              border-2 border-primary_grey p-3 shadow-lg'>
      <PromptBar/>
      </div>
    </div>
  )
}

export default Page
