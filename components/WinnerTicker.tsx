
import React, { useMemo } from 'react';
import { PRIZES } from '../constants';

const FULL_NAMES = [
    'Agus Saputra', 'Siti Aminah', 'Budi Santoso', 'Dewi Lestari', 'Rian Hidayat',
    'Lestari Wahyuni', 'Andi Pratama', 'Maya Kartika', 'Fajar Ramadhan', 'Putri Utami',
    'Hendra Kurniawan', 'Sari Indah', 'Rudi Hermawan', 'Indah Permata', 'Agus Setiawan',
    'Wulan Dari', 'Bambang Sudarsono', 'Ratna Sari', 'Eko Prasetyo', 'Anita Wijaya',
    'Yusuf Mansyur', 'Rizky Aditya', 'Dian Sastro', 'Muhammad Arifin', 'Nur Hasanah',
    'Slamet Riadi', 'Endang Sri', 'Wahyu Hidayat', 'Sri Mulyani', 'Joko Susilo',
    'Arif Budiman', 'Fitri Handayani', 'Dani Irawan', 'Linda Permatasari', 'Surya Kencana',
    'Mega Citra', 'Bagus Permadi', 'Citra Kirana', 'Dedi Mulyadi', 'Hana Pertiwi',
    'Irfan Hakim', 'Lia Ananta', 'Prasetyo Utomo', 'Siska Amelia', 'Teguh Iman',
    'Vera Wati', 'Yanto Subagio', 'Zul Hendra', 'Rina Marlina', 'Dedi Kusnandar'
];

const INDONESIAN_PREFIXES = [
    '0852', '0811', '0856', '0877', '0812', '0813', '0896', '0895', '0899', '0859'
];

const WinnerTicker: React.FC = () => {
    // Generate 50 random winners data
    const winners = useMemo(() => {
        // Create a copy and shuffle to ensure randomness
        const shuffledNames = [...FULL_NAMES].sort(() => Math.random() - 0.5);
        
        return shuffledNames.map((name, i) => {
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
        <div className="fixed bottom-0 left-0 w-full z-40 overflow-hidden bg-black/80 backdrop-blur-md border-t border-gucci-gold/20 py-2.5">
            <div className="flex whitespace-nowrap animate-marquee">
                {/* Double the list for seamless loop */}
                {[...winners, ...winners].map((winner, index) => (
                    <div key={index} className="flex items-center mx-8 group">
                        <div className="w-1.5 h-1.5 bg-gucci-gold rotate-45 mr-4 shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                        <span className="text-[10px] md:text-xs font-display font-bold text-gucci-gold uppercase tracking-[0.2em]">
                            SELAMAT! <span className="text-white ml-2">{winner.name}</span> 
                            <span className="text-white/40 font-sans mx-2">({winner.phone})</span> 
                            BERHASIL MENDAPATKAN <span className="text-white italic ml-2">{winner.amount}</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WinnerTicker;
