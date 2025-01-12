import React from 'react';
import LogoWhite from '../assets/logoForBlack.png';
import { Link, useNavigate  } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const loginClick = () => {
    navigate('/login'); 
  }
  return (
    <>
      <div className='main bg-[#28282B] flex items-center space-x-20 py-2 justify-between w-[100%] sticky top-0 z-10'>
        {/* Logo */}
        <img src={LogoWhite} alt="" className='h-24 ml-6'/> 

        <div className='flex  items-center  space-x-8 mr-10 w-[75%]'>
          {/* Navigation */}
              <ul className='flex text-white text-xl font-semibold w-[80%] space-x-6'>
                <Link to="/" >HOME</Link>
                <Link>OUR MISSION</Link>
                <Link>BLOOD STORIES</Link>
                <Link>MAPS</Link>
                <Link>FUNDRAISER</Link>
              </ul>
          {/* Login */}
          <div className='flex flex-col justify-center  w-[10%] text-white text-xl font-semibold space-y-2'>
            <button onClick={loginClick} className='border-4 border-[#FCDFDF] rounded-3xl'>Log In</button>
          </div>
        </div>

      </div>
    </>
  )
}
