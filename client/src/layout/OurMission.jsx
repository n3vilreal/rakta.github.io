import React from 'react';
import Image1 from '../assets/manDonatingBlood.jpg';
import Image2 from '../assets/bloodBag.jpg';

export default function OurMission() {
  return (
    <>
    <div id="ourMission" className='main flex w-full justify-center items-center'>
        <div className='container flex flex-col  justify-center items-center mt-32 space-y-12 max-md:mt-5' >

            <div className="header text-6xl font-serif font-bold max-md:ml-3">
                <span>Our Mission</span>
                <hr className='bg-black h-1 w-60'/>
            </div>

            {/* Missions */}
            <div className='missions flex flex-col space-y-10 max-md:space-y-0'>
                
                {/* Mission 1 */}
                <div className="mission-top w-full flex space-x-16 max-md:flex-col items-center">
                    <div className='flex w-[50%] justify-center max-md:w-[100vw] max-md:h-[100%]'>
                        <span className=" info1 w-[500px] text-2xl py-12 px-10 bg-[#d84040] text-white leading-loose
                                        max-md:w-[100vw] max-md:h-[100%] max-md:text-center" 
                            style={ {fontFamily: "'Saira Condensed', sans-serif" }}>
                            Every individual try to post a status on social media hoping for response and connecting to donor,
                             as it may takes time we raktas makes it easier for them.
                              Acceptor can just put his location and blood group number,
                              then the location of the donor appears on the screen and he can call him/her and go for further process.
                        </span>
                    </div>
                    <div className='flex w-[75%] justify-around max-md:w-[100vw] max-md:h-[100%] max-md:hidden'>
                        <img src={Image1} className='w-[50%] max-md:w-[100vw] max-md:h-[100%]' />
                    </div>
                </div>

                {/* Mission 2 */}
                
                <div className="mission-top w-full flex space-x-16 items-center flex-row-reverse max-md:flex-col-reverse max-md:space-x-0">
                    <div className='flex w-[50%] justify-center max-md:w-[100vw] max-md:h-[100%]'>
                        <span className=" info1 w-[500px] text-2xl py-12 px-10 bg-[#d84040] text-white leading-loose
                                        max-md:w-[100vw] max-md:h-[100%] max-md:text-center" 
                            style={ {fontFamily: "'Saira Condensed', sans-serif" }}>
                            Rakta is a project based for Health related sector.
                            Due to high accidents and blood loss, blood is vital.
                            Every individual could not buy blood bag due to high cost for them.
                            Here our web application plays a vital role in connecting donors and acceptors. 
                        </span>
                    </div>
                    <div className='flex w-[75%] justify-around max-md:w-[100vw] max-md:h-[100%]'>
                        <img src={Image2} className='w-[50%] max-md:w-[100vw] max-md:h-[100%]' />
                    </div>
                </div>

            </div>
    </div>
    </div>
    </>
  )
}
