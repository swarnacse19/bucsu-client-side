import React from 'react';
import Marquee from "react-fast-marquee";
import { FaBullhorn } from 'react-icons/fa';
import About from './About';
import WhyVote from './WhyVote';
import Stories from './Stories';
import Contact from './Contact';
import Hero from './Hero';

const Home = () => {
  return (
    <div className="min-h-screen" id="home">
      {/* Notice Marquee */}
      <div className="bg-green-600 text-white py-3 flex items-center">
        <div className="bg-green-800 px-4 py-1 flex items-center gap-2 font-bold uppercase text-xs ml-4 rounded shadow-lg z-10">
          <FaBullhorn className="animate-bounce" /> Notice
        </div>
        <Marquee gradient={false} speed={50} className="text-sm font-medium">
          Upcoming Student Council Election starts from Feb 15! | Verify your identity to be eligible for voting. | System update scheduled for midnight tonight.
        </Marquee>
      </div>

      <Hero></Hero>

      {/* Sections */}
      <About />
      <WhyVote />
      <Stories />
      <Contact />
    </div>
  );
};

export default Home;