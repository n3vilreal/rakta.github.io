import React from 'react';
import { FaEnvelope } from "react-icons/fa";

export default function FtMeetRakta() {
  return (
    <div>
      <div className='flex flex-col items-start space-y-4  w-[30vw] ml-11 max-md:ml-0'>
                    <div className='text-[#ada5a5] font-bold text-xl ml-3 max-md:ml-0'>MEET RAKTA</div>
                    <div className='flex flex-col items-start max-md:flex-row max-md:w-[100vw] max-md:space-x-5'>
                        <div>
                            <span className='text-md font-semibold text-red-800 max-md:hidden'>|</span>
                            <span className='text-md font-semibold text-white ml-4 max-md:ml-0'>Home</span>
                        </div>

                        <div>
                            <span className='text-md font-semibold text-red-800 max-md:hidden'>|</span>
                            <span className='text-md font-semibold text-white ml-4 max-md:ml-0'>Our Mission</span>
                        </div>

                        <div>
                            <span className='text-md font-semibold text-red-800 max-md:hidden'>|</span>
                            <span className='text-md font-semibold text-white ml-4 max-md:ml-0'>Map</span>
                        </div>

                    </div>
                    <div className='max-md:hidden'>
                        <span className="mail flex items-center space-x-2 text-white">
                                          <FaEnvelope />
                                          <p>info@rakta.com.np</p>
                        </span>
                    </div>
    </div>
    </div>
  )
}
