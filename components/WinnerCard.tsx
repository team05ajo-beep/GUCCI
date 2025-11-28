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
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    }).format(date);
  }, [language]);

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-white p-6 select-none border-4 border-sisley-gold">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-sisley-red text-xs font-sans font-bold tracking-[0.2em] uppercase mb-4">
            {t('invitation')}
        </h2>
        
        <div className="text-black text-2xl md:text-3xl font-sans font-bold mb-2 leading-none uppercase">
            {prize.isGrandPrize ? t('specialDiscount') : t('giftVoucher')}
        </div>
        
        <div className="text-sisley-red text-xl md:text-3xl font-serif italic font-black mb-6 drop-shadow-sm">
            {prize.amount}
        </div>

        <div className="inline-block bg-sisley-burgundy text-white border border-sisley-burgundy px-6 py-2 shadow-md mb-6">
            <span className="font-mono text-lg tracking-[0.15em] font-bold">
                {code}
            </span>
        </div>

        <div className="border-t border-gray-200 w-full mb-3"></div>

        <div className="text-gray-600 text-[10px] font-sans leading-relaxed">
            {t('validUntil')} <span className="text-sisley-red font-bold">{expiryDateString}</span>
        </div>
        <p className="text-[9px] text-gray-400 mt-1 italic">
            {t('redeemable')}
        </p>
      </div>
    </div>
  );
};

export default WinnerCard;