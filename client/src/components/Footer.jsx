import React from 'react';
import Logo from '../assets/logoForBlack.png';
import FtMeetRakta from './FtMeetRakta';
import FtFindUsOn from './FtFindUsOn';
import FtContactUs from './FtContactUs';

export default function Footer() {
  return (
    <>
      <div className="main">
        <footer className="bg-[#28282b] w-full flex flex-col md:flex-row justify-between items-center p-4">
          {/* <div className="flex items-center justify-center w-full md:w-auto mb-4 md:mb-0">
            <img src={Logo} alt="" className="h-500 w-500" />
          </div> */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <FtMeetRakta />
            <FtFindUsOn />
            <FtContactUs />
          </div>
        </footer>
      </div>
    </>
  );
}
