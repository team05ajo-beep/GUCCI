
import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';
import { useLanguage } from '../LanguageContext';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code, user }) => {
  const { t } = useLanguage();
  
  const expiryDateString = useMemo(() => {
    return "1 Januari 2026";
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-black/95 backdrop-blur-md overflow-hidden border-[12px] border-double border-gucci-gold/25 shadow-2xl">
      
      {/* LUXURY DIAMOND BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0l25 25-25 25-25-25z' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3C/svg%3E")`,
             backgroundSize: '50px 50px'
           }}>
      </div>

      {/* ORNATE FRAME ELEMENTS */}
      <div className="absolute inset-5 border border-gucci-gold/10 pointer-events-none"></div>
      <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-gucci-gold pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-gucci-gold pointer-events-none"></div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-6">
        
        {/* LOGO & OFFICIAL HEADER */}
        <div className="space-y-4 w-full">
            <h1 className="text-gucci-gold text-4xl font-display font-bold tracking-[0.45em] uppercase drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]">
                GUCCI
            </h1>
            <div className="flex flex-col items-center gap-2">
                <div className="w-2 h-2 border border-gucci-gold rotate-45 mb-1 bg-black"></div>
                <h2 className="text-white/60 text-[10px] font-sans font-black tracking-[0.5em] uppercase">
                    {t('officialWinner')}
                </h2>
            </div>
        </div>

        {/* WINNER NAME & PRIZE DISPLAY */}
        <div className="w-full space-y-4">
            {user && (
                <div className="text-gucci-gold text-3xl font-serif font-bold italic tracking-wide drop-shadow-md">
                    {user.fullName}
                </div>
            )}
            <div className="text-gucci-gold/60 text-[10px] font-serif uppercase tracking-[0.6em] italic">
                {t('congratsTitle')}
            </div>
            
            <div className="text-white text-6xl md:text-7xl font-serif italic font-black leading-tight">
                <span className="bg-gradient-to-b from-white via-white/95 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_15px_30px_rgba(0,0,0,1)]">
                    {prize.amount}
                </span>
            </div>
        </div>

        {/* CODE BOX (High Contrast for Visibility) */}
        <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-[300px]">
                {/* Overlapping Box Header */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-[#050505] border border-gucci-gold/40 px-6 py-1 min-w-[180px]">
                    <div className="text-[8px] text-gucci-gold uppercase font-black tracking-[0.4em]">
                        {t('codeLabel')}
                    </div>
                </div>
                
                {/* Physical Card Area */}
                <div className="bg-gucci-cream border-2 border-gucci-gold/50 pt-9 pb-7 px-4 shadow-[0_30px_60px_rgba(0,0,0,1)]">
                    <span className="font-sans text-xl md:text-2xl tracking-[0.2em] font-black text-[#0a0a0a] block leading-relaxed">
                        {code.replace(/-/g, ' - ')}
                    </span>
                </div>
            </div>

            {/* EXPIRY INFORMATION */}
            <div className="mt-10 space-y-2">
                <div className="text-gucci-gold/40 text-[9px] font-sans uppercase tracking-[0.6em] font-black">
                    {t('validUntil')}
                </div>
                <div className="text-white/90 text-sm font-serif font-bold italic tracking-widest drop-shadow-lg">
                    {expiryDateString}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;
