
import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';
import { useLanguage } from '../LanguageContext';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code, user }) => {
  const { t } = useLanguage();
  
  const expiryDateString = useMemo(() => {
    return t('expiryDate');
  }, [t]);

  const amountParts = useMemo(() => {
    const amount = prize.amount || '';
    if (amount.startsWith('Rp ')) {
      return { currency: 'Rp', value: amount.replace('Rp ', '') };
    }
    return { currency: '', value: amount };
  }, [prize.amount]);

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-[#070707] overflow-hidden border-[10px] md:border-[16px] border-double border-gucci-gold/25 shadow-inner select-none">
      
      {/* LUXURY BACKGROUND PATTERN */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0l25 25-25 25-25-25z' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3C/svg%3E")`,
             backgroundSize: '50px 50px'
           }}>
      </div>

      <div className="absolute inset-4 border border-gucci-gold/10 pointer-events-none"></div>
      
      {/* CORNER DECORATIONS */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-gucci-gold/40 pointer-events-none"></div>
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-gucci-gold/40 pointer-events-none"></div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-6 md:py-16 md:px-10">
        
        {/* HEADER BRANDING */}
        <div className="w-full space-y-3">
            <h1 className="text-gucci-gold text-3xl md:text-5xl font-display font-bold tracking-[0.45em] uppercase drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                GUCCI
            </h1>
            <div className="flex flex-col items-center gap-1.5">
                <div className="w-2 h-2 bg-gucci-gold rotate-45 mb-1 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                <h2 className="text-white/80 text-[9px] md:text-[11px] font-sans font-black tracking-[0.6em] uppercase">
                    {t('officialWinner')}
                </h2>
            </div>
        </div>

        {/* PRIZE DISPLAY */}
        <div className="w-full flex flex-col items-center justify-center space-y-5">
            {user && (
                <div className="text-gucci-gold text-2xl md:text-4xl font-serif font-bold italic tracking-wide drop-shadow-lg">
                    {user.fullName}
                </div>
            )}
            
            <div className="text-white/40 text-[9px] md:text-[11px] font-serif uppercase tracking-[0.7em] italic font-bold">
                SELAMAT TAHUN BARU
            </div>
            
            <div className="flex flex-col items-center">
                {amountParts.currency && (
                  <span className="text-white text-3xl md:text-5xl font-serif italic font-black bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                    {amountParts.currency}
                  </span>
                )}
                <div className="text-white text-5xl md:text-[90px] font-serif italic font-black leading-none py-1">
                    <span className="bg-gradient-to-b from-white via-gray-50 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_12px_24px_rgba(0,0,0,1)]">
                        {amountParts.value}
                    </span>
                </div>
            </div>
        </div>

        {/* VOUCHER IDENTIFIER */}
        <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-[320px] md:max-w-[360px]">
                {/* Badge Label */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 bg-black border border-gucci-gold/60 px-8 py-2 min-w-[200px] shadow-xl">
                    <div className="text-[8px] md:text-[10px] text-gucci-gold uppercase font-black tracking-[0.5em] text-center">
                        {t('codeLabel')}
                    </div>
                </div>
                
                {/* The Code Content */}
                <div className="bg-[#fcfaf2] border-2 border-gucci-gold/30 pt-12 pb-9 px-6 shadow-[0_25px_60px_rgba(0,0,0,1)]">
                    <span className="font-sans text-xl md:text-3xl tracking-[0.25em] font-black text-[#050505] block leading-tight break-words">
                        {code.replace(/-/g, ' ')}
                    </span>
                </div>
            </div>

            {/* EXPIRY FOOTER */}
            <div className="mt-10 md:mt-14 space-y-2">
                <div className="text-white/40 text-[9px] md:text-[11px] font-sans uppercase tracking-[0.7em] font-black">
                    VALID UNTIL
                </div>
                <div className="text-white text-sm md:text-xl font-serif font-bold italic tracking-widest drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                    {expiryDateString}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;
