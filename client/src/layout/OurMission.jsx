import React from 'react';
import Image1 from '../assets/manDonatingBlood.jpg';
import Image2 from '../assets/bloodBag.jpg';

export default function OurMission() {
  return (
    <>
    <div className='main flex w-full justify-center items-center'>
    <div className='container flex flex-col  justify-center items-center mt-32 space-y-12 max-md:mt-5' >

        <div className="header text-6xl font-serif font-bold">
            <span>Our Mission</span>
            <hr className='bg-black h-1 w-60'/>
        </div>

        {/* Missions */}
        <div className='missions flex flex-col space-y-2 max-md:space-y-0'>
            
            {/* Mission 1 */}
            <div className="mission-top w-full flex space-x-16 max-md:flex-col">
                <span className=" info1 w-[500px] h-[400px] text-2xl py-12 px-10 bg-[#d84040] text-white leading-loose
                                  max-md:w-[100vw] max-md:h-[100%] max-md:text-center" 
                    style={ {fontFamily: "'Saira Condensed', sans-serif" }}>
                    Rakta is a project based for Health related sector.
                    Due to high accidents and blood loss, blood is vital.
                    Every individual could not buy blood bag due to high cost for them.
                    Here our web application plays a vital role in connecting donors and acceptors. 
                </span>
                <div className='flex w-[50%] justify-center max-md:w-[100vw] max-md:h-[100%] max-md:hidden'>
                    <img src={Image1} className='h-[70%] max-md:w-[100vw] max-md:h-[100%]' />
                </div>
            </div>

            {/* Mission 2 */}
            
            <div className="mission-top w-full flex space-x-16 max-md:flex-col">
                <div className='flex w-[50%] justify-center max-md:w-[100vw] max-md:h-[100%]'>
                    <img src={Image2} className='h-[70%] max-md:w-[100vw] max-md:h-[100%]' />
                </div>
                <span className=" info1 w-[500px] h-[400px] text-2xl py-12 px-10 bg-[#d84040] text-white leading-loose
                                  max-md:w-[100vw] max-md:h-[100%] max-md:text-center" 
                    style={ {fontFamily: "'Saira Condensed', sans-serif" }}>
                    Rakta is a project based for Health related sector.
                    Due to high accidents and blood loss, blood is vital.
                    Every individual could not buy blood bag due to high cost for them.
                    Here our web application plays a vital role in connecting donors and acceptors. 
                </span>
                
            </div>

        </div>
    </div>
    </div>
    </>
  )
}
