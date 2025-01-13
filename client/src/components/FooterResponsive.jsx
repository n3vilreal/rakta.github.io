import React from 'react';
import Logo from '../assets/logoForBlack.png';
import FtMeetRakta from './FtMeetRakta';
import FtFindUsOn from './FtFindUsOn';
import FtContactUs from './FtContactUs';

export default function Footer() {
  return (
    <>
        <div className="main md:hidden max-w-[100vw] text-white flex flex-col underline">
            <footer className="bg-[#28282b] max-w-[100vw] flex justify-between items-center py-4 flex-col">
                <div className='flex items-center max-md:flex-col'>
                  Privacy Poliy
                </div>
                <div className='flex items-center max-md:flex-col'>
                  Terms and Conditions
                </div>
            </footer>
        </div>
    </>
  )
}
