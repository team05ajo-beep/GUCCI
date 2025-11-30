import React, { useState, useEffect, useRef } from 'react';
import { Prize, User } from './types';
import { PRIZES, generateRandomCode, WHATSAPP_NUMBER } from './constants';
import WinnerCard from './components/WinnerCard';
import ScratchCard from './components/ScratchCard';
import LoginForm from './components/LoginForm';
import { Globe, Search, ShoppingBag, ChevronRight, Menu, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const STORAGE_KEY = 'gucci_lucky_draw_claim_v1';
const USER_KEY = 'gucci_lucky_draw_user_v1';

const App: React.FC = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [prize, setPrize] = useState<Prize | null>(null);
  const [code, setCode] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for existing User Login
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

  // Initialize Prize and Check Local Storage for Claim
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
  }, [user]); // Update size when user state changes (login reveals card)

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

  const getWhatsAppLink = () => {
    if (!prize || !code) return '#';
    const rewardType = prize.isGrandPrize ? t('discountPrefix') : t('voucherPrefix');
    
    // Add User Info to message if available
    let userInfo = "";
    if (user) {
        userInfo = `Nama: ${user.fullName}\nNo HP: ${user.phoneNumber}\n`;
    }

    const message = `${t('claimMessage')}\n${userInfo}${rewardType} ${prize.amount} ${t('codeLabel')} ${code}. ${t('processRequest')}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  // Official Gucci Links
  const navLinks = [
    { name: "Gifts", url: "https://www.gucci.com/us/en/st/capsule/gifts" },
    { name: "What's New", url: "https://www.gucci.com/us/en/ca/whats-new-c-new" },
    { name: "Handbags", url: "https://www.gucci.com/us/en/ca/women/handbags-c-women-handbags" },
    { name: "Women", url: "https://www.gucci.com/us/en/ca/women-c-women" },
    { name: "Men", url: "https://www.gucci.com/us/en/ca/men-c-men" },
    { name: "Children", url: "https://www.gucci.com/us/en/ca/children-c-children" },
    { name: "Jewelry & Watches", url: "https://www.gucci.com/us/en/ca/jewelry-watches-c-jewelry-watches" },
    { name: "Beauty", url: "https://www.gucci.com/us/en/ca/beauty-c-beauty" },
    { name: "Decor & Lifestyle", url: "https://www.gucci.com/us/en/ca/decor-c-decor" }
  ];

  return (
    <div className="w-full bg-gucci-cream font-sans text-gucci-black">
      
      {/* --- HEADER SECTION (BLACK) --- */}
      <header className="bg-black text-gucci-gold w-full relative z-50 border-b border-gucci-gold/20">
          {/* Top Bar: Search, Logo, Utilities */}
          <div className="container mx-auto px-6 py-5 flex items-center justify-between">
              
              {/* Left: Mobile Menu & Search */}
              <div className="flex items-center gap-4 w-1/4">
                  <button 
                    onClick={() => setIsMenuOpen(true)}
                    className="md:hidden text-gucci-gold hover:text-white transition-colors"
                  >
                      <Menu className="w-6 h-6" />
                  </button>

                  <div className="hidden md:flex items-center gap-2 border border-gucci-gold/30 rounded-full px-4 py-1.5 w-64 hover:border-gucci-gold transition-colors cursor-pointer group">
                      <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-gucci-gold" />
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest group-hover:text-gucci-gold">Search</span>
                  </div>
              </div>

              {/* Center: LOGO */}
              <div className="flex flex-col items-center justify-center w-1/2">
                  <h1 className="text-4xl md:text-6xl font-display font-black tracking-[0.1em] leading-none text-gucci-gold drop-shadow-sm">
                      GUCCI
                  </h1>
                  <span className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] uppercase mt-2 text-gray-500">
                      {t('florenceSubtitle')}
                  </span>
              </div>

              {/* Right: Utilities */}
              <div className="flex items-center justify-end gap-6 w-1/4">
                  <div className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-white">
                      <a href="https://www.gucci.com/us/en/st/services" target="_blank" rel="noopener noreferrer" className="hover:text-gucci-gold">Services</a>
                      <a href="https://www.gucci.com/us/en/st/my-account" target="_blank" rel="noopener noreferrer" className="hover:text-gucci-gold">My Account</a>
                  </div>
                  
                  {/* Language Switcher */}
                  <div className="relative">
                    <button 
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-1 hover:text-gucci-gold text-white"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="hidden md:inline text-[10px] font-bold uppercase">{language}</span>
                    </button>
                     {isLangOpen && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-gucci-cream text-black shadow-xl py-1 z-50 border border-gucci-gold">
                            {availableLanguages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsLangOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-[10px] font-bold uppercase hover:bg-gucci-gold/20 ${language === lang.code ? 'text-gucci-green' : ''}`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                     )}
                  </div>

                  <div className="relative cursor-pointer text-white hover:text-gucci-gold">
                      <a href="https://www.gucci.com/us/en/cart" target="_blank" rel="noopener noreferrer">
                        <ShoppingBag className="w-5 h-5" />
                      </a>
                  </div>
              </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block border-t border-white/10">
              <div className="container mx-auto px-6">
                  <ul className="flex items-center justify-center gap-8 py-4">
                      {navLinks.map((link) => (
                          <li key={link.name}>
                              <a 
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-gucci-gold transition-colors"
                              >
                                  {link.name}
                              </a>
                          </li>
                      ))}
                  </ul>
              </div>
          </nav>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                         <h2 className="text-gucci-gold font-display text-2xl tracking-widest">MENU</h2>
                         <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gucci-gold">
                             <X className="w-8 h-8" />
                         </button>
                    </div>
                    <ul className="flex flex-col gap-6 text-center">
                        {navLinks.map((link) => (
                             <li key={link.name}>
                                 <a 
                                   href={link.url}
                                   target="_blank"
                                   rel="noopener noreferrer" 
                                   className="text-sm font-bold uppercase tracking-widest text-white hover:text-gucci-gold block py-2 border-b border-white/10"
                                 >
                                     {link.name}
                                 </a>
                             </li>
                         ))}
                    </ul>
                </div>
            </div>
          )}
      </header>

      {/* --- HERO SECTION (GREEN / GAME) --- */}
      <section className="relative w-full min-h-[750px] md:min-h-[800px] bg-gucci-green overflow-hidden flex items-center border-b-8 border-gucci-red">
          
          {/* Background Gradient/Pattern */}
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gucci-gradient opacity-90"></div>
             {/* Gucci Pattern Overlay Effect (Subtle) */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Text Content */}
              <div className="text-gucci-cream space-y-6 md:pl-8 pt-10 md:pt-0">
                  <div className="inline-block border border-gucci-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm text-gucci-gold">
                      Exclusive Event
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif leading-tight text-white drop-shadow-md">
                      <span className="block text-2xl md:text-3xl mb-2 font-normal text-gucci-gold italic">{t('welcomeTitle')}</span>
                      <span className="font-bold">{t('specialDiscount')}</span>
                  </h2>
                  <p className="text-sm md:text-base font-sans text-white/90 max-w-md leading-relaxed">
                      {t('welcomeText')}
                  </p>
                  
                  {user && isRevealed && (
                      <div className="pt-4 animate-fade-in-up">
                          <a 
                             href={getWhatsAppLink()}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-3 bg-gucci-gold text-gucci-darkGreen px-8 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors border-2 border-transparent hover:border-gucci-gold shadow-lg"
                          >
                             {t('claimReward')}
                             <ChevronRight className="w-4 h-4" />
                          </a>
                      </div>
                  )}
              </div>

              {/* Right Column: Login OR The Scratch Card */}
              <div className="flex justify-center md:justify-end relative">
                  {/* Decorative Elements around card */}
                  <div className="absolute -inset-2 bg-gucci-gold/30 rounded blur-xl"></div>
                  
                  <div className="relative w-full max-w-sm aspect-[4/5] bg-gucci-cream shadow-2xl rounded p-3 transform transition-transform duration-700 border-2 border-gucci-gold">
                      
                      {!user ? (
                          // SHOW LOGIN FORM IF NO USER
                          <div className="w-full h-full border border-gucci-green/20 bg-white overflow-hidden relative">
                              <LoginForm onLogin={handleLogin} />
                          </div>
                      ) : (
                          // SHOW GAME IF LOGGED IN
                          <div className="w-full h-full border border-gucci-green/20 bg-white relative overflow-hidden">
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
                              {/* Label */}
                              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gucci-darkGreen text-gucci-gold px-4 py-2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-lg animate-fade-in-up border border-gucci-gold">
                                  Lucky Draw Card
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </section>

      {/* --- CONTENT SECTION (VISION & MISSION) --- */}
      <section className="bg-gucci-cream py-20 md:py-28 relative">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h3 className="text-3xl md:text-4xl font-display text-gucci-darkGreen mb-4 drop-shadow-sm">
                      {t('visionTitle')}
                  </h3>
                  <div className="w-24 h-[3px] bg-gucci-red mx-auto"></div>
                  <div className="w-16 h-[3px] bg-gucci-green mx-auto mt-1"></div>
              </div>

              {/* Layout */}
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 bg-white p-8 shadow-xl border border-gucci-gold/20">
                   {/* Decorative Image Left */}
                   <div className="md:col-span-4 relative h-[300px] md:h-auto bg-gucci-darkGreen overflow-hidden flex items-center justify-center">
                       <span className="text-gucci-gold font-display text-6xl opacity-20 rotate-90 whitespace-nowrap">GUCCI 1921</span>
                       <div className="absolute inset-0 border-[10px] border-gucci-red/80 m-4"></div>
                   </div>

                   {/* Text Content Right */}
                   <div className="md:col-span-8 flex flex-col justify-center">
                       <div className="h-[500px] overflow-y-auto pr-6 custom-scrollbar">
                            <h4 className="font-serif text-xl mb-6 text-gucci-darkGreen italic font-bold">
                                {t('visionText1')}
                            </h4>
                            <p className="text-sm font-sans text-gray-700 leading-8 whitespace-pre-line text-justify">
                                {t('visionText2')}
                            </p>
                       </div>
                   </div>
              </div>
          </div>
      </section>

      {/* --- FOOTER SECTION (BLACK) --- */}
      <footer className="bg-black text-gucci-cream py-16 border-t-4 border-gucci-red">
          <div className="container mx-auto px-6">
              
              {/* Footer Links Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4 text-[10px] uppercase tracking-widest text-gray-400">
                  <div className="space-y-4">
                      <h5 className="text-gucci-gold font-bold mb-6">Customer Service</h5>
                      <a href="https://www.gucci.com/us/en/st/contact-us" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Contact Us</a>
                      <a href="https://www.gucci.com/us/en/st/faq" target="_blank" rel="noopener noreferrer" className="block hover:text-white">FAQ</a>
                      <a href="https://www.gucci.com/us/en/st/shipping-info" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Shipping</a>
                  </div>
                  <div className="space-y-4">
                      <h5 className="text-gucci-gold font-bold mb-6">The Brand</h5>
                      <a href="https://www.gucci.com/us/en/st/stories" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Stories</a>
                      <a href="https://www.gucci.com/us/en/st/careers" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Careers</a>
                      <a href="https://www.gucci.com/us/en/st/legal" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Legal</a>
                  </div>
                  <div className="space-y-4">
                      <h5 className="text-gucci-gold font-bold mb-6">Services</h5>
                      <a href="https://www.gucci.com/us/en/st/store-locator" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Store Locator</a>
                      <a href="https://www.gucci.com/us/en/st/book-an-appointment" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Appointments</a>
                  </div>
                  <div className="space-y-4">
                      <h5 className="text-gucci-gold font-bold mb-6">Social</h5>
                      <a href="https://www.instagram.com/gucci/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Instagram</a>
                      <a href="https://www.facebook.com/GUCCI/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Facebook</a>
                      <a href="https://twitter.com/gucci" target="_blank" rel="noopener noreferrer" className="block hover:text-white">X (Twitter)</a>
                  </div>
              </div>

              {/* Bottom Copyright */}
              <div className="text-center mt-16 text-[9px] text-gray-600 uppercase tracking-widest">
                  © 2024 Guccio Gucci S.p.A. - All rights reserved. SIAE LICENCE # 2294/I/1936
              </div>
          </div>
      </footer>
    </div>
  );
};

export default App;