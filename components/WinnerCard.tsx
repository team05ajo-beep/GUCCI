import React from 'react';
import { WinnerCardProps } from '../types';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code }) => {
  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-gradient-to-r from-gucci-green via-gucci-red to-gucci-green p-4 select-none">
      <h2 className="text-gucci-gold text-sm md:text-lg font-bold mb-1 tracking-wider">
        SELAMAT! ANDA MENDAPATKAN:
      </h2>
      
      <div className="text-gucci-gold text-xl md:text-3xl font-black drop-shadow-md my-2 animate-bounce">
        {prize.isGrandPrize ? `POTONGAN ${prize.amount}` : `VOUCHER ${prize.amount}`}
      </div>

      <div className="bg-gucci-cream text-gray-900 font-mono font-bold text-xl md:text-2xl tracking-widest px-4 py-2 rounded shadow-inner border-2 border-yellow-700 mb-3">
        {code}
      </div>

      <div className="bg-black/40 text-gucci-gold text-[10px] md:text-xs px-3 py-1 rounded mb-2 backdrop-blur-sm">
        Masa Berlaku: 1 x 24 Jam<br />
        Hingga 21 November 2025, 15:27 WIB
      </div>

      <p className="text-[9px] text-gucci-cream opacity-80 italic px-4">
        *Tukarkan segera untuk seluruh transaksi di Gucci Indonesia
      </p>
    </div>
  );
};

export default WinnerCard;