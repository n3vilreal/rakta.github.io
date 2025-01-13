import { React, useState } from "react";
import HomeBackground from "../assets/homeBackground.png";
import Logo from "../assets/Logo.svg";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { set } from "firebase/database";
import DonorForm from "../components/DonorForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/Index";

function Home() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    if (!userLoggedIn) {
      navigate("/login");
    } else {
      toggleForm();
    }
  };

  const lifeSavedCount = 0;


  const openMap = () => {
    navigate("/map");
  }
  return (
    <div id="Home" className="main h-[100%] w-[100%] flex max-md:flex-col">
      <DonorForm showForm={showForm} toggleForm={toggleForm} />
      {/* Left Partation */}
      <div className="left-partation h-[100vh] w-[50%] flex items-center justify-center max-md:hidden"
            style={{ fontFamily: "'Saira Condensed', sans-serif" }}
            >
        {/* <div className="group text-center text-8xl font-semibold border-8 border-red-600 px-16 py-10 rounded-full transition-all duration-300 ease-in-out hover:bg-red-600 hover:border-double hover:border-white">
            <div>Lives Saved</div>
            <div className="text-red-600 group-hover:text-white">{lifeSavedCount}</div>
        </div> */}

        <img src={HomeBackground} alt="" className="-mt-28"/>
      </div>

      {/* Right Partation */}
      <div className="right-partation h-[100vh] w-[50%] flex flex-col justify-center max-md:w-[100w] max-md:mt-2">
        <div className="right-components ml-6 mt-32 max-md:mt-12 max-md:w-[90vw]">
          <div className="description w-[65%] max-md:w-[90vw]">
            <span
              style={{ fontFamily: "'Saira Condensed', sans-serif" }}
              className="description text-7xl font-bold leading-tight"
            >
              Eliminate Blood <br /> Scarcity in{" "}
              <span className="text-red-600">Nepal</span>
            </span>
            <span
              className="detailed-description text-2xl ml-3 leading-normal tracking-wider"
              style={{ fontFamily: "'Saira Condensed', sans-serif" }}
            >
              <br />
              by donating your
              <span className="text-red-600"> time </span>
              to make an impact , your <br />
              <span className="text-red-600"> blood </span>
              to save lives or your
              <span className="text-red-600"> money </span>
              to create a holistic blood management cycle.
            </span>
          </div>
          {/* Donate blood button */}
          <button
            onClick={handleClick}
            className="donate group text-4xl mt-5 flex items-center text-red-600 font-semibold border-4 border-red-600 px-3 py-2 rounded-full transition-all duration-300 ease-in-out 
                               hover:bg-red-600 hover:text-white 
                                max-md:text-xl"
            style={{ fontFamily: "'Saira Condensed', sans-serif" }}
          >
            Donate Blood Now
            <MdKeyboardDoubleArrowRight
              className="mt-[5px] transition-all duration-300 ease-in-out group-hover:translate-x-2
                                                       max-md:mt-0"
            />
          </button>

          <button
            
            onClick={openMap}
            className="donate group text-4xl mt-5 flex items-center text-red-600 font-semibold border-4 border-red-600 px-3 py-2 rounded-full transition-all duration-300 ease-in-out 
                               hover:bg-red-600 hover:text-white 
                                max-md:text-xl"
            style={{ fontFamily: "'Saira Condensed', sans-serif" }}
          >
            Search Donors
            <MdKeyboardDoubleArrowRight
              className="mt-[5px] transition-all duration-300 ease-in-out group-hover:translate-x-2
                                                       max-md:mt-0"
            />
          </button>

          {/* Contact Information */}
          <div
            className="contact flex justify-between mt-32 w-[80%] 
                              max-md:space-y-2 max-md:flex-col max-md:mt-5"
          >
            <span className="mail flex items-center space-x-2">
              <FaEnvelope />
              <p>info@rakta.com.np</p>
            </span>
            <div className="socials flex space-x-4">
              <button className="whatsapp text-3xl hover:text-red-600 hover:text-5xl transition-all duration-600 ease-in-out">
                <FaWhatsapp />
              </button>
              <button className="facebook text-3xl hover:text-red-600 hover:text-5xl transition-all duration-600 ease-in-out">
                <a href="https://www.facebook.com/nepalredcross"><TiSocialFacebookCircular /></a>
              </button>
              <button className="instagram text-3xl hover:text-red-600 hover:text-5xl transition-all duration-600 ease-in-out">
                <FaInstagram />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
