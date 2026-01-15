
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
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none box-border">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#8A6E2F] to-[#0a0a0a] shadow-2xl"></div>
      
      {/* PATTERN */}
      <div className="absolute inset-0 opacity-[0.15]" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='none' stroke='%23fff' stroke-width='0.5'/%3E%3C/svg%3E")`,
             backgroundSize: '30px 30px'
           }}>
      </div>

      {/* BORDERS */}
      <div className="absolute inset-[3%] border border-white/30 pointer-events-none"></div>
      <div className="absolute inset-[4.5%] border-2 border-white/10 pointer-events-none"></div>

      {/* MAIN LAYOUT */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between text-white py-[5%] px-[4%] box-border">
        
        {/* HEADER */}
        <div className="w-full flex flex-col items-center flex-shrink-0">
            <h1 className="text-[min(5vh,35px)] md:text-[min(6vh,45px)] font-display font-black tracking-[0.5em] leading-none ml-[0.5em] text-center">
                GUCCI
            </h1>
            <div className="w-[15%] h-[1px] bg-white/40 my-2"></div>
            <p className="text-[min(1.2vh,10px)] font-sans font-black tracking-[0.4em] uppercase opacity-80 text-center px-2">
                PLATINUM SYNERGY RECOGNITION
            </p>
        </div>

        {/* REWARD - Centered Body */}
        <div className="w-full flex flex-col items-center justify-center flex-grow py-2 min-h-0">
            <p className="text-[min(1.5vh,12px)] font-sans font-bold uppercase tracking-[0.3em] opacity-80 mb-2 text-center">
                SELAMAT! ANDA MENDAPATKAN
            </p>
            
            {user && (
                <div className="w-[90%] border-b border-white/20 mb-3 text-center truncate">
                    <span className="text-[min(2.5vh,24px)] md:text-[min(3.5vh,32px)] font-serif font-black italic tracking-tight block">
                        {user.fullName}
                    </span>
                </div>
            )}

            <div className="bg-white/5 backdrop-blur-xl px-4 py-4 md:px-8 md:py-6 border border-white/20 rounded-sm shadow-2xl flex flex-col items-center justify-center w-full max-w-[95%]">
                <div className="flex flex-col items-center leading-tight">
                    <span className="text-[min(3vh,18px)] font-serif font-black italic opacity-90">Rp</span>
                    <span className="text-[min(6vh,50px)] md:text-[min(9vh,75px)] font-serif font-black tracking-tighter block leading-none">
                        {amountDisplay.replace('Rp ', '')}
                    </span>
                </div>
                <div className="h-[1px] w-8 bg-white/20 my-2"></div>
                <span className="text-[min(1vh,9px)] font-sans font-black tracking-[0.4em] uppercase opacity-60 text-center">
                    EXCLUSIVE REWARD
                </span>
            </div>
        </div>

        {/* FOOTER / CODE */}
        <div className="w-full flex flex-col items-center flex-shrink-0 space-y-4">
            <div className="relative w-full max-w-[85%]">
                <div className="absolute -top-[1.2vh] left-1/2 -translate-x-1/2 bg-white px-3 py-1 shadow-lg z-20 whitespace-nowrap">
                    <span className="text-[min(0.9vh,9px)] text-black font-black tracking-[0.4em] uppercase leading-none block">
                        KODE APRESIASI
                    </span>
                </div>
                <div className="bg-transparent border-2 border-white/40 pt-5 pb-4 px-2 shadow-xl backdrop-blur-sm">
                    <span className="font-sans text-[min(2vh,18px)] md:text-[min(3vh,24px)] font-black tracking-[0.2em] text-white block text-center break-words leading-none">
                        {code.replace(/-/g, ' ')}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-center gap-1 w-full pb-2">
                <div className="flex items-center gap-2 w-full justify-center opacity-60">
                    <div className="h-[1px] w-4 bg-white"></div>
                    <p className="text-[min(0.9vh,9px)] font-sans font-black uppercase tracking-[0.4em]">BERLAKU 1X24 JAM</p>
                    <div className="h-[1px] w-4 bg-white"></div>
                </div>
                <p className="text-[min(1.4vh,14px)] md:text-[min(2vh,18px)] font-serif font-black italic text-center leading-none">
                    {expiryDetails.full} @ {expiryDetails.time} WIB
                </p>
            </div>
        </div>

      </div>

      {/* DECORATIVE CORNERS */}
      <div className="absolute top-[3%] left-[3%] w-[4vh] h-[4vh] border-t-2 border-l-2 border-white/60"></div>
      <div className="absolute top-[3%] right-[3%] w-[4vh] h-[4vh] border-t-2 border-r-2 border-white/60"></div>
      <div className="absolute bottom-[3%] left-[3%] w-[4vh] h-[4vh] border-b-2 border-l-2 border-white/60"></div>
      <div className="absolute bottom-[3%] right-[3%] w-[4vh] h-[4vh] border-b-2 border-r-2 border-white/60"></div>
    </div>
  );
};

export default WinnerCard;
