// page/home/HomePage.jsx
import React, { useEffect } from "react";
import HeroSearchSection from "../../components/HeroSearchSection";
import SymptomsDiseasesSection from "../../components/SymptomsDiseasesSection";
import AffiliatedClinicSection from "../../components/AffiliatedClinicSection";
import ReviewsSection from "../../components/ReviewsSection";
import AppointmentBookingSection from "../../components/AppointmentBookingSection";
import ServicesSection from "../../components/ServicesSection";
import TestimonialsSection from "../../components/TestimonialsSection";
import { useHomepage } from "../../hooks/useHomepage";

const HomePage = () => {
  const { availableVets, symptomsAndDiseases, isLoading, errors } =
    useHomepage();

  console.log("homepage rendered");

  // Initialize symptoms and diseases data on mount
  useEffect(() => {
    // If you have static symptoms and diseases data, set it here
    // This is optional and can be removed if you don't need static data
    if (
      symptomsAndDiseases.symptoms.length === 0 &&
      symptomsAndDiseases.diseases.length === 0
    ) {
      // You can import your static data and set it
      // import symptomsDiseasesData from '../../data/symptomsDiseasesData.json';
      // symptomsAndDiseases.setData(symptomsDiseasesData.symptoms, symptomsDiseasesData.diseases);
    }
  }, [symptomsAndDiseases]);

  // Log data for debugging
  useEffect(() => {
    if (availableVets.vets.length > 0) {
      console.log("Available vets loaded:", availableVets.vets);
    }
    if (availableVets.error) {
      console.error("Available vets error:", availableVets.error);
    }
  }, [availableVets.vets, availableVets.error]);

  return (
    <>
      <HeroSearchSection
        availableVets={availableVets.vets}
        vetsLoading={availableVets.loading}
        vetsError={availableVets.error}
      />
      <SymptomsDiseasesSection
        symptoms={symptomsAndDiseases.symptoms}
        diseases={symptomsAndDiseases.diseases}
      />
      <AffiliatedClinicSection
        vets={availableVets.vets}
        loading={availableVets.loading}
      />
      <ReviewsSection />
      {/* <AppointmentBookingSection/> */}
      <ServicesSection />
    </>
  );
};

export default HomePage;
