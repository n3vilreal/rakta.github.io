import React from 'react';
import Image1 from '../assets/manDonatingBlood.jpg';
import Image2 from '../assets/bloodBag.jpg';

export default function OurMission() {
  return (
    <>
    <div className='main flex w-full justify-center items-center'>
    <div className='container flex flex-col  justify-center items-center mt-32 space-y-12' >

        <div className="header text-6xl font-serif font-bold">
            <span>Our Mission</span>
            <hr className='bg-black h-1 w-60'/>
        </div>

        {/* Missions */}
        <div className='missions flex flex-col space-y-14'>
            
            {/* Mission 1 */}
            <div className="mission-top w-full flex space-x-16">
                <span className=" info1 w-[500px] h-[400px] text-2xl py-12 px-10 bg-[#d84040] text-white leading-loose" 
                    style={ {fontFamily: "'Saira Condensed', sans-serif" }}>
                    Rakta is a project based for Health related sector.
                    Due to high accidents and blood loss, blood is vital.
                    Every individual could not buy blood bag due to high cost for them.
                    Here our web application plays a vital role in connecting donors and acceptors. 
                </span>
                <div className='flex w-[50%] justify-center'>
                    <img src={Image1} className='h-[400px]' />
                </div>
            </div>

            {/* Mission 2 */}
            
            <div className="mission-top w-full flex space-x-16">
            <div className='flex w-[50%] justify-center'>
                <img src={Image2} className='h-[400px]' />
                </div>
                <span className=" info1 w-[500px] h-[400px] text-2xl py-12 px-10 bg-[#d84040] text-white leading-loose" 
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
