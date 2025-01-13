import React from 'react';
import MyImage from '../assets/trialProfile.jpg';

export default function MyProfile() {
    const myname = "John Doe";
    const bloodDonationCounter = 5;
    const userEmail = "johndoe@example.com";
    const userPhoneNumber = "9800000000";
    const healthPercentage = 20;
  return (
    <>
        <div className="main w-[100vw]" style={ {fontFamily: "'Saira Condensed', sans-serif" }}>
            <div className='main-profile h-full w-[100%] flex flex-col'>
                <div className='person-info flex w-[100%] mt-20 max-md:flex-col max-md:items-center'>
                    <div className='person flex flex-col w-[40%] items-center space-y-6'>
                        <img src={MyImage} alt="" className='w-56 rounded-full'/>
                        <span className='text-2xl font-semibold'>{myname}</span>
                    </div>

                    <div className='person-details flex flex-col w-[60%] space-y-10 mt-14 max-md:w-[100vw] max-md:items-center'>
                        <span className='text-7xl font-bold max-md:text-4xl max-md:text-center'>
                            {/* this holds blood donation count */}
                            You have donated blood <br />
                            <span className='text-red-600'>{bloodDonationCounter} </span>times.
                        </span>
                        <div className="contact-info flex text-sm max-md:flex-col max-md:items-center flex-col">
                            {/* This holds person's contact info */}
                            <span>Email: {userEmail}</span>
                            <span>Phone Number: {userPhoneNumber}</span>
                        </div>
                    </div>
                </div>
                <div className="health-bar-container w-[100%] mt-10 flex justify-center">
                    <div className='health-bar w-[70vw] bg-white flex justify-start border-4 border-black p-2'>
                        <div className='progress-container py-2 border-3 bg-red-600 flex justify-center items-center transition-all duration-300 ease-in-out'
                             style={ {width: healthPercentage + "%"} }>
                                {healthPercentage>=20 ? (
                                   <span className='text-white text-2xl'>{healthPercentage}%</span> 
                                ) : (
                                    <span></span>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
