import React from 'react';
import HeroSection from '../components/HeroSection';
import BestsellerSection from '../components/bestSeller';
import NewArrivalsSection from '../components/newArrivals';
 

const HomePage = () => {
  return (
    <div className="bg-[#f3eee8] min-h-screen overflow-hidden">
      <HeroSection />
      <BestsellerSection/>
      <NewArrivalsSection/>
    </div>
  );
};

export default HomePage;