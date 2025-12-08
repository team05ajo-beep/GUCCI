
import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const EventBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-lg mx-auto mb-8 relative z-20">
        <div className="relative px-6 py-3 bg-black/30 backdrop-blur-sm border-y border-white/20 shadow-lg flex items-center justify-between group rounded-full">
            
            {/* Minimalist Decoration Lines */}
            
            {/* Left Icon */}
            <Sparkles strokeWidth={1} className="w-4 h-4 text-gucci-gold group-hover:text-white transition-colors" />

            {/* Text Content */}
            <div className="flex items-center gap-3">
                <span className="text-white/80 text-[10px] font-sans font-bold uppercase tracking-[0.15em]">
                    {t('validUntil')}
                </span>
                <div className="h-3 w-[1px] bg-white/40"></div>
                <span className="text-white font-serif font-bold italic tracking-wide">
                    15 December 2025
                </span>
            </div>

            {/* Right Icon */}
            <Sparkles strokeWidth={1} className="w-4 h-4 text-gucci-gold group-hover:text-white transition-colors" />
        </div>
    </div>
  );
};

export default EventBanner;
