
import React, { useState, useEffect, useRef } from 'react';
import { Prize, User } from './types';
import { PRIZES, generateRandomCode } from './constants';
import WinnerCard from './components/WinnerCard';
import ScratchCard from './components/ScratchCard';
import LoginForm from './components/LoginForm';
import WinnerTicker from './components/WinnerTicker';
import { Camera, Download, Globe, X, Heart, ShieldCheck } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import html2canvas from 'html2canvas';

const STORAGE_KEY = 'gucci_platinum_synergy_2026';
const USER_KEY = 'gucci_platinum_user_2026';

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
        try { setUser(JSON.parse(storedUser)); } catch (e) { console.error(e); }
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
      } catch (e) { localStorage.removeItem(STORAGE_KEY); }
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
    
    const observer = new ResizeObserver(() => updateSize());
    if (containerRef.current) observer.observe(containerRef.current);
    
    updateSize();
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
            scale: 3, 
            useCORS: true,
            logging: false,
        });
        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement('a');
        link.href = image;
        link.download = `Gucci-Platinum-Reward.png`;
        link.click();
    } catch (error) {
        alert("Gagal mengunduh. Silakan gunakan screenshot.");
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col bg-transparent overflow-x-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* LUXURY NAV */}
      <nav className="fixed top-0 left-0 w-full z-[60] glass-dark border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-12 py-3 flex items-center justify-between">
              <div className="flex-1 hidden lg:flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase opacity-60">Verified Portal</span>
              </div>
              
              <div className="flex flex-col items-center">
                  <h1 className="text-xl md:text-3xl font-display font-black tracking-[0.4em] text-white leading-none">GUCCI</h1>
                  <p className="text-[7px] md:text-[9px] font-black tracking-[0.5em] text-white uppercase mt-1 opacity-50">PLATINUM SYNERGY 2026</p>
              </div>

              <div className="flex-1 flex justify-end">
                  <div className="relative">
                    <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-all">
                        <Globe className="w-3.5 h-3.5 text-white" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white">{language}</span>
                    </button>
                    {isLangOpen && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-black/95 border border-white/10 shadow-3xl z-[70] backdrop-blur-3xl py-2 rounded-lg overflow-hidden">
                            {availableLanguages.map(lang => (
                                <button key={lang.code} onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }} 
                                    className={`w-full text-left px-5 py-2.5 text-[10px] uppercase font-black tracking-widest transition-all ${language === lang.code ? 'text-white bg-white/10' : 'text-white/40 hover:text-white'}`}>
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                  </div>
              </div>
          </div>
      </nav>

      {/* HERO SECTION */}
      <main className="flex-grow flex items-center justify-center pt-20 pb-40 px-6">
          <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
              
              {/* TYPOGRAPHY */}
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 animate-fade-in-up">
                  <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 bg-white/5 backdrop-blur-xl rounded-full">
                          <Heart className="w-3.5 h-3.5 text-white" />
                          <span className="text-[9px] md:text-[11px] text-white font-black tracking-[0.4em] uppercase">
                              {t('thankYouBadge')}
                          </span>
                      </div>
                      <h2 className="text-white">
                          <span className="block text-4xl md:text-6xl lg:text-[80px] font-serif italic font-light tracking-tight leading-tight">
                              Platinum
                          </span>
                          <span className="block text-4xl md:text-6xl lg:text-[80px] font-serif font-black tracking-tighter leading-none text-white">
                              Synergy <span className="font-light italic opacity-70">2026</span>
                          </span>
                      </h2>
                      <p className="text-sm md:text-lg font-sans text-white/60 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium tracking-wide">
                          {t('welcomeText')}
                      </p>
                  </div>
                  
                  {user && isRevealed && (
                      <button onClick={() => setIsTicketOpen(true)} 
                        className="group relative inline-flex items-center gap-5 bg-white text-black px-10 py-5 md:px-14 md:py-6 font-black text-[11px] md:text-[13px] uppercase tracking-[0.5em] transition-all hover:tracking-[0.7em] active:scale-95 shadow-2xl overflow-hidden">
                         <span className="relative z-10 flex items-center gap-4">
                            {t('claimReward')}
                            <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                         </span>
                         <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </button>
                  )}
              </div>

              {/* CARD AREA - CAPPED SIZING */}
              <div className="w-full max-w-[340px] md:max-w-[420px] lg:max-w-[450px] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="relative aspect-[3/4] max-h-[75vh] w-full bg-[#080808] p-3 md:p-5 shadow-2xl border border-white/10 rounded-sm">
                      {!user ? (
                          <LoginForm onLogin={handleLogin} />
                      ) : (
                          <div className="w-full h-full relative overflow-hidden border border-white/5 rounded-sm">
                              <div ref={containerRef} className="w-full h-full relative">
                                  {prize && <WinnerCard prize={prize} code={code} user={user} />}
                                  {containerSize.width > 0 && (
                                      <ScratchCard width={containerSize.width} height={containerSize.height} isRevealed={isRevealed} onReveal={handleReveal} />
                                  )}
                              </div>
                          </div>
                      )}
                  </div>
              </div>

          </div>
      </main>

      <WinnerTicker />

      {/* FOOTER */}
      <footer className="w-full py-12 text-center border-t border-white/5 bg-black/98 relative z-30">
          <div className="max-w-7xl mx-auto px-6 space-y-6">
              <h4 className="font-display text-xl md:text-3xl tracking-[0.6em] text-white uppercase font-black ml-[0.6em]">GUCCI</h4>
              <div className="flex flex-wrap justify-center gap-4 md:gap-10 text-[8px] md:text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">
                  <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                  <span className="hover:text-white transition-colors cursor-pointer">Synergy 2026</span>
                  <span className="hover:text-white transition-colors cursor-pointer">Store Locator</span>
              </div>
          </div>
      </footer>

      {/* MODAL - TICKET VIEW */}
      {isTicketOpen && prize && user && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 box-border">
             <div className="w-full max-w-[400px] flex flex-col items-center gap-6 animate-fade-in-up my-auto h-full max-h-[90vh]">
                 <div className="w-full flex justify-between items-center px-2">
                    <div className="flex flex-col">
                        <span className="text-white font-serif italic text-xl">Voucher Reward</span>
                        <span className="text-white/40 text-[9px] tracking-[0.4em] uppercase font-black">Private Recognition Access</span>
                    </div>
                    <button onClick={() => setIsTicketOpen(false)} className="text-white/30 hover:text-white transition-all bg-white/5 p-3 rounded-full border border-white/10">
                        <X className="w-6 h-6" />
                    </button>
                 </div>

                 <div ref={ticketRef} className="w-full relative aspect-[3/4] max-h-[60vh] md:max-h-[65vh] shadow-[0_50px_100px_rgba(0,0,0,1)] rounded-sm overflow-hidden border border-white/30">
                      <WinnerCard prize={prize} code={code} user={user} />
                 </div>

                 <div className="flex flex-col gap-4 w-full px-2">
                     <button onClick={handleDownloadTicket} disabled={isSaving} 
                        className="w-full flex items-center justify-center gap-4 bg-white text-black py-5 font-black text-[11px] uppercase tracking-[0.5em] hover:bg-gray-200 transition-all shadow-2xl disabled:opacity-50 border border-white/20">
                        {isSaving ? "PROCESSING..." : <><Download className="w-5 h-5" /> {t('screenshotInstruction')}</>}
                     </button>
                     <p className="text-[8px] text-white/30 text-center uppercase tracking-[0.5em] font-black italic">
                        Authorized Member Access Only — 2026
                     </p>
                 </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
