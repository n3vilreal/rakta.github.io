import React from 'react';
import { FaEnvelope } from "react-icons/fa";

export default function FtMeetRakta() {
  return (
    <div>
      <div className='flex flex-col items-start space-y-4  w-[30vw]'>
                    <div className='text-[#ada5a5] font-bold text-xl ml-3'>MEET RAKTA</div>
                    <div className='flex flex-col items-start'>
                        <div>
                            <span className='text-md font-semibold text-red-800'>|</span>
                            <span className='text-md font-semibold text-white ml-4'>Home</span>
                        </div>

                        <div>
                            <span className='text-md font-semibold text-red-800'>|</span>
                            <span className='text-md font-semibold text-white ml-4'>Our Mission</span>
                        </div>

                        <div>
                            <span className='text-md font-semibold text-red-800'>|</span>
                            <span className='text-md font-semibold text-white ml-4'>Map</span>
                        </div>

                    </div>
                    <div>
                        <span className="mail flex items-center space-x-2 text-white">
                                          <FaEnvelope />
                                          <p>info@rakta.com.np</p>
                        </span>
                    </div>
    </div>
    </div>
  )
}
