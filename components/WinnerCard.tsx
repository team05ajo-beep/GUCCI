
import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';
import { useLanguage } from '../LanguageContext';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code, user }) => {
  const { t } = useLanguage();
  
  const expiryDetails = useMemo(() => {
    const now = new Date();
    const expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    const day = expiry.getDate().toString().padStart(2, '0');
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const month = monthNames[expiry.getMonth()];
    const year = expiry.getFullYear();
    const time = `${expiry.getHours().toString().padStart(2, '0')}:${expiry.getMinutes().toString().padStart(2, '0')}`;
    
    return {
        full: `${day} ${month} ${year}`,
        time: time
    };
  }, []);

  const amountDisplay = useMemo(() => {
    return prize.amount || 'Rp 0';
  }, [prize.amount]);

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-between p-[6%] overflow-hidden select-none box-border">
      
      {/* BACKGROUND & PATTERN */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#8A6E2F] to-[#0a0a0a] shadow-2xl"></div>
      <div className="absolute inset-0 opacity-[0.12]" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='none' stroke='%23fff' stroke-width='0.5'/%3E%3C/svg%3E")`,
             backgroundSize: '25px 25px'
           }}>
      </div>

      {/* TICKET BORDER FRAME */}
      <div className="absolute inset-[3%] border border-white/20 pointer-events-none"></div>
      <div className="absolute inset-[4.5%] border-2 border-white/10 pointer-events-none"></div>

      {/* 1. HEADER SECTION */}
      <div className="relative z-10 w-full flex flex-col items-center pt-[4%] flex-shrink-0">
          <h1 className="text-[min(4vh,28px)] md:text-[min(6vh,45px)] font-display font-black tracking-[0.4em] text-white leading-none ml-[0.4em]">
              GUCCI
          </h1>
          <div className="w-[10%] h-[1px] bg-white/40 my-1.5 md:my-2"></div>
          <p className="text-[min(0.9vh,7px)] md:text-[min(1.2vh,10px)] font-sans font-black tracking-[0.3em] uppercase text-white/80 text-center">
              PLATINUM SYNERGY RECOGNITION
          </p>
      </div>

      {/* 2. REWARD BODY */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center flex-grow py-1 min-h-0">
          <p className="text-[min(1.2vh,9px)] md:text-[min(1.5vh,12px)] font-sans font-bold uppercase tracking-[0.2em] text-white/70 mb-1">
              SELAMAT! ANDA MENDAPATKAN
          </p>
          
          {user && (
              <div className="w-[80%] border-b border-white/10 mb-1 md:mb-4 text-center truncate">
                  <span className="text-[min(2.2vh,18px)] md:text-[min(3.5vh,32px)] font-serif font-black italic tracking-tight text-white block">
                      {user.fullName}
                  </span>
              </div>
          )}

          <div className="bg-white/5 backdrop-blur-xl px-4 py-3 md:px-8 md:py-6 border border-white/20 rounded-sm shadow-2xl flex flex-col items-center justify-center w-full max-w-[85%]">
              <div className="flex flex-col items-center leading-none">
                  <span className="text-[min(2.2vh,14px)] font-serif font-black italic text-white/80">Rp</span>
                  <span className="text-[min(5vh,40px)] md:text-[min(8.5vh,70px)] font-serif font-black tracking-tighter text-white drop-shadow-lg">
                      {amountDisplay.replace('Rp ', '')}
                  </span>
              </div>
              <div className="h-[1px] w-6 bg-white/20 my-1 md:my-2"></div>
              <span className="text-[min(0.7vh,7px)] font-sans font-black tracking-[0.3em] uppercase opacity-50 text-center">
                  EXCLUSIVE REWARD
              </span>
          </div>
      </div>

      {/* 3. CODE & FOOTER SECTION */}
      <div className="relative z-10 w-full flex flex-col items-center space-y-3 pb-[4%] flex-shrink-0">
          <div className="relative w-full max-w-[85%] mt-2">
              {/* Refined "KODE APRESIASI" box position */}
              <div className="absolute -top-[1.2vh] left-1/2 -translate-x-1/2 bg-white px-3 py-[0.4vh] shadow-xl z-20 border border-black/10">
                  <span className="text-[min(0.8vh,8px)] text-black font-black tracking-[0.3em] uppercase whitespace-nowrap leading-none block">
                      KODE APRESIASI
                  </span>
              </div>
              {/* Code Container */}
              <div className="bg-white/5 border border-white/30 pt-4 pb-3 px-2 shadow-2xl backdrop-blur-md">
                  <span className="font-sans text-[min(1.7vh,15px)] md:text-[min(2.8vh,24px)] font-black tracking-[0.15em] text-white block text-center leading-none">
                      {code.replace(/-/g, ' ')}
                  </span>
              </div>
          </div>

          <div className="flex flex-col items-center gap-0.5 w-full">
              <div className="flex items-center gap-2 w-full justify-center opacity-40">
                  <div className="h-[1px] w-4 bg-white"></div>
                  <p className="text-[min(0.8vh,8px)] font-sans font-black uppercase tracking-[0.3em]">BERLAKU 1X24 JAM</p>
                  <div className="h-[1px] w-4 bg-white"></div>
              </div>
              <p className="text-[min(1.2vh,11px)] md:text-[min(2vh,18px)] font-serif font-black italic text-white text-center leading-none mt-1">
                  {expiryDetails.full} @ {expiryDetails.time} WIB
              </p>
          </div>
      </div>

      {/* CORNER ACCENTS */}
      <div className="absolute top-[4%] left-[4%] w-[2.5vh] h-[2.5vh] border-t-2 border-l-2 border-white/40"></div>
      <div className="absolute top-[4%] right-[4%] w-[2.5vh] h-[2.5vh] border-t-2 border-r-2 border-white/40"></div>
      <div className="absolute bottom-[4%] left-[4%] w-[2.5vh] h-[2.5vh] border-b-2 border-l-2 border-white/40"></div>
      <div className="absolute bottom-[4%] right-[4%] w-[2.5vh] h-[2.5vh] border-b-2 border-r-2 border-white/40"></div>
    </div>
  );
};

export default WinnerCard;
