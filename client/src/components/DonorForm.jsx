import React from 'react';

export default function DonorForm() {
  return (
    <>
        <div className="main w[100vw] h-[100vh] absolute top-0 left-0">
                <div className="container absolute top-20 w-[70vw] h-[100vh] flex items-center justify-center bg-red-500 z-50 flex flex-col space-y-5">
                        <form action="" className='flex flex-col space-y-5'>
                        <input type="name" placeholder='Full Name'/>
                        <input type="tel" placeholder='Phone Number'/>
                        <input type="option" placeholder='Blood Group'/>
                        <input type="tel" placeholder='Latitude' />
                        <input type="tel" placeholder='Longitude' />
                        <button type='submit'>Submit</button>
                        </form>
                </div>
        </div>
    </>
  )
}
