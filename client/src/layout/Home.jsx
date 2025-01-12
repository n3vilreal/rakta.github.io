import React from 'react';
import HomeBackground from '../assets/HomeBackground.svg';
import Logo from '../assets/Logo.svg';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";

function Home() {
  return (
    <div id='home' className="main h-[100%] w-[100%] flex">
        
        {/* Left Partation */}
        <div className='left-partation h-[100%] w-[50%] flex'>
            <img src={HomeBackground} alt="Home Background" className="min-h-100 min-w-100" />
        </div>

        {/* Right Partation */}
        <div className='right-partation h-[100%] w-[50%] flex flex-col justify-center'>
            <div className="right-components ml-6 mt-28">
              <div className='description w-[65%]'>
                <span style={ {fontFamily: "'Saira Condensed', sans-serif" }} className="description text-7xl font-bold leading-tight">
                  Eliminate Blood <br/> Scarcity in <span className='text-red-600'>Nepal</span>
                </span>
                <span className='detailed-description text-2xl ml-3 leading-normal tracking-wider' style={ {fontFamily: "'Saira Condensed', sans-serif" }}>
                   by donating your 
                   <span className='text-red-600'> time </span>
                   to make an impact , your <br /> 
                   <span className='text-red-600'> blood </span> 
                   to save lives or your 
                   <span className='text-red-600'> money </span>
                   to create a holistic blood management cycle.
                </span>
              </div>
              {/* Donate blood button */}
              <button className="donate group text-4xl mt-5 flex items-center text-red-600 font-semibold border-4 border-red-600 px-3 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-red-600 hover:text-white" 
              style={ {fontFamily: "'Saira Condensed', sans-serif" }}>
                Donate Blood Now
                <MdKeyboardDoubleArrowRight className='mt-[5px] transition-all duration-300 ease-in-out group-hover:translate-x-2'/></button>
              {/* Contact Information */}
              <div className="contact flex justify-between mt-32 w-[80%]">
                <span className="mail flex items-center space-x-2">
                  <FaEnvelope />
                  <p>info@rakta.com.np</p>
                </span>
                <div className="socials flex space-x-4">
                  <button className="whatsapp text-3xl"><FaWhatsapp /></button>
                  <button className="facebook text-3xl"><TiSocialFacebookCircular /></button>
                  <button className="instagram text-3xl"><FaInstagram /></button>
                </div>
              </div>
            </div>
        </div>
    </div>
  ) 
}

export default Home