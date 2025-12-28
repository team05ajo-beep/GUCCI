
import React from 'react';
import { PartyPopper } from 'lucide-react';

export const NewYearCelebration: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative ${className} flex flex-col justify-center items-center text-gucci-gold`}>
      <PartyPopper className="w-16 h-16 animate-float mb-4" />
      <div className="text-center font-display tracking-[0.4em] text-xs font-black">2026</div>
      <div className="absolute inset-0 bg-gucci-gold/5 blur-3xl rounded-full"></div>
    </div>
  );
};
