import {React, useEffect } from "react";
import Navbar from "../components/Navbar";
import Home from "../layout/Home";
import OurMission from "../layout/OurMission";
import { useLocation } from "react-router-dom";
import { Element, scroller } from "react-scroll";
import NavbarResponsive from "../components/NavbarResponsive";
import DonorForm from "../components/DonorForm";
import Footer from "../components/Footer";

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");

    if (scrollTo) {
      scroller.scrollTo(scrollTo, {
        duration: 500,
        smooth: true,
      });
    }
  }, [location]);
  return (
    <div>
      <DonorForm />
      <Navbar />
      <NavbarResponsive />
      <Element name="home">
        <Home />
      </Element>
      <hr  className="mt-5"/>
      <Element name="our-mission">
        <OurMission />
      </Element>
      <Footer/>
    </div>
  );
}
