
import React, { useState, useEffect, useRef } from 'react';
import { Prize, User } from './types';
import { PRIZES, generateRandomPrizeCode } from './constants';
import WinnerCard from './components/WinnerCard';
import ScratchCard from './components/ScratchCard';
import LoginForm from './components/LoginForm';
import WinnerTicker from './components/WinnerTicker';
import { Camera, Download, Globe, X, Moon, Star, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import html2canvas from 'html2canvas';

const STORAGE_KEY = 'gucci_ramadan_2026';
const USER_KEY = 'gucci_ramadan_user_2026';

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
    if (storedUser) { try { setUser(JSON.parse(storedUser)); } catch (e) {} }
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
      } catch (e) {}
    }
    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    setPrize(PRIZES[randomIndex]);
    setCode(generateRandomPrizeCode());
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
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [user]);

  const handleLogin = (userData: User) => {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
  };

  const handleReveal = () => {
    setIsRevealed(true);
    if (prize && code) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ prizeId: prize.id, code }));
    }
  };

  const handleDownloadTicket = async () => {
    if (!ticketRef.current || isSaving) return;
    setIsSaving(true);
    try {
        const canvas = await html2canvas(ticketRef.current, { backgroundColor: '#013220', scale: 3, useCORS: true });
        const link = document.createElement('a');
        link.href = canvas.toDataURL("image/png", 1.0);
        link.download = `Gucci-Ramadan-Reward.png`;
        link.click();
    } catch (error) {
        alert("Gagal mengunduh. Silakan gunakan screenshot.");
    } finally { setIsSaving(false); }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col bg-transparent overflow-x-hidden relative ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* RAMADAN NAV */}
      <nav className="fixed top-0 left-0 w-full z-[60] glass-dark border-b border-gucci-gold/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
              <div className="flex-1 hidden lg:flex items-center gap-3">
                  <Moon className="w-4 h-4 text-gucci-gold animate-twinkle" />
                  <span className="text-[10px] font-black tracking-[0.4em] text-gucci-gold uppercase">Ramadan Kareem</span>
              </div>
              
              <div className="flex flex-col items-center">
                  <h1 className="text-lg md:text-3xl font-display font-black tracking-[0.5em] text-white leading-none">GUCCI</h1>
                  <p className="text-[6px] md:text-[9px] font-black tracking-[0.6em] text-gucci-gold uppercase mt-1 opacity-80">PLATINUM SYNERGY 2026</p>
              </div>

              <div className="flex-1 flex justify-end">
                  <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 bg-gucci-gold/10 px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-gucci-gold/20 hover:bg-gucci-gold/20 transition-all">
                      <Globe className="w-3 h-3 md:w-3.5 md:h-3.5 text-gucci-gold" />
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white">{language}</span>
                  </button>
              </div>
          </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex items-center justify-center pt-20 md:pt-28 pb-32 md:pb-44 px-4 md:px-6 overflow-y-auto">
          <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24">
              
              {/* HERO TEXT */}
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 md:space-y-8 animate-fade-in-up">
                  <div className="space-y-4 md:space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gucci-gold/20 bg-gucci-gold/5 backdrop-blur-xl rounded-full">
                          <Star className="w-3 h-3 text-gucci-gold fill-gucci-gold" />
                          <span className="text-[8px] md:text-[10px] text-gucci-gold font-black tracking-[0.4em] uppercase">
                              {t('thankYouBadge')}
                          </span>
                      </div>
                      <h2 className="text-white space-y-0 md:space-y-1">
                          <span className="block text-3xl md:text-6xl lg:text-[75px] font-serif italic font-light tracking-tight leading-none text-gucci-gold">
                              Ramadan
                          </span>
                          <span className="block text-3xl md:text-6xl lg:text-[75px] font-serif font-black tracking-tighter leading-none text-white">
                              Berkah <span className="font-light italic opacity-80">2026</span>
                          </span>
                      </h2>
                      <p className="text-xs md:text-base lg:text-lg font-sans text-white/70 leading-relaxed max-w-md mx-auto lg:mx-0 font-medium tracking-wide">
                          {t('welcomeText')}
                      </p>
                  </div>
                  
                  {user && isRevealed && (
                      <button onClick={() => setIsTicketOpen(true)} 
                        className="group relative inline-flex items-center gap-4 bg-gucci-gold text-black px-10 py-4 md:px-14 md:py-6 font-black text-[10px] md:text-[13px] uppercase tracking-[0.5em] transition-all hover:tracking-[0.7em] active:scale-95 shadow-xl overflow-hidden mt-4">
                         <span className="relative z-10 flex items-center gap-3">
                            {t('claimReward')}
                            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                         </span>
                         <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </button>
                  )}
              </div>

              {/* CARD CONTAINER */}
              <div className="w-full max-w-[320px] md:max-w-[420px] lg:max-w-[440px] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="relative aspect-[3/4] w-full bg-[#051505] p-2 md:p-4 shadow-2xl border border-gucci-gold/10 rounded-sm">
                      {!user ? (
                          <LoginForm onLogin={handleLogin} />
                      ) : (
                          <div className="w-full h-full relative overflow-hidden border border-gucci-gold/5 rounded-sm">
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
      <footer className="w-full py-12 md:py-16 text-center border-t border-gucci-gold/10 bg-[#020a02] relative z-30">
          <div className="max-w-7xl mx-auto px-6 space-y-6">
              <h4 className="font-display text-lg md:text-2xl tracking-[0.8em] text-white uppercase font-black ml-[0.8em]">GUCCI</h4>
              <p className="text-[6px] md:text-[8px] text-gucci-gold/40 uppercase tracking-[0.5em] leading-loose max-w-sm mx-auto font-bold">
                  © 2026 Guccio Gucci S.p.A. — Ramadan Kareem Partner Recognition.
              </p>
          </div>
      </footer>

      {/* MODAL TICKET */}
      {isTicketOpen && prize && user && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-6 box-border overflow-y-auto">
             <div className="w-full max-w-[400px] flex flex-col items-center gap-4 md:gap-6 animate-fade-in-up my-auto">
                 <div className="w-full flex justify-between items-center px-2">
                    <div className="flex flex-col">
                        <span className="text-gucci-gold font-serif italic text-xl md:text-2xl">E-Voucher</span>
                        <span className="text-white/40 text-[8px] tracking-[0.3em] uppercase font-black">Eksklusif Platinum Member</span>
                    </div>
                    <button onClick={() => setIsTicketOpen(false)} className="text-white/30 hover:text-white transition-all bg-white/5 p-2 rounded-full border border-white/10">
                        <X className="w-6 h-6" />
                    </button>
                 </div>

                 <div ref={ticketRef} className="w-full relative aspect-[3/4] max-h-[60vh] md:max-h-[65vh] shadow-2xl rounded-sm overflow-hidden border border-gucci-gold/30">
                      <WinnerCard prize={prize} code={code} user={user} />
                 </div>

                 <div className="flex flex-col gap-3 w-full px-2">
                     <button onClick={handleDownloadTicket} disabled={isSaving} 
                        className="w-full flex items-center justify-center gap-4 bg-white text-black py-4 md:py-6 font-black text-[10px] md:text-[12px] uppercase tracking-[0.4em] hover:bg-gucci-gold transition-all shadow-xl disabled:opacity-50">
                        {isSaving ? "SAVING..." : <><Download className="w-4 h-4" /> {t('screenshotInstruction')}</>}
                     </button>
                     <p className="text-[7px] text-gucci-gold/40 text-center uppercase tracking-[0.4em] font-black italic">
                        Authorized Member Access — Ramadan Berkah 2026
                     </p>
                 </div>
            </div>
        </div>
      )}

      {/* LANGUAGE MODAL */}
      {isLangOpen && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-6 box-border overflow-y-auto">
          <div className="w-full max-w-sm flex flex-col items-center gap-6 animate-fade-in-up my-auto">
            <div className="w-full flex justify-end px-2">
              <button onClick={() => setIsLangOpen(false)} className="text-white/30 hover:text-white transition-all bg-white/5 p-2 rounded-full border border-white/10">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-gucci-emerald/50 border border-gucci-gold/20 rounded-lg p-6 w-full shadow-lg">
              <h3 className="text-xl font-display font-black text-white mb-4 text-center uppercase tracking-widest">Select Language</h3>
              <div className="grid grid-cols-2 gap-4">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                    className={`flex flex-col items-center justify-center p-4 rounded-md transition-all
                      ${language === lang.code ? 'bg-gucci-gold text-black' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                  >
                    <span className="text-lg font-bold">{lang.label}</span>
                    <span className="text-xs uppercase opacity-70">{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

