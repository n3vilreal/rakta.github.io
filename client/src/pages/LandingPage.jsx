import React from 'react';
import Navbar from '../components/Navbar';
import Home from '../layout/Home';
import OurMission from '../layout/OurMission';

export default function LandingPage() {
  return (
    <div>
        <Navbar/>
        <Home/>
        <OurMission/>
    </div>
  )
}
