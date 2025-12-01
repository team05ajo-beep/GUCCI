
import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';
import { useLanguage } from '../LanguageContext';
import { Snowflake, Sparkles } from 'lucide-react';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code }) => {
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
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gucci-gold/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

      {/* Holiday Decorations */}
      <div className="absolute top-2 left-2 animate-bounce z-20">
          <Snowflake className="w-5 h-5 text-white/50" />
      </div>
      <div className="absolute top-2 right-2 animate-bounce delay-700 z-20">
          <Sparkles className="w-5 h-5 text-gucci-gold/50" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 space-y-4">
        
        {/* Header: Congratulations */}
        <div>
            <h2 className="text-gucci-gold text-xs font-sans font-bold tracking-[0.25em] uppercase flex items-center gap-2 justify-center">
                <Sparkles className="w-3 h-3" />
                {t('invitation')}
                <Sparkles className="w-3 h-3" />
            </h2>
            <div className="text-white text-xl md:text-2xl font-display font-bold leading-tight uppercase tracking-wide drop-shadow-md mt-2">
                {prize.isGrandPrize ? t('specialDiscount') : t('giftVoucher')}
            </div>
        </div>
        
        {/* Prize Name (Text Only) */}
        <div className="w-full px-2 py-4 border-y border-gucci-gold/30 bg-white/5 backdrop-blur-sm">
            <div className="text-gucci-gold text-2xl md:text-3xl font-serif italic font-bold leading-tight drop-shadow-md animate-fade-in-up">
                {prize.amount}
            </div>
        </div>

        {/* Code Section */}
        <div className="w-full max-w-[220px] bg-gucci-cream text-gucci-black px-4 py-2 rounded shadow-xl border-2 border-gucci-gold relative overflow-hidden group transform hover:scale-105 transition-transform duration-300">
            <div className="text-[9px] text-gucci-darkGreen uppercase tracking-widest mb-1 font-bold">Kode Unik</div>
            <span className="font-mono text-xl md:text-2xl tracking-[0.1em] font-black block">
                {code}
            </span>
        </div>

        {/* Footer Info */}
        <div className="text-gucci-cream text-[10px] font-sans leading-relaxed mt-4 opacity-80">
            {t('validUntil')} <span className="text-gucci-gold font-bold">{expiryDateString}</span>
            <p className="text-[9px] text-white/50 mt-1 italic">
                *Tukarkan segera di Butik Gucci Indonesia
            </p>
        </div>
        
      </div>
    </div>
  );
};

export default WinnerCard;
