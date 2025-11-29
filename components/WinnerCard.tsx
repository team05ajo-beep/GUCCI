import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';
import { useLanguage } from '../LanguageContext';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code }) => {
  const { t, language } = useLanguage();
  
  const expiryDateString = useMemo(() => {
    const date = new Date();
    date.setHours(date.getHours() + 24); 
    
    // Map internal language codes to BCP 47 locale codes if necessary
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
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-white p-4 select-none">
      
      <div className="relative z-10 w-full h-full border border-gray-100 flex flex-col items-center justify-center p-2">
        <h2 className="text-gray-400 text-[10px] font-sans font-bold tracking-[0.2em] uppercase mb-2">
            {t('invitation')}
        </h2>
        
        <div className="text-black text-xl font-sans font-bold mb-1 leading-none uppercase tracking-wide">
            {prize.isGrandPrize ? t('specialDiscount') : t('giftVoucher')}
        </div>
        
        <div className="text-[#990000] text-2xl font-serif italic font-bold mb-4">
            {prize.amount}
        </div>

        <div className="bg-gray-50 text-black border border-gray-200 px-4 py-1.5 mb-4">
            <span className="font-mono text-sm tracking-[0.1em] font-bold">
                {code}
            </span>
        </div>

        <div className="text-gray-500 text-[9px] font-sans leading-relaxed border-t border-gray-100 pt-2 w-full">
            {t('validUntil')} <br/>
            <span className="text-black font-bold">{expiryDateString}</span>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;