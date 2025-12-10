import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 px-6 border-t-4 border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-neo-black text-white border-2 border-black rounded-full flex items-center justify-center font-bold text-xl">
                S
            </div>
            <span className="text-3xl font-black tracking-tighter">SULTAN<span className="text-neo-pink">UMRAH</span></span>
          </div>
          <p className="font-bold text-lg mb-6">
            Penyelenggara Perjalanan Ibadah Umrah (PPIU) Resmi Kemenag RI.
            <br/>Izin No. 123 Tahun 2024.
          </p>
          <div className="flex gap-4">
            {['INSTAGRAM', 'TIKTOK', 'YOUTUBE'].map((social) => (
                <a key={social} href="#" className="bg-neo-yellow border-2 border-black px-4 py-2 font-bold text-xs hover:bg-black hover:text-white transition-colors shadow-neo-sm">
                    {social}
                </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 font-bold">
            <div>
                <h4 className="bg-black text-white px-2 py-1 inline-block mb-4 uppercase">Kantor</h4>
                <p>Menara Sultan Lt. 88</p>
                <p>Jl. Jend. Sudirman Kav 1</p>
                <p>Jakarta Selatan</p>
            </div>
            <div>
                <h4 className="bg-black text-white px-2 py-1 inline-block mb-4 uppercase">Kontak</h4>
                <p>+62 812 3456 7890</p>
                <p>salam@sultanumrah.com</p>
            </div>
        </div>
      </div>
      <div className="text-center font-bold mt-12 pt-8 border-t-2 border-gray-200">
        &copy; {new Date().getFullYear()} SultanUmrah. Crafted with Neobrutalism.
      </div>
    </footer>
  );
};

export default Footer;