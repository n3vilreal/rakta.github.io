import React from 'react';
import Navbar from '../components/Navbar';
import Home from '../layout/Home';
import BloodCompatible from '../layout/bloodCompatible';

export default function LandingPage() {
  return (
    <div>
        <Navbar />
        <Home/>
        <BloodCompatible/>
    </div>
  )
}
