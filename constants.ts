
import { Prize } from "./types";

export const PRIZES: Prize[] = [
    // ✈️ Tiket Umroh
    { id: 'umroh-gold', amount: 'Tiket Umroh Gold Package', isGrandPrize: true, category: 'umroh' },
    { id: 'umroh-silver', amount: 'Tiket Umroh Silver Package', isGrandPrize: true, category: 'umroh' },
    { id: 'umroh-bronze', amount: 'Tiket Umroh Bronze Package', isGrandPrize: true, category: 'umroh' },

    // 🛍️ Voucher & Shopping
    { id: 'v-10m', amount: 'Voucher Belanja Rp 10.000.000', isGrandPrize: true, category: 'voucher' },
    { id: 'v-5m', amount: 'Voucher Belanja Rp 5.000.000', isGrandPrize: true, category: 'voucher' },
    { id: 'v-2.5m', amount: 'Voucher Belanja Rp 2.500.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-spree-1.5m', amount: 'Voucher Shopping Spree Rp 1.500.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-spree-1m', amount: 'Voucher Shopping Spree Rp 1.000.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-dept-500k', amount: 'Voucher Department Store Rp 500.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-elec-1m', amount: 'Voucher Elektronik Rp 1.000.000', isGrandPrize: false, category: 'voucher' },
    { id: 'v-ewallet-300k', amount: 'Voucher E-Wallet Rp 300.000', isGrandPrize: false, category: 'voucher' },

    // 📱 Elektronik & Gadget
    { id: 'iphone-13', amount: 'iPhone 13 Pro Max 128GB', isGrandPrize: true, category: 'electronics' },
    { id: 'iphone-14', amount: 'iPhone 14 256GB', isGrandPrize: true, category: 'electronics' },
    { id: 's23-ultra', amount: 'Samsung Galaxy S23 Ultra 256GB', isGrandPrize: true, category: 'electronics' },
    { id: 'a54', amount: 'Samsung Galaxy A54 128GB', isGrandPrize: false, category: 'electronics' },
    { id: 'xiaomi-13', amount: 'Xiaomi 13 Pro 256GB', isGrandPrize: true, category: 'electronics' },
    { id: 'oppo-find', amount: 'Oppo Find X6 Pro 512GB', isGrandPrize: true, category: 'electronics' },
    { id: 'vivo-v29', amount: 'Vivo V29 256GB', isGrandPrize: false, category: 'electronics' },
    { id: 'mac-air', amount: 'MacBook Air M2 512GB', isGrandPrize: true, category: 'electronics' },
    { id: 'mac-pro', amount: 'MacBook Pro 16 M1 Pro', isGrandPrize: true, category: 'electronics' },
    { id: 'dell-xps', amount: 'Dell XPS 15 2023', isGrandPrize: true, category: 'electronics' },
    { id: 'thinkpad', amount: 'Lenovo ThinkPad X1 Carbon 2023', isGrandPrize: true, category: 'electronics' },
    { id: 'hp-spectre', amount: 'HP Spectre x360 2023', isGrandPrize: true, category: 'electronics' },
    { id: 'asus-rog', amount: 'Asus ROG Zephyrus G14', isGrandPrize: true, category: 'electronics' },
    { id: 'sony-bravia', amount: 'Sony Bravia 55 Inch 4K', isGrandPrize: true, category: 'home' }, // TV fits better in Home visually
    { id: 'samsung-neo', amount: 'Samsung Neo QLED 65 Inch', isGrandPrize: true, category: 'home' },
    { id: 'jbl', amount: 'JBL PartyBox 310', isGrandPrize: false, category: 'electronics' },
    { id: 'bose', amount: 'Bose QuietComfort 45', isGrandPrize: false, category: 'electronics' },
    { id: 'beats', amount: 'Beats Studio3 Wireless', isGrandPrize: false, category: 'electronics' },
    { id: 'logitech', amount: 'Logitech G Pro Wireless', isGrandPrize: false, category: 'electronics' },
    { id: 'razer', amount: 'Razer BlackWidow V3', isGrandPrize: false, category: 'electronics' },
    { id: 'switch', amount: 'Nintendo Switch OLED', isGrandPrize: false, category: 'electronics' },
    { id: 'ps5', amount: 'PlayStation 5 Standard Edition', isGrandPrize: true, category: 'electronics' },
    { id: 'xbox', amount: 'Xbox Series X', isGrandPrize: true, category: 'electronics' },

    // 🏠 Peralatan Rumah Tangga
    { id: 'dyson', amount: 'Dyson V15 Detect', isGrandPrize: true, category: 'home' },
    { id: 'kitchenaid', amount: 'KitchenAid Artisan Stand Mixer', isGrandPrize: true, category: 'home' },
    { id: 'airfryer', amount: 'Philips Air Fryer XXL', isGrandPrize: false, category: 'home' },
    { id: 'ricecooker', amount: 'Panasonic SR-ZE105 Rice Cooker', isGrandPrize: false, category: 'home' },
    { id: 'xiaomi-fan', amount: 'Xiaomi Smart Fan 2S', isGrandPrize: false, category: 'home' },
    { id: 'blender', amount: 'Philips Blender HR2223', isGrandPrize: false, category: 'home' },

    // 💎 Fashion & Lifestyle
    { id: 'rolex', amount: 'Rolex Submariner 41mm', isGrandPrize: true, category: 'fashion' },
    { id: 'seiko', amount: 'Seiko Prospex Diver', isGrandPrize: false, category: 'fashion' },
    { id: 'fossil', amount: 'Fossil Gen 6 Smartwatch', isGrandPrize: false, category: 'fashion' },
    { id: 'gucci-bag', amount: 'Gucci GG Marmont Mini Bag', isGrandPrize: true, category: 'fashion' },
    { id: 'lv-bag', amount: 'Louis Vuitton Neverfull MM', isGrandPrize: true, category: 'fashion' },
    { id: 'prada-bag', amount: 'Prada Cahier Shoulder Bag', isGrandPrize: true, category: 'fashion' },
    { id: 'dior-bag', amount: 'Dior Saddle Bag', isGrandPrize: true, category: 'fashion' },
    { id: 'chanel-bag', amount: 'Chanel Classic Flap Bag', isGrandPrize: true, category: 'fashion' },
    { id: 'hermes', amount: 'Hermes Birkin 25', isGrandPrize: true, category: 'fashion' },
    { id: 'montblanc', amount: 'Montblanc Meisterstück Pen', isGrandPrize: true, category: 'fashion' },
];

export const WHATSAPP_NUMBER = '6281385616098';
export const SCRATCH_THRESHOLD = 10;

export const generateRandomCode = (length = 12): string => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const chunks = result.match(/.{1,4}/g);
    return chunks ? chunks.join('-') : result;
};
