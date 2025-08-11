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
import { diseases, symptoms } from "../../utitlities/SymtomsDiseaseList";

const HomePage = () => {
  const { availableVets, symptomsAndDiseases, isLoading, errors } =
    useHomepage();


  // Initialize symptoms and diseases data on mount
  useEffect(() => {
    // Set static data from utils if Redux doesn't have data
    if (
      symptomsAndDiseases.symptoms.length === 0 &&
      symptomsAndDiseases.diseases.length === 0
    ) {
      // console.log("Setting static symptoms and diseases data");
      symptomsAndDiseases.setData(symptoms, diseases);
    }
  }, [symptomsAndDiseases]);

  // Log data for debugging
  useEffect(() => {
    if (availableVets.vets.length > 0) {
      // console.log("Available vets loaded:", availableVets.vets);
    }
    if (availableVets.error) {
      // console.error("Available vets error:", availableVets.error);
    }
  }, [availableVets.vets, availableVets.error]);

  // Log symptoms and diseases data
  useEffect(() => {
    if (symptomsAndDiseases.symptoms.length > 0) {
      // console.log("Symptoms data loaded:", symptomsAndDiseases.symptoms.length);
    }
    if (symptomsAndDiseases.diseases.length > 0) {
      // console.log("Diseases data loaded:", symptomsAndDiseases.diseases.length);
    }
  }, [
    symptomsAndDiseases.symptoms.length,
    symptomsAndDiseases.diseases.length,
  ]);

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
