
import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';
import { useLanguage } from '../LanguageContext';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code, user }) => {
  const { t } = useLanguage();
  
  const expiryDetails = useMemo(() => {
    const now = new Date();
    const expiry = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48h for Ramadan
    const day = expiry.getDate().toString().padStart(2, '0');
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const month = monthNames[expiry.getMonth()];
    const year = expiry.getFullYear();
    const time = `${expiry.getHours().toString().padStart(2, '0')}:${expiry.getMinutes().toString().padStart(2, '0')}`;
    return { full: `${day} ${month} ${year}`, time };
  }, []);

  const amountDisplay = useMemo(() => prize.amount || 'Rp 0', [prize.amount]);

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-between p-[6%] overflow-hidden select-none box-border">
      
      {/* LUXURY RAMADAN BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#012210] via-[#013220] to-[#011a0b] shadow-2xl"></div>
      
      {/* ARABESQUE PATTERN OVERLAY */}
      <div className="absolute inset-0 opacity-[0.1]" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='%23D4AF37' stroke-width='0.5'/%3E%3C/svg%3E")`,
             backgroundSize: '50px 50px'
           }}>
      </div>

      {/* LUXE BORDERS */}
      <div className="absolute inset-[3%] border border-gucci-gold/20 pointer-events-none rounded-sm"></div>
      <div className="absolute inset-[4.5%] border-2 border-gucci-gold/5 pointer-events-none rounded-sm"></div>

      {/* HEADER */}
      <div className="relative z-10 w-full flex flex-col items-center pt-[5%] flex-shrink-0">
          <h1 className="text-[min(4.5vh,32px)] font-display font-black tracking-[0.4em] text-gucci-gold leading-none ml-[0.4em]">
              GUCCI
          </h1>
          <div className="flex items-center gap-2 my-2 w-full justify-center">
            <div className="h-[1px] flex-grow max-w-[40px] bg-gucci-gold/30"></div>
            <p className="text-[min(1vh,8px)] font-sans font-black tracking-[0.3em] uppercase text-gucci-gold/80">RAMADAN KAREEM 2026</p>
            <div className="h-[1px] flex-grow max-w-[40px] bg-gucci-gold/30"></div>
          </div>
      </div>

      {/* REWARD BODY */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center flex-grow py-2 min-h-0">
          <p className="text-[min(1.2vh,9px)] font-sans font-bold uppercase tracking-[0.2em] text-gucci-gold/60 mb-1">
              {t('congratsTitle')}
          </p>
          
          {user && (
              <div className="w-[85%] border-b border-gucci-gold/10 mb-2 md:mb-5 text-center truncate">
                  <span className="text-[min(2.5vh,20px)] md:text-[min(3.5vh,32px)] font-serif font-black italic tracking-tight text-white block">
                      {user.fullName}
                  </span>
              </div>
          )}

          <div className="bg-gucci-gold/5 backdrop-blur-2xl px-4 py-4 md:px-10 md:py-8 border border-gucci-gold/20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center w-full max-w-[90%]">
              <div className="flex flex-col items-center leading-none">
                  <span className="text-[min(2.5vh,16px)] font-serif font-black italic text-gucci-gold/80 mb-1">Rp</span>
                  <span className="text-[min(5.5vh,45px)] md:text-[min(9vh,75px)] font-serif font-black tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                      {amountDisplay.replace('Rp ', '')}
                  </span>
              </div>
              <div className="h-[1px] w-8 bg-gucci-gold/20 my-2 md:my-3"></div>
              <span className="text-[min(0.8vh,8px)] font-sans font-black tracking-[0.4em] uppercase text-gucci-gold/40 text-center">
                  BERKAH RAMADAN PLATINUM
              </span>
          </div>
      </div>

      {/* FOOTER & CODE */}
      <div className="relative z-10 w-full flex flex-col items-center space-y-4 pb-[5%] flex-shrink-0">
          <div className="relative w-full max-w-[85%]">
              {/* Refined Label Position */}
              <div className="absolute -top-[1.2vh] left-1/2 -translate-x-1/2 bg-gucci-gold px-4 py-[0.5vh] shadow-xl z-20">
                  <span className="text-[min(0.8vh,8px)] text-black font-black tracking-[0.3em] uppercase whitespace-nowrap leading-none block">
                      {t('codeLabel')}
                  </span>
              </div>
              <div className="bg-transparent border-2 border-gucci-gold/30 pt-5 pb-4 px-2 shadow-2xl backdrop-blur-sm">
                  <span className="font-sans text-[min(1.8vh,16px)] md:text-[min(2.8vh,24px)] font-black tracking-[0.2em] text-white block text-center leading-none">
                      {code.replace(/-/g, ' ')}
                  </span>
              </div>
          </div>

          <div className="flex flex-col items-center gap-1 w-full">
              <div className="flex items-center gap-2 w-full justify-center opacity-40">
                  <div className="h-[0.5px] w-6 bg-gucci-gold"></div>
                  <p className="text-[min(0.8vh,8px)] font-sans font-black uppercase tracking-[0.4em] text-gucci-gold">BERLAKU DI SELURUH BUTIK</p>
                  <div className="h-[0.5px] w-6 bg-gucci-gold"></div>
              </div>
              <p className="text-[min(1.3vh,12px)] md:text-[min(2vh,18px)] font-serif font-black italic text-gucci-gold/90 text-center leading-none mt-1">
                  {expiryDetails.full} @ {expiryDetails.time} WIB
              </p>
          </div>
      </div>

      {/* ORNAMENTAL CORNERS */}
      <div className="absolute top-[4%] left-[4%] w-[3vh] h-[3vh] border-t-2 border-l-2 border-gucci-gold/40"></div>
      <div className="absolute top-[4%] right-[4%] w-[3vh] h-[3vh] border-t-2 border-r-2 border-gucci-gold/40"></div>
      <div className="absolute bottom-[4%] left-[4%] w-[3vh] h-[3vh] border-b-2 border-l-2 border-gucci-gold/40"></div>
      <div className="absolute bottom-[4%] right-[4%] w-[3vh] h-[3vh] border-b-2 border-r-2 border-gucci-gold/40"></div>
    </div>
  );
};

export default WinnerCard;
