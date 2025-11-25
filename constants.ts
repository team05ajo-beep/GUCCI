import { Prize } from "./types";

export const PRIZES: Prize[] = [
    { id: '1', amount: 'Rp 100.000', isGrandPrize: false },
    { id: '2', amount: 'Rp 100.000 ', isGrandPrize: false },
    { id: '3', amount: 'Rp 100.000', isGrandPrize: false },
    { id: '4', amount: 'Rp 100.000', isGrandPrize: false },
    { id: '5', amount: 'Rp 100.000', isGrandPrize: false },
    { id: '6', amount: 'Rp 100.000', isGrandPrize: false },
    { id: '7', amount: 'Rp 100.000', isGrandPrize: false },
    { id: '8', amount: 'Rp 100.000', isGrandPrize: true },
];

export const WHATSAPP_NUMBER = '6285122347343';
export const SCRATCH_THRESHOLD = 10; // Lowered to 10% for extremely easy win

export const generateRandomCode = (length = 12): string => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const chunks = result.match(/.{1,4}/g);
    return chunks ? chunks.join('-') : result;
};