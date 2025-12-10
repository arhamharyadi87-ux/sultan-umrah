import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-neo-pink border-2 border-black rounded-full flex items-center justify-center font-bold text-xl shadow-neo">
                S
            </div>
            <span className="text-2xl font-bold tracking-tighter">SULTAN<span className="text-neo-blue">UMRAH</span></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-bold items-center text-sm lg:text-base">
          <a href="#about" className="hover:underline decoration-4 decoration-neo-yellow underline-offset-4">KENAPA KAMI?</a>
          <a href="#packages" className="hover:underline decoration-4 decoration-neo-green underline-offset-4">PAKET SULTAN</a>
          <a href="#custom-package" className="hover:underline decoration-4 decoration-neo-blue underline-offset-4">CUSTOM PAKET</a>
          <a href="#consultant" className="hover:underline decoration-4 decoration-neo-pink underline-offset-4">AI KONSULTAN</a>
          <button className="bg-neo-black text-white px-6 py-2 border-2 border-black font-bold shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            BOOK NOW
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 border-2 border-black shadow-neo active:shadow-none active:translate-x-1 active:translate-y-1 transition-all bg-neo-yellow"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 border-t-4 border-black pt-4 flex flex-col gap-4 font-bold text-lg">
          <a href="#about" onClick={() => setIsOpen(false)} className="block px-2 hover:bg-neo-yellow border-2 border-transparent hover:border-black">KENAPA KAMI?</a>
          <a href="#packages" onClick={() => setIsOpen(false)} className="block px-2 hover:bg-neo-green border-2 border-transparent hover:border-black">PAKET SULTAN</a>
          <a href="#custom-package" onClick={() => setIsOpen(false)} className="block px-2 hover:bg-neo-blue border-2 border-transparent hover:border-black">CUSTOM PAKET</a>
          <a href="#consultant" onClick={() => setIsOpen(false)} className="block px-2 hover:bg-neo-pink border-2 border-transparent hover:border-black">AI KONSULTAN</a>
          <button className="w-full bg-black text-white py-3 border-2 border-black shadow-neo">
            HUBUNGI WHATSAPP
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;