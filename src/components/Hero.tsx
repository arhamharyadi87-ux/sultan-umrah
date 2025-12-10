import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full bg-neo-white flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-10 left-[-50px] w-40 h-40 bg-neo-yellow border-4 border-black rounded-full mix-blend-multiply opacity-80 animate-pulse"></div>
      <div className="absolute bottom-10 right-[-20px] w-60 h-60 bg-neo-blue border-4 border-black rotate-12 mix-blend-multiply opacity-80"></div>

      <div className="relative z-10 max-w-5xl text-center">
        <div className="inline-block bg-neo-pink border-4 border-black px-4 py-2 mb-6 shadow-neo transform -rotate-2">
            <span className="font-bold text-lg md:text-xl uppercase tracking-widest text-black">#1 Luxury Umrah Agency</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-8 tracking-tighter">
          IBADAH <br/>
          <span className="text-stroke-3 text-transparent bg-clip-text bg-gradient-to-r from-neo-green to-neo-blue" style={{ WebkitTextStroke: '3px black' }}>FASILITAS</span> <br/>
          SULTAN
        </h1>

        <p className="text-xl md:text-2xl font-bold mb-10 max-w-2xl mx-auto bg-white border-2 border-black p-4 shadow-neo-lg rotate-1">
            Lupakan hotel jauh. Lupakan bis sempit. <br/>
            Fokus ibadah, sisanya kami yang urus dengan standar <span className="bg-neo-yellow px-1">VIP Bintang 5.</span>
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="#packages" className="bg-black text-white text-xl font-bold px-8 py-4 border-4 border-black shadow-neo-lg hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
                LIHAT PAKET VIP
            </a>
            <a href="#consultant" className="bg-neo-green text-black text-xl font-bold px-8 py-4 border-4 border-black shadow-neo-lg hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.159 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                TANYA AI
            </a>
        </div>
      </div>

        {/* Marquee Section */}
        <div className="w-full bg-neo-yellow border-y-4 border-black mt-20 py-4 rotate-1 scale-105">
            <div className="marquee-container">
                <div className="marquee-content font-black text-3xl md:text-4xl uppercase">
                    • HOTEL DEPAN KA'BAH • MASKAPAI TANPA TRANSIT • MAKANAN FULLBOARD INTERNATIONAL • PEMBIMBING BERSERTIFIKAT • LOUNGE EKSKLUSIF • FAST TRACK IMIGRASI • HOTEL DEPAN KA'BAH • MASKAPAI TANPA TRANSIT • MAKANAN FULLBOARD INTERNATIONAL • PEMBIMBING BERSERTIFIKAT • LOUNGE EKSKLUSIF • FAST TRACK IMIGRASI
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;