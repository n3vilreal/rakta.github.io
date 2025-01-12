import React from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Navigation() {
    const navigate = useNavigate();
    const handleRedirectAndScroll = (section) => {
        // Navigate to "/" with the scrollTo parameter
        navigate(`/?scrollTo=${section}`);
      };

  return (
    
    <>
      <ul className="flex text-white text-xl font-semibold w-[80%] space-x-6 
                    absolute right-0 top-16 z-50
                    max-md:flex-col max-md:bg-red-300 max-md:font-medium max-md:space-x-0">
            <span
              className="cursor-pointer hover:text-red-500 transition-all duration-600 ease-in-out"
              onClick={() => handleRedirectAndScroll("Home")}
            >
                Home
            </span>
            <span
              className="cursor-pointer hover:text-red-500 transition-all duration-600 ease-in-out"
              onClick={() => handleRedirectAndScroll("ourMission")}
            >
              Our Mission
            </span>

            <span
              className="cursor-pointer hover:text-red-500 transition-all duration-600 ease-in-out"
              onClick={() => handleRedirectAndScroll("map")}
            >
              Blood Compatibility
            </span>
            <span
              className="cursor-pointer hover:text-red-500 transition-all duration-600 ease-in-out"
              onClick={() => handleRedirectAndScroll("map")}
            >
              Map
            </span>
            <span
              className="cursor-pointer hover:text-red-500 transition-all duration-600 ease-in-out"
              onClick={() => handleRedirectAndScroll("map")}
            >
              Fundraiser
            </span>
          </ul>
    </>
  )
}
