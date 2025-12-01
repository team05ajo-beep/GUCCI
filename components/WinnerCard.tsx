
import React, { useMemo } from 'react';
import { WinnerCardProps, PrizeCategory } from '../types';
import { useLanguage } from '../LanguageContext';
import { Snowflake, Sparkles, Gift, Plane, Smartphone, Watch, ShoppingBag, Home } from 'lucide-react';

// Map categories to high-quality generic Unsplash images for visuals
const categoryImages: Record<PrizeCategory, string> = {
    umroh: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=600&q=80', // Mecca
    electronics: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', // Modern Tech
    fashion: 'https://images.unsplash.com/photo-1549675583-042981794b1c?auto=format&fit=crop&w=600&q=80', // Luxury Bag/Accessory
    home: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80', // Modern Interior
    voucher: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=600&q=80' // Gift Box
};

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

  const imageUrl = categoryImages[prize.category];

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-between text-center bg-gucci-darkGreen overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gucci-gold/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

      {/* Holiday Decorations */}
      <div className="absolute top-2 left-2 animate-bounce z-20">
          <Snowflake className="w-5 h-5 text-white/50" />
      </div>
      <div className="absolute top-2 right-2 animate-bounce delay-700 z-20">
          <Sparkles className="w-5 h-5 text-gucci-gold/50" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center p-4">
        
        {/* Header: Congratulations */}
        <div className="mt-2 mb-2">
            <h2 className="text-gucci-gold text-[10px] font-sans font-bold tracking-[0.25em] uppercase flex items-center gap-2 justify-center">
                <Sparkles className="w-3 h-3" />
                {t('invitation')}
                <Sparkles className="w-3 h-3" />
            </h2>
            <div className="text-white text-lg md:text-xl font-display font-bold leading-none uppercase tracking-wide drop-shadow-md mt-1">
                {prize.isGrandPrize ? t('specialDiscount') : t('giftVoucher')}
            </div>
        </div>
        
        {/* Main Visual: Image of Prize Category */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 my-auto group">
            <div className="absolute inset-0 bg-gucci-gold rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse"></div>
            <div className="w-full h-full rounded-full border-[3px] border-gucci-gold shadow-2xl overflow-hidden relative bg-black">
                <img 
                    src={imageUrl} 
                    alt={prize.category} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            {/* Category Icon Overlay */}
            <div className="absolute bottom-0 right-0 bg-gucci-gold text-gucci-darkGreen p-1.5 rounded-full shadow-lg border border-white">
                {prize.category === 'umroh' && <Plane className="w-4 h-4" />}
                {prize.category === 'electronics' && <Smartphone className="w-4 h-4" />}
                {prize.category === 'fashion' && <ShoppingBag className="w-4 h-4" />}
                {prize.category === 'home' && <Home className="w-4 h-4" />}
                {prize.category === 'voucher' && <Gift className="w-4 h-4" />}
            </div>
        </div>

        {/* Prize Name */}
        <div className="w-full px-2 mb-2">
            <div className="text-gucci-cream text-lg md:text-2xl font-serif italic font-bold leading-tight drop-shadow-md animate-fade-in-up">
                {prize.amount}
            </div>
        </div>

        {/* Code Section */}
        <div className="w-full max-w-[200px] bg-gucci-cream/10 backdrop-blur-md border border-gucci-gold/50 px-3 py-1.5 mb-2 rounded shadow-lg relative overflow-hidden group">
            <div className="text-[8px] text-gucci-gold uppercase tracking-widest mb-0.5">Kode Unik</div>
            <span className="font-mono text-base md:text-lg tracking-[0.1em] font-bold text-white relative z-10 block group-hover:scale-105 transition-transform">
                {code}
            </span>
        </div>

        {/* Footer Info */}
        <div className="bg-black/40 backdrop-blur-sm text-gucci-cream text-[9px] font-sans leading-relaxed rounded p-2 w-full border border-white/10 mt-auto">
            {t('validUntil')} <span className="text-gucci-gold font-bold">{expiryDateString}</span>
            <p className="text-[8px] text-white/50 mt-1 italic">
                *Tukarkan segera di Butik Gucci Indonesia
            </p>
        </div>
        
      </div>
    </div>
  );
};

export default WinnerCard;
