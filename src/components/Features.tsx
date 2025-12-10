import React from 'react';

const features = [
  {
    title: "HOTEL 0 METER",
    desc: "Keluar lobi langsung pelataran masjid. Tidak perlu bis, tidak perlu jalan jauh. Hemat tenaga untuk ibadah maksimal.",
    icon: "🏢",
    color: "bg-neo-blue"
  },
  {
    title: "FLIGHT BUSINESS",
    desc: "Terbang nyaman dengan Saudi Airlines atau Garuda Indonesia. Flat bed seat, lounge access, priority baggage.",
    icon: "✈️",
    color: "bg-neo-pink"
  },
  {
    title: "PRIVATE MUTAWWIF",
    desc: "Satu grup kecil satu pembimbing. Fokus membimbing ibadah Anda secara personal, bukan rombongan massal.",
    icon: "👳",
    color: "bg-neo-green"
  },
  {
    title: "MAKANAN RAKYAT",
    desc: "Full board menu internasional & nusantara di restoran hotel bintang 5. Bukan catering box.",
    icon: "🍽️",
    color: "bg-neo-yellow"
  }
];

const Features: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">Kenapa <br/><span className="bg-black text-white px-2">Harus Kami?</span></h2>
            <p className="text-xl font-medium max-w-2xl border-l-4 border-neo-pink pl-4">Kami tidak menjual janji manis. Kami memberikan kepastian fasilitas terbaik untuk kenyamanan tamu Allah.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`relative p-6 border-4 border-black shadow-neo-lg hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-200 ${feature.color}`}>
              <div className="text-6xl mb-4 grayscale drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">{feature.icon}</div>
              <h3 className="text-2xl font-black mb-3 uppercase bg-white border-2 border-black inline-block px-2">{feature.title}</h3>
              <p className="font-bold text-sm md:text-base leading-relaxed bg-white/50 p-2 border-2 border-black">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;