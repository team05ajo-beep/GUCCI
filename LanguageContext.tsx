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
    // Login
    loginTitle: "MASUK MEMBER",
    loginSubtitle: "Masuk untuk mengakses undian eksklusif.",
    fullName: "Nama Lengkap",
    phoneNumber: "Nomor HP",
    password: "Kata Sandi",
    startJourney: "MULAI PERJALANAN",
    // Existing
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
    claimMessage: "Halo, saya telah mendapatkan hadiah dari Gucci Indonesia",
    codeLabel: "dengan kode",
    processRequest: "Mohon diproses.",
    florenceSubtitle: "Florence 1921",
    backToHome: "Kembali ke Beranda",
    visionTitle: "Visi & Misi",
    visionText1: "Membangun Warisan Kemitraan",
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
    // Login
    loginTitle: "MEMBER LOGIN",
    loginSubtitle: "Sign in to access exclusive lucky draw.",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    password: "Password",
    startJourney: "START JOURNEY",
    // Existing
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
    claimMessage: "Hello, I have received a reward from Gucci Indonesia",
    codeLabel: "with code",
    processRequest: "Please process this request.",
    florenceSubtitle: "Florence 1921",
    backToHome: "Back to Home",
    visionTitle: "Vision & Mission",
    visionText1: "Building a Legacy of Partnership",
    visionText2: "Gucci is reinventing a wholly modern approach to fashion. Under the new vision of creative director Sabato De Sarno, the House has redefined luxury for the 21st century, further reinforcing its position as one of the world’s most desirable fashion houses.",
  },
  zh: {
    loginTitle: "会员登录",
    loginSubtitle: "登录以参加独家抽奖。",
    fullName: "全名",
    phoneNumber: "电话号码",
    password: "密码",
    startJourney: "开始旅程",
    menu: "愿景与使命",
    validUntil: "有效期至",
    claimReward: "领取奖励",
    viaWhatsapp: "通过 WhatsApp",
    welcomeTitle: "精致的财富",
    welcomeText: "参加 GUCCI 活动。探索古驰花园。揭开隐藏在草图下的专属特权。",
    scratchHere: "在这里刮擦",
    invitation: "邀请函",
    specialDiscount: "特别折扣",
    giftVoucher: "礼品券",
    redeemable: "可在印度尼西亚的任何 Gucci 精品店兑换。",
    congratsTitle: "恭喜",
    voucherPrefix: "代金券",
    discountPrefix: "折扣",
    claimMessage: "您好，我收到了来自 Gucci Indonesia 的奖励",
    codeLabel: "代码",
    processRequest: "请处理此请求。",
    florenceSubtitle: "佛罗伦萨 1921",
    backToHome: "返回首页",
    visionTitle: "愿景与使命",
    visionText1: "建立合作伙伴关系的遗产",
    visionText2: "Gucci 正在重塑一种完全现代的时尚方式。在创意总监 Sabato De Sarno 的新愿景下，该品牌重新定义了 21 世纪的奢华。",
  },
  es: {
    loginTitle: "INICIO DE SESIÓN",
    loginSubtitle: "Inicia sesión para acceder.",
    fullName: "Nombre Completo",
    phoneNumber: "Número de Teléfono",
    password: "Contraseña",
    startJourney: "COMENZAR VIAJE",
    menu: "VISIÓN Y MISIÓN",
    validUntil: "Válido Hasta",
    claimReward: "Reclamar Recompensa",
    viaWhatsapp: "Vía WhatsApp",
    welcomeTitle: "Fortuna Exquisita",
    welcomeText: "Únete al evento GUCCI. Explora el Jardín Gucci. Devela tu privilegio exclusivo oculto bajo el boceto.",
    scratchHere: "Rasca Aquí",
    invitation: "Invitación",
    specialDiscount: "DESCUENTO ESPECIAL",
    giftVoucher: "CUPÓN DE REGALO",
    redeemable: "Canjeable en cualquier boutique Gucci en Indonesia.",
    congratsTitle: "FELICITACIONES",
    voucherPrefix: "CUPÓN",
    discountPrefix: "DESCUENTO",
    claimMessage: "Hola, he recibido una recompensa de Gucci Indonesia",
    codeLabel: "con código",
    processRequest: "Por favor procese esta solicitud.",
    florenceSubtitle: "Florencia 1921",
    backToHome: "Volver al Inicio",
    visionTitle: "Visión y Misión",
    visionText1: "Construyendo un Legado de Asociación",
    visionText2: "Gucci está reinventando un enfoque totalmente moderno de la moda. Bajo la nueva visión del director creativo Sabato De Sarno, la Casa ha redefinido el lujo para el siglo XXI.",
  },
  hi: {
    loginTitle: "सदस्य लॉगिन",
    loginSubtitle: "लकी ड्रा तक पहुंचने के लिए साइन इन करें।",
    fullName: "पूरा नाम",
    phoneNumber: "फ़ोन नंबर",
    password: "पासवर्ड",
    startJourney: "यात्रा शुरू करें",
    menu: "दृष्टि और मिशन",
    validUntil: "तक मान्य",
    claimReward: "इनाम का दावा करें",
    viaWhatsapp: "व्हाट्सएप के जरिए",
    welcomeTitle: "उत्तम भाग्य",
    welcomeText: "GUCCI इवेंट में शामिल हों। गुच्ची गार्डन का अन्वेषण करें। स्केच के नीचे छिपे अपने विशेष विशेषाधिकार का अनावरण करें।",
    scratchHere: "यहाँ खरोंचें",
    invitation: "निमंत्रण",
    specialDiscount: "विशेष छूट",
    giftVoucher: "उपहार वाउचर",
    redeemable: "इंडोनेशिया में किसी भी Gucci बुटीक पर भुनाया जा सकता है।",
    congratsTitle: "बधाई हो",
    voucherPrefix: "वाउचर",
    discountPrefix: "छूट",
    claimMessage: "नमस्ते, मुझे Gucci Indonesia से एक इनाम मिला है",
    codeLabel: "कोड के साथ",
    processRequest: "कृपया इस अनुरोध को संसाधित करें।",
    florenceSubtitle: "फ्लोरेंस 1921",
    backToHome: "घर वापस",
    visionTitle: "दृष्टि और मिशन",
    visionText1: "साझेदारी की विरासत का निर्माण",
    visionText2: "Gucci फैशन के लिए पूरी तरह से आधुनिक दृष्टिकोण का पुन: आविष्कार कर रहा है। रचनात्मक निर्देशक सबातो डी सरनो की नई दृष्टि के तहत, हाउस ने 21 वीं सदी के लिए विलासिता को फिर से परिभाषित किया है।",
  },
  ar: {
    loginTitle: "تسجيل الدخول",
    loginSubtitle: "تسجيل الدخول للوصول.",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    password: "كلمة المرور",
    startJourney: "ابدأ الرحلة",
    menu: "الرؤية والرسالة",
    validUntil: "صالح حتى",
    claimReward: "المطالبة بالمكافأة",
    viaWhatsapp: "عبر الواتساب",
    welcomeTitle: "ثروة رائعة",
    welcomeText: "انضم إلى حدث GUCCI. استكشف حديقة غوتشي. اكشف عن امتيازك الحصري المخفي تحت الرسم.",
    scratchHere: "اخدش هنا",
    invitation: "دعوة",
    specialDiscount: "خصم خاص",
    giftVoucher: "قسيمة هدايا",
    redeemable: "قابل للاستبدال في أي متجر غوتشي في إندونيسيا.",
    congratsTitle: "تهانينا",
    voucherPrefix: "قسيمة",
    discountPrefix: "خصم",
    claimMessage: "مرحبًا، لقد حصلت على مكافأة من غوتشي إندونيسيا",
    codeLabel: "مع الرمز",
    processRequest: "يرجى معالجة هذا الطلب.",
    florenceSubtitle: "فلورنسا 1921",
    backToHome: "العودة إلى الصفحة الرئيسية",
    visionTitle: "الرؤية والرسالة",
    visionText1: "بناء إرث من الشراكة",
    visionText2: "تعيد غوتشي ابتكار نهج عصري تمامًا للأزياء. تحت الرؤية الجديدة للمدير الإبداعي ساباتو دي سارنو، أعادت الدار تعريف الفخامة للقرن الحادي والعشرين.",
  },
  pt: {
    loginTitle: "LOGIN DE MEMBRO",
    loginSubtitle: "Faça login para acessar.",
    fullName: "Nome Completo",
    phoneNumber: "Número de Telefone",
    password: "Senha",
    startJourney: "INICIAR JORNADA",
    menu: "VISÃO E MISSÃO",
    validUntil: "Válido Até",
    claimReward: "Reivindicar Recompensa",
    viaWhatsapp: "Via WhatsApp",
    welcomeTitle: "Fortuna Requintada",
    welcomeText: "Junte-se ao evento GUCCI. Explore o Jardim Gucci. Revele seu privilégio exclusivo escondido sob o esboço.",
    scratchHere: "Raspe Aqui",
    invitation: "Convite",
    specialDiscount: "DESCONTO ESPECIAL",
    giftVoucher: "VALE PRESENTE",
    redeemable: "Resgatável em qualquer boutique Gucci na Indonésia.",
    congratsTitle: "PARABÉNS",
    voucherPrefix: "VALE",
    discountPrefix: "DESCONTO",
    claimMessage: "Olá, recebi uma recompensa da Gucci Indonesia",
    codeLabel: "com código",
    processRequest: "Por favor, processe este pedido.",
    florenceSubtitle: "Florença 1921",
    backToHome: "Voltar ao Início",
    visionTitle: "Visão e Missão",
    visionText1: "Construindo um Legado de Parceria",
    visionText2: "A Gucci está reinventando uma abordagem totalmente moderna para a moda. Sob a nova visão do diretor criativo Sabato De Sarno, a Casa redefiniu o luxo para o século XXI.",
  },
  ru: {
    loginTitle: "ВХОД",
    loginSubtitle: "Войдите для доступа.",
    fullName: "Полное имя",
    phoneNumber: "Номер телефона",
    password: "Пароль",
    startJourney: "НАЧАТЬ",
    menu: "ВИДЕНИЕ И МИССИЯ",
    validUntil: "Действительно до",
    claimReward: "Получить награду",
    viaWhatsapp: "Через WhatsApp",
    welcomeTitle: "Изысканная удача",
    welcomeText: "Присоединяйтесь к событию GUCCI. Исследуйте Сад Гуччи. Откройте свою эксклюзивную привилегию, скрытую под эскизом.",
    scratchHere: "Стереть здесь",
    invitation: "Приглашение",
    specialDiscount: "СПЕЦИАЛЬНАЯ СКИДКА",
    giftVoucher: "ПОДАРОЧНЫЙ ВАУЧЕР",
    redeemable: "Можно обменять в любом бутике Gucci в Индонезии.",
    congratsTitle: "ПОЗДРАВЛЯЕМ",
    voucherPrefix: "ВАУЧЕР",
    discountPrefix: "СКИДКА",
    claimMessage: "Здравствуйте, я получил награду от Gucci Indonesia",
    codeLabel: "с кодом",
    processRequest: "Пожалуйста, обработайте этот запрос.",
    florenceSubtitle: "Флоренция 1921",
    backToHome: "На главную",
    visionTitle: "Видение и Миссия",
    visionText1: "Создание наследия партнерства",
    visionText2: "Gucci изобретает совершенно современный подход к моде. Под новым видением креативного директора Сабато Де Сарно Дом переопределил роскошь для 21 века.",
  },
  ja: {
    loginTitle: "メンバーログイン",
    loginSubtitle: "アクセスするにはサインインしてください。",
    fullName: "氏名",
    phoneNumber: "電話番号",
    password: "パスワード",
    startJourney: "旅を始める",
    menu: "ビジョンとミッション",
    validUntil: "有効期限",
    claimReward: "報酬を請求する",
    viaWhatsapp: "WhatsApp経由",
    welcomeTitle: "絶妙な幸運",
    welcomeText: "GUCCIイベントに参加しましょう。グッチガーデンを探索してください。スケッチの下に隠されたあなただけの特典を明らかにしてください。",
    scratchHere: "ここを削る",
    invitation: "招待状",
    specialDiscount: "特別割引",
    giftVoucher: "ギフト券",
    redeemable: "インドネシアのすべてのGucciブティックで利用可能。",
    congratsTitle: "おめでとうございます",
    voucherPrefix: "バウチャー",
    discountPrefix: "割引",
    claimMessage: "こんにちは、Gucci Indonesiaから報酬を受け取りました",
    codeLabel: "コード",
    processRequest: "このリクエストを処理してください。",
    florenceSubtitle: "フィレンツェ 1921",
    backToHome: "ホームに戻る",
    visionTitle: "ビジョンとミッション",
    visionText1: "パートナーシップの遺産を築く",
    visionText2: "Gucciはファッションへの完全に現代的なアプローチを再発明しています。クリエイティブディレクターのサバト・デ・サルノの新しいビジョンの下、ハウスは21世紀のラグジュアリーを再定義しました。",
  },
  de: {
    loginTitle: "MITGLIEDER-LOGIN",
    loginSubtitle: "Anmelden, um teilzunehmen.",
    fullName: "Vollständiger Name",
    phoneNumber: "Telefonnummer",
    password: "Passwort",
    startJourney: "REISE BEGINNEN",
    menu: "VISION & MISSION",
    validUntil: "Gültig bis",
    claimReward: "Belohnung anfordern",
    viaWhatsapp: "Über WhatsApp",
    welcomeTitle: "Exquisites Glück",
    welcomeText: "Nehmen Sie am GUCCI Event teil. Entdecken Sie den Gucci Garten. Enthüllen Sie Ihr exklusives Privileg, das unter der Skizze verborgen ist.",
    scratchHere: "Hier freirubbeln",
    invitation: "Einladung",
    specialDiscount: "SONDERRABATT",
    giftVoucher: "GESCHENKGUTSCHEIN",
    redeemable: "Einlösbar in jeder Gucci Boutique in Indonesien.",
    congratsTitle: "GLÜCKWUNSCH",
    voucherPrefix: "GUTSCHEIN",
    discountPrefix: "RABATT",
    claimMessage: "Hallo, ich habe eine Belohnung von Gucci Indonesia erhalten",
    codeLabel: "mit Code",
    processRequest: "Bitte bearbeiten Sie diese Anfrage.",
    florenceSubtitle: "Florenz 1921",
    backToHome: "Zurück zur Startseite",
    visionTitle: "Vision & Mission",
    visionText1: "Ein Vermächtnis der Partnerschaft aufbauen",
    visionText2: "Gucci erfindet einen völlig modernen Ansatz für Mode neu. Unter der neuen Vision von Kreativdirektor Sabato De Sarno hat das Haus den Luxus für das 21. Jahrhundert neu definiert.",
  },
  fr: {
    loginTitle: "CONNEXION MEMBRE",
    loginSubtitle: "Connectez-vous pour accéder.",
    fullName: "Nom Complet",
    phoneNumber: "Numéro de Téléphone",
    password: "Mot de passe",
    startJourney: "COMMENCER LE VOYAGE",
    menu: "VISION ET MISSION",
    validUntil: "Valable jusqu'au",
    claimReward: "Réclamer la récompense",
    viaWhatsapp: "Via WhatsApp",
    welcomeTitle: "Fortune Exquise",
    welcomeText: "Rejoignez l'événement GUCCI. Explorez le Jardin Gucci. Dévoilez votre privilège exclusif caché sous le croquis.",
    scratchHere: "Grattez ici",
    invitation: "Invitation",
    specialDiscount: "REMISE SPÉCIALE",
    giftVoucher: "CHÈQUE CADEAU",
    redeemable: "Échangeable dans n'importe quelle boutique Gucci en Indonésie.",
    congratsTitle: "FÉLICITATIONS",
    voucherPrefix: "BON",
    discountPrefix: "REMISE",
    claimMessage: "Bonjour, j'ai reçu une récompense de Gucci Indonesia",
    codeLabel: "avec le code",
    processRequest: "Veuillez traiter cette demande.",
    florenceSubtitle: "Florence 1921",
    backToHome: "Retour à l'accueil",
    visionTitle: "Vision & Mission",
    visionText1: "Construire un héritage de partenariat",
    visionText2: "Gucci réinvente une approche totalement moderne de la mode. Sous la nouvelle vision du directeur créatif Sabato De Sarno, la Maison a redéfini le luxe pour le 21e siècle.",
  },
  it: {
    loginTitle: "ACCESSO MEMBRI",
    loginSubtitle: "Accedi per partecipare.",
    fullName: "Nome Completo",
    phoneNumber: "Numero di Telefono",
    password: "Password",
    startJourney: "INIZIA VIAGGIO",
    menu: "VISIONE E MISSIONE",
    validUntil: "Valido Fino Al",
    claimReward: "Richiedi Premio",
    viaWhatsapp: "Via WhatsApp",
    welcomeTitle: "Fortuna Squisita",
    welcomeText: "Unisciti all'evento GUCCI. Esplora il Giardino Gucci. Svela il tuo privilegio esclusivo nascosto sotto lo schizzo.",
    scratchHere: "Gratta Qui",
    invitation: "Invito",
    specialDiscount: "SCONTO SPECIALE",
    giftVoucher: "BUONO REGALO",
    redeemable: "Riscattabile in qualsiasi boutique Gucci in Indonesia.",
    congratsTitle: "CONGRATULAZIONI",
    voucherPrefix: "BUONO",
    discountPrefix: "SCONTO",
    claimMessage: "Salve, ho ricevuto un premio da Gucci Indonesia",
    codeLabel: "con codice",
    processRequest: "Si prega di elaborare questa richiesta.",
    florenceSubtitle: "Firenze 1921",
    backToHome: "Torna alla Home",
    visionTitle: "Visione e Missione",
    visionText1: "Costruire un'eredità di partnership",
    visionText2: "Gucci sta reinventando un approccio completamente moderno alla moda. Sotto la nuova visione del direttore creativo Sabato De Sarno, la Maison ha ridefinito il lusso per il XXI secolo.",
  },
  ko: {
    loginTitle: "회원 로그인",
    loginSubtitle: "접속하려면 로그인하세요.",
    fullName: "성명",
    phoneNumber: "전화번호",
    password: "비밀번호",
    startJourney: "여정 시작",
    menu: "비전 및 사명",
    validUntil: "유효 기간",
    claimReward: "보상 청구",
    viaWhatsapp: "WhatsApp을 통해",
    welcomeTitle: "정교한 행운",
    welcomeText: "GUCCI 이벤트에 참여하세요. 구찌 가든을 탐험하세요. 스케치 아래 숨겨진 독점 혜택을 공개합니다.",
    scratchHere: "여기를 긁으세요",
    invitation: "초대장",
    specialDiscount: "특별 할인",
    giftVoucher: "기프트 바우처",
    redeemable: "인도네시아 내 모든 Gucci 부티크에서 교환 가능.",
    congratsTitle: "축하합니다",
    voucherPrefix: "바우처",
    discountPrefix: "할인",
    claimMessage: "안녕하세요, Gucci Indonesia에서 보상을 받았습니다",
    codeLabel: "코드 포함",
    processRequest: "이 요청을 처리해 주십시오.",
    florenceSubtitle: "피렌체 1921",
    backToHome: "홈으로 돌아 가기",
    visionTitle: "비전 및 사명",
    visionText1: "파트너십의 유산 구축",
    visionText2: "Gucci는 패션에 대한 완전히 현대적인 접근 방식을 재창조하고 있습니다. 크리에이티브 디렉터 Sabato De Sarno의 새로운 비전 아래, 하우스는 21세기 럭셔리를 재정의했습니다.",
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