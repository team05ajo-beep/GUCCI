
import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';
import { useLanguage } from '../LanguageContext';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code, user }) => {
  const { t } = useLanguage();
  
  const expiryDateString = useMemo(() => {
    return "1 Januari 2026";
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-[#0a0a0a] overflow-hidden border-[10px] md:border-[14px] border-double border-gucci-gold/30 shadow-2xl select-none">
      
      {/* LUXURY DIAMOND PATTERN - EXACT MATCH */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='none' stroke='%23d4af37' stroke-width='0.7'/%3E%3C/svg%3E")`,
             backgroundSize: '60px 60px'
           }}>
      </div>

      {/* INNER FRAME LINES */}
      <div className="absolute inset-4 border border-gucci-gold/15 pointer-events-none"></div>
      
      {/* CORNER ACCENTS */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-gucci-gold pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-gucci-gold pointer-events-none"></div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-10 px-4 md:py-14 md:px-8">
        
        {/* TOP: GUCCI LOGO & SUBTITLE */}
        <div className="space-y-4 w-full">
            <h1 className="text-gucci-gold text-3xl md:text-5xl font-display font-bold tracking-[0.4em] uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                GUCCI
            </h1>
            <div className="flex flex-col items-center gap-2">
                <div className="w-1.5 h-1.5 border border-gucci-gold rotate-45 mb-1 bg-gucci-gold"></div>
                <h2 className="text-white/70 text-[9px] md:text-[11px] font-sans font-black tracking-[0.5em] uppercase">
                    {t('officialWinner')}
                </h2>
            </div>
        </div>

        {/* MIDDLE: NAME & PRIZE (Matches Screenshot) */}
        <div className="w-full space-y-4 flex flex-col items-center justify-center">
            {user && (
                <div className="text-gucci-gold text-2xl md:text-4xl font-serif font-bold italic tracking-wide drop-shadow-lg">
                    {user.fullName}
                </div>
            )}
            
            <div className="text-white/40 text-[8px] md:text-[10px] font-serif uppercase tracking-[0.7em] italic font-medium">
                SELAMAT TAHUN BARU
            </div>
            
            <div className="text-white text-6xl md:text-8xl font-serif italic font-black leading-none py-2">
                <span className="bg-gradient-to-b from-white via-gray-100 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_12px_24px_rgba(0,0,0,1)]">
                    {prize.amount}
                </span>
            </div>
        </div>

        {/* BOTTOM: CODE BOX WITH OVERLAPPING LABEL */}
        <div className="w-full flex flex-col items-center mt-4">
            <div className="relative w-full max-w-[320px]">
                {/* Overlapping Box Header */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-black border border-gucci-gold/40 px-6 py-1.5 min-w-[200px]">
                    <div className="text-[7px] md:text-[9px] text-gucci-gold uppercase font-black tracking-[0.4em] text-center">
                        {t('codeLabel')}
                    </div>
                </div>
                
                {/* Main Voucher Card Area */}
                <div className="bg-gucci-cream border-2 border-gucci-gold/40 pt-10 pb-8 px-4 shadow-[0_40px_80px_rgba(0,0,0,1)]">
                    <span className="font-sans text-xl md:text-3xl tracking-[0.2em] font-black text-[#111111] block leading-relaxed break-words">
                        {code.replace(/-/g, ' - ')}
                    </span>
                </div>
            </div>

            {/* EXPIRY FOOTER */}
            <div className="mt-8 md:mt-12 space-y-2">
                <div className="text-gucci-gold/40 text-[9px] font-sans uppercase tracking-[0.6em] font-black">
                    BERLAKU HINGGA
                </div>
                <div className="text-white/80 text-sm md:text-base font-serif font-bold italic tracking-[0.2em] drop-shadow-lg">
                    {expiryDateString}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;
