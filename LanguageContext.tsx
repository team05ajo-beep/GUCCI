
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
    welcomeText: "Ikuti Event GUCCI. Jelajahi Taman Gucci. Temukan hak istimewa eksklusif Anda yang tersembunyi di balik sketsa.",
    scratchHere: "Gosok Di Sini",
    invitation: "Undangan",
    specialDiscount: "POTONGAN SPESIAL",
    giftVoucher: "VOUCHER HADIAH",
    redeemable: "Dapat ditukarkan di seluruh Butik Gucci di Indonesia.",
    congratsTitle: "SELAMAT",
    voucherPrefix: "VOUCHER",
    discountPrefix: "POTONGAN",
    claimMessage: "Halo, saya telah mendapatkan hadiah",
    codeLabel: "dengan kode",
    processRequest: "Mohon diproses.",
    florenceSubtitle: "Firenze 1921",
    backToHome: "Kembali ke Beranda",
    visionTitle: "Visi & Misi",
    visionText1: "Strategi Kemitraan Global",
    visionText2: `1. Membangun Kemitraan yang Berkualitas dan Berintegritas
Program ini dirancang untuk merangkul mitra yang memiliki visi serupa: menghadirkan nilai positif bagi pelanggan dan menjaga standar etika yang tinggi. GUCCI memastikan setiap afiliasi memahami karakter brand, estetika, dan standar komunikasi agar reputasi global tetap terpelihara.

2. Memperluas Pengaruh Brand Secara Strategis dan Terukur
Melalui kolaborasi yang tepat, GUCCI menargetkan audiens baru di berbagai negara. Jaringan afiliasi menjadi jembatan penting dalam memperkenalkan koleksi dan kampanye terbaru ke pasar yang terus berkembang.

3. Menghadirkan Pengalaman Pelanggan yang Konsisten dan Premium
Afiliasi memiliki peran besar dalam membangun persepsi pelanggan melalui informasi yang tepat, rekomendasi bernilai, dan layanan selaras dengan standar GUCCI.

4. Menciptakan Kolaborasi Berkelanjutan yang Menguntungkan
Program ini dirancang untuk hubungan jangka panjang yang stabil. GUCCI memberikan struktur benefit yang transparan agar kerja sama terasa adil dan saling menguatkan.

5. Menginspirasi Melalui Kreativitas dan Inovasi Digital
GUCCI mendorong para afiliasi untuk membuat konten visual berkualitas, kampanye kreatif, serta memanfaatkan teknologi digital sebagai sarana memperkuat daya tarik brand.

6. Menjaga Standar Kualitas dan Eksklusivitas Brand
Seluruh aktivitas afiliasi harus mencerminkan identitas premium GUCCI. Konsistensi dalam estetika, tone komunikasi, dan presentasi visual menjadi prioritas utama.

7. Mendorong Pertumbuhan Ekonomi Kreatif Global
Program ini membuka peluang bagi kreator dan mitra bisnis untuk berkembang bersama industri fashion high-end, memperluas ruang kolaborasi dan inovasi.

8. Meningkatkan Edukasi dan Literasi Brand bagi Mitra
GUCCI menyediakan panduan, pelatihan, dan materi edukatif untuk memastikan setiap afiliasi memahami sejarah, nilai, dan positioning brand sehingga penyampaian informasi kepada pelanggan tetap akurat dan elegan.

9. Memperkuat Kehadiran GUCCI di Ranah Digital dan Media Sosial
Melalui aktivitas afiliasi, GUCCI memperluas eksistensinya di platform digital dengan cara yang lebih organik, autentik, dan interaktif, menjangkau generasi muda secara lebih efektif.

10. Mengembangkan Kanal Distribusi yang Lebih Adaptif dan Relevan
Program afiliasi menjadi sarana bagi GUCCI untuk memahami perilaku pelanggan modern, sehingga strategi distribusi dapat disesuaikan dengan tren, preferensi, dan pola konsumsi terbaru.

11. Mempercepat Penyebaran Informasi Terkait Koleksi dan Kampanye Baru
Afiliasi berfungsi sebagai frontliner digital yang mempercepat penyampaian informasi mengenai rilis produk, event eksklusif, maupun kampanye global GUCCI, sehingga awareness pelanggan meningkat jauh lebih cepat.

12. Mendorong Transparansi dan Profesionalisme dalam Seluruh Proses
GUCCI memastikan setiap mitra memahami pentingnya transparansi dalam komunikasi, metode promosi, hingga mekanisme komisi. Hal ini menjaga ekosistem kerja sama yang sehat dan profesional.

13. Membangun Komunitas Loyal yang Terhubung dengan Nilai Brand
Program afiliasi bertujuan menciptakan komunitas yang tidak hanya mengagumi GUCCI, tetapi juga memahami dan menyebarkan nilai-nilai brand melalui gaya hidup, kreativitas, dan pengalaman mereka.

14. Mengintegrasikan Teknologi untuk Pengalaman Afiliasi yang Lebih Baik
GUCCI mengembangkan sistem yang memudahkan afiliasi melacak kinerja, memantau transaksi, mengelola konten, dan memahami data pelanggan. Semuanya dirancang untuk meningkatkan efisiensi dan potensi pendapatan mitra.

15. Memperkuat Reputasi GUCCI sebagai Brand Luxury yang Relevan dan Visioner
Melalui jaringan afiliasi, GUCCI ingin memastikan bahwa image sebagai brand luxury tetap kuat, modern, dan relevan dengan perubahan zaman—baik dalam konteks fashion, teknologi, maupun gaya hidup global.`,
  },
  en: {
    menu: "VISION & MISSION",
    validUntil: "Valid Until",
    claimReward: "Claim Reward",
    viaWhatsapp: "Via WhatsApp",
    welcomeTitle: "Exquisite Fortune",
    welcomeText: "Join the GUCCI Event. Explore the Gucci Garden. Unveil your exclusive privilege hidden beneath the sketch.",
    scratchHere: "Scratch Here",
    invitation: "Invitation",
    specialDiscount: "SPECIAL DISCOUNT",
    giftVoucher: "GIFT VOUCHER",
    redeemable: "Redeemable at any Gucci Boutique in Indonesia.",
    congratsTitle: "CONGRATULATIONS",
    voucherPrefix: "VOUCHER",
    discountPrefix: "DISCOUNT",
    claimMessage: "Hello, I have received a reward",
    codeLabel: "with code",
    processRequest: "Please process this request.",
    florenceSubtitle: "Florence 1921",
    backToHome: "Back to Home",
    visionTitle: "Vision & Mission",
    visionText1: "Influential, innovative, and progressive, Gucci is reinventing a wholly modern approach to fashion. Under the new vision of creative director, the House has redefined luxury for the 21st century.",
    visionText2: "Our mission is to reinforce our position as one of the world’s most desirable fashion houses. Eclectic, contemporary, romantic—Gucci products represent the pinnacle of Italian craftsmanship and are unsurpassed for their quality and attention to detail.",
  },
  zh: {
    menu: "愿景与使命",
    validUntil: "有效期至",
    claimReward: "领取奖励",
    viaWhatsapp: "通过 WhatsApp",
    welcomeTitle: "精致的财富",
    welcomeText: "探索古驰花园。揭开隐藏在草图下的专属特权。",
    scratchHere: "在这里刮擦",
    invitation: "邀请函",
    specialDiscount: "特别折扣",
    giftVoucher: "礼品券",
    redeemable: "可在印度尼西亚的任何古驰精品店兑换。",
    congratsTitle: "恭喜",
    voucherPrefix: "代金券",
    discountPrefix: "折扣",
    claimMessage: "您好，我收到了一份奖励",
    codeLabel: "代码",
    processRequest: "请处理此请求。",
    florenceSubtitle: "佛罗伦萨 1921",
    backToHome: "返回首页",
    visionTitle: "愿景与使命",
    visionText1: "古驰 (Gucci) 具有影响力、创新性和进步性，正在重塑一种完全现代的时尚方式。在创意总监的新愿景下，该品牌重新定义了 21 世纪的奢华。",
    visionText2: "我们的使命是巩固我们作为世界上最令人向往的时装屋之一的地位。不拘一格、现代、浪漫——古驰产品代表了意大利工艺的巅峰，其质量和对细节的关注无与伦比。",
  },
  es: {
    menu: "VISIÓN Y MISIÓN",
    validUntil: "Válido Hasta",
    claimReward: "Reclamar Recompensa",
    viaWhatsapp: "Vía WhatsApp",
    welcomeTitle: "Fortuna Exquisita",
    welcomeText: "Explora el Jardín Gucci. Devela tu privilegio exclusivo oculto bajo el boceto.",
    scratchHere: "Rasca Aquí",
    invitation: "Invitación",
    specialDiscount: "DESCUENTO ESPECIAL",
    giftVoucher: "CUPÓN DE REGALO",
    redeemable: "Canjeable en cualquier boutique Gucci en Indonesia.",
    congratsTitle: "FELICITACIONES",
    voucherPrefix: "CUPÓN",
    discountPrefix: "DESCUENTO",
    claimMessage: "Hola, he recibido una recompensa",
    codeLabel: "con código",
    processRequest: "Por favor procese esta solicitud.",
    florenceSubtitle: "Florencia 1921",
    backToHome: "Volver al Inicio",
    visionTitle: "Visión y Misión",
    visionText1: "Influyente, innovadora y progresista, Gucci está reinventando un enfoque totalmente moderno de la moda. Bajo la nueva visión del director creativo, la Casa ha redefinido el lujo para el siglo XXI.",
    visionText2: "Nuestra misión es reforzar nuestra posición como una de las casas de moda más deseadas del mundo. Eclécticos, contemporáneos, románticos: los productos Gucci representan la cúspide de la artesanía italiana y son insuperables por su calidad y atención al detalle.",
  },
  hi: {
    menu: "दृष्टि और मिशन",
    validUntil: "तक मान्य",
    claimReward: "इनाम का दावा करें",
    viaWhatsapp: "व्हाट्सएप के जरिए",
    welcomeTitle: "उत्तम भाग्य",
    welcomeText: "गुच्ची गार्डन का अन्वेषण करें। स्केच के नीचे छिपे अपने विशेष विशेषाधिकार का अनावरण करें।",
    scratchHere: "यहाँ खरोंचें",
    invitation: "निमंत्रण",
    specialDiscount: "विशेष छूट",
    giftVoucher: "उपहार वाउचर",
    redeemable: "इंडोनेशिया में किसी भी गुच्ची बुटीक में भुनाया जा सकता है।",
    congratsTitle: "बधाई हो",
    voucherPrefix: "वाउचर",
    discountPrefix: "छूट",
    claimMessage: "नमस्ते, मुझे एक इनाम मिला है",
    codeLabel: "कोड के साथ",
    processRequest: "कृपया इस अनुरोध को संसाधित करें।",
    florenceSubtitle: "फ्लोरेंस 1921",
    backToHome: "घर वापस",
    visionTitle: "दृष्टि और मिशन",
    visionText1: "प्रभावशाली, अभिनव और प्रगतिशील, गुच्ची फैशन के लिए पूरी तरह से आधुनिक दृष्टिकोण को फिर से खोज रहा है। रचनात्मक निदेशक की नई दृष्टि के तहत, हाउस ने 21वीं सदी के लिए विलासिता को फिर से परिभाषित किया है।",
    visionText2: "हमारा मिशन दुनिया के सबसे वांछनीय फैशन हाउसों में से एक के रूप में अपनी स्थिति को सुदृढ़ करना है। उदार, समकालीन, रोमांटिक - गुच्ची उत्पाद इतालवी शिल्प कौशल के शिखर का प्रतिनिधित्व करते हैं और अपनी गुणवत्ता और विस्तार पर ध्यान देने के लिए नायाब हैं।",
  },
  ar: {
    menu: "الرؤية والرسالة",
    validUntil: "صالح حتى",
    claimReward: "المطالبة بالمكافأة",
    viaWhatsapp: "عبر الواتساب",
    welcomeTitle: "ثروة رائعة",
    welcomeText: "استكشف حديقة غوتشي. اكشف عن امتيازك الحصري المخفي تحت الرسم.",
    scratchHere: "اخدش هنا",
    invitation: "دعوة",
    specialDiscount: "خصم خاص",
    giftVoucher: "قسيمة هدايا",
    redeemable: "قابل للاستبدال في أي متجر غوتشي في إندونيسيا.",
    congratsTitle: "تهانينا",
    voucherPrefix: "قسيمة",
    discountPrefix: "خصم",
    claimMessage: "مرحبًا، لقد حصلت على مكافأة",
    codeLabel: "مع الرمز",
    processRequest: "يرجى معالجة هذا الطلب.",
    florenceSubtitle: "فلورنسا 1921",
    backToHome: "العودة إلى الصفحة الرئيسية",
    visionTitle: "الرؤية والرسالة",
    visionText1: "مؤثرة ومبتكرة وتقدمية، تعيد غوتشي ابتكار نهج حديث تمامًا للأزياء. في ظل الرؤية الجديدة للمدير الإبداعي، أعادت الدار تعريف الفخامة للقرن الحادي والعشرين.",
    visionText2: "مهمتنا هي تعزيز مكانتنا كواحدة من أكثر بيوت الأزياء المرغوبة في العالم. منتجات غوتشي انتقائية ومعاصرة ورومانسية، وتمثل قمة الحرفية الإيطالية وتتفوق في جودتها واهتمامها بالتفاصيل.",
  },
  pt: {
    menu: "VISÃO E MISSÃO",
    validUntil: "Válido Até",
    claimReward: "Reivindicar Recompensa",
    viaWhatsapp: "Via WhatsApp",
    welcomeTitle: "Fortuna Requintada",
    welcomeText: "Explore o Jardim Gucci. Revele seu privilégio exclusivo escondido sob o esboço.",
    scratchHere: "Raspe Aqui",
    invitation: "Convite",
    specialDiscount: "DESCONTO ESPECIAL",
    giftVoucher: "VALE PRESENTE",
    redeemable: "Resgatável em qualquer Boutique Gucci na Indonésia.",
    congratsTitle: "PARABÉNS",
    voucherPrefix: "VALE",
    discountPrefix: "DESCONTO",
    claimMessage: "Olá, recebi uma recompensa",
    codeLabel: "com código",
    processRequest: "Por favor, processe este pedido.",
    florenceSubtitle: "Florença 1921",
    backToHome: "Voltar ao Início",
    visionTitle: "Visão e Missão",
    visionText1: "Influente, inovadora e progressista, a Gucci está reinventando uma abordagem totalmente moderna para a moda. Sob a nova visão do diretor criativo, a Casa redefiniu o luxo para o século 21.",
    visionText2: "Nossa missão é reforçar nossa posição como uma das casas de moda mais desejadas do mundo. Ecléticos, contemporâneos, românticos — os produtos Gucci representam o auge do artesanato italiano e são insuperáveis ​​por sua qualidade e atenção aos detalhes.",
  },
  ru: {
    menu: "ВИДЕНИЕ И МИССИЯ",
    validUntil: "Действительно до",
    claimReward: "Получить награду",
    viaWhatsapp: "Через WhatsApp",
    welcomeTitle: "Изысканная удача",
    welcomeText: "Исследуйте Сад Гуччи. Откройте свою эксклюзивную привилегию, скрытую под эскизом.",
    scratchHere: "Стереть здесь",
    invitation: "Приглашение",
    specialDiscount: "СПЕЦИАЛЬНАЯ СКИДКА",
    giftVoucher: "ПОДАРОЧНЫЙ ВАУЧЕР",
    redeemable: "Можно обменять в любом бутике Gucci в Индонезии.",
    congratsTitle: "ПОЗДРАВЛЯЕМ",
    voucherPrefix: "ВАУЧЕР",
    discountPrefix: "СКИДКА",
    claimMessage: "Здравствуйте, я получил награду",
    codeLabel: "с кодом",
    processRequest: "Пожалуйста, обработайте этот запрос.",
    florenceSubtitle: "Флоренция 1921",
    backToHome: "На главную",
    visionTitle: "Видение и Миссия",
    visionText1: "Влиятельный, инновационный и прогрессивный, Gucci заново изобретает совершенно современный подход к моде. Под новым видением креативного директора Дом переопределил роскошь для 21-го века.",
    visionText2: "Наша миссия — укрепить нашу позицию как одного из самых желанных домов моды в мире. Эклектичные, современные, романтичные — продукты Gucci представляют собой вершину итальянского мастерства и непревзойденны по качеству и вниманию к деталям.",
  },
  ja: {
    menu: "ビジョンとミッション",
    validUntil: "有効期限",
    claimReward: "報酬を請求する",
    viaWhatsapp: "WhatsApp経由",
    welcomeTitle: "絶妙な幸運",
    welcomeText: "グッチガーデンを探索しましょう。スケッチの下に隠されたあなただけの特典を明らかにしてください。",
    scratchHere: "ここを削る",
    invitation: "招待状",
    specialDiscount: "特別割引",
    giftVoucher: "ギフト券",
    redeemable: "インドネシアのすべてのグッチブティックで利用可能。",
    congratsTitle: "おめでとうございます",
    voucherPrefix: "バウチャー",
    discountPrefix: "割引",
    claimMessage: "こんにちは、報酬を受け取りました",
    codeLabel: "コード",
    processRequest: "このリクエストを処理してください。",
    florenceSubtitle: "フィレンツェ 1921",
    backToHome: "ホームに戻る",
    visionTitle: "ビジョンとミッション",
    visionText1: "影響力があり、革新的で進歩的なグッチは、ファッションへの完全に現代的なアプローチを再発明しています。クリエイティブディレクターの新しいビジョンの下、メゾンは21世紀のラグジュアリーを再定義しました。",
    visionText2: "私たちの使命は、世界で最も魅力的なファッションハウスの1つとしての地位を強化することです。折衷的で現代的、ロマンチックなグッチの製品は、イタリアの職人技の頂点を表しており、その品質と細部へのこだわりは比類のないものです。",
  },
  de: {
    menu: "VISION & MISSION",
    validUntil: "Gültig bis",
    claimReward: "Belohnung anfordern",
    viaWhatsapp: "Über WhatsApp",
    welcomeTitle: "Exquisites Glück",
    welcomeText: "Erkunden Sie den Gucci Garden. Enthüllen Sie Ihr exklusives Privileg, das unter der Skizze verborgen ist.",
    scratchHere: "Hier freirubbeln",
    invitation: "Einladung",
    specialDiscount: "SONDERRABATT",
    giftVoucher: "GESCHENKGUTSCHEIN",
    redeemable: "Einlösbar in jeder Gucci Boutique in Indonesien.",
    congratsTitle: "GLÜCKWUNSCH",
    voucherPrefix: "GUTSCHEIN",
    discountPrefix: "RABATT",
    claimMessage: "Hallo, ich habe eine Belohnung erhalten",
    codeLabel: "mit Code",
    processRequest: "Bitte bearbeiten Sie diese Anfrage.",
    florenceSubtitle: "Florenz 1921",
    backToHome: "Zurück zur Startseite",
    visionTitle: "Vision & Mission",
    visionText1: "Einflussreich, innovativ und fortschrittlich erfindet Gucci einen völlig modernen Ansatz für Mode neu. Unter der neuen Vision des Kreativdirektors hat das Haus Luxus für das 21. Jahrhundert neu definiert.",
    visionText2: "Unsere Mission ist es, unsere Position als eines der begehrtesten Modehäuser der Welt zu stärken. Eklektisch, zeitgenössisch, romantisch – Gucci-Produkte repräsentieren den Gipfel italienischer Handwerkskunst und sind unübertroffen in ihrer Qualität und Liebe zum Detail.",
  },
  fr: {
    menu: "VISION ET MISSION",
    validUntil: "Valable jusqu'au",
    claimReward: "Réclamer la récompense",
    viaWhatsapp: "Via WhatsApp",
    welcomeTitle: "Fortune Exquise",
    welcomeText: "Explorez le Jardin Gucci. Dévoilez votre privilège exclusif caché sous le croquis.",
    scratchHere: "Grattez ici",
    invitation: "Invitation",
    specialDiscount: "REMISE SPÉCIALE",
    giftVoucher: "CHÈQUE CADEAU",
    redeemable: "Échangeable dans n'importe quelle boutique Gucci en Indonésie.",
    congratsTitle: "FÉLICITATIONS",
    voucherPrefix: "BON",
    discountPrefix: "REMISE",
    claimMessage: "Bonjour, j'ai reçu une récompense",
    codeLabel: "avec le code",
    processRequest: "Veuillez traiter cette demande.",
    florenceSubtitle: "Florence 1921",
    backToHome: "Retour à l'accueil",
    visionTitle: "Vision & Mission",
    visionText1: "Influent, innovant et progressiste, Gucci réinvente une approche totalement moderne de la mode. Sous la nouvelle vision du directeur créatif, la Maison a redéfini le luxe pour le 21e siècle.",
    visionText2: "Notre mission est de renforcer notre position comme l'une des maisons de couture les plus désirables au monde. Éclectiques, contemporains, romantiques, les produits Gucci représentent le summum de l'artisanat italien et sont inégalés pour leur qualité et leur souci du détail.",
  },
  it: {
    menu: "VISIONE E MISSIONE",
    validUntil: "Valido Fino Al",
    claimReward: "Richiedi Premio",
    viaWhatsapp: "Via WhatsApp",
    welcomeTitle: "Fortuna Squisita",
    welcomeText: "Esplora il Gucci Garden. Svela il tuo privilegio esclusivo nascosto sotto lo schizzo.",
    scratchHere: "Gratta Qui",
    invitation: "Invito",
    specialDiscount: "SCONTO SPECIALE",
    giftVoucher: "BUONO REGALO",
    redeemable: "Riscattabile in qualsiasi Boutique Gucci in Indonesia.",
    congratsTitle: "CONGRATULAZIONI",
    voucherPrefix: "BUONO",
    discountPrefix: "SCONTO",
    claimMessage: "Salve, ho ricevuto un premio",
    codeLabel: "con codice",
    processRequest: "Si prega di elaborare questa richiesta.",
    florenceSubtitle: "Firenze 1921",
    backToHome: "Torna alla Home",
    visionTitle: "Visione e Missione",
    visionText1: "Influente, innovativa e progressista, Gucci sta reinventando un approccio alla moda completamente moderno. Sotto la nuova visione del direttore creativo, la Maison ha ridefinito il lusso per il XXI secolo.",
    visionText2: "La nostra missione è rafforzare la nostra posizione come una delle case di moda più desiderate al mondo. Eclettici, contemporanei, romantici: i prodotti Gucci rappresentano l'apice dell'artigianato italiano e sono insuperabili per qualità e attenzione ai dettagli.",
  },
  ko: {
    menu: "비전 및 사명",
    validUntil: "유효 기간",
    claimReward: "보상 청구",
    viaWhatsapp: "WhatsApp을 통해",
    welcomeTitle: "정교한 행운",
    welcomeText: "구찌 가든을 탐험하세요. 스케치 아래 숨겨진 독점 혜택을 공개합니다.",
    scratchHere: "여기를 긁으세요",
    invitation: "초대장",
    specialDiscount: "특별 할인",
    giftVoucher: "기프트 바우처",
    redeemable: "인도네시아 내 모든 구찌 부티크에서 교환 가능.",
    congratsTitle: "축하합니다",
    voucherPrefix: "바우처",
    discountPrefix: "할인",
    claimMessage: "안녕하세요, 보상을 받았습니다",
    codeLabel: "코드 포함",
    processRequest: "이 요청을 처리해 주십시오.",
    florenceSubtitle: "피렌체 1921",
    backToHome: "홈으로 돌아 가기",
    visionTitle: "비전 및 사명",
    visionText1: "영향력 있고 혁신적이며 진보적인 구찌는 패션에 대한 완전히 현대적인 접근 방식을 재창조하고 있습니다. 크리에이티브 디렉터의 새로운 비전 아래, 이 하우스는 21세기를 위한 럭셔리를 재정의했습니다.",
    visionText2: "우리의 임무는 세계에서 가장 탐나는 패션 하우스 중 하나로서의 입지를 강화하는 것입니다. 절충적이고 현대적이며 로맨틱한 구찌 제품은 이탈리아 장인 정신의 정점을 나타내며 품질과 디테일에 대한 관심에서 타의 추종을 불허합니다.",
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
