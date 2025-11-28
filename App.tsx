import React, { useState, useEffect, useRef } from 'react';
import { Prize } from './types';
import { PRIZES, generateRandomCode, WHATSAPP_NUMBER } from './constants';
import EventBanner from './components/EventBanner';
import WinnerCard from './components/WinnerCard';
import ScratchCard from './components/ScratchCard';
import VisionMission from './components/VisionMission';
import { MessageCircle, Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const STORAGE_KEY = 'sisley_lucky_draw_claim_v1';

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
    <div className="min-h-screen w-full relative overflow-hidden font-sans text-white bg-sisley-burgundy selection:bg-white selection:text-sisley-red">
      
      {/* 1. BACKGROUND: Red Luxury Aesthetic */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center opacity-100 animate-pan-slow"
        style={{
            // Red Luxury Background
            backgroundImage: 'url("https://images.unsplash.com/photo-1606821360662-349f2b84f331?q=80&w=2070&auto=format&fit=crop")',
        }}
      />

      {/* 2. Atmospheric Layers (Red Overlay) */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-sisley-burgundy/60 via-sisley-red/20 to-sisley-burgundy/90 pointer-events-none" />
      <div className="fixed top-0 left-0 w-[200%] h-full z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] animate-drift pointer-events-none mix-blend-soft-light"></div>
      
      {/* 3. Header UI */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-start p-6 md:p-8 z-50">
          
          {/* Left: MENU / VISI & MISI */}
          <div className="flex items-center gap-6 cursor-pointer pointer-events-auto">
             <button 
                onClick={() => setCurrentView('vision')}
                className="flex items-center gap-2 group"
             >
                <span className={`text-[10px] md:text-xs font-sans tracking-[0.2em] font-bold text-white group-hover:text-sisley-gold transition-colors uppercase ${currentView === 'vision' ? 'text-sisley-gold' : ''}`}>
                    {t('menu')}
                </span>
             </button>
          </div>

          {/* Right: Language Selector */}
          <div className="relative">
             <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-white hover:text-sisley-gold transition-colors"
             >
                <Globe className="w-5 h-5 stroke-[1.5]" />
                <span className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-wider">
                    {language}
                </span>
             </button>

             {/* Language Dropdown */}
             {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white text-black shadow-xl border border-gray-100 py-2 max-h-80 overflow-y-auto z-50">
                    {availableLanguages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang.code);
                                setIsLangOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-sans hover:bg-gray-100 ${language === lang.code ? 'font-bold bg-gray-50 text-sisley-red' : 'text-gray-800'}`}
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
        
        {/* LOGO (Always Visible) - SISLEY PARIS */}
        <div className="mb-8 text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-[0.05em] text-white drop-shadow-lg font-sans">
                sisley
            </h1>
            <p className="text-white/90 text-[10px] md:text-xs font-semibold tracking-[0.5em] uppercase mt-1">
                PARIS
            </p>
        </div>

        {/* CONDITIONALLY RENDER CONTENT */}
        {currentView === 'home' ? (
            <>
                {/* Event Banner */}
                <EventBanner />

                {/* GAME CONTAINER */}
                <div className="relative w-full max-w-md p-1 bg-gradient-to-br from-sisley-gold to-white shadow-2xl rounded-sm transform hover:scale-[1.01] transition-transform duration-500">
                     
                     {/* Frame Border - Luxury Gold */}
                     <div className="absolute inset-0 border-[3px] border-sisley-burgundy/20 pointer-events-none m-1 z-20"></div>

                     {/* Inner Content Wrapper */}
                     <div className="relative w-full h-64 bg-white overflow-hidden">
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
                        className="group relative flex items-center gap-4 bg-white text-sisley-red px-8 py-4 rounded-full border border-white hover:bg-sisley-red hover:text-white hover:border-white transition-all duration-300 shadow-xl shadow-sisley-burgundy/50"
                    >
                        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <div className="flex flex-col items-start">
                            <span className="font-sans font-bold text-lg leading-none">
                                {t('claimReward')}
                            </span>
                            <span className="text-[9px] font-sans tracking-widest uppercase mt-1 opacity-70 group-hover:opacity-100">
                                {t('viaWhatsapp')}
                            </span>
                        </div>
                    </a>
                </div>

                {/* Welcome Text */}
                <div className="mt-12 max-w-sm px-6 text-center space-y-3 z-10 bg-sisley-burgundy/40 backdrop-blur-md p-8 border border-white/20 shadow-2xl rounded-sm">
                    <h3 className="text-white font-sans font-bold text-xl tracking-widest border-b border-white/30 pb-3 mb-2 inline-block uppercase font-serif">
                        {t('welcomeTitle')}
                    </h3>
                    <p className="text-white/90 text-[12px] leading-relaxed font-sans tracking-wide font-light">
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