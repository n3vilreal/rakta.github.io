import React from "react";
import Image1 from "../assets/manDonatingBlood.jpg";
import Image2 from "../assets/bloodBag.jpg";

export default function OurMission() {
  return (
    <>
      <div
        id="ourMission"
        className="main flex w-full justify-center items-center bg-gray-100 py-16 px-4 max-md:w-[100vw]"
      >
        <div className="container flex flex-col justify-center items-center max-w-7xl space-y-12">
          <div className="header text-4xl md:text-6xl font-serif font-bold text-center">
            <span>Our Mission</span>
            <hr className="bg-black h-1 w-20 md:w-60 mx-auto mt-4" />
          </div>

          {/* Missions */}
          <div className="missions flex flex-col space-y-0 space-x-0 max-md:space-y-0 max-md:w-[100vw]">
            {/* Mission 1 */}
            <div className="mission flex flex-col md:flex-row items-center space-y-10 max-md:space-y-0 md:space-x-16 max-md:w-[100vw]">
              <div className="flex flex-1 justify-center max-md:w-[100vw]">
                <span
                  className="info w-[35vw] text-lg md:text-2xl p-8 bg-[#d84040] text-white leading-loose text-center md:text-left max-md:w-[100vw]"
                  style={{ fontFamily: "'Saira Condensed', sans-serif" }}
                >
                  Rakta is a project based in the health sector. Due to high
                  accidents and blood loss, blood cancer patients, and other
                  blood loss cases, the need for blood is important. Every
                  individual might not afford a blood bag due to its high cost.
                  Our web application acts as a bridge between blood providers
                  and consumers.
                </span>
              </div>
              <div className="flex justify-center max-md:w-[100vw]">
                <img
                  src={Image1}
                  alt="Man Donating Blood"
                  className="w-full max-w-md shadow-lg max-md:w-[100vw]"
                />
              </div>
            </div>

            {/* Mission 2 */}
            <div className="mission flex flex-col md:flex-row items-center space-y-10 max-md:space-y-0 md:space-x-16 max-md:w-[100vw]">
              <div className="flex flex-1 justify-center max-md:w-[100vw]">
                <span
                  className="info w-[35vw] text-lg md:text-2xl p-8 bg-[#d84040] text-white leading-loose text-center md:text-left max-md:w-[100vw]"
                  style={{ fontFamily: "'Saira Condensed', sans-serif" }}
                >
                  Individuals often post on social media hoping for a response
                  and connection to donors, which might take time. Rakta makes
                  it easier by allowing the acceptor to post their location and
                  blood group number. The donor's location appears on the
                  screen, and the acceptor can then contact them directly.
                </span>
              </div>
              <div className="flex flex-1 justify-center">
                <img
                  src={Image2}
                  alt="Blood Bag"
                  className="w-full max-w-md shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
