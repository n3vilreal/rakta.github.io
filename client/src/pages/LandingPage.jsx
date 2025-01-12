import React from 'react';
import Navbar from '../components/Navbar';
import Home from '../layout/Home';
import OurMission from '../layout/OurMission';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

export default function LandingPage() {
  return (
    <div>
        <Navbar/>
        <Home/>
        <OurMission/>
    </div>
  )
}
