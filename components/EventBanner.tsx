import React from 'react';
import { Sparkles } from 'lucide-react';

const EventBanner: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto mb-6 relative z-20 transform hover:scale-105 transition-transform duration-300">
        {/* Outer Glow/Border with animated gradient */}
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-600 rounded-xl blur opacity-75 animate-gradient-x"></div>
        
        {/* Inner Container */}
        <div className="relative px-3 py-3 md:py-4 bg-gradient-to-r from-red-900 to-red-700 rounded-xl border border-yellow-400/50 shadow-2xl flex items-center justify-between overflow-hidden group">
            
            {/* Shine Effect - Sweeps across */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shine" />

            {/* Left Icon */}
            <div className="bg-white/10 p-1.5 rounded-full backdrop-blur-sm animate-bounce z-10">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
            </div>

            {/* Text Content */}
            <div className="flex-1 flex flex-col items-center justify-center mx-2 z-10">
                <span className="text-yellow-200 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1 drop-shadow-sm">
                    ✨ Special Promo ✨
                </span>
                <div className="text-center leading-tight flex flex-col items-center">
                    <span className="text-white font-serif font-bold text-sm md:text-base drop-shadow-md mb-1">
                        Event Berlaku Hingga
                    </span>
                    <div className="relative">
                         <div className="absolute -inset-1 bg-yellow-400 blur opacity-30 rounded-full animate-pulse"></div>
                         <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-500 text-red-900 px-4 py-1 rounded-full font-black text-sm md:text-lg shadow-[0_2px_10px_rgba(0,0,0,0.3)] border border-yellow-200">
                            15 DESEMBER 2025
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Icon */}
            <div className="bg-white/10 p-1.5 rounded-full backdrop-blur-sm animate-bounce delay-75 z-10">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
            </div>
        </div>
    </div>
  );
};

export default EventBanner;