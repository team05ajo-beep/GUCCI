
import React, { useState, useEffect, useRef } from 'react';
import { Prize } from './types';
import { PRIZES, generateRandomCode, WHATSAPP_NUMBER } from './constants';
import EventBanner from './components/EventBanner';
import WinnerCard from './components/WinnerCard';
import ScratchCard from './components/ScratchCard';
import VisionMission from './components/VisionMission';
import { MessageCircle, Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const STORAGE_KEY = 'gucci_lucky_draw_claim_v1';

const App: React.FC = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const [prize, setPrize] = useState<Prize | null>(null);
  const [code, setCode] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  // Navigation State: 'home' or 'vision'
  const [currentView, setCurrentView] = useState<'home' | 'vision'>('home');
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Prize and Check Local Storage
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
      try {
        const { prizeId, code: storedCode } = JSON.parse(storedData);
        const foundPrize = PRIZES.find(p => p.id === prizeId);

        if (foundPrize && storedCode) {
          setPrize(foundPrize);
          setCode(storedCode);
          setIsRevealed(true);
          return;
        }
      } catch (e) {
        console.error("Error parsing stored claim data", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }

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
  }, [currentView]); // Re-calculate when view changes

  const handleReveal = () => {
    setIsRevealed(true);
    if (prize && code) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        prizeId: prize.id,
        code: code
      }));
    }
  };

  const getWhatsAppLink = () => {
    if (!prize || !code) return '#';
    const rewardType = prize.isGrandPrize ? t('discountPrefix') : t('voucherPrefix');
    const message = `${t('claimMessage')} ${rewardType} ${prize.amount} ${t('codeLabel')} ${code}. ${t('processRequest')}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-serif text-gray-900 bg-[#eaeaea] selection:bg-gray-800 selection:text-white">
      
      {/* 1. BACKGROUND: Live Architectural Sketch */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-bottom opacity-100 animate-pan-slow"
        style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=2574&auto=format&fit=crop")',
            filter: 'grayscale(100%) contrast(150%) brightness(130%) sepia(10%)'
        }}
      />

      {/* 2. Atmospheric Layers (Parallax) */}
      <div className="fixed inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 mix-blend-multiply pointer-events-none" />
      <div className="fixed top-0 left-0 w-[200%] h-full z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/foggy-birds.png')] animate-drift pointer-events-none mix-blend-soft-light"></div>
      
      {/* 3. Header UI */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-start p-6 md:p-8 z-50">
          
          {/* Left: MENU / VISI & MISI */}
          <div className="flex items-center gap-6 cursor-pointer pointer-events-auto">
             <button 
                onClick={() => setCurrentView('vision')}
                className="flex items-center gap-2 group"
             >
                <span className={`text-[10px] md:text-xs font-sans tracking-[0.2em] font-bold text-gray-800 group-hover:underline underline-offset-4 uppercase ${currentView === 'vision' ? 'underline' : ''}`}>
                    {t('menu')}
                </span>
             </button>
          </div>

          {/* Right: Language Selector */}
          <div className="relative">
             <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors"
             >
                <Globe className="w-5 h-5 stroke-[1.5]" />
                <span className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-wider">
                    {language}
                </span>
             </button>

             {/* Language Dropdown */}
             {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur shadow-xl border border-gray-200 py-2 max-h-80 overflow-y-auto">
                    {availableLanguages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang.code);
                                setIsLangOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-sans hover:bg-gray-100 ${language === lang.code ? 'font-bold bg-gray-50' : ''}`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
             )}
          </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 w-full pb-12">
        
        {/* LOGO (Always Visible) */}
        <div className="mb-8 text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black tracking-[0.15em] text-gray-900 drop-shadow-sm mix-blend-multiply opacity-90">
            GUCCI
            </h1>
            <div className="h-[1px] w-24 bg-gray-900 mx-auto my-4"></div>
            <p className="text-gray-600 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
                {t('florenceSubtitle')}
            </p>
        </div>

        {/* CONDITIONALLY RENDER CONTENT */}
        {currentView === 'home' ? (
            <>
                {/* Event Banner */}
                <EventBanner />

                {/* GAME CONTAINER */}
                <div className="relative w-full max-w-md p-2 bg-white/90 backdrop-blur-sm shadow-2xl rounded-sm transform hover:scale-[1.01] transition-transform duration-500 ring-1 ring-gray-300">
                     
                     {/* Frame Border */}
                     <div className="absolute inset-0 border-[3px] border-double border-gray-400 pointer-events-none m-1"></div>

                     {/* Inner Content Wrapper */}
                     <div className="relative w-full h-64 bg-[#f4f4f4] overflow-hidden border border-gray-300">
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
                <div className={`mt-8 transition-all duration-700 transform w-full flex justify-center z-20 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                    <a 
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-none border border-gray-900 hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-xl"
                    >
                        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <div className="flex flex-col items-start">
                            <span className="font-serif italic text-lg leading-none">
                                {t('claimReward')}
                            </span>
                            <span className="text-[9px] font-sans tracking-widest uppercase mt-1 opacity-80">
                                {t('viaWhatsapp')}
                            </span>
                        </div>
                    </a>
                </div>

                {/* Welcome Text */}
                <div className="mt-8 max-w-sm px-6 text-center space-y-3 z-10 bg-[#F9F6EF]/95 p-8 border border-gray-300 shadow-xl rounded-sm ring-1 ring-white/50">
                    <h3 className="text-gray-900 font-serif font-black text-lg tracking-wide border-b border-gray-300 pb-2 mb-2 inline-block">
                        {t('welcomeTitle')}
                    </h3>
                    <p className="text-gray-700 text-[11px] leading-relaxed font-sans tracking-wide font-medium">
                        {t('welcomeText')}
                    </p>
                </div>
            </>
        ) : (
            /* VISION & MISSION PAGE */
            <VisionMission onBack={() => setCurrentView('home')} />
        )}

      </div>

    </div>
  );
};

export default App;
