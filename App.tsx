
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Prize } from './types';
import { PRIZES, generateRandomCode, WHATSAPP_NUMBER } from './constants';
import EventBanner from './components/EventBanner';
import WinnerCard from './components/WinnerCard';
import ScratchCard from './components/ScratchCard';
import { MessageCircle } from 'lucide-react';

const STORAGE_KEY = 'gucci_lucky_draw_claim_v1';

const App: React.FC = () => {
  const [prize, setPrize] = useState<Prize | null>(null);
  const [code, setCode] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate static stars for background using useMemo to prevent re-renders
  const stars = useMemo(() => 
    Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2
    })), []
  );

  // Initialize Prize and Check Local Storage
  useEffect(() => {
    // 1. Check if user already played
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
      try {
        const { prizeId, code: storedCode } = JSON.parse(storedData);
        const foundPrize = PRIZES.find(p => p.id === prizeId);

        if (foundPrize && storedCode) {
          // Restore previous session
          setPrize(foundPrize);
          setCode(storedCode);
          setIsRevealed(true); // Auto reveal (skip scratch)
          return;
        }
      } catch (e) {
        console.error("Error parsing stored claim data", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // 2. If no valid history, generate new game
    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    setPrize(PRIZES[randomIndex]);
    setCode(generateRandomCode());
  }, []);

  // Handle Responsive Canvas Size
  useEffect(() => {
    const updateSize = () => {
        if (containerRef.current) {
            setContainerSize({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight
            });
        }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
    
    // Save result to LocalStorage to prevent re-rolling
    if (prize && code) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        prizeId: prize.id,
        code: code
      }));
    }
  };

  const getWhatsAppLink = () => {
    if (!prize || !code) return '#';
    const message = `Hallo saya sudah mendapatkan hadiah reward ${prize.isGrandPrize ? 'POTONGAN ' : 'VOUCHER '}${prize.amount} dengan kode ${code}. Mohon diproses.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-serif text-gucci-cream">
      
      {/* 1. Rainbow Gradient Background */}
      <div 
        className="absolute inset-0 animate-rainbow"
        style={{
            background: 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #ff2400)',
            backgroundSize: '400% 400%'
        }}
      />

      {/* 2. Darker Overlay to ensure text readability over bright rainbow */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 3. Light/Glow Overlay (Cahaya) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0%,_rgba(0,0,0,0)_70%)] mix-blend-soft-light animate-pulse" />

      {/* 4. Stars (Bintang-bintang Kecil) */}
      {stars.map((star) => (
        <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `twinkle ${star.duration}s ease-in-out infinite`,
                animationDelay: `${star.delay}s`
            }}
        />
      ))}
      
      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 w-full">
        
        <h1 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-center drop-shadow-xl mb-2">
          GUCCI
        </h1>
        <p className="text-gucci-gold text-lg font-bold tracking-widest drop-shadow-md mb-6 uppercase">
          Exclusive Lucky Draw
        </p>

        {/* Header Section */}
        <EventBanner />

        {/* MODERN ANIMATED SCRATCH CONTAINER */}
        <div className="relative w-full max-w-lg p-[10px] rounded-xl overflow-hidden group shadow-[0_0_40px_rgba(255,215,0,0.4)] transform hover:scale-[1.02] transition-transform duration-500">
             
             {/* Animated Border Gradient (Rotating/Pulsing) */}
             <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-spin-slow opacity-50 mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-yellow-200 to-yellow-600 animate-gradient-x"></div>
             
             {/* Inner Content Wrapper */}
             <div className="relative w-full h-64 md:h-72 bg-gray-900 rounded-lg overflow-hidden border-2 border-yellow-400/30">
                 <div ref={containerRef} className="w-full h-full relative">
                    {prize && (
                        <WinnerCard prize={prize} code={code} />
                    )}
                    
                    {containerSize.width > 0 && (
                        <ScratchCard 
                            width={containerSize.width} 
                            height={containerSize.height} 
                            isRevealed={isRevealed}
                            onReveal={handleReveal}
                        />
                    )}
                 </div>
             </div>
        </div>

        {/* Action Button Area */}
        <div className={`mt-8 transition-all duration-700 transform w-full flex justify-center z-20 ${isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'}`}>
            <div className="relative group">
                {/* 1. Ping Effect (Ripple) - Menarik perhatian */}
                <div className="absolute -inset-1 bg-green-500 rounded-full opacity-75 animate-ping group-hover:opacity-0 duration-1000"></div>

                {/* 2. Glow Effect - Bersinar di belakang */}
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-500 animate-pulse"></div>

                {/* 3. Main Button */}
                <a 
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center gap-3 bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white px-8 py-4 rounded-full border-2 border-yellow-200 shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                    {/* Shine Overlay Animation */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shine" />
                    
                    {/* Icon with bounce on hover */}
                    <MessageCircle className="w-7 h-7 md:w-8 md:h-8 fill-white text-white group-hover:animate-bounce" />
                    
                    <div className="flex flex-col items-start">
                        <span className="font-black tracking-widest text-sm md:text-lg leading-none drop-shadow-md uppercase">
                            KLAIM VIA WHATSAPP
                        </span>
                        <span className="text-[10px] md:text-xs font-bold text-yellow-100 opacity-90 mt-1">
                            Klik Disini Hubungi CS
                        </span>
                    </div>
                </a>
            </div>
        </div>

        {/* Welcome / Info Text */}
        <div className="mt-12 max-w-lg px-4 text-center space-y-2 z-10">
            <h3 className="text-gucci-gold font-bold text-lg md:text-xl tracking-wide drop-shadow-md">
                Selamat datang di Lucky Draw!
            </h3>
            <p className="text-gucci-cream/90 text-xs md:text-sm leading-relaxed drop-shadow text-shadow-sm font-medium">
                Rasakan pengalaman seru mencoba keberuntungan Anda.
                Ikuti event spesial bersama GUCCI dan temukan berbagai hadiah menarik yang menanti Anda.
            </p>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-8 pb-2 text-[10px] md:text-xs text-center text-gucci-cream/80 drop-shadow-sm">
            © 2016 - 2025 Guccio Gucci S.p.A. - All rights reserved
        </footer>

      </div>
    </div>
  );
};

export default App;
