import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Packages from './components/Packages';
import CustomPackageBuilder from './components/CustomPackageBuilder';
import AIConsultant from './components/AIConsultant';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans selection:bg-neo-pink selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Packages />
        <CustomPackageBuilder />
        <AIConsultant />
      </main>
      <Footer />
    </div>
  );
};

export default App;