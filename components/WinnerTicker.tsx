
import React, { useMemo } from 'react';
import { PRIZES } from '../constants';

const COMMON_NAMES = [
    'Bambang Wijaya', 'Siti Aminah', 'Joko Susilo', 'Sri Wahyuni', 'Ahmad Hidayat',
    'Dewi Lestari', 'Budi Santoso', 'Lestari Putri', 'Andi Pratama', 'Maya Sari',
    'Hendra Kurniawan', 'Sari Utami', 'Rudi Hermawan', 'Indah Permata', 'Agus Setiawan',
    'Wulan Dari', 'Eko Prasetyo', 'Ratna Sari', 'Mulyono', 'Anita Wijaya',
    'Yanto Subagyo', 'Rina Marlina', 'Dedi Kusnandar', 'Slamet Riyadi', 'Endang Sri',
    'Wahyu Hidayat', 'Nur Hasanah', 'Arif Budiman', 'Fitri Handayani', 'Dani Irawan',
    'Linda Permatasari', 'Surya Kencana', 'Mega Citra', 'Bagus Permadi', 'Dedi Mulyadi',
    'Hana Pertiwi', 'Irfan Hakim', 'Lia Ananta', 'Prasetyo Utomo', 'Siska Amelia',
    'Teguh Iman', 'Vera Wati', 'Zul Hendra', 'Rizky Aditya', 'Muhamad Arifin',
    'Kartini', 'Supardi', 'Dwi Cahyo', 'Tri Utami', 'Puji Astuti'
];

const INDONESIAN_PREFIXES = [
    '0852', '0811', '0856', '0877', '0812', '0813', '0896', '0895', '0899', '0859'
];

const WinnerTicker: React.FC = () => {
    const winners = useMemo(() => {
        const shuffled = [...COMMON_NAMES].sort(() => Math.random() - 0.5);
        return shuffled.map((name, i) => {
            const prize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
            const prefix = INDONESIAN_PREFIXES[Math.floor(Math.random() * INDONESIAN_PREFIXES.length)];
            const suffix = Math.floor(Math.random() * 9000) + 1000;
            const phone = `${prefix}****${suffix}`;
            return { id: i, name, phone, amount: prize.amount };
        });
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full z-40 overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/20 py-5">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-60"></div>
            <div className="flex whitespace-nowrap animate-marquee">
                {[...winners, ...winners].map((winner, index) => (
                    <div key={index} className="flex items-center mx-16 group">
                        <div className="w-2.5 h-2.5 bg-white rotate-45 mr-8 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
                        <span className="text-[12px] md:text-[14px] font-display font-bold tracking-[0.25em] flex items-center">
                            <span className="text-white mr-4">RECOGNIZED:</span>
                            <span className="text-white uppercase mr-3 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{winner.name}</span>
                            <span className="text-white/60 font-sans tracking-normal mr-8">({winner.phone})</span>
                            <span className="text-white/80 mr-4">GRANTED</span>
                            <span className="text-white font-serif italic font-black text-base md:text-xl tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                                {winner.amount}
                            </span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WinnerTicker;
