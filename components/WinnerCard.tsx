
import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';
import { useLanguage } from '../LanguageContext';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code, user }) => {
  const { t } = useLanguage();
  
  const expiryDateString = useMemo(() => {
    return t('expiryDate');
  }, [t]);

  // Extract amount parts for cleaner styling (Rp and the number)
  const amountParts = useMemo(() => {
    const amount = prize.amount || '';
    if (amount.startsWith('Rp ')) {
      return { currency: 'Rp', value: amount.replace('Rp ', '') };
    }
    return { currency: '', value: amount };
  }, [prize.amount]);

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-[#050505] overflow-hidden border-[8px] md:border-[14px] border-double border-gucci-gold/30 shadow-2xl select-none">
      
      {/* LUXURY DIAMOND PATTERN - BRIGHTER ACCENTS */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20-20-20z' fill='none' stroke='%23d4af37' stroke-width='0.6'/%3E%3C/svg%3E")`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      <div className="absolute inset-3 border border-gucci-gold/15 pointer-events-none"></div>
      
      {/* CORNER ACCENTS */}
      <div className="absolute top-5 left-5 w-10 h-10 border-t border-l border-gucci-gold/50 pointer-events-none"></div>
      <div className="absolute bottom-5 right-5 w-10 h-10 border-b border-r border-gucci-gold/50 pointer-events-none"></div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-10 px-6 md:py-14 md:px-8">
        
        {/* TOP BRANDING */}
        <div className="space-y-2 w-full">
            <h1 className="text-gucci-gold text-3xl md:text-5xl font-display font-bold tracking-[0.4em] uppercase drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                GUCCI
            </h1>
            <div className="flex flex-col items-center gap-1">
                <div className="w-1.5 h-1.5 bg-gucci-gold rotate-45 mb-1 shadow-[0_0_8px_rgba(212,175,55,0.6)]"></div>
                <h2 className="text-white/80 text-[8px] md:text-[11px] font-sans font-black tracking-[0.5em] uppercase">
                    {t('officialWinner')}
                </h2>
            </div>
        </div>

        {/* WINNER NAME & PRIZE (High Contrast) */}
        <div className="w-full space-y-4 flex flex-col items-center justify-center">
            {user && (
                <div className="text-gucci-gold text-xl md:text-4xl font-serif font-bold italic tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {user.fullName}
                </div>
            )}
            
            <div className="text-white/60 text-[8px] md:text-[10px] font-serif uppercase tracking-[0.6em] italic font-bold">
                SELAMAT TAHUN BARU
            </div>
            
            <div className="flex flex-col items-center gap-0 md:gap-2">
                {amountParts.currency && (
                  <span className="text-white text-3xl md:text-5xl font-serif italic font-black leading-none bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                    {amountParts.currency}
                  </span>
                )}
                <div className="text-white text-5xl md:text-8xl font-serif italic font-black leading-none py-1">
                    <span className="bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                        {amountParts.value}
                    </span>
                </div>
            </div>
        </div>

        {/* VOUCHER CODE BOX */}
        <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-[300px] md:max-w-[340px]">
                {/* Overlapping Box Header */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-black border border-gucci-gold/50 px-6 py-1.5 min-w-[180px]">
                    <div className="text-[7px] md:text-[9px] text-gucci-gold uppercase font-black tracking-[0.4em] text-center">
                        {t('codeLabel')}
                    </div>
                </div>
                
                {/* Voucher Content */}
                <div className="bg-gucci-cream border-2 border-gucci-gold/40 pt-10 pb-8 px-4 shadow-[0_20px_50px_rgba(0,0,0,1)]">
                    <span className="font-sans text-xl md:text-3xl tracking-[0.2em] font-black text-[#0a0a0a] block leading-relaxed break-words">
                        {code.replace(/-/g, ' ')}
                    </span>
                </div>
            </div>

            {/* EXPIRY INFO - BRIGHTER */}
            <div className="mt-8 md:mt-12 space-y-2">
                <div className="text-white/50 text-[8px] md:text-[10px] font-sans uppercase tracking-[0.6em] font-black">
                    VALID UNTIL
                </div>
                <div className="text-white text-sm md:text-lg font-serif font-bold italic tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                    {expiryDateString}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;
