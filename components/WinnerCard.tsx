
import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';
import { useLanguage } from '../LanguageContext';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code, user }) => {
  const { t } = useLanguage();
  
  const expiryDateString = useMemo(() => {
    return t('expiryDate');
  }, [t]);

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-[#0a0a0a] overflow-hidden border-[8px] md:border-[12px] border-double border-gucci-gold/20 shadow-2xl select-none">
      
      {/* LUXURY DIAMOND PATTERN */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20-20-20z' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3C/svg%3E")`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      <div className="absolute inset-3 border border-gucci-gold/10 pointer-events-none"></div>
      
      {/* CORNER ACCENTS */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gucci-gold/40 pointer-events-none"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gucci-gold/40 pointer-events-none"></div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-8 px-6 md:py-12 md:px-8">
        
        {/* HEADER */}
        <div className="space-y-2 w-full">
            <h1 className="text-gucci-gold text-2xl md:text-4xl font-display font-bold tracking-[0.3em] uppercase">
                GUCCI
            </h1>
            <div className="flex flex-col items-center gap-1">
                <div className="w-1 h-1 bg-gucci-gold rotate-45 mb-1"></div>
                <h2 className="text-white/50 text-[7px] md:text-[9px] font-sans font-black tracking-[0.4em] uppercase">
                    {t('officialWinner')}
                </h2>
            </div>
        </div>

        {/* PRIZE SECTION */}
        <div className="w-full space-y-3 flex flex-col items-center">
            {user && (
                <div className="text-gucci-gold text-lg md:text-3xl font-serif font-bold italic tracking-wide">
                    {user.fullName}
                </div>
            )}
            
            <div className="text-white/30 text-[7px] md:text-[9px] font-serif uppercase tracking-[0.5em] italic">
                SELAMAT TAHUN BARU
            </div>
            
            <div className="text-white text-4xl md:text-7xl font-serif italic font-black leading-none py-1">
                <span className="bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                    {prize.amount}
                </span>
            </div>
        </div>

        {/* FOOTER & CODE */}
        <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-[280px]">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 bg-black border border-gucci-gold/30 px-4 py-1">
                    <div className="text-[6px] md:text-[8px] text-gucci-gold uppercase font-black tracking-[0.3em]">
                        {t('codeLabel')}
                    </div>
                </div>
                
                <div className="bg-gucci-cream border border-gucci-gold/30 pt-8 pb-6 px-4">
                    <span className="font-sans text-lg md:text-2xl tracking-[0.15em] font-black text-[#111] block break-words">
                        {code.replace(/-/g, ' ')}
                    </span>
                </div>
            </div>

            <div className="mt-6 md:mt-10 space-y-1">
                <div className="text-gucci-gold/30 text-[7px] font-sans uppercase tracking-[0.5em] font-black">
                    VALID UNTIL
                </div>
                <div className="text-white/80 text-xs md:text-sm font-serif font-bold italic tracking-wider">
                    {expiryDateString}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;
