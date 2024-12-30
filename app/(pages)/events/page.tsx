import {  eventsData, footerProps } from '@/app/constants'
import BackToTopButton from '@/components/BackToTop'
import FooterSection from '@/components/Footer'
import { HeroSection } from '@/components/Hero'
import JoinUsSection from '@/components/JoinUs'
import Navbar from '@/components/NavBar'
import { UpcomingEvents } from '@/components/UpcomingEvents'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar />
        <HeroSection {...eventsData} />
        <UpcomingEvents />
        <JoinUsSection />
        <FooterSection {...footerProps} />
        <BackToTopButton />
    </div>
  )
}

export default page
