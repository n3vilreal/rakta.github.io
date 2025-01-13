import React from 'react';
import { FaEnvelope } from "react-icons/fa";

export default function FtMeetRakta() {
  return (
    <div>
      <div className='flex flex-col items-start space-y-4  w-[30vw] max-md:hidden'>
                    <div className='text-[#ada5a5] font-bold text-xl'>CONTACT US</div>
                    <div className='flex flex-col items-start'>
                        <div>
                            <span className='text-md font-semibold text-white ml-4'>NCIT college, Balkumari,</span>
                        </div>

                        <div>
                            <span className='text-md font-semibold text-white ml-4'>Lalitpur,44700</span>
                        </div>

                        <div>
                            <span className='text-md font-semibold text-white ml-4'>+977 9822222222</span>
                        </div>

                        <div>
                            <span className='text-md font-semibold text-white ml-4'>+977 9800000000</span>
                        </div>

                    </div>
                    <div>
                        <span className="mail flex items-center space-x-2 text-white underline">
                                          <span>Privacy policy</span>
                                          <span>Terms and conditions</span>
                        </span>
                    </div>
    </div>
    </div>
  )
}
