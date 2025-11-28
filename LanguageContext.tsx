import React, { createContext, useState, useContext, ReactNode } from 'react';

// Supports major world languages
export type Language = 
  | 'id' // Indonesian
  | 'en' // English
  | 'zh' // Chinese (Mandarin)
  | 'es' // Spanish
  | 'hi' // Hindi
  | 'ar' // Arabic
  | 'pt' // Portuguese
  | 'ru' // Russian
  | 'ja' // Japanese
  | 'de' // German
  | 'fr' // French
  | 'it' // Italian
  | 'ko'; // Korean

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
  { code: 'es', label: 'Español' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'ar', label: 'العربية (Arabic)' },
  { code: 'pt', label: 'Português' },
  { code: 'ru', label: 'Русский (Russian)' },
  { code: 'ja', label: '日本語 (Japanese)' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'ko', label: '한국어 (Korean)' },
];

const translations: Record<Language, Record<string, string>> = {
  id: {
    menu: "VISI & MISI",
    validUntil: "Berlaku Hingga",
    claimReward: "Klaim Hadiah",
    viaWhatsapp: "Via WhatsApp",
    welcomeTitle: "Keberuntungan Mewah",
    welcomeText: "Ikuti Event SISLEY PARIS. Jelajahi dunia Phyto-cosmetology. Temukan hak istimewa eksklusif Anda yang tersembunyi di balik sketsa.",
    scratchHere: "Gosok Di Sini",
    invitation: "Undangan",
    specialDiscount: "POTONGAN SPESIAL",
    giftVoucher: "VOUCHER HADIAH",
    redeemable: "Dapat ditukarkan di seluruh Counter Sisley Paris di Indonesia.",
    congratsTitle: "SELAMAT",
    voucherPrefix: "VOUCHER",
    discountPrefix: "POTONGAN",
    claimMessage: "Halo, saya telah mendapatkan hadiah dari Sisley Paris",
    codeLabel: "dengan kode",
    processRequest: "Mohon diproses.",
    florenceSubtitle: "Paris 1976",
    backToHome: "Kembali ke Beranda",
    visionTitle: "Visi & Misi",
    visionText1: "Keunggulan Phyto-cosmetology Perancis",
    visionText2: `1. Keahlian Phyto-cosmetology
Sisley Paris didirikan atas visi inovatif Hubert d'Ornano: memanfaatkan kekuatan terbaik tanaman dan minyak esensial untuk kecantikan (Phytocosmetology). Kami terus memimpin dalam penelitian bahan aktif botani.

2. Warisan Keluarga dan Integritas
Sebagai perusahaan keluarga, Sisley Paris menjunjung tinggi nilai-nilai personal, integritas, dan pengawasan kualitas langsung. Setiap produk mencerminkan dedikasi keluarga d'Ornano terhadap keunggulan.

3. Inovasi Tanpa Kompromi
Kami tidak meluncurkan produk hanya untuk tren. Produk Sisley Paris hanya dirilis ketika terbukti memberikan hasil superior dan keamanan optimal melalui penelitian bertahun-tahun.

4. Kualitas Perancis (Savoir-Faire)
Seluruh produk kami diproduksi di Perancis dengan standar manufaktur tertinggi, memastikan kemewahan dan efektivitas yang konsisten di seluruh dunia.

5. Pengalaman Sensorik yang Mewah
Sisley Paris berkomitmen menghadirkan produk yang tidak hanya efektif tetapi juga memanjakan indera melalui tekstur halus dan aroma alami yang menenangkan.

6. Pendekatan Kecantikan Holistik
Kami percaya bahwa kecantikan sejati berasal dari keseimbangan. Perawatan kulit, tata rias, dan wewangian kami dirancang untuk bekerja secara sinergis demi meningkatkan kesejahteraan pelanggan.

7. Kemitraan Global yang Eksklusif
Kami membangun hubungan dengan mitra yang memahami nilai kemewahan sejati. Distribusi kami sangat selektif untuk menjaga citra prestisius brand di setiap negara.

8. Edukasi dan Konsultasi Ahli
Misi kami adalah memberikan solusi personal. Konsultan kecantikan Sisley dilatih secara mendalam untuk memberikan diagnosis kulit yang akurat dan rekomendasi produk yang tepat.

9. Keberlanjutan dan Ekologi Kulit
Kami menghormati ekosistem kulit dan lingkungan. Formulasi kami dirancang untuk mendukung fungsi alami kulit serta meminimalkan dampak lingkungan.

10. Eksplorasi Bahan Langka
Tim peneliti kami menjelajahi dunia untuk menemukan spesies tanaman langka dengan khasiat luar biasa, memastikan bahan baku terbaik untuk setiap formula Sisley.

11. Teknologi Anti-Penuaan Terdepan
Sisley Paris dikenal sebagai pionir dalam perawatan anti-aging, terus mengembangkan solusi canggih untuk menjaga keremajaan kulit di setiap tahap kehidupan.

12. Transparansi dan Kepercayaan
Kami membangun kepercayaan melalui hasil nyata. Kejujuran dalam klaim produk dan transparansi bahan adalah fondasi hubungan kami dengan pelanggan setia.

13. Pemberdayaan Melalui Kecantikan
Kami percaya bahwa kulit yang sehat dan terawat meningkatkan kepercayaan diri. Misi kami adalah membantu setiap individu merasa terbaik dalam diri mereka sendiri.

14. Integrasi Digital dan Sentuhan Manusia
Meskipun kami merangkul teknologi digital untuk kenyamanan, sentuhan personal dan hubungan manusia tetap menjadi inti dari layanan Sisley Paris.

15. Visi Jangka Panjang
Berbeda dengan fast beauty, Sisley Paris berfokus pada penciptaan produk ikonik yang bertahan lama dan menjadi warisan kecantikan lintas generasi.`,
  },
  en: {
    menu: "VISION & MISSION",
    validUntil: "Valid Until",
    claimReward: "Claim Reward",
    viaWhatsapp: "Via WhatsApp",
    welcomeTitle: "Exquisite Fortune",
    welcomeText: "Join the SISLEY PARIS Event. Explore the world of Phyto-cosmetology. Unveil your exclusive privilege hidden beneath the sketch.",
    scratchHere: "Scratch Here",
    invitation: "Invitation",
    specialDiscount: "SPECIAL DISCOUNT",
    giftVoucher: "GIFT VOUCHER",
    redeemable: "Redeemable at any Sisley Paris Counter in Indonesia.",
    congratsTitle: "CONGRATULATIONS",
    voucherPrefix: "VOUCHER",
    discountPrefix: "DISCOUNT",
    claimMessage: "Hello, I have received a reward from Sisley Paris",
    codeLabel: "with code",
    processRequest: "Please process this request.",
    florenceSubtitle: "Paris 1976",
    backToHome: "Back to Home",
    visionTitle: "Vision & Mission",
    visionText1: "The Excellence of French Phyto-cosmetology",
    visionText2: "Sisley is a French luxury brand created by Hubert d’Ornano, who was one of the first to use botanical essences in cosmetology. The family-owned company creates the highest quality products by combining the best of nature and science.",
  },
  zh: {
    menu: "愿景与使命",
    validUntil: "有效期至",
    claimReward: "领取奖励",
    viaWhatsapp: "通过 WhatsApp",
    welcomeTitle: "精致的财富",
    welcomeText: "参加 SISLEY PARIS 活动。探索植物美容学的世界。揭开隐藏在草图下的专属特权。",
    scratchHere: "在这里刮擦",
    invitation: "邀请函",
    specialDiscount: "特别折扣",
    giftVoucher: "礼品券",
    redeemable: "可在印度尼西亚的任何 Sisley Paris 专柜兑换。",
    congratsTitle: "恭喜",
    voucherPrefix: "代金券",
    discountPrefix: "折扣",
    claimMessage: "您好，我收到了来自 Sisley Paris 的奖励",
    codeLabel: "代码",
    processRequest: "请处理此请求。",
    florenceSubtitle: "巴黎 1976",
    backToHome: "返回首页",
    visionTitle: "愿景与使命",
    visionText1: "法国植物美容学的卓越",
    visionText2: "Sisley 是由 Hubert d’Ornano 创立的法国奢侈品牌，他是最早在美容学中使用植物精华的人之一。这家家族企业通过结合自然和科学的精华，创造出最高质量的产品。",
  },
  es: {
    menu: "VISIÓN Y MISIÓN",
    validUntil: "Válido Hasta",
    claimReward: "Reclamar Recompensa",
    viaWhatsapp: "Vía WhatsApp",
    welcomeTitle: "Fortuna Exquisita",
    welcomeText: "Únete al evento SISLEY PARIS. Explora el mundo de la fitocosmetología. Devela tu privilegio exclusivo oculto bajo el boceto.",
    scratchHere: "Rasca Aquí",
    invitation: "Invitación",
    specialDiscount: "DESCUENTO ESPECIAL",
    giftVoucher: "CUPÓN DE REGALO",
    redeemable: "Canjeable en cualquier mostrador de Sisley Paris en Indonesia.",
    congratsTitle: "FELICITACIONES",
    voucherPrefix: "CUPÓN",
    discountPrefix: "DESCUENTO",
    claimMessage: "Hola, he recibido una recompensa de Sisley Paris",
    codeLabel: "con código",
    processRequest: "Por favor procese esta solicitud.",
    florenceSubtitle: "París 1976",
    backToHome: "Volver al Inicio",
    visionTitle: "Visión y Misión",
    visionText1: "La Excelencia de la Fitocosmetología Francesa",
    visionText2: "Sisley es una marca de lujo francesa creada por Hubert d’Ornano, quien fue uno de los primeros en utilizar esencias botánicas en cosmetología. La empresa familiar crea productos de la más alta calidad combinando lo mejor de la naturaleza y la ciencia.",
  },
  hi: {
    menu: "दृष्टि और मिशन",
    validUntil: "तक मान्य",
    claimReward: "इनाम का दावा करें",
    viaWhatsapp: "व्हाट्सएप के जरिए",
    welcomeTitle: "उत्तम भाग्य",
    welcomeText: "SISLEY PARIS इवेंट में शामिल हों। फाइटो-कॉस्मेटोलॉजी की दुनिया का अन्वेषण करें। स्केच के नीचे छिपे अपने विशेष विशेषाधिकार का अनावरण करें।",
    scratchHere: "यहाँ खरोंचें",
    invitation: "निमंत्रण",
    specialDiscount: "विशेष छूट",
    giftVoucher: "उपहार वाउचर",
    redeemable: "इंडोनेशिया में किसी भी Sisley Paris काउंटर पर भुनाया जा सकता है।",
    congratsTitle: "बधाई हो",
    voucherPrefix: "वाउचर",
    discountPrefix: "छूट",
    claimMessage: "नमस्ते, मुझे Sisley Paris से एक इनाम मिला है",
    codeLabel: "कोड के साथ",
    processRequest: "कृपया इस अनुरोध को संसाधित करें।",
    florenceSubtitle: "पेरिस 1976",
    backToHome: "घर वापस",
    visionTitle: "दृष्टि और मिशन",
    visionText1: "फ्रेंच फाइटो-कॉस्मेटोलॉजी की उत्कृष्टता",
    visionText2: "Sisley एक फ्रांसीसी लक्जरी ब्रांड है जिसे Hubert d’Ornano ने बनाया था, जो कॉस्मेटोलॉजी में वनस्पति निबंधों का उपयोग करने वाले पहले लोगों में से एक थे। परिवार के स्वामित्व वाली कंपनी प्रकृति और विज्ञान के सर्वोत्तम संयोजन द्वारा उच्चतम गुणवत्ता वाले उत्पाद बनाती है।",
  },
  ar: {
    menu: "الرؤية والرسالة",
    validUntil: "صالح حتى",
    claimReward: "المطالبة بالمكافأة",
    viaWhatsapp: "عبر الواتساب",
    welcomeTitle: "ثروة رائعة",
    welcomeText: "انضم إلى حدث SISLEY PARIS. استكشف عالم مستحضرات التجميل النباتية. اكشف عن امتيازك الحصري المخفي تحت الرسم.",
    scratchHere: "اخدش هنا",
    invitation: "دعوة",
    specialDiscount: "خصم خاص",
    giftVoucher: "قسيمة هدايا",
    redeemable: "قابل للاستبدال في أي كاونتر Sisley Paris في إندونيسيا.",
    congratsTitle: "تهانينا",
    voucherPrefix: "قسيمة",
    discountPrefix: "خصم",
    claimMessage: "مرحبًا، لقد حصلت على مكافأة من Sisley Paris",
    codeLabel: "مع الرمز",
    processRequest: "يرجى معالجة هذا الطلب.",
    florenceSubtitle: "باريس 1976",
    backToHome: "العودة إلى الصفحة الرئيسية",
    visionTitle: "الرؤية والرسالة",
    visionText1: "تميز مستحضرات التجميل النباتية الفرنسية",
    visionText2: "سيسلي هي علامة تجارية فرنسية فاخرة أنشأها هوبير دورنانو، الذي كان من أوائل الذين استخدموا الخلاصات النباتية في مستحضرات التجميل. تقوم الشركة المملوكة للعائلة بابتكار منتجات عالية الجودة من خلال الجمع بين أفضل ما في الطبيعة والعلم.",
  },
  pt: {
    menu: "VISÃO E MISSÃO",
    validUntil: "Válido Até",
    claimReward: "Reivindicar Recompensa",
    viaWhatsapp: "Via WhatsApp",
    welcomeTitle: "Fortuna Requintada",
    welcomeText: "Junte-se ao evento SISLEY PARIS. Explore o mundo da Fitocosmetologia. Revele seu privilégio exclusivo escondido sob o esboço.",
    scratchHere: "Raspe Aqui",
    invitation: "Convite",
    specialDiscount: "DESCONTO ESPECIAL",
    giftVoucher: "VALE PRESENTE",
    redeemable: "Resgatável em qualquer balcão Sisley Paris na Indonésia.",
    congratsTitle: "PARABÉNS",
    voucherPrefix: "VALE",
    discountPrefix: "DESCONTO",
    claimMessage: "Olá, recebi uma recompensa da Sisley Paris",
    codeLabel: "com código",
    processRequest: "Por favor, processe este pedido.",
    florenceSubtitle: "Paris 1976",
    backToHome: "Voltar ao Início",
    visionTitle: "Visão e Missão",
    visionText1: "A Excelência da Fitocosmetologia Francesa",
    visionText2: "Sisley é uma marca de luxo francesa criada por Hubert d’Ornano, que foi um dos primeiros a usar essências botânicas em cosmetologia. A empresa familiar cria produtos da mais alta qualidade combinando o melhor da natureza e da ciência.",
  },
  ru: {
    menu: "ВИДЕНИЕ И МИССИЯ",
    validUntil: "Действительно до",
    claimReward: "Получить награду",
    viaWhatsapp: "Через WhatsApp",
    welcomeTitle: "Изысканная удача",
    welcomeText: "Присоединяйтесь к событию SISLEY PARIS. Исследуйте мир фитокосметологии. Откройте свою эксклюзивную привилегию, скрытую под эскизом.",
    scratchHere: "Стереть здесь",
    invitation: "Приглашение",
    specialDiscount: "СПЕЦИАЛЬНАЯ СКИДКА",
    giftVoucher: "ПОДАРОЧНЫЙ ВАУЧЕР",
    redeemable: "Можно обменять в любом корнере Sisley Paris в Индонезии.",
    congratsTitle: "ПОЗДРАВЛЯЕМ",
    voucherPrefix: "ВАУЧЕР",
    discountPrefix: "СКИДКА",
    claimMessage: "Здравствуйте, я получил награду от Sisley Paris",
    codeLabel: "с кодом",
    processRequest: "Пожалуйста, обработайте этот запрос.",
    florenceSubtitle: "Париж 1976",
    backToHome: "На главную",
    visionTitle: "Видение и Миссия",
    visionText1: "Совершенство французской фитокосметологии",
    visionText2: "Sisley — французский люксовый бренд, созданный Юбером д’Орнано, который одним из первых начал использовать растительные эссенции в косметологии. Семейная компания создает продукты высочайшего качества, сочетая лучшее от природы и науки.",
  },
  ja: {
    menu: "ビジョンとミッション",
    validUntil: "有効期限",
    claimReward: "報酬を請求する",
    viaWhatsapp: "WhatsApp経由",
    welcomeTitle: "絶妙な幸運",
    welcomeText: "SISLEY PARISイベントに参加しましょう。フィトコスメトロジー（植物美容学）の世界を探索してください。スケッチの下に隠されたあなただけの特典を明らかにしてください。",
    scratchHere: "ここを削る",
    invitation: "招待状",
    specialDiscount: "特別割引",
    giftVoucher: "ギフト券",
    redeemable: "インドネシアのすべてのSisley Parisカウンターで利用可能。",
    congratsTitle: "おめでとうございます",
    voucherPrefix: "バウチャー",
    discountPrefix: "割引",
    claimMessage: "こんにちは、Sisley Parisから報酬を受け取りました",
    codeLabel: "コード",
    processRequest: "このリクエストを処理してください。",
    florenceSubtitle: "パリ 1976",
    backToHome: "ホームに戻る",
    visionTitle: "ビジョンとミッション",
    visionText1: "フランスのフィトコスメトロジーの卓越性",
    visionText2: "シスレーは、化粧品に植物エッセンスを使用した最初の人物の1人であるユベール・ドルナノによって設立されたフランスのラグジュアリーブランドです。この家族経営の会社は、自然と科学の最良のものを組み合わせることで、最高品質の製品を生み出しています。",
  },
  de: {
    menu: "VISION & MISSION",
    validUntil: "Gültig bis",
    claimReward: "Belohnung anfordern",
    viaWhatsapp: "Über WhatsApp",
    welcomeTitle: "Exquisites Glück",
    welcomeText: "Nehmen Sie am SISLEY PARIS Event teil. Entdecken Sie die Welt der Phyto-Kosmetologie. Enthüllen Sie Ihr exklusives Privileg, das unter der Skizze verborgen ist.",
    scratchHere: "Hier freirubbeln",
    invitation: "Einladung",
    specialDiscount: "SONDERRABATT",
    giftVoucher: "GESCHENKGUTSCHEIN",
    redeemable: "Einlösbar an jedem Sisley Paris Counter in Indonesien.",
    congratsTitle: "GLÜCKWUNSCH",
    voucherPrefix: "GUTSCHEIN",
    discountPrefix: "RABATT",
    claimMessage: "Hallo, ich habe eine Belohnung von Sisley Paris erhalten",
    codeLabel: "mit Code",
    processRequest: "Bitte bearbeiten Sie diese Anfrage.",
    florenceSubtitle: "Paris 1976",
    backToHome: "Zurück zur Startseite",
    visionTitle: "Vision & Mission",
    visionText1: "Die Exzellenz der französischen Phyto-Kosmetologie",
    visionText2: "Sisley ist eine französische Luxusmarke, die von Hubert d’Ornano gegründet wurde, einem der ersten, der pflanzliche Essenzen in der Kosmetologie verwendete. Das Familienunternehmen kreiert Produkte von höchster Qualität, indem es das Beste aus Natur und Wissenschaft kombiniert.",
  },
  fr: {
    menu: "VISION ET MISSION",
    validUntil: "Valable jusqu'au",
    claimReward: "Réclamer la récompense",
    viaWhatsapp: "Via WhatsApp",
    welcomeTitle: "Fortune Exquise",
    welcomeText: "Rejoignez l'événement SISLEY PARIS. Explorez le monde de la Phyto-cosmétologie. Dévoilez votre privilège exclusif caché sous le croquis.",
    scratchHere: "Grattez ici",
    invitation: "Invitation",
    specialDiscount: "REMISE SPÉCIALE",
    giftVoucher: "CHÈQUE CADEAU",
    redeemable: "Échangeable dans n'importe quel comptoir Sisley Paris en Indonésie.",
    congratsTitle: "FÉLICITATIONS",
    voucherPrefix: "BON",
    discountPrefix: "REMISE",
    claimMessage: "Bonjour, j'ai reçu une récompense de Sisley Paris",
    codeLabel: "avec le code",
    processRequest: "Veuillez traiter cette demande.",
    florenceSubtitle: "Paris 1976",
    backToHome: "Retour à l'accueil",
    visionTitle: "Vision & Mission",
    visionText1: "L'Excellence de la Phyto-cosmétologie Française",
    visionText2: "Sisley est une marque de luxe française créée par Hubert d’Ornano, qui fut l’un des premiers à utiliser les essences botaniques en cosmétologie. L’entreprise familiale crée des produits de la plus haute qualité en alliant le meilleur de la nature et de la science.",
  },
  it: {
    menu: "VISIONE E MISSIONE",
    validUntil: "Valido Fino Al",
    claimReward: "Richiedi Premio",
    viaWhatsapp: "Via WhatsApp",
    welcomeTitle: "Fortuna Squisita",
    welcomeText: "Unisciti all'evento SISLEY PARIS. Esplora il mondo della Fito-cosmetologia. Svela il tuo privilegio esclusivo nascosto sotto lo schizzo.",
    scratchHere: "Gratta Qui",
    invitation: "Invito",
    specialDiscount: "SCONTO SPECIALE",
    giftVoucher: "BUONO REGALO",
    redeemable: "Riscattabile in qualsiasi bancone Sisley Paris in Indonesia.",
    congratsTitle: "CONGRATULAZIONI",
    voucherPrefix: "BUONO",
    discountPrefix: "SCONTO",
    claimMessage: "Salve, ho ricevuto un premio da Sisley Paris",
    codeLabel: "con codice",
    processRequest: "Si prega di elaborare questa richiesta.",
    florenceSubtitle: "Parigi 1976",
    backToHome: "Torna alla Home",
    visionTitle: "Visione e Missione",
    visionText1: "L'Eccellenza della Fito-cosmetologia Francese",
    visionText2: "Sisley è un marchio di lusso francese creato da Hubert d’Ornano, che fu uno dei primi a utilizzare le essenze botaniche in cosmetologia. L'azienda a conduzione familiare crea prodotti di altissima qualità combinando il meglio della natura e della scienza.",
  },
  ko: {
    menu: "비전 및 사명",
    validUntil: "유효 기간",
    claimReward: "보상 청구",
    viaWhatsapp: "WhatsApp을 통해",
    welcomeTitle: "정교한 행운",
    welcomeText: "SISLEY PARIS 이벤트에 참여하세요. 피토 코스메톨로지의 세계를 탐험하세요. 스케치 아래 숨겨진 독점 혜택을 공개합니다.",
    scratchHere: "여기를 긁으세요",
    invitation: "초대장",
    specialDiscount: "특별 할인",
    giftVoucher: "기프트 바우처",
    redeemable: "인도네시아 내 모든 Sisley Paris 카운터에서 교환 가능.",
    congratsTitle: "축하합니다",
    voucherPrefix: "바우처",
    discountPrefix: "할인",
    claimMessage: "안녕하세요, Sisley Paris에서 보상을 받았습니다",
    codeLabel: "코드 포함",
    processRequest: "이 요청을 처리해 주십시오.",
    florenceSubtitle: "파리 1976",
    backToHome: "홈으로 돌아 가기",
    visionTitle: "비전 및 사명",
    visionText1: "프랑스 피토 코스메톨로지의 우수성",
    visionText2: "시슬리는 화장품에 식물성 에센스를 최초로 사용한 사람 중 한 명인 위베르 도르나노가 만든 프랑스 럭셔리 브랜드입니다. 이 가족 소유 회사는 자연과 과학의 장점을 결합하여 최고 품질의 제품을 만듭니다.",
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