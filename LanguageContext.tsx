
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
    loginTitle: "IDUL FITRI BERKAH ACCESS",
    loginSubtitle: "Masuk untuk menerima apresiasi Idul Fitri eksklusif Anda.",
    fullName: "Nama Lengkap",
    phoneNumber: "Nomor HP",
    accessCode: "Kode Akses",
    completeAllFields: "Harap lengkapi semua data",
    invalidAccessCode: "Kode akses tidak valid",
    startJourney: "TERIMA BERKAH",
    claimReward: "UNDUH E-VOUCHER IDUL FITRI",
    screenshotInstruction: "SIMPAN E-TICKET",
    welcomeText: "Selamat merayakan hari kemenangan. Sebagai bentuk syukur, Gucci menghadirkan Idul Fitri Berkah 2026. Klaim berkah eksklusif Anda sebagai mitra platinum kami.",
    thankYouBadge: "IDUL FITRI 1447H / 2026",
    codeLabel: "KODE APRESIASI IDUL FITRI",
    officialWinner: "PENERIMA BERKAH",
    congratsTitle: "SELAMAT KEPADA",
  },
  en: {
    loginTitle: "EID AL-FITR BLESSED ACCESS",
    loginSubtitle: "Sign in to receive your exclusive Eid al-Fitr appreciation.",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    accessCode: "Access Code",
    completeAllFields: "Please complete all fields",
    invalidAccessCode: "Invalid access code",
    startJourney: "RECEIVE BLESSING",
    claimReward: "DOWNLOAD EID E-VOUCHER",
    screenshotInstruction: "SAVE E-TICKET",
    welcomeText: "Wishing you a blessed Eid. As a token of gratitude, Gucci presents Idul Fitri Berkah 2026. Claim your exclusive blessings as our platinum partner.",
    thankYouBadge: "EID AL-FITR 2026",
    codeLabel: "EID APPRECIATION CODE",
    officialWinner: "BLESSED RECIPIENT",
    congratsTitle: "CONGRATULATIONS TO",
  },
  zh: { loginTitle: "开斋节特别访问", loginSubtitle: "登录以获取您的专属开斋节奖励。", fullName: "全名", phoneNumber: "电话", accessCode: "访问码", completeAllFields: "请填写所有字段", invalidAccessCode: "访问码无效", startJourney: "领取祝福", claimReward: "下载开斋节凭证", screenshotInstruction: "保存电子票单", welcomeText: "祝您开斋节快乐。作为感激之情，Gucci 推出 2026 开斋节表彰。立即领取专属白金奖励。", thankYouBadge: "2026 开斋节吉祥", codeLabel: "开斋节感谢码", officialWinner: "获表彰者", congratsTitle: "恭喜您" },
  it: { loginTitle: "ACCESSO EID AL-FITR", loginSubtitle: "Accedi per il tuo premio esclusivo di Eid al-Fitr.", fullName: "Nome", phoneNumber: "Tel", accessCode: "Codice Accesso", completeAllFields: "Si prega di compilare tutti i campi", invalidAccessCode: "Codice di accesso non valido", startJourney: "RICEVI BENEDIZIONE", claimReward: "SCARICA E-VOUCHER", screenshotInstruction: "SALVA E-TICKET", welcomeText: "Vi auguriamo un felice Eid al-Fitr. In segno di gratitudine, Gucci presenta Idul Fitri Berkah 2026. Richiedi subito il tuo premio.", thankYouBadge: "EID AL-FITR 2026", codeLabel: "CODICE EID", officialWinner: "DESTINATARIO", congratsTitle: "CONGRATULAZIONI A" }
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
