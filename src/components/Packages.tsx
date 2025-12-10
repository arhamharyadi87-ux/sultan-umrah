import React from 'react';
import { Package } from '../types';

const packages: Package[] = [
  {
    id: 1,
    title: "UMRAH EXECUTIVE",
    price: "Rp 45.000.000",
    duration: "9 Hari",
    hotel: "Zamzam Tower / Setaraf (5★)",
    features: ["Saudia Airlines Direct", "Quad Room", "Visa Umrah", "Handling Airport", "Perlengkapan Premium"],
    color: "bg-white"
  },
  {
    id: 2,
    title: "UMRAH ROYAL VIP",
    price: "Rp 65.000.000",
    duration: "12 Hari",
    hotel: "Raffles Makkah / Setaraf (5★+)",
    features: ["Garuda Business Class", "Double Room", "Visa & Tasreh Raudhah", "Private Transport Alphard", "Kereta Cepat Haramain"],
    color: "bg-neo-yellow"
  },
  {
    id: 3,
    title: "HAJI FURODA SULTAN",
    price: "$ 25,000 USD",
    duration: "25 Hari",
    hotel: "Fairmont Clock Tower (5★)",
    features: ["Visa Furoda Resmi", "Tenda VIP Arafah-Mina", "Dokter Pribadi 24 Jam", "Makan Prasmanan VIP", "Langsung Berangkat 2025"],
    color: "bg-neo-blue"
  }
];

const Packages: React.FC = () => {
  return (
    <section id="packages" className="py-20 px-6 bg-neo-black text-white border-b-4 border-black relative">
       {/* Decorative */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-neo-pink border-l-4 border-b-4 border-white rounded-bl-full"></div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-16 text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-yellow to-neo-green" style={{ WebkitTextStroke: '2px white' }}>PILIHAN PAKET</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`text-black border-4 border-white shadow-[10px_10px_0px_0px_#FF66C4] p-8 flex flex-col ${pkg.color} hover:scale-105 transition-transform duration-300`}>
              <div className="flex justify-between items-start mb-6 border-b-4 border-black pb-4">
                <h3 className="text-3xl font-black uppercase leading-none">{pkg.title}</h3>
                <span className="bg-black text-white px-2 py-1 font-bold text-sm transform rotate-3">{pkg.duration}</span>
              </div>
              
              <div className="mb-6">
                <p className="text-sm font-bold uppercase text-gray-600 mb-1">Mulai dari</p>
                <p className="text-4xl font-black">{pkg.price}</p>
              </div>

              <div className="mb-8 flex-grow">
                <div className="bg-white border-2 border-black p-3 mb-4 font-bold flex items-center gap-2">
                    <span className="text-xl">🏢</span> {pkg.hotel}
                </div>
                <ul className="space-y-3 font-bold">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-black"></div>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-black text-white py-4 font-bold text-xl border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors shadow-neo">
                BOOK SEKARANG
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;