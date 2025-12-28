
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
    // Generate exactly 50 random winners based on the list
    const winners = useMemo(() => {
        // Shuffle names to ensure random order every time
        const shuffled = [...COMMON_NAMES].sort(() => Math.random() - 0.5);
        
        return shuffled.map((name, i) => {
            // Pick a random prize for each winner
            const prize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
            
            // Authentic Indonesian Provider Prefix
            const prefix = INDONESIAN_PREFIXES[Math.floor(Math.random() * INDONESIAN_PREFIXES.length)];
            // Last 4 digits random
            const suffix = Math.floor(Math.random() * 9000) + 1000;
            const phone = `${prefix}****${suffix}`;
            
            return { id: i, name, phone, amount: prize.amount };
        });
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full z-40 overflow-hidden bg-black backdrop-blur-md border-t border-gucci-gold/30 py-3">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gucci-gold to-transparent opacity-50"></div>
            
            <div className="flex whitespace-nowrap animate-marquee">
                {/* Double the list for seamless loop */}
                {[...winners, ...winners].map((winner, index) => (
                    <div key={index} className="flex items-center mx-12 group">
                        <div className="w-2 h-2 bg-gucci-gold rotate-45 mr-6 shadow-[0_0_10px_rgba(212,175,55,1)]"></div>
                        <span className="text-[11px] md:text-[13px] font-display font-bold tracking-[0.2em] flex items-center">
                            <span className="text-gucci-gold mr-3">SELAMAT!</span>
                            <span className="text-white uppercase mr-2">{winner.name}</span>
                            <span className="text-white/40 font-sans tracking-normal mr-6">({winner.phone})</span>
                            <span className="text-gucci-gold/80 mr-3">BERHASIL MENDAPATKAN</span>
                            <span className="text-white font-serif italic font-black text-sm md:text-lg tracking-wider drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
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
