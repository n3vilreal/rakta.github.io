import React from 'react';
import Logo from '../assets/logoForBlack.png';
import FtMeetRakta from './FtMeetRakta';
import FtFindUsOn from './FtFindUsOn';

export default function Footer() {
  return (
    <>
        <div className="main">
            <footer className="bg-[#28282b] w-[100vw] flex justify-between items-center pt-4">
                <div className=' flex items-center justify-center w-[15vw] h-20'>
                    <img src={Logo} alt="" className='h-20' />
                </div>
                <FtMeetRakta />
                <FtFindUsOn />
            </footer>
        </div>
    </>
  )
}
