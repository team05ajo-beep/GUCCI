
import React, { useState, useEffect, useRef } from 'react';
import { Prize, User } from './types';
import { PRIZES, generateRandomCode } from './constants';
import WinnerCard from './components/WinnerCard';
import ScratchCard from './components/ScratchCard';
import LoginForm from './components/LoginForm';
import { Globe, ShoppingBag, Menu, Camera, Download, PartyPopper } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import html2canvas from 'html2canvas';

const STORAGE_KEY = 'gucci_new_year_2026_v1';
const USER_KEY = 'gucci_new_year_user_v1';

const App: React.FC = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [prize, setPrize] = useState<Prize | null>(null);
  const [code, setCode] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (e) {
            console.error("Error parsing user data", e);
        }
    }
  }, []);

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
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    setPrize(PRIZES[randomIndex]);
    setCode(generateRandomCode());
  }, []);

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
    // Extra checks for mobile orientation changes
    const timeout = setTimeout(updateSize, 800);
    return () => {
        window.removeEventListener('resize', updateSize);
        clearTimeout(timeout);
    };
  }, [user, isTicketOpen]);

  const handleLogin = (userData: User) => {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
  };

  const handleReveal = () => {
    setIsRevealed(true);
    if (prize && code) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        prizeId: prize.id,
        code: code
      }));
    }
  };

  const handleDownloadTicket = async () => {
    if (!ticketRef.current || isSaving) return;
    setIsSaving(true);
    try {
        const canvas = await html2canvas(ticketRef.current, {
            backgroundColor: '#0a0a0a',
            scale: 2,
            useCORS: true,
            allowTaint: true
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `Gucci-Ticket-2026.png`;
        link.click();
    } catch (error) {
        alert("Please take a screenshot of your ticket.");
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-transparent overflow-x-hidden">
      
      {/* HEADER - Precisely positioned icons as per screenshot */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-4 md:px-12 py-5 flex items-center justify-between">
              {/* Left: Menu Icon */}
              <div className="flex-1 flex justify-start">
                  <Menu className="w-5 h-5 text-white/90 cursor-pointer hover:text-gucci-gold transition-colors" />
              </div>

              {/* Center: Branding */}
              <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="text-xl md:text-3xl font-display font-bold tracking-[0.45em] leading-none text-gucci-gold drop-shadow-lg">
                      GUCCI
                  </h1>
                  <span className="text-[6px] md:text-[8px] font-black tracking-[0.6em] uppercase mt-2 text-white/50">
                      NEW YEAR CELEBRATION
                  </span>
              </div>

              {/* Right: Globe and Shopping Bag */}
              <div className="flex-1 flex items-center justify-end gap-5">
                  <div className="relative">
                    <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
                        <Globe className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-black uppercase tracking-widest">{language}</span>
                    </button>
                    {isLangOpen && (
                        <div className="absolute top-full right-0 mt-4 w-44 bg-black/95 border border-gucci-gold/20 shadow-2xl z-[60] backdrop-blur-2xl">
                            {availableLanguages.map(lang => (
                                <button 
                                    key={lang.code}
                                    onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                                    className={`w-full text-left px-5 py-3 text-[9px] uppercase font-black tracking-widest hover:bg-gucci-gold/10 ${language === lang.code ? 'text-gucci-gold' : 'text-white/60'}`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                  </div>
                  <ShoppingBag className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />
              </div>
          </div>
      </header>

      {/* MAIN CONTENT SECTION */}
      <main className="relative w-full flex-grow flex items-center pt-28 pb-16 px-4 md:px-16 lg:px-24">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-32">
              
              {/* Left: Hero Information */}
              <div className="w-full md:w-1/2 text-left space-y-10 order-1 md:order-1 animate-fade-in-up">
                  <div className="inline-flex items-center gap-4 bg-black/60 px-5 py-2 text-[9px] font-black uppercase tracking-[0.5em] text-gucci-gold border border-gucci-gold/40">
                      <PartyPopper className="w-4 h-4" />
                      GALA CELEBRATION 2026
                  </div>
                  
                  <div className="space-y-6">
                      <h2 className="text-white drop-shadow-2xl">
                          <span className="block text-lg md:text-2xl text-gucci-gold font-display font-black tracking-[0.35em] mb-4 uppercase">
                              New Year Celebration 2026
                          </span>
                          <span className="block text-5xl md:text-8xl font-serif italic font-light leading-none">
                              Golden<br />
                              Scratch <span className="not-italic font-normal">2026</span>
                          </span>
                      </h2>
                      <p className="text-xs md:text-base font-sans text-white/80 leading-relaxed max-w-md tracking-widest drop-shadow-lg">
                          {t('welcomeText')}
                      </p>
                  </div>
                  
                  {user && isRevealed && (
                      <button 
                         onClick={() => setIsTicketOpen(true)}
                         className="flex items-center gap-5 bg-gucci-gold text-black px-12 py-6 font-black text-[11px] uppercase tracking-[0.45em] hover:bg-white transition-all shadow-2xl active:scale-95"
                      >
                         {t('claimReward')}
                         <Camera className="w-4 h-4" />
                      </button>
                  )}
              </div>

              {/* Right: Interactive Card */}
              <div className="w-full md:w-[450px] order-2 md:order-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <div className="relative aspect-[3/4] bg-black/40 backdrop-blur-2xl shadow-[0_50px_150px_-30px_rgba(0,0,0,1)] p-4 border border-white/10 ring-1 ring-white/5">
                      {!user ? (
                          <LoginForm onLogin={handleLogin} />
                      ) : (
                          <div className="w-full h-full relative overflow-hidden glass-panel border border-gucci-gold/20">
                              <div ref={containerRef} className="w-full h-full relative">
                                  {prize && <WinnerCard prize={prize} code={code} user={user} />}
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
                      )}
                  </div>
              </div>
          </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-black/90 backdrop-blur-xl py-12 border-t border-white/5 mt-auto relative z-10">
          <div className="container mx-auto px-6 text-center space-y-6">
              <h4 className="font-display text-3xl tracking-[0.5em] text-gucci-gold">GUCCI</h4>
              <p className="text-[9px] text-white/30 uppercase tracking-[0.6em]">© 2026 Guccio Gucci S.p.A. — Global Celebration</p>
          </div>
      </footer>

      {/* TICKET FULL SCREEN OVERLAY */}
      {isTicketOpen && prize && user && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6 md:p-12 overflow-y-auto">
             <div className="w-full max-w-md flex flex-col items-center gap-10 my-auto animate-fade-in-up">
                 <div ref={ticketRef} className="w-full relative aspect-[3/4] shadow-[0_50px_200px_rgba(0,0,0,1)] border border-white/10">
                      <WinnerCard prize={prize} code={code} user={user} />
                 </div>
                 <div className="flex flex-col gap-4 w-full">
                     <button 
                        onClick={handleDownloadTicket}
                        disabled={isSaving}
                        className="w-full flex items-center justify-center gap-5 bg-gucci-gold text-black px-12 py-6 font-black text-[11px] uppercase tracking-[0.5em] hover:bg-white transition-all shadow-2xl active:scale-95"
                     >
                        {isSaving ? "..." : <Download className="w-5 h-5" />}
                        {isSaving ? 'GENERATING...' : t('screenshotInstruction')}
                     </button>
                     <button onClick={() => setIsTicketOpen(false)} className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-[0.6em] font-black py-4">
                        {t('backToHome')}
                     </button>
                 </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
