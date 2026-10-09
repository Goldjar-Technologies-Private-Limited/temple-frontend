export type Language = "en" | "hi" | "gu";

export const languageOptions = [
  {
    code: "en" as Language,
    flag: "🇬🇧",
    name: "English",
  },
  {
    code: "hi" as Language,
    flag: "🇮🇳",
    name: "हिंदी",
  },
  {
    code: "gu" as Language,
    flag: "🇮🇳",
    name: "ગુજરાતી",
  },
];

export const translations = {
  // =====================================================
  // ENGLISH
  // =====================================================

  en: {
    // LANGUAGE
    chooseLanguage: "Choose Language",
    chooseLanguageSub: "Choose your preferred language",
    continue: "Continue",

    // LOGIN
    welcomeDevotee: "Welcome Devotee",
    enterMobile: "Enter your mobile number to continue",
    mobileNumber: "Mobile Number",
    sendOtp: "Send OTP",
    termsText:
      "By continuing, you agree to our Terms & Privacy Policy",

    // OTP
    verifyMobileNumber: "Verify Mobile Number",
    enterSixDigitOtp: "Enter the 6-digit OTP sent to",
    verifyContinue: "Verify & Continue",
    resendOtp: "Resend OTP",
    changeMobileNumber: "Change mobile number",

    // BOTTOM NAVIGATION
    home: "Home",
    darshan: "Darshan",
    seva: "Seva",
    donation: "Donation",
    reels: "Reels",
    profile: "Profile",

    // LIVE DARSHAN
    liveDarshan: "Live Darshan",
    liveDarshanNow: "Live Darshan Now",
    live: "LIVE",

    // SEVA
    sevaDonation: "Seva & Donation",
    goSeva: "Go Seva",

    // DASHBOARD
    darshanTimings: "Darshan Timings",
    events: "Events & Utsav",
    prasadam: "Prasadam",
    reelsBhakti: "Reels & Bhakti",
    more: "More",

    nextDarshan: "Next Darshan",
    rajbhog: "Rajbhog",
    today: "Today",
    viewSchedule: "View Schedule",

    // DRAWER
    templeInformation: "Temple Information",
    myBookings: "My Bookings",
    myOrders: "My Orders",
    myDonations: "My Donations",
    notifications: "Notifications",
    settings: "Settings",
    helpSupport: "Help & Support",
    logout: "Logout",

    jaiShreeKrishna: "🙏 Jai Shree Krishna",
    namasteKrishna: "Namaste, Krishna",

    // COMMON
    donateNow: "Donate Now",
    back: "Back",
    share: "Share",
    haveliName: "Shri Govardhannath Haveli",

    // LIVE CHAT
    liveChat: "Live Chat",
    typeMessage: "Type a message...",
    sendMessage: "Send message",
    youtubeLiveSetup:
      "Add your YouTube Live video ID in the page.tsx file.",

    // =====================================================
    // SEVA LIST
    // =====================================================

    all: "All",
    popular: "Popular",
    utsav: "Utsav",

    careForGauMata: "Care for Gau Mata",

    nityaBhogSeva: "Nitya Bhog Seva",
    dailyFoodOffering: "Daily Food Offering",

    flowerSeva: "Flower Seva",
    templeDecoration: "Temple Decoration",

    annakutSeva: "Annakut Seva",
    specialUtsavSeva: "Special Utsav Seva",

    templeMaintenance: "Temple Maintenance",
    supportTempleServices: "Support Temple Services",

    noSevaAvailable: "No seva available",

    // =====================================================
    // SEVA DETAIL
    // =====================================================

    sevaDetail: "Seva Detail",
    custom: "Custom",
    enterDonationAmount: "Enter donation amount",
    selectDonationAmount: "Please select a donation amount",

    goSevaDescription:
      "Support the service of Gau Mata at Govardhannath Haveli. Your contribution helps in food, healthcare and shelter for our cows.",
    goSevaProgress: "72 cows sponsored out of 100",

    nityaBhogDescription:
      "Support the daily bhog seva offered to Shri Govardhannathji. Your contribution helps provide sacred food offerings with devotion.",
    nityaBhogProgress: "68% seva sponsored",

    flowerSevaDescription:
      "Support the beautiful daily flower decoration of the Haveli. Your contribution helps create a divine and devotional atmosphere for Thakurji.",
    flowerSevaProgress: "54% seva sponsored",

    annakutDescription:
      "Be part of the sacred Annakut Utsav and support the special offerings prepared for Shri Govardhannathji with devotion.",
    annakutProgress: "82% seva sponsored",

    templeMaintenanceDescription:
      "Support the maintenance of Govardhannath Haveli and help provide essential services for the temple and devotees.",
    templeMaintenanceProgress: "45% seva sponsored",

    // =====================================================
    // DARSHAN TIMINGS
    // =====================================================

    ashtakayamDarshan: "Ashtakayam Darshan",
    todayDate: "Today, 14 Sep 2026",

    mangala: "Mangala",
    shringar: "Shringar",
    gwal: "Gwal",
    utthapan: "Utthapan",
    bhog: "Bhog",
    sandhyaAarti: "Sandhya Aarti",
    shayan: "Shayan",

    completed: "Completed",
    openNow: "Open Now",
    upcoming: "Upcoming",

    darshanLiveNow: "Darshan is live now",
    darshanCompleted: "Darshan completed",
    darshanUpcoming: "Darshan upcoming",

    // =====================================================
    // EVENTS & UTSAV
    // =====================================================

    past: "Past",
    view: "View",
    noPastEvents: "No past events available",

    janmashtamiUtsav: "Janmashtami Utsav",
    janmashtamiDate: "16 Aug 2026",

    annakutMahotsav: "Annakut Mahotsav",
    annakutEventDate: "24 Oct 2026",

    sharadPurnima: "Sharad Purnima",
    sharadPurnimaDate: "06 Nov 2026",

    haveliSangeet: "Haveli Sangeet",
    haveliSangeetDate: "15 Nov 2026",

    // =====================================================
    // PRASADAM
    // =====================================================

    sweets: "Sweets",
    mahaprasad: "Mahaprasad",
    gifts: "Gifts",

    makhanaPrasadam: "Makhana Prasadam",
    peda: "Peda",
    dryPrasadam: "Dry Prasadam",
    panchamrit: "Panchamrit",

    viewCart: "View Cart",
    increaseQuantity: "Increase quantity",
    decreaseQuantity: "Decrease quantity",
  },

  // =====================================================
  // HINDI
  // =====================================================

  hi: {
    // LANGUAGE
    chooseLanguage: "भाषा चुनें",
    chooseLanguageSub: "अपनी पसंदीदा भाषा चुनें",
    continue: "जारी रखें",

    // LOGIN
    welcomeDevotee: "भक्त का स्वागत है",
    enterMobile: "जारी रखने के लिए अपना मोबाइल नंबर दर्ज करें",
    mobileNumber: "मोबाइल नंबर",
    sendOtp: "ओटीपी भेजें",
    termsText:
      "जारी रखकर आप हमारी शर्तों और गोपनीयता नीति से सहमत होते हैं",

    // OTP
    verifyMobileNumber: "मोबाइल नंबर सत्यापित करें",
    enterSixDigitOtp:
      "इस नंबर पर भेजा गया 6 अंकों का ओटीपी दर्ज करें",
    verifyContinue: "सत्यापित करें और आगे बढ़ें",
    resendOtp: "ओटीपी दोबारा भेजें",
    changeMobileNumber: "मोबाइल नंबर बदलें",

    // BOTTOM NAVIGATION
    home: "होम",
    darshan: "दर्शन",
    seva: "सेवा",
    donation: "दान",
    reels: "रील्स",
    profile: "प्रोफ़ाइल",

    // LIVE DARSHAN
    liveDarshan: "लाइव दर्शन",
    liveDarshanNow: "अभी लाइव दर्शन",
    live: "लाइव",

    // SEVA
    sevaDonation: "सेवा एवं दान",
    goSeva: "गो सेवा",

    // DASHBOARD
    darshanTimings: "दर्शन समय",
    events: "कार्यक्रम एवं उत्सव",
    prasadam: "प्रसाद",
    reelsBhakti: "रील्स एवं भक्ति",
    more: "और",

    nextDarshan: "अगला दर्शन",
    rajbhog: "राजभोग",
    today: "आज",
    viewSchedule: "समय देखें",

    // DRAWER
    templeInformation: "मंदिर की जानकारी",
    myBookings: "मेरी बुकिंग",
    myDonations: "मेरे दान",
    myOrders: "मेरी ऑर्डर्स",
    notifications: "सूचनाएँ",
    settings: "सेटिंग्स",
    helpSupport: "सहायता एवं संपर्क",
    logout: "लॉग आउट",

    jaiShreeKrishna: "🙏 जय श्री कृष्ण",
    namasteKrishna: "नमस्ते, कृष्ण",

    // COMMON
    donateNow: "अभी दान करें",
    back: "वापस",
    share: "शेयर करें",
    haveliName: "श्री गोवर्धननाथ हवेली",

    // LIVE CHAT
    liveChat: "लाइव चैट",
    typeMessage: "संदेश लिखें...",
    sendMessage: "संदेश भेजें",
    youtubeLiveSetup:
      "page.tsx फ़ाइल में अपना YouTube Live वीडियो ID जोड़ें।",

    // =====================================================
    // SEVA LIST
    // =====================================================

    all: "सभी",
    popular: "लोकप्रिय",
    utsav: "उत्सव",

    careForGauMata: "गौ माता की सेवा",

    nityaBhogSeva: "नित्य भोग सेवा",
    dailyFoodOffering: "दैनिक भोग अर्पण",

    flowerSeva: "पुष्प सेवा",
    templeDecoration: "मंदिर सजावट",

    annakutSeva: "अन्नकूट सेवा",
    specialUtsavSeva: "विशेष उत्सव सेवा",

    templeMaintenance: "मंदिर रखरखाव",
    supportTempleServices: "मंदिर सेवाओं में सहयोग",

    noSevaAvailable: "कोई सेवा उपलब्ध नहीं है",

    // =====================================================
    // SEVA DETAIL
    // =====================================================

    sevaDetail: "सेवा विवरण",
    custom: "अन्य राशि",
    enterDonationAmount: "दान राशि दर्ज करें",
    selectDonationAmount: "कृपया दान राशि चुनें",

    goSevaDescription:
      "गोवर्धननाथ हवेली में गौ माता की सेवा में सहयोग करें। आपका योगदान गायों के भोजन, स्वास्थ्य देखभाल और आश्रय में सहायता करता है।",
    goSevaProgress: "100 में से 72 गायों की सेवा प्रायोजित",

    nityaBhogDescription:
      "श्री गोवर्धननाथजी को अर्पित होने वाली दैनिक भोग सेवा में सहयोग करें। आपका योगदान श्रद्धापूर्वक पवित्र भोग अर्पित करने में मदद करता है।",
    nityaBhogProgress: "68% सेवा प्रायोजित",

    flowerSevaDescription:
      "हवेली की सुंदर दैनिक पुष्प सजावट में सहयोग करें। आपका योगदान ठाकुरजी के लिए दिव्य और भक्तिमय वातावरण बनाने में मदद करता है।",
    flowerSevaProgress: "54% सेवा प्रायोजित",

    annakutDescription:
      "पवित्र अन्नकूट उत्सव का हिस्सा बनें और श्री गोवर्धननाथजी के लिए तैयार विशेष भोग एवं सेवा में सहयोग करें।",
    annakutProgress: "82% सेवा प्रायोजित",

    templeMaintenanceDescription:
      "गोवर्धननाथ हवेली के रखरखाव में सहयोग करें और मंदिर तथा भक्तों के लिए आवश्यक सेवाओं को बनाए रखने में मदद करें।",
    templeMaintenanceProgress: "45% सेवा प्रायोजित",

    // =====================================================
    // DARSHAN TIMINGS
    // =====================================================

    ashtakayamDarshan: "अष्टयाम दर्शन",
    todayDate: "आज, 14 सितम्बर 2026",

    mangala: "मंगला",
    shringar: "श्रृंगार",
    gwal: "ग्वाल",
    utthapan: "उत्थापन",
    bhog: "भोग",
    sandhyaAarti: "संध्या आरती",
    shayan: "शयन",

    completed: "पूर्ण",
    openNow: "अभी खुले हैं",
    upcoming: "आगामी",

    darshanLiveNow: "दर्शन अभी लाइव है",
    darshanCompleted: "दर्शन पूर्ण हो चुका है",
    darshanUpcoming: "दर्शन आगामी है",

    // =====================================================
    // EVENTS & UTSAV
    // =====================================================

    past: "पिछले",
    view: "देखें",
    noPastEvents: "कोई पिछला कार्यक्रम उपलब्ध नहीं है",

    janmashtamiUtsav: "जन्माष्टमी उत्सव",
    janmashtamiDate: "16 अगस्त 2026",

    annakutMahotsav: "अन्नकूट महोत्सव",
    annakutEventDate: "24 अक्टूबर 2026",

    sharadPurnima: "शरद पूर्णिमा",
    sharadPurnimaDate: "06 नवंबर 2026",

    haveliSangeet: "हवेली संगीत",
    haveliSangeetDate: "15 नवंबर 2026",

    // =====================================================
    // PRASADAM
    // =====================================================

    sweets: "मिठाइयाँ",
    mahaprasad: "महाप्रसाद",
    gifts: "उपहार",

    makhanaPrasadam: "मखाना प्रसाद",
    peda: "पेड़ा",
    dryPrasadam: "सूखा प्रसाद",
    panchamrit: "पंचामृत",

    viewCart: "कार्ट देखें",
    increaseQuantity: "मात्रा बढ़ाएँ",
    decreaseQuantity: "मात्रा घटाएँ",
  },

  // =====================================================
  // GUJARATI
  // =====================================================

  gu: {
    // LANGUAGE
    chooseLanguage: "ભાષા પસંદ કરો",
    chooseLanguageSub: "તમારી પસંદગીની ભાષા પસંદ કરો",
    continue: "ચાલુ રાખો",

    // LOGIN
    welcomeDevotee: "ભક્તનું સ્વાગત છે",
    enterMobile: "આગળ વધવા માટે તમારો મોબાઇલ નંબર દાખલ કરો",
    mobileNumber: "મોબાઇલ નંબર",
    sendOtp: "OTP મોકલો",
    termsText:
      "આગળ વધીને તમે અમારી શરતો અને ગોપનીયતા નીતિ સાથે સંમત થાઓ છો",

    // OTP
    verifyMobileNumber: "મોબાઇલ નંબર ચકાસો",
    enterSixDigitOtp:
      "આ નંબર પર મોકલાયેલ 6 અંકનો OTP દાખલ કરો",
    verifyContinue: "ચકાસો અને આગળ વધો",
    resendOtp: "OTP ફરી મોકલો",
    changeMobileNumber: "મોબાઇલ નંબર બદલો",

    // BOTTOM NAVIGATION
    home: "હોમ",
    darshan: "દર્શન",
    seva: "સેવા",
    donation: "દાન",
    reels: "રીલ્સ",
    profile: "પ્રોફાઇલ",

    // LIVE DARSHAN
    liveDarshan: "લાઇવ દર્શન",
    liveDarshanNow: "હમણાં લાઇવ દર્શન",
    live: "લાઇવ",

    // SEVA
    sevaDonation: "સેવા અને દાન",
    goSeva: "ગૌ સેવા",

    // DASHBOARD
    darshanTimings: "દર્શન સમય",
    events: "કાર્યક્રમો અને ઉત્સવ",
    prasadam: "પ્રસાદ",
    reelsBhakti: "રીલ્સ અને ભક્તિ",
    more: "વધુ",

    nextDarshan: "આગળના દર્શન",
    rajbhog: "રાજભોગ",
    today: "આજે",
    viewSchedule: "સમય જુઓ",

    // DRAWER
    templeInformation: "મંદિરની માહિતી",
    myBookings: "મારી બુકિંગ",
    myOrders: "મારા ઓર્ડર",
    myDonations: "મારા દાન",
    notifications: "સૂચનાઓ",
    settings: "સેટિંગ્સ",
    helpSupport: "મદદ અને સહાય",
    logout: "લૉગ આઉટ",

    jaiShreeKrishna: "🙏 જય શ્રી કૃષ્ણ",
    namasteKrishna: "નમસ્તે, કૃષ્ણ",

    // COMMON
    donateNow: "હમણાં દાન કરો",
    back: "પાછળ",
    share: "શેર કરો",
    haveliName: "શ્રી ગોવર્ધનનાથ હવેલી",

    // LIVE CHAT
    liveChat: "લાઇવ ચેટ",
    typeMessage: "સંદેશ લખો...",
    sendMessage: "સંદેશ મોકલો",
    youtubeLiveSetup:
      "page.tsx ફાઇલમાં તમારું YouTube Live વિડિયો ID ઉમેરો.",

    // =====================================================
    // SEVA LIST
    // =====================================================

    all: "બધા",
    popular: "લોકપ્રિય",
    utsav: "ઉત્સવ",

    careForGauMata: "ગૌ માતાની સેવા",

    nityaBhogSeva: "નિત્ય ભોગ સેવા",
    dailyFoodOffering: "દૈનિક ભોગ અર્પણ",

    flowerSeva: "પુષ્પ સેવા",
    templeDecoration: "મંદિર સજાવટ",

    annakutSeva: "અન્નકૂટ સેવા",
    specialUtsavSeva: "વિશેષ ઉત્સવ સેવા",

    templeMaintenance: "મંદિર જાળવણી",
    supportTempleServices: "મંદિર સેવાઓમાં સહયોગ",

    noSevaAvailable: "કોઈ સેવા ઉપલબ્ધ નથી",

    // =====================================================
    // SEVA DETAIL
    // =====================================================

    sevaDetail: "સેવા વિગતો",
    custom: "અન્ય રકમ",
    enterDonationAmount: "દાનની રકમ દાખલ કરો",
    selectDonationAmount: "કૃપા કરીને દાનની રકમ પસંદ કરો",

    goSevaDescription:
      "ગોવર્ધનનાથ હવેલીમાં ગૌ માતાની સેવામાં સહયોગ આપો. તમારું યોગદાન ગાયો માટે ખોરાક, આરોગ્ય સેવા અને આશ્રયમાં મદદ કરે છે.",
    goSevaProgress: "100 માંથી 72 ગાયોની સેવા પ્રાયોજિત",

    nityaBhogDescription:
      "શ્રી ગોવર્ધનનાથજીને અર્પિત થતી દૈનિક ભોગ સેવામાં સહયોગ આપો. તમારું યોગદાન ભક્તિપૂર્વક પવિત્ર ભોગ અર્પણ કરવામાં મદદ કરે છે.",
    nityaBhogProgress: "68% સેવા પ્રાયોજિત",

    flowerSevaDescription:
      "હવેલીની સુંદર દૈનિક પુષ્પ સજાવટમાં સહયોગ આપો. તમારું યોગદાન ઠાકોરજી માટે દિવ્ય અને ભક્તિમય વાતાવરણ બનાવવા મદદ કરે છે.",
    flowerSevaProgress: "54% સેવા પ્રાયોજિત",

    annakutDescription:
      "પવિત્ર અન્નકૂટ ઉત્સવનો ભાગ બનો અને શ્રી ગોવર્ધનનાથજી માટે તૈયાર કરાતી વિશેષ સેવા અને ભોગમાં સહયોગ આપો.",
    annakutProgress: "82% સેવા પ્રાયોજિત",

    templeMaintenanceDescription:
      "ગોવર્ધનનાથ હવેલીના જાળવણી કાર્યમાં સહયોગ આપો અને મંદિર તથા ભક્તો માટે જરૂરી સેવાઓ જાળવવામાં મદદ કરો.",
    templeMaintenanceProgress: "45% સેવા પ્રાયોજિત",

    // =====================================================
    // DARSHAN TIMINGS
    // =====================================================

    ashtakayamDarshan: "અષ્ટયામ દર્શન",
    todayDate: "આજે, 14 સપ્ટેમ્બર 2026",

    mangala: "મંગળા",
    shringar: "શૃંગાર",
    gwal: "ગ્વાલ",
    utthapan: "ઉત્થાપન",
    bhog: "ભોગ",
    sandhyaAarti: "સંધ્યા આરતી",
    shayan: "શયન",

    completed: "પૂર્ણ",
    openNow: "હમણાં ખુલ્લું છે",
    upcoming: "આગામી",

    darshanLiveNow: "દર્શન હમણાં લાઇવ છે",
    darshanCompleted: "દર્શન પૂર્ણ થયું છે",
    darshanUpcoming: "દર્શન આગામી છે",

    // =====================================================
    // EVENTS & UTSAV
    // =====================================================

    past: "ભૂતકાળ",
    view: "જુઓ",
    noPastEvents: "કોઈ ભૂતકાળનો કાર્યક્રમ ઉપલબ્ધ નથી",

    janmashtamiUtsav: "જન્માષ્ટમી ઉત્સવ",
    janmashtamiDate: "16 ઑગસ્ટ 2026",

    annakutMahotsav: "અન્નકૂટ મહોત્સવ",
    annakutEventDate: "24 ઑક્ટોબર 2026",

    sharadPurnima: "શરદ પૂર્ણિમા",
    sharadPurnimaDate: "06 નવેમ્બર 2026",

    haveliSangeet: "હવેલી સંગીત",
    haveliSangeetDate: "15 નવેમ્બર 2026",

    // =====================================================
    // PRASADAM
    // =====================================================

    sweets: "મીઠાઈ",
    mahaprasad: "મહાપ્રસાદ",
    gifts: "ભેટ",

    makhanaPrasadam: "મખાણા પ્રસાદ",
    peda: "પેડા",
    dryPrasadam: "સૂકો પ્રસાદ",
    panchamrit: "પંચામૃત",

    viewCart: "કાર્ટ જુઓ",
    increaseQuantity: "જથ્થો વધારો",
    decreaseQuantity: "જથ્થો ઘટાડો",
  },
} as const;

export type TranslationKey =
  keyof typeof translations.en;