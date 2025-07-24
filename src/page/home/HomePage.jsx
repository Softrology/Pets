import React from "react";
import Header from "../../components/Header";
import HomeContent from "../../components/HomeContent"


const HomePage = () => {
  console.log("homepage rendered");

  return (
    <>
      <Header />
      <HomeContent />
    </>
  );
};

export default HomePage;