
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 
  | 'id' // Indonesian
  | 'en' // English
  | 'zh' // Chinese
  | 'it' // Italian
  | 'fr'; // French

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: { code: Language; label: string }[];
}

const availableLanguages: { code: Language; label: string }[] = [
  { code: 'id', label: 'Indonesia' },
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文 (Chinese)' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
];

const translations: Record<Language, Record<string, string>> = {
  id: {
    loginTitle: "LOGIN EKSKLUSIF 2026",
    loginSubtitle: "Masuk untuk merayakan tahun baru bersama GUCCI.",
    fullName: "Nama Lengkap",
    phoneNumber: "Nomor HP",
    password: "Kode Akses",
    startJourney: "MULAI PERAYAAN",
    menu: "VISI & MISI",
    validUntil: "Berlaku Hingga",
    claimReward: "Lihat E-Ticket",
    officialWinner: "Pemenang Eksklusif",
    screenshotInstruction: "UNDUH E-TICKET TAHUN BARU",
    welcomeTitle: "New Year Celebration 2026",
    welcomeText: "Sambut fajar tahun 2026 dengan kemewahan tanpa batas. Temukan kejutan Golden Scratch eksklusif Anda di bawah kilauan perayaan malam ini.",
    scratchHere: "Gosok Untuk Keberuntungan",
    invitation: "Undangan Gala",
    specialDiscount: "Golden Scratch 2026",
    giftVoucher: "HADIAH TAHUN BARU",
    redeemable: "Berlaku di Butik Gucci pilihan.",
    congratsTitle: "SELAMAT TAHUN BARU",
    voucherPrefix: "VOUCHER",
    discountPrefix: "KILAU",
    claimMessage: "Halo, saya telah memenangkan hadiah Tahun Baru dari Gucci Indonesia",
    codeLabel: "KODE KEBERUNTUNGAN",
    processRequest: "Mohon konfirmasi reservasi saya.",
    florenceSubtitle: "New Year Celebration",
    backToHome: "Kembali",
    visionTitle: "Visi & Misi 2026",
    visionText1: "Membangun Masa Depan Kemewahan",
    visionText2: "Gucci berkomitmen untuk terus berinovasi dalam setiap langkah kreatif menuju tahun 2026. Kami menghadirkan perpaduan antara warisan budaya yang kaya dengan teknologi masa depan, memastikan setiap pelanggan merasakan standar pelayanan premium yang tak tertandingi.",
  },
  en: {
    loginTitle: "EXCLUSIVE 2026 LOGIN",
    loginSubtitle: "Sign in to celebrate the new year with GUCCI.",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    password: "Access Code",
    startJourney: "START CELEBRATION",
    menu: "VISION & MISSION",
    validUntil: "Valid Until",
    claimReward: "View E-Ticket",
    officialWinner: "Official Winner",
    screenshotInstruction: "DOWNLOAD NEW YEAR E-TICKET",
    welcomeTitle: "New Year Celebration 2026",
    welcomeText: "Welcome the dawn of 2026 with boundless luxury. Discover your exclusive Golden Scratch surprise beneath tonight's celebratory sparkle.",
    scratchHere: "Scratch for Luck",
    invitation: "Gala Invitation",
    specialDiscount: "2026 Golden Scratch",
    giftVoucher: "NEW YEAR GIFT",
    redeemable: "Redeemable at selected Gucci Boutiques.",
    congratsTitle: "HAPPY NEW YEAR",
    voucherPrefix: "VOUCHER",
    discountPrefix: "SPARKLE",
    claimMessage: "Hello, I've won a New Year reward from Gucci Indonesia",
    codeLabel: "LUCKY CODE",
    processRequest: "Please confirm my reservation.",
    florenceSubtitle: "New Year Celebration",
    backToHome: "Back",
    visionTitle: "Vision & Mission 2026",
    visionText1: "Defining the Future of Luxury",
    visionText2: "Gucci is reinventing a wholly modern approach to fashion for the year 2026 and beyond. Under the new vision, the House has redefined luxury for the 21st century, further reinforcing its position as one of the world's most desirable fashion houses.",
  },
  zh: {
    loginTitle: "2026 专属登录",
    loginSubtitle: "登录与 GUCCI 一起庆祝新年。",
    fullName: "全名",
    phoneNumber: "电话号码",
    password: "访问码",
    startJourney: "开始庆典",
    menu: "愿景与使命",
    validUntil: "有效期至",
    claimReward: "查看电子票",
    officialWinner: "正式获胜者",
    screenshotInstruction: "下载新年电子票",
    welcomeTitle: "2026 新年庆典",
    welcomeText: "以无限奢华迎接 2026 年的曙光。在今晚的庆祝火花下发现您的专属 Golden Scratch 惊喜。",
    scratchHere: "刮开好运",
    invitation: "晚宴邀请",
    specialDiscount: "2026 黄金刮刮乐",
    giftVoucher: "新年礼物",
    redeemable: "可在指定的 Gucci 精品店兑换。",
    congratsTitle: "新年快乐",
    voucherPrefix: "代金券",
    discountPrefix: "闪耀",
    claimMessage: "您好，我获得了来自 Gucci Indonesia 的新年奖励",
    codeLabel: "幸运代码",
    processRequest: "请确认我的预订。",
    florenceSubtitle: "新年庆典",
    backToHome: "返回",
    visionTitle: "2026 愿景与使命",
    visionText1: "定义奢华的未来",
    visionText2: "Gucci 正在为 2026 年及以后重塑一种全新的现代时尚方式。",
  },
  it: {
    loginTitle: "ACCESSO ESCLUSIVO 2026",
    loginSubtitle: "Accedi per festeggiare il nuovo anno con GUCCI.",
    fullName: "Nome Completo",
    phoneNumber: "Numero di Telefono",
    password: "Codice di Accesso",
    startJourney: "INIZIA LA FESTA",
    menu: "VISIONE E MISSIONE",
    validUntil: "Valido Fino Al",
    claimReward: "Vedi E-Ticket",
    officialWinner: "Vincitore Ufficiale",
    screenshotInstruction: "SCARICA E-TICKET DI CAPODANNO",
    welcomeTitle: "Celebrazione Capodanno 2026",
    welcomeText: "Accogli l'alba del 2026 con un lusso senza confini. Scopri la tua sorpresa esclusiva Golden Scratch sotto il luccichio festivo di stasera.",
    scratchHere: "Gratta per la Fortuna",
    invitation: "Invito al Gala",
    specialDiscount: "Golden Scratch 2026",
    giftVoucher: "REGALO DI CAPODANNO",
    redeemable: "Riscattabile presso le Boutique Gucci selezionate.",
    congratsTitle: "BUON ANNO",
    voucherPrefix: "BUONO",
    discountPrefix: "LUCE",
    claimMessage: "Salve, ho vinto un premio di Capodanno da Gucci Indonesia",
    codeLabel: "CODICE FORTUNATO",
    processRequest: "Si prega di confermare la mia prenotazione.",
    florenceSubtitle: "Celebrazione di Capodanno",
    backToHome: "Indietro",
    visionTitle: "Visione e Missione 2026",
    visionText1: "Definire il Futuro del Lusso",
    visionText2: "Gucci sta reinventando un approccio del tutto moderno alla moda per l'anno 2026.",
  },
  fr: {
    loginTitle: "CONNEXION EXCLUSIVE 2026",
    loginSubtitle: "Connectez-vous pour fêter la nouvelle année avec GUCCI.",
    fullName: "Nom Complet",
    phoneNumber: "Numéro de Téléphone",
    password: "Code d'Accès",
    startJourney: "COMMENCER LA FÊTE",
    menu: "VISION ET MISSION",
    validUntil: "Valable jusqu'au",
    claimReward: "Voir l'E-Ticket",
    officialWinner: "Gagnant Officiel",
    screenshotInstruction: "TÉLÉCHARGER L'E-TICKET NOUVEL AN",
    welcomeTitle: "Célébration du Nouvel An 2026",
    welcomeText: "Accueillez l'aube de 2026 avec un luxe sans limites. Découvrez votre surprise exclusive Golden Scratch sous les étincelles festives de ce soir.",
    scratchHere: "Grattez pour la Chance",
    invitation: "Invitation Gala",
    specialDiscount: "Golden Scratch 2026",
    giftVoucher: "CADEAU DU NOUVEL AN",
    redeemable: "Échangeable dans les boutiques Gucci sélectionnées.",
    congratsTitle: "BONNE ANNÉE",
    voucherPrefix: "BON",
    discountPrefix: "ÉCLAT",
    claimMessage: "Bonjour, j'ai gagné une récompense du Nouvel An de Gucci Indonesia",
    codeLabel: "CODE CHANCE",
    processRequest: "Veuillez confirmer ma réservation.",
    florenceSubtitle: "Célébration Nouvel An",
    backToHome: "Retour",
    visionTitle: "Vision & Mission 2026",
    visionText1: "Définir le Futur du Luxe",
    visionText2: "Gucci réinvente une approche moderne de la mode pour l'année 2026.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
