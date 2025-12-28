
import React from 'react';
import { PartyPopper } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const EventBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-lg mx-auto mb-8 relative z-20">
        <div className="relative px-6 py-3 bg-black/40 backdrop-blur-md border-y border-white/10 shadow-2xl flex items-center justify-between group rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gucci-gold/5 to-transparent animate-pulse"></div>
            
            <PartyPopper strokeWidth={1} className="w-4 h-4 text-gucci-gold group-hover:scale-110 transition-transform" />

            <div className="flex items-center gap-4 relative z-10">
                <span className="text-white/60 text-[9px] font-sans font-bold uppercase tracking-[0.3em]">
                    {t('validUntil')}
                </span>
                <div className="h-4 w-[1px] bg-white/20"></div>
                <span className="text-white font-serif font-bold italic tracking-wider text-sm">
                    1 January 2026
                </span>
            </div>

            <PartyPopper strokeWidth={1} className="w-4 h-4 text-gucci-gold group-hover:scale-110 transition-transform" />
        </div>
    </div>
  );
};

export default EventBanner;
