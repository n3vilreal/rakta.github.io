import React from 'react';
import { FaEnvelope } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";

export default function FtMeetRakta() {
  return (
    <div>
      <div className='flex flex-col items-start space-y-4  w-[30vw] max-md:w-[100vw] max-md:mt-4'>
                    <div className='text-[#ada5a5] font-bold text-xl ml-3'>FIND US ON</div>
                    <div className='flex flex-col items-start space-y-2 max-md:flex-row max-md:w-[100vw] max-md:space-y-0'>
                        <div className='flex items-center'>
                            <span className='text-md font-semibold text-red-800 max-md:hidden'>|</span>
                            <span className='text-md font-semibold text-white ml-4 w-[5vw] max-md:hidden'>GitHub</span>
                            <span className='text-xl font-semibold text-white ml-4 '><FaGithub /></span>
                        </div>

                        <div className='flex items-center'>
                            <span className='text-md font-semibold text-red-800 max-md:hidden'>|</span>
                            <span className='text-md font-semibold text-white ml-4 w-[5vw] max-md:hidden'>Instagram</span>
                            <span className='text-xl font-semibold text-white ml-4'><FaInstagram /></span>
                        </div>

                        <div className='flex items-center'>
                            <span className='text-md font-semibold text-red-800 max-md:hidden'>|</span>
                            <span className='text-md font-semibold text-white ml-4 w-[5vw] max-md:hidden'>Facebook</span>
                            <span className='text-2xl font-semibold text-white ml-4'><TiSocialFacebookCircular /></span>
                        </div>



                    </div>
                    
    </div>
    </div>
  )
}
