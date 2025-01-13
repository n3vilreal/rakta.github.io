import React from 'react';
import Logo from '../assets/logoForBlack.png';
import FtMeetRakta from './FtMeetRakta';
import FtFindUsOn from './FtFindUsOn';
import FtContactUs from './FtContactUs';

export default function Footer() {
  return (
    <>
        <div className="main md:hidden">
            <footer className="bg-[#28282b] w-[100vw] flex justify-between items-center py-4">
                <div className=' flex items-center justify-center w-[10vw] ml-7 max-md:hidden'>
                    <img src={Logo} alt="" className='w-[20vw]' />
                </div>
                <div className='flex items-center max-md:flex-col'>
                  <FtMeetRakta />
                  <FtFindUsOn />
                  <FtContactUs />
                </div>
            </footer>
        </div>
    </>
  )
}
