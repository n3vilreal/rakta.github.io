import React from 'react';
import Navbar from '../components/Navbar';
import NavbarResponsive from '../components/NavbarResponsive';
import MyProfile from '../components/MyProfile';

export default function Profile() {
  return (
    <>
        <Navbar />
        <NavbarResponsive /> 
        <MyProfile />
    </>
  )
}
