import React, { useState, useEffect, useRef } from 'react';
import { Prize } from './types';
import { PRIZES, generateRandomCode, WHATSAPP_NUMBER } from './constants';
import EventBanner from './components/EventBanner';
import WinnerCard from './components/WinnerCard';
import ScratchCard from './components/ScratchCard';
import { MessageCircle } from 'lucide-react';

const STORAGE_KEY = 'gucci_lucky_draw_v1';

const App: React.FC = () => {
  const [prize, setPrize] = useState<Prize | null>(null);
  const [code, setCode] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate static stars for background
  const stars = useRef(
    Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2
    }))
  ).current;

  // Initialize Prize on Mount with LocalStorage Check
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const existingPrize = PRIZES.find(p => p.id === parsedData.prizeId);
        
        if (existingPrize && parsedData.code) {
          setPrize(existingPrize);
          setCode(parsedData.code);
          setIsRevealed(true); // User has already played
          return;
        }
      } catch (error) {
        console.error("Error parsing stored lucky draw data:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // New User: Generate random prize
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
    // Save to local storage to prevent re-claiming/re-rolling
    if (prize && code) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        prizeId: prize.id,
        code: code,
        timestamp: new Date().toISOString()
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
        <div className={`mt-8 transition-all duration-700 transform w-full flex justify-center ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
            <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-gucci-green text-gucci-cream px-6 py-4 rounded-lg border-2 border-gucci-gold shadow-[0_6px_15px_rgba(0,0,0,0.4)] hover:bg-[#2b5032] hover:-translate-y-1 transition-all duration-300"
            >
                <MessageCircle className="w-6 h-6 text-gucci-gold group-hover:scale-110 transition-transform" />
                <span className="font-bold tracking-wide md:text-lg">
                    HUBUNGI CS (KLAIM REWARD)
                </span>
            </a>
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