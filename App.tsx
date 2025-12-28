
import React, { useState, useEffect, useRef } from 'react';
import { Prize, User } from './types';
import { PRIZES, generateRandomCode } from './constants';
import WinnerCard from './components/WinnerCard';
import ScratchCard from './components/ScratchCard';
import LoginForm from './components/LoginForm';
import WinnerTicker from './components/WinnerTicker';
import { Camera, Download, Globe, X } from 'lucide-react';
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
    const timer = setTimeout(updateSize, 100); // Small delay to ensure render
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', updateSize);
    return () => {
        window.removeEventListener('resize', updateSize);
        observer.disconnect();
        clearTimeout(timer);
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
            scale: 3,
            useCORS: true,
            allowTaint: true,
            logging: false
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `Gucci-Reward-2026.png`;
        link.click();
    } catch (error) {
        console.error("Download failed", error);
        alert("Gagal mengunduh. Silakan ambil tangkapan layar (screenshot) sebagai gantinya.");
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col bg-transparent overflow-x-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* HEADER: Unified Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
              <div className="flex-1 hidden md:flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-gucci-gold/30"></div>
                  <span className="text-[9px] font-black tracking-[0.3em] text-white/40 uppercase">EXCLUSIVITY</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl md:text-4xl font-display font-bold tracking-[0.45em] text-gucci-gold drop-shadow-lg">GUCCI</h1>
                  <span className="text-[7px] md:text-[9px] font-black tracking-[0.5em] text-white/50 uppercase mt-1">NEW YEAR CELEBRATION</span>
              </div>

              <div className="flex-1 flex justify-end">
                  <div className="relative">
                    <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 group">
                        <Globe className="w-4 h-4 text-gucci-gold/70 group-hover:text-gucci-gold transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-white">{language}</span>
                    </button>
                    {isLangOpen && (
                        <div className="absolute top-full right-0 mt-4 w-44 bg-black/95 border border-white/10 shadow-2xl z-50 backdrop-blur-2xl py-2">
                            {availableLanguages.map(lang => (
                                <button 
                                    key={lang.code} 
                                    onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }} 
                                    className={`w-full text-left px-5 py-3 text-[10px] uppercase font-black tracking-widest transition-colors hover:bg-white/5 ${language === lang.code ? 'text-gucci-gold' : 'text-white/40'}`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                  </div>
              </div>
          </div>
      </header>

      {/* HERO SECTION: Optimized for Center Focus */}
      <main className="relative flex-grow flex items-center justify-center pt-24 pb-28 md:pt-32 px-4 md:px-10 overflow-hidden">
          <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
              
              {/* Campaign Typography */}
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 animate-fade-in-up">
                  <div className="space-y-4">
                      <div className="inline-block px-4 py-1.5 border border-gucci-gold/20 bg-gucci-gold/5 rounded-full mb-2">
                          <span className="text-[9px] md:text-[11px] text-gucci-gold font-bold tracking-[0.4em] uppercase">
                              {t('welcomeTitle')}
                          </span>
                      </div>
                      <h2 className="text-white drop-shadow-2xl">
                          <span className="block text-5xl md:text-8xl lg:text-[100px] font-serif italic font-light leading-[1.1] md:leading-[1]">
                              Golden<br />
                              Scratch <span className="not-italic font-normal">2026</span>
                          </span>
                      </h2>
                      <p className="text-xs md:text-lg font-sans text-white/60 leading-relaxed max-w-lg mx-auto lg:mx-0 tracking-wide font-light">
                          {t('welcomeText')}
                      </p>
                  </div>
                  
                  {user && isRevealed && (
                      <button 
                        onClick={() => setIsTicketOpen(true)} 
                        className="inline-flex items-center gap-5 bg-gucci-gold text-black px-12 py-6 font-black text-[11px] uppercase tracking-[0.5em] hover:bg-white transition-all shadow-[0_20px_40px_rgba(212,175,55,0.2)] active:scale-95 group"
                      >
                         {t('claimReward')}
                         <Camera className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      </button>
                  )}
              </div>

              {/* Interactive Card Section */}
              <div className="w-full max-w-[420px] md:max-w-[460px] mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="relative aspect-[3/4] w-full bg-[#0a0a0a] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] p-2 md:p-3 border border-white/10 ring-1 ring-white/5">
                      {!user ? (
                          <LoginForm onLogin={handleLogin} />
                      ) : (
                          <div className="w-full h-full relative overflow-hidden border border-gucci-gold/15">
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

      {/* Global Winner Stream */}
      <WinnerTicker />

      {/* Footer Branding */}
      <footer className="w-full py-12 text-center border-t border-white/5 bg-black/60 backdrop-blur-md">
          <div className="max-w-md mx-auto space-y-4">
              <h4 className="font-display text-2xl md:text-3xl tracking-[0.6em] text-gucci-gold uppercase">GUCCI</h4>
              <p className="text-[8px] md:text-[10px] text-white/20 uppercase tracking-[0.6em] leading-loose">
                  © 2026 Guccio Gucci S.p.A. — A Global Fashion Authority
              </p>
          </div>
      </footer>

      {/* MODAL: Full-Sized Winner Ticket */}
      {isTicketOpen && prize && user && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 overflow-y-auto">
             <div className="w-full max-w-[420px] flex flex-col items-center gap-10 animate-fade-in-up">
                 
                 <div className="w-full flex justify-end">
                    <button onClick={() => setIsTicketOpen(false)} className="text-white/40 hover:text-white transition-colors">
                        <X className="w-8 h-8" />
                    </button>
                 </div>

                 <div ref={ticketRef} className="w-full relative aspect-[3/4] shadow-[0_50px_100px_rgba(0,0,0,0.9)] border border-white/10">
                      <WinnerCard prize={prize} code={code} user={user} />
                 </div>

                 <div className="flex flex-col gap-4 w-full px-2">
                     <button 
                        onClick={handleDownloadTicket} 
                        disabled={isSaving} 
                        className="w-full flex items-center justify-center gap-5 bg-gucci-gold text-black py-6 font-black text-[10px] md:text-[12px] uppercase tracking-[0.5em] hover:bg-white transition-all shadow-2xl active:scale-95 disabled:opacity-50"
                     >
                        {isSaving ? "GENERATING..." : <><Download className="w-5 h-5" /> {t('screenshotInstruction')}</>}
                     </button>
                     <p className="text-[9px] text-white/30 text-center uppercase tracking-widest">
                        Tukarkan di gerai resmi terdekat.
                     </p>
                 </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
