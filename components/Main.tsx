import Image from 'next/image'
import React from 'react'
import Balances from './Balances'
import RightSidebar from './RightSidebar'

const Main = () => {
  return (
    <section className='px-5 lg:px-10 pt-10 bg-gray-20 h-screen'>
        <div>
          <h3 className='medium-20 text-gray-40'>Trending Topics</h3> 
          <div className='flex flex-col lg:flex-row gap-4 mt-5'>
          <Hashtag />
          <Hashtag />
          </div>
          <div className='flex flex-col lg:flex-row xl:gap-16 mt-10'>
             <div  className='hidden lg:block lg:w-80%'>
             <Image src='/lady.svg.png' width={170} height={20} alt='lady' />
             </div>
             <Balances />
          </div>
        </div>
        {/* for mobile view */}
        <div className='block lg:hidden mt-10'>
        <RightSidebar />
        </div>
    </section>
  )
}

const Hashtag = () =>{
    return(
        <div  className='flexStart w-full lg:w-1/2 bg-white rounded-xl gap-5 shadow-xl px-3 py-4'>
        <div className='bg-gray-20 p-3 rounded-sm'>
        <Image src='/home-black.svg' width={40} height={20} alt='home' className='size-6 md:size-5' />
        </div>
        <div className='cursor-pointer'>
            <p className='medium-18 text-gray-40'>Hashtag research</p>
            <p className='regular-16 text-gray-40'>Upgrade to pro subscription for $9 / month</p>
        </div>
      </div> 
    )
}

export default Main