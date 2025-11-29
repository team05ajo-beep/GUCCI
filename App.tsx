import React, { useState, useEffect, useRef } from 'react';
import { Prize } from './types';
import { PRIZES, generateRandomCode, WHATSAPP_NUMBER } from './constants';
import WinnerCard from './components/WinnerCard';
import ScratchCard from './components/ScratchCard';
import { Globe, Search, ShoppingBag, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const STORAGE_KEY = 'sisley_lucky_draw_claim_v1';

const App: React.FC = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const [prize, setPrize] = useState<Prize | null>(null);
  const [code, setCode] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isLangOpen, setIsLangOpen] = useState(false);
  
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
    // Slight delay to ensure layout is settled
    setTimeout(updateSize, 500);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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
    <div className="w-full bg-white font-sans text-sisley-black">
      
      {/* --- HEADER SECTION (BLACK) --- */}
      <header className="bg-black text-white w-full relative z-50">
          {/* Top Bar: Search, Logo, Utilities */}
          <div className="container mx-auto px-6 py-5 flex items-center justify-between">
              
              {/* Left: Search */}
              <div className="flex items-center gap-4 w-1/4">
                  <div className="hidden md:flex items-center gap-2 border border-white/30 rounded-full px-4 py-1.5 w-64 hover:border-white transition-colors cursor-pointer group">
                      <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest group-hover:text-white">Search</span>
                  </div>
              </div>

              {/* Center: LOGO */}
              <div className="flex flex-col items-center justify-center w-1/2">
                  <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-[0.05em] leading-none">
                      sisley
                  </h1>
                  <span className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] uppercase mt-1 text-gray-400">
                      PARIS
                  </span>
              </div>

              {/* Right: Utilities */}
              <div className="flex items-center justify-end gap-6 w-1/4">
                  <div className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                      <a href="https://www.sisley-paris.com/en-ID/my-account/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">My Sisley Club</a>
                      <a href="https://www.sisley-paris.com/en-ID/my-account/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">My Account</a>
                  </div>
                  
                  {/* Language Switcher */}
                  <div className="relative">
                    <button 
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-1 hover:text-gray-300"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="hidden md:inline text-[10px] font-bold uppercase">{language}</span>
                    </button>
                     {isLangOpen && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-white text-black shadow-xl py-1 z-50 border border-gray-200">
                            {availableLanguages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsLangOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-[10px] font-bold uppercase hover:bg-gray-100 ${language === lang.code ? 'text-sisley-red' : ''}`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                     )}
                  </div>

                  <div className="relative cursor-pointer">
                      <ShoppingBag className="w-5 h-5 hover:text-gray-300" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-sisley-red rounded-full"></div>
                  </div>
              </div>
          </div>
      </header>

      {/* --- HERO SECTION (RED / GAME) --- */}
      <section className="relative w-full min-h-[600px] md:min-h-[700px] bg-[#990000] overflow-hidden flex items-center">
          
          {/* Background Image/Gradient - Red Studio Look */}
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-[#4a0000] via-[#800000] to-[#b30000]"></div>
             {/* Abstract Shadows to mimic product shot lighting */}
             <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(255,50,50,0.15),transparent_50%)]"></div>
             <div className="absolute bottom-0 left-0 w-2/3 h-full bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Text Content */}
              <div className="text-white space-y-6 md:pl-8 pt-10 md:pt-0">
                  <div className="inline-block border border-white/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-black/20 backdrop-blur-sm">
                      Exclusive Event
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                      <span className="block text-2xl md:text-3xl mb-2 font-normal opacity-90">{t('welcomeTitle')}</span>
                      <span className="font-bold">{t('specialDiscount')}</span>
                  </h2>
                  <p className="text-sm md:text-base font-sans text-white/80 max-w-md leading-relaxed">
                      {t('welcomeText')}
                  </p>
                  
                  {isRevealed && (
                      <div className="pt-4 animate-fade-in-up">
                          <a 
                             href={getWhatsAppLink()}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-3 bg-white text-[#990000] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors"
                          >
                             {t('claimReward')}
                             <ChevronRight className="w-4 h-4" />
                          </a>
                      </div>
                  )}
              </div>

              {/* Right Column: The Scratch Card (Product/Interactive) */}
              <div className="flex justify-center md:justify-end relative">
                  {/* Decorative Elements around card */}
                  <div className="absolute -inset-4 bg-white/5 rounded-sm blur-xl"></div>
                  
                  <div className="relative w-full max-w-sm aspect-[4/5] bg-white shadow-2xl rounded-sm p-2 transform rotate-1 hover:rotate-0 transition-transform duration-700">
                      <div className="w-full h-full border border-gray-200 bg-gray-50 relative overflow-hidden">
                          <div ref={containerRef} className="w-full h-full relative">
                              {/* Content behind scratch */}
                              {prize && (
                                  <WinnerCard prize={prize} code={code} />
                              )}
                              
                              {/* Scratch Layer */}
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
                      
                      {/* Label */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-lg">
                         Lucky Draw Card
                      </div>
                  </div>
              </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
              <span className="text-[9px] uppercase tracking-widest">Scroll Down</span>
              <div className="w-[1px] h-8 bg-white/30"></div>
          </div>
      </section>

      {/* --- WHITE CONTENT SECTION (VISION & MISSION) --- */}
      <section className="bg-white py-20 md:py-28 relative">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h3 className="text-3xl md:text-4xl font-serif text-black mb-4">
                      {t('visionTitle')}
                  </h3>
                  <div className="w-16 h-[1px] bg-black mx-auto"></div>
              </div>

              {/* Layout mimicking 'What customers are saying' carousel but vertical scroll list */}
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
                   {/* Decorative Image Left */}
                   <div className="md:col-span-5 relative h-[400px] md:h-auto bg-gray-100 overflow-hidden">
                       <img 
                         src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1974&auto=format&fit=crop" 
                         alt="Sisley Product" 
                         className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                       />
                       <div className="absolute inset-0 flex items-center justify-center">
                           <div className="bg-white/90 p-6 text-center shadow-lg max-w-[200px]">
                               <div className="text-2xl font-serif text-sisley-red mb-1">4.9/5</div>
                               <div className="text-[10px] uppercase tracking-widest text-gray-500">Excellence</div>
                           </div>
                       </div>
                   </div>

                   {/* Text Content Right */}
                   <div className="md:col-span-7 flex flex-col justify-center">
                       <div className="h-[400px] overflow-y-auto pr-6 custom-scrollbar">
                            <h4 className="font-serif text-xl mb-6 text-sisley-red italic">
                                {t('visionText1')}
                            </h4>
                            <p className="text-sm font-sans text-gray-600 leading-8 whitespace-pre-line text-justify">
                                {t('visionText2')}
                            </p>
                       </div>
                       
                       <div className="flex gap-2 mt-8 justify-center md:justify-start">
                           <div className="w-2 h-2 rounded-full bg-black"></div>
                           <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                           <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                           <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                       </div>
                   </div>
              </div>
          </div>
      </section>

      {/* --- FOOTER SECTION (BLACK) --- */}
      <footer className="bg-black text-white py-16 border-t border-white/10">
          <div className="container mx-auto px-6">
              
              {/* Newsletter Area */}
              <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
                  <h4 className="font-serif text-2xl md:text-3xl mb-4">Be the first to know!</h4>
                  <p className="text-sm text-gray-400 mb-8 font-light">
                      Receive our exclusive offers, new product launches, beauty advice. By signing up, you consent to our privacy policy.
                  </p>
                  
                  <div className="w-full flex flex-col md:flex-row gap-4">
                      <input 
                        type="email" 
                        placeholder="Email (Required)" 
                        className="flex-1 bg-transparent border border-white/30 px-6 py-3 text-sm focus:outline-none focus:border-white transition-colors"
                      />
                      <button className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                          Subscribe
                      </button>
                  </div>
              </div>

              {/* Footer Links Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12 text-[10px] uppercase tracking-widest text-gray-400">
                  <div className="space-y-4">
                      <h5 className="text-white font-bold mb-6">Customer Service</h5>
                      <a href="https://www.sisley-paris.com/en-ID/contact/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Contact Us</a>
                      <a href="https://www.sisley-paris.com/en-ID/faq/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">FAQ</a>
                      <a href="https://www.sisley-paris.com/en-ID/shipping/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Shipping & Returns</a>
                  </div>
                  <div className="space-y-4">
                      <h5 className="text-white font-bold mb-6">The Brand</h5>
                      <a href="https://www.sisley-paris.com/en-ID/our-story/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Our Story</a>
                      <a href="https://www.linkedin.com/company/sisley/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Careers</a>
                      <a href="https://www.sisley-paris.com/en-ID/press/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Press</a>
                  </div>
                  <div className="space-y-4">
                      <h5 className="text-white font-bold mb-6">Services</h5>
                      <a href="https://www.sisley-paris.com/en-ID/store-locator/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Store Locator</a>
                      <a href="https://www.sisley-paris.com/en-ID/beauty-subscription/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Beauty Subscription</a>
                      <a href="https://www.sisley-paris.com/en-ID/maison-sisley/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Maison Sisley</a>
                  </div>
                  <div className="space-y-4">
                      <h5 className="text-white font-bold mb-6">Social</h5>
                      <a href="https://www.instagram.com/sisleyparisofficial/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Instagram</a>
                      <a href="https://www.facebook.com/SisleyParis/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Facebook</a>
                      <a href="https://www.youtube.com/user/SisleyParis" target="_blank" rel="noopener noreferrer" className="block hover:text-white">YouTube</a>
                  </div>
              </div>

              {/* Bottom Copyright */}
              <div className="text-center mt-16 text-[9px] text-gray-600 uppercase tracking-widest">
                  © 2024 Sisley Paris. All rights reserved. Country: Indonesia.
              </div>
          </div>
      </footer>
    </div>
  );
};

export default App;