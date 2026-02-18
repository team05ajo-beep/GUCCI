
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'id' | 'en' | 'zh' | 'it';

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
    loginTitle: "RAMADAN BERKAH ACCESS",
    loginSubtitle: "Masuk untuk menerima apresiasi Ramadan eksklusif Anda.",
    fullName: "Nama Lengkap",
    phoneNumber: "Nomor HP",
    password: "Kode Akses",
    startJourney: "TERIMA BERKAH",
    claimReward: "UNDUH E-VOUCHER RAMADAN",
    screenshotInstruction: "SIMPAN E-TICKET",
    welcomeText: "Selamat menjalankan ibadah di bulan suci. Sebagai bentuk syukur, Gucci menghadirkan Ramadan Kareem Recognition 2026. Klaim berkah eksklusif Anda sebagai mitra platinum kami.",
    thankYouBadge: "RAMADAN KAREEM 2026",
    codeLabel: "KODE APRESIASI RAMADAN",
    officialWinner: "PENERIMA BERKAH",
  },
  en: {
    loginTitle: "RAMADAN BLESSED ACCESS",
    loginSubtitle: "Sign in to receive your exclusive Ramadan appreciation.",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    password: "Access Code",
    startJourney: "RECEIVE BLESSING",
    claimReward: "DOWNLOAD RAMADAN E-VOUCHER",
    screenshotInstruction: "SAVE E-TICKET",
    welcomeText: "Wishing you a blessed holy month. As a token of gratitude, Gucci presents Ramadan Kareem Recognition 2026. Claim your exclusive blessings as our platinum partner.",
    thankYouBadge: "RAMADAN KAREEM 2026",
    codeLabel: "RAMADAN APPRECIATION CODE",
    officialWinner: "BLESSED RECIPIENT",
  },
  zh: { loginTitle: "斋月特别访问", loginSubtitle: "登录以获取您的专属斋月奖励。", fullName: "全名", phoneNumber: "电话", password: "访问码", startJourney: "领取祝福", claimReward: "下载斋月凭证", screenshotInstruction: "保存电子票单", welcomeText: "祝您斋月快乐。作为感激之情，Gucci 推出 2026 斋月表彰。立即领取专属白金奖励。", thankYouBadge: "2026 斋月吉祥", codeLabel: "斋月感谢码", officialWinner: "获表彰者" },
  it: { loginTitle: "ACCESSO RAMADAN", loginSubtitle: "Accedi per il tuo premio esclusivo di Ramadan.", fullName: "Nome", phoneNumber: "Tel", password: "Codice", startJourney: "RICEVI BENEDIZIONE", claimReward: "SCARICA E-VOUCHER", screenshotInstruction: "SALVA E-TICKET", welcomeText: "Vi auguriamo un mese sacro benedetto. In segno di gratitudine, Gucci presenta Ramadan Kareem 2026. Richiedi subito il tuo premio.", thankYouBadge: "RAMADAN KAREEM 2026", codeLabel: "CODICE RAMADAN", officialWinner: "DESTINATARIO" }
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
