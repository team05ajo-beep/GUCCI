
import React, { useMemo } from 'react';
import { PRIZES } from '../constants';

const COMMON_NAMES = [
    'Bambang Wijaya', 'Siti Aminah', 'Joko Susilo', 'Sri Wahyuni', 'Ahmad Hidayat',
    'Dewi Lestari', 'Budi Santoso', 'Lestari Putri', 'Andi Pratama', 'Maya Sari',
    'Hendra Kurniawan', 'Sari Utami', 'Rudi Hermawan', 'Indah Permata', 'Agus Setiawan',
    'Wulan Dari', 'Eko Prasetyo', 'Ratna Sari', 'Mulyono', 'Anita Wijaya',
    'Yanto Subagyo', 'Rina Marlina', 'Dedi Kusnandar', 'Slamet Riyadi', 'Endang Sri',
    'Wahyu Hidayat', 'Nur Hasanah', 'Arif Budiman', 'Fitri Handayani', 'Dani Irawan'
];

const WinnerTicker: React.FC = () => {
    const winners = useMemo(() => {
        const shuffled = [...COMMON_NAMES].sort(() => Math.random() - 0.5);
        return shuffled.map((name, i) => {
            const prize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
            const suffix = Math.floor(Math.random() * 9000) + 1000;
            return { id: i, name, phone: `0896****${suffix}`, amount: prize.amount };
        });
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full z-40 overflow-hidden bg-black/95 backdrop-blur-xl border-t border-gucci-gold/20 py-4">
            <div className="flex whitespace-nowrap animate-marquee">
                {[...winners, ...winners].map((winner, index) => (
                    <div key={index} className="flex items-center mx-12 group">
                        <div className="w-2 h-2 bg-gucci-gold rotate-45 mr-6"></div>
                        <span className="text-[11px] md:text-[13px] font-display font-bold tracking-[0.2em] flex items-center">
                            <span className="text-gucci-gold mr-3">IDUL FITRI 1447H:</span>
                            <span className="text-white uppercase mr-3">{winner.name}</span>
                            <span className="text-white/40 font-sans mr-6">({winner.phone})</span>
                            <span className="text-gucci-gold font-serif italic font-black text-sm md:text-lg">
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
