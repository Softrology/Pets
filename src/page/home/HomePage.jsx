import React from "react";
import HeroSearchSection from "../../components/HeroSearchSection";
import SymptomsDiseasesSection from "../../components/SymptomsDiseasesSection";
import AffiliatedClinicSection from "../../components/AffiliatedClinicSection";
import ReviewsSection from "../../components/ReviewsSection";
import AppointmentBookingSection from "../../components/AppointmentBookingSection";
import ServicesSection from "../../components/ServicesSection";
import TestimonialsSection from "../../components/TestimonialsSection";

const HomePage = () => {
  console.log("homepage rendered");

  return (
    <>
      <HeroSearchSection />
      <SymptomsDiseasesSection />
      <AffiliatedClinicSection />
      <ReviewsSection />
      {/* <AppointmentBookingSection/> */}
      <ServicesSection />
    </>
  );
};

export default HomePage;
