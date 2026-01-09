
import { Prize } from "./types";

export const PRIZES: Prize[] = [
    // 🌟 Tier 1: Grand Prizes (High Value: 2.5jt - 3.5jt)
    { id: 'v-3500', amount: 'Rp 3.500.000', isGrandPrize: true, category: 'voucher' },
    { id: 'v-3250', amount: 'Rp 3.250.000', isGrandPrize: true, category: 'voucher' },
    { id: 'v-3100', amount: 'Rp 3.100.000', isGrandPrize: true, category: 'voucher' },
    { id: 'v-3000', amount: 'Rp 3.000.000', isGrandPrize: true, category: 'voucher' },
    { id: 'v-2850', amount: 'Rp 2.850.000', isGrandPrize: true, category: 'voucher' },
    { id: 'v-2750', amount: 'Rp 2.750.000', isGrandPrize: true, category: 'voucher' },
    { id: 'v-2500', amount: 'Rp 2.500.000', isGrandPrize: true, category: 'voucher' },

    // ✨ Tier 2: Mid Range (1jt - 2.4jt)
    { id: 'v-2400', amount: 'Rp 2.400.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-2250', amount: 'Rp 2.250.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-2000', amount: 'Rp 2.000.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-1850', amount: 'Rp 1.850.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-1750', amount: 'Rp 1.750.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-1500', amount: 'Rp 1.500.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-1250', amount: 'Rp 1.250.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-1100', amount: 'Rp 1.100.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-1000', amount: 'Rp 1.000.000', isGrandPrize: false, category: 'voucher' },
];

export const SCRATCH_THRESHOLD = 15; // Lowered from 20 for smoother UX

export const generateRandomCode = (length = 12): string => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const chunks = result.match(/.{1,4}/g);
    return chunks ? chunks.join('-') : result;
};
