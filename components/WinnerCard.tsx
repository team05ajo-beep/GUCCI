import React, { useMemo } from 'react';
import { WinnerCardProps } from '../types';

const WinnerCard: React.FC<WinnerCardProps> = ({ prize, code }) => {
  
  // Menghitung Tanggal Kedaluwarsa: Waktu Sekarang + 24 Jam
  const expiryDateString = useMemo(() => {
    const date = new Date();
    date.setHours(date.getHours() + 24); // Tambah 24 jam dari waktu sekarang
    
    const day = date.getDate();
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    // PadStart memastikan angka jam/menit selalu 2 digit (contoh: 09:05)
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
  }, []);

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
        Hingga <span className="font-bold text-yellow-200">{expiryDateString}</span>
      </div>

      <p className="text-[9px] text-gucci-cream opacity-80 italic px-4">
        *Tukarkan segera untuk seluruh transaksi di Gucci Indonesia
      </p>
    </div>
  );
};

export default WinnerCard;