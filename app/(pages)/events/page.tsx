import {  eventsData, footerProps } from '@/app/constants'
import BackToTopButton from '@/components/BackToTop'
import FooterSection from '@/components/Footer'
import { HeroSection } from '@/components/Hero'
import { HeroContent } from '@/components/HeroContent'
import JoinUsSection from '@/components/JoinUs'
import Navbar from '@/components/NavBar'
import { UpcomingEvents } from '@/components/UpcomingEvents'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar />
        <HeroSection>
          <HeroContent {...eventsData} />
        </HeroSection>
        <UpcomingEvents />
        <JoinUsSection />
        <FooterSection {...footerProps} />
        <BackToTopButton />
    </div>
  )
}

export default page
