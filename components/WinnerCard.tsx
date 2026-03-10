
import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';
import { useLanguage } from '../LanguageContext';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code, user }) => {
  const { t } = useLanguage();
  
  const expiryDetails = useMemo(() => {
    const now = new Date();
    const expiry = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    const day = expiry.getDate().toString().padStart(2, '0');
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const month = monthNames[expiry.getMonth()];
    const year = expiry.getFullYear();
    const time = `${expiry.getHours().toString().padStart(2, '0')}:${expiry.getMinutes().toString().padStart(2, '0')}`;
    return { full: `${day} ${month} ${year}`, time };
  }, []);

  const amountDisplay = useMemo(() => prize.amount || 'Rp 0', [prize.amount]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-6 overflow-visible select-none box-border">
      
      {/* BACKGROUND & PATTERNS */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#012210] via-[#013220] to-[#011a0b] shadow-2xl"></div>
      <div className="absolute inset-0 opacity-[0.1]" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* LUXURY BORDERS */}
      <div className="absolute inset-[3%] border border-gucci-gold/20 pointer-events-none rounded-sm"></div>
      <div className="absolute inset-[4.5%] border-2 border-gucci-gold/5 pointer-events-none rounded-sm"></div>

      {/* 1. HEADER SECTION (Capped Height) */}
      <div className="relative z-10 w-full flex flex-col items-center pt-4 flex-shrink-0 overflow-visible">
          <h1 className="text-2xl md:text-3xl font-display font-black tracking-[0.4em] text-gucci-gold leading-normal ml-[0.4em]">
              GUCCI
          </h1>
          <div className="flex items-center gap-2 my-1.5 w-full justify-center">
            <div className="h-[1px] w-[15%] bg-gucci-gold/30"></div>
            <p className="text-[8px] md:text-[10px] font-sans font-black tracking-[0.3em] uppercase text-gucci-gold/80">
              RAMADAN KAREEM 2026
            </p>
            <div className="h-[1px] w-[15%] bg-gucci-gold/30"></div>
          </div>
      </div>

      {/* 2. REWARD BODY (Flexible Container) */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center flex-grow py-2 min-h-0">
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gucci-gold/60 mb-1 leading-normal">
              {t('congratsTitle')}
          </p>
          
          {user && (
              <div className="w-[90%] border-b border-gucci-gold/10 mb-2 md:mb-4 text-center px-4 overflow-visible">
                  <span className="text-xl md:text-2xl font-serif font-black italic tracking-tight text-white block px-4 py-2">
                      {user.fullName}
                  </span>
              </div>
          )}

          <div className="bg-gucci-gold/5 backdrop-blur-2xl px-4 py-3 md:px-8 md:py-6 border border-gucci-gold/20 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center w-full max-w-[85%] overflow-visible">
              <div className="flex flex-col items-center leading-normal py-1">
                  <span className="text-xs md:text-sm font-serif font-black italic text-gucci-gold/80 mb-1 px-2">Rp</span>
                  <span className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-white drop-shadow-xl py-1">
                      {amountDisplay.replace('Rp ', '')}
                  </span>
              </div>
              <div className="h-[1px] w-6 bg-gucci-gold/20 my-1 md:my-2"></div>
              <span className="text-[7px] md:text-[8px] font-sans font-black tracking-[0.3em] uppercase text-gucci-gold/40 text-center">
                  PLATINUM REWARD
              </span>
          </div>
      </div>

      {/* 3. CODE & FOOTER (Pinned to Bottom) */}
      <div className="relative z-10 w-full flex flex-col items-center space-y-4 pb-6 flex-shrink-0">
          <div className="relative w-full max-w-[85%] mt-2">
              {/* PRECISION LABEL */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gucci-gold px-4 py-1 shadow-xl z-20">
                  <span className="text-[9px] text-black font-black tracking-[0.3em] uppercase whitespace-nowrap block">
                      {t('codeLabel')}
                  </span>
              </div>
              {/* CODE BOX */}
              <div className="bg-white/5 border border-gucci-gold/30 pt-5 pb-3 px-2 shadow-2xl backdrop-blur-sm">
                  <span className="font-sans text-lg md:text-2xl font-black tracking-[0.2em] text-white block text-center leading-normal">
                      {code.replace(/-/g, ' ')}
                  </span>
              </div>
          </div>

          <div className="flex flex-col items-center gap-1 w-full overflow-visible">
              <div className="flex items-center gap-2 w-full justify-center opacity-40">
                  <div className="h-[0.5px] w-5 bg-gucci-gold"></div>
                  <p className="text-[8px] font-sans font-black uppercase tracking-[0.3em] text-gucci-gold">EXPIRED WITHIN 48H</p>
                  <div className="h-[0.5px] w-5 bg-gucci-gold"></div>
              </div>
              <p className="text-xs font-serif font-black italic text-gucci-gold/90 text-center leading-normal mt-1 pb-2 px-4">
                  {expiryDetails.full} @ {expiryDetails.time} WIB
              </p>
          </div>
      </div>

      {/* CORNER ACCENTS */}
      <div className="absolute top-[4%] left-[4%] w-5 h-5 border-t-2 border-l-2 border-gucci-gold/40"></div>
      <div className="absolute top-[4%] right-[4%] w-5 h-5 border-t-2 border-r-2 border-gucci-gold/40"></div>
      <div className="absolute bottom-[4%] left-[4%] w-5 h-5 border-b-2 border-l-2 border-gucci-gold/40"></div>
      <div className="absolute bottom-[4%] right-[4%] w-5 h-5 border-b-2 border-r-2 border-gucci-gold/40"></div>
    </div>
  );
};

export default WinnerCard;
