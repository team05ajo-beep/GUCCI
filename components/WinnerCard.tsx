
import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';
import { useLanguage } from '../LanguageContext';
import { Snowflake, Sparkles } from 'lucide-react';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code, user }) => {
  const { t, language } = useLanguage();
  
  const expiryDateString = useMemo(() => {
    const date = new Date();
    date.setHours(date.getHours() + 24); 
    
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
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-gucci-darkGreen overflow-hidden">
      
      {/* PREMIUM BATIK BACKGROUND (KAWUNG MOTIF) */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0 10c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm-10-20c-5.523 0-10-4.477-10-10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0 20c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zM50 10c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0 20c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z' fill='%23d4af37' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
        }}
      ></div>

      {/* Border Frame */}
      <div className="absolute inset-2 border-2 border-gucci-gold/30 rounded-sm pointer-events-none"></div>

      {/* Holiday Decorations */}
      <div className="absolute top-4 left-4 animate-bounce z-20">
          <Snowflake className="w-5 h-5 text-white/30" />
      </div>
      <div className="absolute top-4 right-4 animate-bounce delay-700 z-20">
          <Sparkles className="w-5 h-5 text-gucci-gold/30" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 space-y-3">
        
        {/* Header: Official Winner */}
        <div>
            <h2 className="text-gucci-gold text-xs font-sans font-bold tracking-[0.25em] uppercase flex items-center gap-2 justify-center drop-shadow-md">
                <Sparkles className="w-3 h-3" />
                {t('officialWinner')}
                <Sparkles className="w-3 h-3" />
            </h2>
            
            {/* User Details */}
            {user && (
                <div className="mt-2 animate-fade-in-up">
                    <div className="text-white text-lg md:text-xl font-serif font-bold uppercase tracking-wide drop-shadow-lg border-b border-gucci-gold/50 pb-1 mx-6 mb-1">
                        {user.fullName}
                    </div>
                    <div className="text-gucci-cream/80 text-xs font-mono tracking-wider">
                        {user.phoneNumber}
                    </div>
                </div>
            )}
        </div>
        
        {/* Prize Name (Text Only) */}
        <div className="w-full px-2 py-3 border-y border-gucci-gold/30 bg-gucci-darkGreen/60 backdrop-blur-sm my-1">
            <div className="text-[9px] text-gucci-gold uppercase tracking-widest mb-1">{prize.isGrandPrize ? t('specialDiscount') : t('giftVoucher')}</div>
            <div className="text-gucci-cream text-xl md:text-2xl font-serif italic font-bold leading-tight drop-shadow-md">
                {prize.amount}
            </div>
        </div>

        {/* Code Section */}
        <div className="w-full max-w-[220px] bg-gucci-cream text-gucci-black px-4 py-2 rounded shadow-xl border-2 border-gucci-gold relative overflow-hidden group transform hover:scale-105 transition-transform duration-300">
            <div className="text-[9px] text-gucci-darkGreen uppercase tracking-widest mb-1 font-bold">Kode Unik</div>
            <span className="font-mono text-lg md:text-xl tracking-[0.1em] font-black block">
                {code}
            </span>
        </div>

        {/* Footer Info */}
        <div className="text-gucci-cream text-[9px] font-sans leading-relaxed opacity-80 mt-2 bg-black/20 px-2 py-1 rounded">
            {t('validUntil')} <span className="text-gucci-gold font-bold">{expiryDateString}</span>
        </div>
        
      </div>
    </div>
  );
};

export default WinnerCard;
