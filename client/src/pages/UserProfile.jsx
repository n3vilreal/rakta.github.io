import React from 'react'
import Navbar from '../components/Navbar';
import UserContributions from '../components/UserContributions';
import NavbarResponsive from '../components/NavbarResponsive';

export default function UserProfile() {
  return (
    <div>
        <Navbar />
        <NavbarResponsive />
        <UserContributions />
    </div>
  )
}
