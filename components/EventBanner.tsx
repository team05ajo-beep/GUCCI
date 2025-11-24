
import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const EventBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-lg mx-auto mb-8 relative z-20">
        <div className="relative px-6 py-3 bg-white border-y border-gray-300 shadow-sm flex items-center justify-between group">
            
            {/* Minimalist Decoration Lines */}
            <div className="absolute top-0.5 left-0 w-full h-[1px] bg-gray-100"></div>
            <div className="absolute bottom-0.5 left-0 w-full h-[1px] bg-gray-100"></div>

            {/* Left Icon */}
            <Sparkles strokeWidth={1} className="w-4 h-4 text-gray-400 group-hover:text-yellow-600 transition-colors" />

            {/* Text Content */}
            <div className="flex items-center gap-3">
                <span className="text-gray-500 text-[10px] font-sans font-bold uppercase tracking-[0.15em]">
                    {t('validUntil')}
                </span>
                <div className="h-4 w-[1px] bg-gray-300"></div>
                <span className="text-gray-900 font-serif font-bold italic tracking-wide">
                    15 December 2025
                </span>
            </div>

            {/* Right Icon */}
            <Sparkles strokeWidth={1} className="w-4 h-4 text-gray-400 group-hover:text-yellow-600 transition-colors" />
        </div>
    </div>
  );
};

export default EventBanner;
