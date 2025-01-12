import React from 'react';
import LogoWhite from '../assets/logo-white.png';

export default function Navbar() {
  return (
    <>
      <div className='main bg-[#28282B]'>
        {/* Logo */}
        <img src={LogoWhite} alt="" className='h-24'/> 

        <div>
          {/* Navigation */}
            <div>
              <ul>
                <li>ABOUT US</li>
                <li>BLOOD COMPABILITY CHECKER</li>
                <li>BLOOD STORIES</li>
                <li>MAPS</li>
                <li>FUNDRAISER</li>
              </ul>
            </div>

          <div></div>
        </div>

      </div>
    </>
  )
}
