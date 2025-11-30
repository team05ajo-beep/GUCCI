import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';
import { useLanguage } from '../LanguageContext';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code }) => {
  const { t, language } = useLanguage();
  
  const expiryDateString = useMemo(() => {
    const date = new Date();
    date.setHours(date.getHours() + 24); 
    
    // Map internal language codes to BCP 47 locale codes
    const localeMap: Record<string, string> = {
        'en': 'en-US',
        'id': 'id-ID',
        'it': 'it-IT',
        'fr': 'fr-FR'
    };

    const locale = localeMap[language] || 'en-US';

    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
  }, [language]);

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-gradient-to-r from-gucci-green via-gucci-red to-gucci-green p-4 select-none border-[6px] border-gucci-gold">
      
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2">
        <h2 className="text-gucci-gold text-[10px] font-sans font-bold tracking-[0.2em] uppercase mb-2">
            {t('invitation')}
        </h2>
        
        <div className="text-white text-xl font-sans font-bold mb-1 leading-none uppercase tracking-wide drop-shadow-md">
            {prize.isGrandPrize ? t('specialDiscount') : t('giftVoucher')}
        </div>
        
        <div className="text-gucci-gold text-2xl md:text-3xl font-serif italic font-bold mb-4 drop-shadow-md animate-bounce">
            {prize.amount}
        </div>

        <div className="bg-gucci-cream text-black border-2 border-gucci-gold px-4 py-2 mb-4 rounded shadow-lg">
            <span className="font-mono text-sm md:text-lg tracking-[0.1em] font-bold">
                {code}
            </span>
        </div>

        <div className="bg-black/30 backdrop-blur-sm text-gucci-cream text-[9px] font-sans leading-relaxed rounded p-2 w-full border border-white/10">
            {t('validUntil')} <br/>
            <span className="text-gucci-gold font-bold text-xs">{expiryDateString}</span>
        </div>
        
        <p className="text-[8px] text-white/70 mt-2 italic">
            *Tukarkan segera untuk seluruh transaksi di Gucci Indonesia
        </p>
      </div>
    </div>
  );
};

export default WinnerCard;