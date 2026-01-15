
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 
  | 'id' | 'en' | 'zh' | 'it' | 'fr' | 'ja' | 'ko' | 'ar' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: { code: Language; label: string }[];
}

const availableLanguages: { code: Language; label: string }[] = [
  { code: 'id', label: 'Indonesia' },
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'it', label: 'Italiano' },
];

const translations: Record<Language, Record<string, string>> = {
  id: {
    loginTitle: "AKSES ANGGOTA AKTIF",
    loginSubtitle: "Masuk untuk menerima apresiasi platinum Anda.",
    fullName: "Nama Lengkap",
    phoneNumber: "Nomor HP",
    password: "Kode Akses",
    startJourney: "KLAIM APRESIASI",
    claimReward: "UNDUH E-VOUCHER",
    officialWinner: "PENERIMA APRESIASI",
    screenshotInstruction: "SIMPAN E-TICKET",
    welcomeText: "Terima kasih telah menjadi bagian dari anggota yang aktif berkontribusi. Sebagai bentuk apresiasi nyata, Gucci menghadirkan Platinum Synergy 2026. Klaim hadiah eksklusif Anda sekarang.",
    codeLabel: "KODE APRESIASI PLATINUM",
    validUntil: "MASA BERLAKU",
    thankYouBadge: "APRESIASI ANGGOTA AKTIF 2026",
    redeemable: "Berlaku di Butik Gucci Terpilih",
    congratsTitle: "SELAMAT! ANDA BERHASIL",
    congratsSubtitle: "HADIAH EKSKLUSIF ANGGOTA",
  },
  en: {
    loginTitle: "ACTIVE MEMBER ACCESS",
    loginSubtitle: "Sign in to receive your platinum appreciation.",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    password: "Access Code",
    startJourney: "CLAIM RECOGNITION",
    claimReward: "DOWNLOAD E-VOUCHER",
    officialWinner: "RECIPIENT",
    screenshotInstruction: "SAVE E-TICKET",
    welcomeText: "Thank you for being an active contributor. As a sincere token of appreciation, Gucci presents Platinum Synergy 2026. Claim your exclusive rewards now.",
    codeLabel: "PLATINUM APPRECIATION CODE",
    validUntil: "VALIDITY PERIOD",
    thankYouBadge: "2026 MEMBER RECOGNITION",
    redeemable: "Redeemable at Selected Gucci Boutiques",
    congratsTitle: "CONGRATS! YOU WON",
    congratsSubtitle: "EXCLUSIVE MEMBER REWARD",
  },
  zh: { loginTitle: "会员访问", loginSubtitle: "登录以获取您的白金奖励。", fullName: "全名", phoneNumber: "电话", password: "访问码", startJourney: "领取奖励", claimReward: "下载电子凭证", officialWinner: "获表彰者", screenshotInstruction: "保存电子票", welcomeText: "感谢您作为活跃成员的贡献。Gucci 推出 2026 白金协同计划。立即领取您的专属奖励。", codeLabel: "白金感谢码", validUntil: "有效期", thankYouBadge: "2026 会员表彰", redeemable: "可在指定精品店兑换", congratsTitle: "恭喜！您获得了", congratsSubtitle: "会员专属奖励" },
  it: { loginTitle: "ACCESSO MEMBRO", loginSubtitle: "Accedi per il tuo premio Platinum.", fullName: "Nome", phoneNumber: "Tel", password: "Codice", startJourney: "RICEVI PREMIO", claimReward: "SCARICA E-VOUCHER", officialWinner: "DESTINATARIO", screenshotInstruction: "SALVA E-TICKET", welcomeText: "Grazie per il tuo contributo attivo. Gucci presenta Platinum Synergy 2026. Richiedi subito il tuo premio esclusivo.", codeLabel: "CODICE PLATINUM", validUntil: "VALIDITÀ", thankYouBadge: "RICONOSCIMENTO 2026", redeemable: "Valido presso boutique selezionate", congratsTitle: "CONGRATULAZIONI!", congratsSubtitle: "PREMIO ESCLUSIVO" },
  fr: {}, ja: {}, ko: {}, ar: {}, es: {}
} as any;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');
  const t = (key: string): string => translations[language][key] || translations['en'][key] || key;
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
