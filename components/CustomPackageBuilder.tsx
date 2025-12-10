import React, { useState, useEffect, useRef } from 'react';

interface Facility {
  id: string;
  name: string;
  price: number;
  category: string;
  icon: string;
  color: string;
}

const INITIAL_FACILITIES: Facility[] = [
  { id: 'f1', name: 'Hotel Bintang 5 (Depan Haram)', price: 15000000, category: 'Hotel', icon: '🏢', color: 'bg-neo-blue' },
  { id: 'f2', name: 'Business Class Flight', price: 25000000, category: 'Flight', icon: '✈️', color: 'bg-neo-pink' },
  { id: 'f3', name: 'Private Mutawwif', price: 5000000, category: 'Service', icon: '👳', color: 'bg-neo-green' },
  { id: 'f4', name: 'Kereta Cepat Haramain', price: 1500000, category: 'Transport', icon: '🚄', color: 'bg-neo-yellow' },
  { id: 'f5', name: 'Tour Turki 3 Hari', price: 7500000, category: 'Add-on', icon: '🕌', color: 'bg-orange-400' },
  { id: 'f6', name: 'Makan Fullboard Premium', price: 3500000, category: 'Food', icon: '🍽️', color: 'bg-purple-400' },
  { id: 'f7', name: 'Dokter Pribadi 24 Jam', price: 12000000, category: 'Health', icon: '🩺', color: 'bg-red-400' },
  { id: 'f8', name: 'Fotografer Eksklusif', price: 2500000, category: 'Service', icon: '📸', color: 'bg-teal-400' },
  { id: 'f9', name: 'Handling Airport VIP', price: 1000000, category: 'Service', icon: '🧳', color: 'bg-indigo-400' },
  { id: 'f10', name: 'Kursi Roda Elektrik', price: 2000000, category: 'Add-on', icon: '♿', color: 'bg-lime-400' },
];

