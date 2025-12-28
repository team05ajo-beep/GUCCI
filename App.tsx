
import React, { useState, useEffect, useRef } from 'react';
import { Prize, User } from './types';
import { PRIZES, generateRandomCode } from './constants';
import WinnerCard from './components/WinnerCard';
import ScratchCard from './components/ScratchCard';
import LoginForm from './components/LoginForm';
import WinnerTicker from './components/WinnerTicker';
import { Camera, Download, Globe } from 'lucide-react';
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
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
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
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight
            });
        }
    };
    
    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', updateSize);
    return () => {
        window.removeEventListener('resize', updateSize);
        observer.disconnect();
    };
  }, [user]);

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
    <div className={`w-full min-h-screen flex flex-col bg-transparent overflow-x-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-lg border-b border-white/5">
          <div className="container mx-auto px-4 md:px-12 py-4 flex items-center justify-between">
              <div className="flex-1 hidden md:block"></div>
              <div className="flex flex-col items-center text-center">
                  <h1 className="text-xl md:text-3xl font-display font-bold tracking-[0.4em] text-gucci-gold">GUCCI</h1>
                  <span className="text-[6px] md:text-[8px] font-black tracking-[0.4em] text-white/40 uppercase mt-1">NEW YEAR CELEBRATION</span>
              </div>
              <div className="flex-1 flex justify-end relative">
                  <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                      <Globe className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest">{language}</span>
                  </button>
                  {isLangOpen && (
                      <div className="absolute top-full right-0 mt-3 w-48 bg-black/95 border border-gucci-gold/20 shadow-2xl z-50 backdrop-blur-xl">
                          {availableLanguages.map(lang => (
                              <button key={lang.code} onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-[9px] uppercase font-black tracking-widest ${language === lang.code ? 'text-gucci-gold' : 'text-white/60'}`}>
                                  {lang.label}
                              </button>
                          ))}
                      </div>
                  )}
              </div>
          </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative flex-grow flex items-center pt-24 pb-20 px-4 md:px-12">
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24">
              
              {/* Campaign Info */}
              <div className="w-full md:w-1/2 text-center md:text-left space-y-8 animate-fade-in-up">
                  <div className="space-y-4">
                      <h2 className="text-white">
                          <span className="block text-sm md:text-xl text-gucci-gold font-display font-bold tracking-[0.3em] mb-2 uppercase">
                              {t('welcomeTitle')}
                          </span>
                          <span className="block text-4xl md:text-7xl lg:text-8xl font-serif italic font-light leading-tight">
                              Golden<br />
                              Scratch <span className="not-italic font-normal">2026</span>
                          </span>
                      </h2>
                      <p className="text-xs md:text-base font-sans text-white/70 leading-relaxed max-w-md mx-auto md:mx-0 tracking-wider">
                          {t('welcomeText')}
                      </p>
                  </div>
                  
                  {user && isRevealed && (
                      <button onClick={() => setIsTicketOpen(true)} className="inline-flex items-center gap-4 bg-gucci-gold text-black px-10 py-5 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl active:scale-95">
                         {t('claimReward')}
                         <Camera className="w-4 h-4" />
                      </button>
                  )}
              </div>

              {/* Interactive Area */}
              <div className="w-full max-w-[440px] md:w-[440px] mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="relative aspect-[3/4] bg-black/50 backdrop-blur-2xl p-2 border border-white/10 shadow-2xl">
                      {!user ? (
                          <LoginForm onLogin={handleLogin} />
                      ) : (
                          <div className="w-full h-full relative overflow-hidden border border-gucci-gold/20">
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

      <WinnerTicker />

      <footer className="w-full py-8 text-center border-t border-white/5 bg-black/40">
          <h4 className="font-display text-2xl tracking-[0.4em] text-gucci-gold mb-2 uppercase">GUCCI</h4>
          <p className="text-[7px] md:text-[8px] text-white/20 uppercase tracking-[0.5em]">© 2026 Guccio Gucci S.p.A. — Global Celebration</p>
      </footer>

      {/* TICKET MODAL */}
      {isTicketOpen && prize && user && (
        <div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
             <div className="w-full max-w-sm flex flex-col items-center gap-8 animate-fade-in-up">
                 <div ref={ticketRef} className="w-full relative aspect-[3/4] border border-white/5 shadow-2xl">
                      <WinnerCard prize={prize} code={code} user={user} />
                 </div>
                 <div className="flex flex-col gap-3 w-full">
                     <button onClick={handleDownloadTicket} disabled={isSaving} className="w-full flex items-center justify-center gap-4 bg-gucci-gold text-black py-5 font-black text-[9px] uppercase tracking-[0.4em] hover:bg-white transition-all">
                        {isSaving ? "..." : <Download className="w-4 h-4" />}
                        {isSaving ? 'GENERATING...' : t('screenshotInstruction')}
                     </button>
                     <button onClick={() => setIsTicketOpen(false)} className="text-white/30 hover:text-white transition-colors text-[8px] uppercase tracking-[0.5em] font-black py-2">
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