const CustomPackageBuilder: React.FC = () => {
  const [availableItems, setAvailableItems] = useState<Facility[]>(INITIAL_FACILITIES);
  const [selectedItems, setSelectedItems] = useState<Facility[]>([]);
  const [rejectedItems, setRejectedItems] = useState<Facility[]>([]); // Items skipped in mobile
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [mobileViewMode, setMobileViewMode] = useState<'deck' | 'cart'>('deck');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);

  // --- Desktop Drag & Drop Logic ---

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const id = e.dataTransfer.getData('text/plain');
    moveItemToSelected(id);
  };

  const moveItemToSelected = (id: string) => {
    const itemFromAvailable = availableItems.find(i => i.id === id);
    const itemFromRejected = rejectedItems.find(i => i.id === id);
    
    const item = itemFromAvailable || itemFromRejected;

    if (item) {
      if (itemFromAvailable) setAvailableItems(prev => prev.filter(i => i.id !== id));
      if (itemFromRejected) setRejectedItems(prev => prev.filter(i => i.id !== id));
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const moveItemToAvailable = (id: string) => {
    const item = selectedItems.find(i => i.id === id);
    if (item) {
      setSelectedItems(prev => prev.filter(i => i.id !== id));
      setAvailableItems(prev => [...prev, item]); // Always return to available
    }
  };

  // --- Mobile Swipe Logic ---

  const handleSwipeRight = () => {
    if (availableItems.length === 0) return;
    const item = availableItems[0];
    moveItemToSelected(item.id);
  };

  const handleSwipeLeft = () => {
    if (availableItems.length === 0) return;
    const item = availableItems[0];
    setAvailableItems(prev => prev.slice(1));
    setRejectedItems(prev => [...prev, item]);
  };

  const resetMobileStack = () => {
    setAvailableItems(prev => [...prev, ...rejectedItems]);
    setRejectedItems([]);
    setMobileViewMode('deck');
  };

  const desktopLeftList = [...availableItems, ...rejectedItems].sort((a, b) => a.price - b.price);

  return (
    <section id="custom-package" className="py-20 px-4 md:px-6 bg-white border-b-4 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-7xl font-black uppercase mb-4">
            RACIK PAKET <span className="text-neo-pink underline decoration-4 underline-offset-8">SULTAN</span>
          </h2>
          <p className="hidden md:block text-xl font-bold max-w-2xl mx-auto bg-neo-yellow border-2 border-black p-2 shadow-neo transform -rotate-1">
            Drag & Drop fasilitas impian Anda ke kotak kanan!
          </p>
          <p className="md:hidden text-lg font-bold max-w-xs mx-auto bg-neo-yellow border-2 border-black p-2 shadow-neo transform -rotate-1">
            Geser KANAN untuk Ambil, KIRI untuk Skip!
          </p>
        </div>

        {/* --- DESKTOP VIEW (Drag & Drop) --- */}
        <div className="hidden md:flex flex-col lg:flex-row gap-8 min-h-[600px]">
          {/* Left Column */}
          <div className="flex-1 bg-gray-100 border-4 border-black p-6 shadow-neo-lg">
            <h3 className="text-2xl font-black mb-6 uppercase border-b-4 border-black pb-2 flex items-center gap-2">
              <span>🏗️</span> Menu Fasilitas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {desktopLeftList.length === 0 && (
                <div className="col-span-2 text-center py-10 font-bold text-gray-500 italic">
                  Semua fasilitas telah dipilih!
                </div>
              )}
              {desktopLeftList.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onClick={() => moveItemToSelected(item.id)}
                  className={`${item.color} border-2 border-black p-4 cursor-move shadow-sm hover:shadow-neo hover:-translate-y-1 transition-all active:cursor-grabbing`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="bg-black text-white text-xs px-2 py-1 font-bold rounded-full">{item.category}</span>
                  </div>
                  <h4 className="font-bold text-lg leading-tight mb-2">{item.name}</h4>
                  <p className="font-mono text-sm bg-white/50 inline-block px-1 border border-black">
                    +{formatPrice(item.price)}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm font-bold text-gray-500 text-center uppercase tracking-widest">
              * Klik atau Drag item ke area kanan
            </p>
          </div>

          {/* Right Column: Drop Zone */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex-1 border-4 border-black p-6 transition-all duration-300 flex flex-col ${
              isDraggingOver ? 'bg-neo-blue/20 border-dashed scale-[1.01]' : 'bg-white'
            } shadow-neo-xl relative`}
          >
             <div className="absolute -top-6 right-4 bg-neo-green border-2 border-black px-4 py-1 font-black transform rotate-2 shadow-neo">
                YOUR CUSTOM PACKAGE
             </div>

            <h3 className="text-2xl font-black mb-6 uppercase border-b-4 border-black pb-2 flex items-center gap-2">
              <span>🎒</span> Keranjang Sultan
            </h3>

            <div className="flex-grow space-y-3 mb-8">
              {selectedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center border-4 border-dashed border-gray-300 p-8 text-gray-400">
                  <span className="text-6xl mb-4 grayscale opacity-50">📥</span>
                  <p className="font-bold text-xl text-center">Jatuhkan fasilitas pilihan Anda di sini</p>
                </div>
              ) : (
                selectedItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex justify-between items-center bg-white border-2 border-black p-3 shadow-neo group hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className="font-bold text-sm md:text-base">{item.name}</h4>
                        <span className="text-xs font-mono text-gray-600">{formatPrice(item.price)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => moveItemToAvailable(item.id)}
                      className="bg-red-500 text-white w-8 h-8 flex items-center justify-center border-2 border-black font-bold hover:bg-red-600 active:translate-y-1"
                    >
                      X
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto border-t-4 border-black pt-6">
              <div className="flex justify-between items-end mb-6">
                <span className="font-bold text-xl uppercase">Estimasi Total:</span>
                <span className="font-black text-3xl md:text-4xl text-neo-blue bg-black px-2 py-1">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              
              <button 
                disabled={selectedItems.length === 0}
                className="w-full bg-neo-yellow text-black font-black text-xl py-4 border-4 border-black shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => alert(`Paket custom Anda senilai ${formatPrice(totalPrice)} telah kami catat! Konsultan kami akan menghubungi Anda.`)}
              >
                AJUKAN PENAWARAN INI
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW (Tinder Swipe) --- */}
        <div className="md:hidden">
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setMobileViewMode('deck')}
              className={`flex-1 py-3 border-2 border-black font-black uppercase text-sm ${
                mobileViewMode === 'deck' ? 'bg-neo-pink shadow-neo' : 'bg-white opacity-50'
              }`}
            >
              Pilih Fasilitas
            </button>
            <button 
              onClick={() => setMobileViewMode('cart')}
              className={`flex-1 py-3 border-2 border-black font-black uppercase text-sm ${
                mobileViewMode === 'cart' ? 'bg-neo-blue shadow-neo' : 'bg-white opacity-50'
              }`}
            >
              Keranjang ({selectedItems.length})
            </button>
          </div>

          {/* Swipe Deck Area */}
          {mobileViewMode === 'deck' && (
            <div className="flex flex-col gap-4">
              {/* Total Indicator in Deck Mode */}
              <div className="bg-black text-white p-3 border-2 border-black flex justify-between items-center shadow-neo">
                 <span className="font-bold text-sm">ESTIMASI TOTAL:</span>
                 <span className="font-black text-lg text-neo-green">{formatPrice(totalPrice)}</span>
              </div>

              <div className="relative h-[550px] w-full flex items-center justify-center bg-gray-100 border-4 border-black pattern-grid overflow-hidden">
                   <style>{`
                      .pattern-grid {
                          background-image: radial-gradient(black 1px, transparent 1px);
                          background-size: 20px 20px;
                      }
                  `}</style>

                {availableItems.length > 0 ? (
                  <>
                    {/* Background Card (The Next Card) */}
                    {availableItems.length > 1 && (
                      <div className="absolute scale-95 opacity-80 translate-y-4 z-0 pointer-events-none">
                         <CardUI item={availableItems[1]} />
                      </div>
                    )}
                    
                    {/* Active Foreground Card */}
                    <SwipeCard 
                      key={availableItems[0].id} // Key change ensures animation reset
                      item={availableItems[0]} 
                      onSwipeRight={handleSwipeRight}
                      onSwipeLeft={handleSwipeLeft}
                    />
                  </>
                ) : (
                  <div className="text-center p-6 bg-white border-2 border-black shadow-neo max-w-[80%] z-10">
                    <span className="text-6xl mb-4 block">🏁</span>
                    <h3 className="text-xl font-black mb-2">Semua Fasilitas Dilihat!</h3>
                    <p className="font-medium mb-6">Cek keranjang Anda untuk menyelesaikan pesanan.</p>
                    <div className="flex flex-col gap-3">
                      <button 
                          onClick={() => setMobileViewMode('cart')}
                          className="bg-neo-blue border-2 border-black py-3 px-6 font-bold shadow-neo active:translate-y-1 active:shadow-none"
                      >
                          LIHAT KERANJANG
                      </button>
                      {rejectedItems.length > 0 && (
                          <button 
                              onClick={resetMobileStack}
                              className="bg-gray-200 border-2 border-black py-2 px-6 font-bold text-sm active:translate-y-1"
                          >
                              ULANGI YANG DI-SKIP
                          </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Cart Area */}
          {mobileViewMode === 'cart' && (
            <div className="bg-white border-4 border-black p-4 min-h-[500px] flex flex-col">
                 <h3 className="text-xl font-black mb-6 uppercase border-b-4 border-black pb-2 flex items-center gap-2">
                    <span>🎒</span> Keranjang Anda
                </h3>
                
                <div className="flex-grow space-y-3">
                    {selectedItems.length === 0 ? (
                        <div className="text-center text-gray-400 py-10">
                            <p className="font-bold">Belum ada item dipilih.</p>
                            <button onClick={() => setMobileViewMode('deck')} className="mt-4 text-black underline font-bold">Mulai Memilih</button>
                        </div>
                    ) : (
                        selectedItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center bg-gray-50 border-2 border-black p-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{item.icon}</span>
                                    <div>
                                        <h4 className="font-bold text-sm">{item.name}</h4>
                                        <span className="text-xs font-mono">{formatPrice(item.price)}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => moveItemToAvailable(item.id)}
                                    className="bg-red-500 text-white w-8 h-8 flex items-center justify-center border-2 border-black font-bold"
                                >
                                    X
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-8 pt-4 border-t-4 border-black bg-gray-50 -mx-4 -mb-4 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold">TOTAL:</span>
                        <span className="font-black text-2xl bg-black text-neo-green px-2">{formatPrice(totalPrice)}</span>
                    </div>
                    <button 
                        className="w-full bg-neo-yellow text-black font-black py-4 border-2 border-black shadow-neo active:shadow-none active:translate-y-1 transition-all disabled:opacity-50"
                        disabled={selectedItems.length === 0}
                        onClick={() => alert(`Paket custom Anda senilai ${formatPrice(totalPrice)} telah kami catat!`)}
                    >
                        AJUKAN SEKARANG
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// --- Mobile Swipe Card Components ---

// Pure UI Component for the card visuals
const CardUI: React.FC<{ item: Facility }> = ({ item }) => {
  return (
    <div className={`w-[320px] h-[450px] ${item.color} border-4 border-black p-6 flex flex-col justify-between shadow-neo-xl relative overflow-hidden`}>
      {/* Top Tag */}
      <div className="absolute top-4 right-0 bg-black text-white px-4 py-1 font-black uppercase text-sm z-10">
        {item.category}
      </div>

      <div className="mt-4">
          <div className="flex items-start mb-6">
              <span className="text-7xl drop-shadow-md p-2 bg-white/20 rounded-full border-2 border-black/10">{item.icon}</span>
          </div>
          <h3 className="text-4xl font-black leading-tight mb-3 tracking-tight">{item.name}</h3>
          <p className="font-bold text-2xl opacity-90">+ {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.price)}</p>
      </div>

      <div className="bg-white/80 border-2 border-black p-3 text-sm font-bold shadow-sm">
          <p>Geser KANAN untuk mengambil fasilitas ini ke dalam paket Anda.</p>
      </div>
    </div>
  );
};

const SwipeCard: React.FC<{ 
  item: Facility; 
  onSwipeRight: () => void; 
  onSwipeLeft: () => void;
}> = ({ item, onSwipeRight, onSwipeLeft }) => {
  const [dragX, setDragX] = useState(0);
  const [isExiting, setIsExiting] = useState<'left' | 'right' | null>(null);
  
  const startXRef = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 100;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isExiting) return;
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isExiting || startXRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    setDragX(diff);
  };

  const handleTouchEnd = () => {
    if (isExiting || startXRef.current === null) return;
    
    if (Math.abs(dragX) > SWIPE_THRESHOLD) {
      triggerExit(dragX > 0 ? 'right' : 'left');
    } else {
      setDragX(0); // Snap back
    }
    startXRef.current = null;
  };

  const triggerExit = (direction: 'left' | 'right') => {
    setIsExiting(direction);
    // Move significantly off screen
    setDragX(direction === 'right' ? 1000 : -1000); 
    
    // Wait for animation to finish before calling parent handler
    setTimeout(() => {
      if (direction === 'right') onSwipeRight();
      else onSwipeLeft();
    }, 300);
  };

  // Calculate rotation and opacity based on drag or exit state
  const rotation = isExiting 
    ? (isExiting === 'right' ? 20 : -20) 
    : (dragX * 0.05);
    
  const opacityRight = isExiting === 'right' ? 1 : Math.min(Math.max(dragX / (SWIPE_THRESHOLD * 0.8), 0), 1);
  const opacityLeft = isExiting === 'left' ? 1 : Math.min(Math.max(-dragX / (SWIPE_THRESHOLD * 0.8), 0), 1);

  return (
    <div className="relative z-10">
      <div 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`cursor-grab active:cursor-grabbing ${isExiting ? 'transition-all duration-300 ease-in' : 'transition-transform duration-75 ease-out'}`}
        style={{ 
          transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
        }}
      >
        <CardUI item={item} />

        {/* Overlay Labels */}
        <div 
            className="absolute top-8 left-8 border-8 border-green-500 text-green-500 font-black text-4xl uppercase px-4 py-2 transform -rotate-12 rounded opacity-0 transition-opacity z-20 bg-white/30 backdrop-blur-sm"
            style={{ opacity: opacityRight }}
        >
            MAU
        </div>
        <div 
            className="absolute top-8 right-8 border-8 border-red-500 text-red-500 font-black text-4xl uppercase px-4 py-2 transform rotate-12 rounded opacity-0 transition-opacity z-20 bg-white/30 backdrop-blur-sm"
            style={{ opacity: opacityLeft }}
        >
            SKIP
        </div>
      </div>

      {/* Controls Below */}
      <div className={`absolute -bottom-24 left-0 right-0 flex justify-center gap-8 ${isExiting ? 'pointer-events-none' : ''}`}>
        <button 
            onClick={() => triggerExit('left')}
            className="w-20 h-20 bg-white border-4 border-gray-300 text-red-500 rounded-full flex items-center justify-center text-4xl shadow-sm hover:scale-110 active:scale-95 transition-all"
            aria-label="Skip"
        >
            ❌
        </button>
        <button 
            onClick={() => triggerExit('right')}
            className="w-20 h-20 bg-white border-4 border-neo-green text-green-500 rounded-full flex items-center justify-center text-4xl shadow-neo hover:scale-110 active:scale-95 active:shadow-none active:translate-y-1 transition-all"
            aria-label="Ambil"
        >
            💚
        </button>
      </div>
    </div>
  );
};

export default CustomPackageBuilder;