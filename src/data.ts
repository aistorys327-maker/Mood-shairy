import { Shayari } from "./types";

export const DEFAULT_SHAYARIS: Shayari[] = [
  // --- LOVE (मोहब्बत) ---
  {
    id: "love-1",
    title: "चाँद निकला ✨",
    mood: "love",
    sher: "तुम आए तो आया मुझे याद, ❤️\nगली में आज चाँद निकला। ✨",
    transliteration: "Tum aaye to aaya mujhe yaad, gali mein aaj chaand nikla.",
    translation: "Your arrival reminded me of hope, as if a long-hidden moon had finally risen in my street.",
    poet: "Gulzar",
    highlights: [
      { phrase: "याद", color: "#DC2626" },
      { phrase: "चाँद", color: "#EA580C" }
    ]
  },
  {
    id: "love-2",
    title: "हज़ारों ख़्वाहिशें 🥀",
    mood: "love",
    sher: "हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले,\nबहुत निकले मेरे अरमान लेकिन फिर भी कम निकले। ✨",
    transliteration: "Hazaaron khwaahishein aisi ki har khwaahish pe dam nikle, Bahut nikle mere armaan lekin phir bhi kam nikle.",
    translation: "Thousands of desires, each so deep that it robs me of my breath; many of my longings were fulfilled, yet many remain.",
    poet: "Mirza Ghalib",
    highlights: [
      { phrase: "ख़्वाहिशें", color: "#DC2626" },
      { phrase: "दम निकले", color: "#EA580C" },
      { phrase: "अरमान", color: "#E11D48" }
    ]
  },
  {
    id: "love-3",
    title: "सच्ची मोहब्बत ❤️",
    mood: "love",
    sher: "सच्ची मोहब्बत में कहाँ कोई शर्तें होती हैं, ❤️\nबस एक ख़ामोश एहसास और बेपनाह चाहत होती है। 🤍",
    transliteration: "Sacchy mohabbat mein kahan koi shartein hoti hain, Bas ek khamosh ehsaas aur bepanaah chaahat hoti hai.",
    translation: "In true love, there are never any conditions or demands; just a quiet, profound awareness and limitless adoration.",
    poet: "Traditional",
    highlights: [
      { phrase: "सच्ची मोहब्बत", color: "#DC2626" },
      { phrase: "बेपनाह चाहत", color: "#EA580C" }
    ]
  },
  {
    id: "love-4",
    title: "दिल की बात ✨",
    mood: "love",
    sher: "दिल से जो बात निकलती है असर रखती है,\nपर नहीं ताक़त-ए-परवाज़ मगर रखती है। ✨",
    transliteration: "Dil se jo baat nikalti hai asar rakhti hai, Par nahi taaqat-e-parwaaz magar rakhti hai.",
    translation: "Words that arise from the depths of the heart always hold great power; they have no physical wings, yet they fly high.",
    poet: "Allama Iqbal",
    highlights: [
      { phrase: "दिल से", color: "#DC2626" },
      { phrase: "असर", color: "#EA580C" }
    ]
  },
  {
    id: "love-5",
    title: "इश्क़ ने 'ग़ालिब' 😊",
    mood: "love",
    sher: "इश्क़ ने 'ग़ालिब' निकम्मा कर दिया, ❤️\nवर्ना हम भी आदमी थे काम के। 😊",
    transliteration: "Ishq ne 'Ghalib' nikamma kar diya, Warna hum bhi aadmi the kaam ke.",
    translation: "Love turned Ghalib into a useless, idle soul, otherwise, I too was once a man of great capability.",
    poet: "Mirza Ghalib",
    highlights: [
      { phrase: "इश्क़", color: "#DC2626" },
      { phrase: "काम के", color: "#EA580C" }
    ]
  },

  // --- SAD (दर्द/तन्हाई) ---
  {
    id: "sad-1",
    title: "वादा निबाह का 🥀",
    mood: "sad",
    sher: "वो जो हम में तुम में क़रार था तुम्हें याद हो कि न याद हो,\nवही यानी वादा निबाह का तुम्हें याद हो कि न याद हो। 🥀",
    transliteration: "Wo jo hum mein tum mein qaraar tha tumhein yaad ho ki na yaad ho, Wahi yaani waada nibaah ka tumhein yaad ho ki na yaad ho.",
    translation: "That quiet understanding we shared, you may or may not recall; that promise of lifelong faithfulness, you may or may not recall.",
    poet: "Momin Khan Momin",
    highlights: [
      { phrase: "क़रार", color: "#EA580C" },
      { phrase: "वादा", color: "#DC2626" }
    ]
  },
  {
    id: "sad-2",
    title: "नींद और मौत 💔",
    mood: "sad",
    sher: "मौत का एक दिन मुअय्यन है, 💔\nनींद क्यूँ रात भर नहीं आती?",
    transliteration: "Maut ka ek din muayyan hai, neend kyun raat bhar nahi aati?",
    translation: "Since the day of death is already destined, why does sleep elude me all night long?",
    poet: "Mirza Ghalib",
    highlights: [
      { phrase: "मौत", color: "#DC2626" },
      { phrase: "रात भर", color: "#EA580C" }
    ]
  },
  {
    id: "sad-3",
    title: "दिल टूटे तो 🥀",
    mood: "sad",
    sher: "शीशा टूटे तो आवाज़ होती है,\nदिल टूटे तो सिर्फ ख़ामोशी रह जाती है। 🥀",
    transliteration: "Sheesha toote to aawaaz hoti hai, Dil toote to sirf khamoshi reh jaati hai.",
    translation: "When glass shatters, a loud sound echoes; when a heart breaks, only a violent silence remains.",
    poet: "Bashir Badr",
    highlights: [
      { phrase: "शीशा", color: "#EA580C" },
      { phrase: "दिल टूटे", color: "#DC2626" },
      { phrase: "ख़ामोशी", color: "#C2410C" }
    ]
  },
  {
    id: "sad-4",
    title: "हसीं सितम 💔",
    mood: "sad",
    sher: "वक़्त ने किया क्या हसीं सितम, 💔\nतुम रहे न तुम, हम रहे न हम।",
    transliteration: "Waqt ne kiya kya haseen sitam, Tum rahe na tum, hum rahe na hum.",
    translation: "Time has played such a beautifully tragic trick; you are no longer who you were, and I am no longer myself.",
    poet: "Kaifi Azmi",
    highlights: [
      { phrase: "हसीं सितम", color: "#DC2626" },
      { phrase: "वक़्त", color: "#EA580C" }
    ]
  },
  {
    id: "sad-5",
    title: "मुश्किलें 🤍",
    mood: "sad",
    sher: "रंज से ख़ुगर हुआ इंसाँ तो मिट जाता है रंज,\nमुश्किलें मुझ पर पड़ीं इतनी कि आसाँ हो गईं। 🤍",
    transliteration: "Ranj se khoogar hua insaan to mit jaata hai ranj, Mushkilein mujh par padeen itni ki aasaan ho gayeen.",
    translation: "When a person becomes accustomed to sorrow, sorrow itself disappears; so many hardships befell me that they turned easy.",
    poet: "Mirza Ghalib",
    highlights: [
      { phrase: "रंज", color: "#EA580C" },
      { phrase: "मुश्किलें", color: "#DC2626" },
      { phrase: "आसाँ", color: "#C2410C" }
    ]
  },

  // --- ATTITUDE (तेवर) ---
  {
    id: "att-1",
    title: "कारवाँ ✨",
    mood: "attitude",
    sher: "मैं अकेला ही चला था जानिब-ए-मंज़िल मगर, ✨\nलोग साथ आते गए और कारवाँ बनता गया।",
    transliteration: "Main akela hi chala tha jaanib-e-manzil magar, Log saath aate gaye aur kaarwan banta gaya.",
    translation: "I set off all alone toward my destination, but souls kept joining along the way and we became a great caravan.",
    poet: "Majrooh Sultanpuri",
    highlights: [
      { phrase: "अकेला", color: "#DC2626" },
      { phrase: "मंज़िल", color: "#EA580C" },
      { phrase: "कारवाँ", color: "#B91C1C" }
    ]
  },
  {
    id: "att-2",
    title: "अपना अंदाज़ 😎",
    mood: "attitude",
    sher: "तू नहीं तो कोई और सही, कोई और नहीं तो कोई और सही, 😎\nबहुत लम्बी है ज़मीन मिलेंगे लाख हसीं, इस ज़माने में सनम तू अकेली तो नहीं।",
    transliteration: "Tu nahi to koi aur sahi, koi aur nahi to koi aur sahi, Bahut lambi hai zameen milenge laakh haseen, is zamaane mein sanam tu akeli to nahi.",
    translation: "If not you, then someone else; if not them, then another. The world is vast, beautiful faces are countless, in this era you are not the only one.",
    poet: "Traditional",
    highlights: [
      { phrase: "ज़मीन", color: "#EA580C" },
      { phrase: "अकेली", color: "#DC2626" }
    ]
  },
  {
    id: "att-3",
    title: "ज़माने से हम ✨",
    mood: "attitude",
    sher: "हमको मिटा सके ये ज़माने में दम नहीं,\nहमसे ज़माना ख़ुद है, ज़माने से हम नहीं। ✨",
    transliteration: "Humko mita sake ye zamaane mein dam nahi, Humse zamaana khud hai, zamaane se hum nahi.",
    translation: "The world does not possess the power to erase our spirit; the world exists because of us, we do not exist because of the world.",
    poet: "Jigar Moradabadi",
    highlights: [
      { phrase: "ज़माने में दम", color: "#EA580C" },
      { phrase: "ज़माने से हम", color: "#DC2626" }
    ]
  },
  {
    id: "att-4",
    title: "उक़ाबी रूह 🔥",
    mood: "attitude",
    sher: "उक़ाबी रूह जब बेदार होती है जवानो में,\nनज़र आती है उसको अपनी मंज़िल आसमानों में। 🔥",
    transliteration: "Uqaabi rooh jab bedaar hoti hai jawaano mein, Nazar aati hai usko apni manzil aasmano mein.",
    translation: "When the soaring spirit of an eagle wakes up within the youth, they see their destination high in the heavens.",
    poet: "Allama Iqbal",
    highlights: [
      { phrase: "उक़ाबी रूह", color: "#DC2626" },
      { phrase: "मंज़िल", color: "#EA580C" }
    ]
  },
  {
    id: "att-5",
    title: "ख़ामोशी भी अख़बार ✨",
    mood: "attitude",
    sher: "शोर गुल मचाने से सुर्खी नहीं मिलती, ✨\nकाम ऐसा करो कि खामोशी भी अख़बार बन जाए।",
    transliteration: "Shor gul machane se surkhi nahi milti, Kaam aisa karo ki khamoshi bhi akhbaar ban jaaye.",
    translation: "One does not get headlines merely by making noise; perform your work such that your silence itself becomes news.",
    poet: "Rahat Indori",
    highlights: [
      { phrase: "सुर्खी", color: "#EA580C" },
      { phrase: "खामोशी", color: "#DC2626" }
    ]
  },

  // --- MOTIVATIONAL (हौसला) ---
  {
    id: "mot-1",
    title: "ख़ुदी को कर बुलंद ✨",
    mood: "motivational",
    sher: "ख़ुदी को कर बुलंद इतना कि हर तक़दीर से पहले,\nख़ुदा बंदे से ख़ुद पूछे बता तेरी रज़ा क्या है। ✨",
    transliteration: "Khudi ko kar buland itna ki har taqdeer se pehle, Khuda bande se khud pooche bata teri raza kya hai.",
    translation: "Raise your selfhood so high that before writing your destiny, the Creator Himself asks you: 'What is your will?'",
    poet: "Allama Iqbal",
    highlights: [
      { phrase: "ख़ुदी को कर बुलंद", color: "#DC2626" },
      { phrase: "तक़दीर", color: "#EA580C" },
      { phrase: "तेरी रज़ा", color: "#15803D" }
    ]
  },
  {
    id: "mot-2",
    title: "परिंदों की मंज़िल 🕊️",
    mood: "motivational",
    sher: "परिंदों को मंज़िल मिलेगी यक़ीनन,\nये फैले हुए उनके पर बोलते हैं। 🕊️",
    transliteration: "Parindon ko manzil milegi yaqeenan, yeh phaile hue unke par bolre hain.",
    translation: "The birds will certainly reach their destinations; their spread out wings speak of their silent perseverance.",
    poet: "Bashir Badr",
    highlights: [
      { phrase: "परिंदों", color: "#EA580C" },
      { phrase: "मंज़िल", color: "#15803D" }
    ]
  },
  {
    id: "mot-3",
    title: "हौसलों से उड़ान ✨",
    mood: "motivational",
    sher: "मंजिलें उन्हीं को मिलती हैं जिनके सपनों में जान होती है, ✨\nपंखों से कुछ नहीं होता, हौसलों से उड़ान होती है।",
    transliteration: "Manzilein unhi ko milti hain jinke sapno mein jaan hoti hai, Pankhon se kuch nahi hota, hauslon se udaan hoti hai.",
    translation: "Destinations are reached only by those whose dreams have real belief; wings alone gain no height, it is dedication and courage that make you fly.",
    poet: "Aarzoo Lakhnavi",
    highlights: [
      { phrase: "सपनों में जान", color: "#DC2626" },
      { phrase: "हौसलों से उड़ान", color: "#EA580C" }
    ]
  },
  {
    id: "mot-4",
    title: "मैदान-ए-जंग 🔥",
    mood: "motivational",
    sher: "गिरते हैं शहसवार ही मैदान-ए-जंग में,\nवो तिफ़्ल क्या गिरेगा जो घुटनों के बल चले। 🔥",
    transliteration: "Girte hain shahsawar hi maidan-e-jang mein, Wo tifl kya girega jo ghutnon ke bal chale.",
    translation: "Only great horsemen fall in the field of battle, how can a crawling child ever taste defeat?",
    poet: "Traditional",
    highlights: [
      { phrase: "शहसवार", color: "#DC2626" },
      { phrase: "मैदान-ए-जंग", color: "#EA580C" }
    ]
  },
  {
    id: "mot-5",
    title: "रौशनी पैदा करो ✨",
    mood: "motivational",
    sher: "राह ही से रौशनी पैदा करो, ✨\nतुम दीये कब तक खरीदोगे सफ़र के वास्ते।",
    transliteration: "Raah hi se roshni paida karo, Tum diye kab tak khareedoge safar ke waaste.",
    translation: "Generate light from the path itself; how long will you keep purchasing lamps for your long journey?",
    poet: "Traditional",
    highlights: [
      { phrase: "रौशनी", color: "#EA580C" },
      { phrase: "सफ़र", color: "#15803D" }
    ]
  },

  // --- FRIENDSHIP (दोस्ती) ---
  {
    id: "fri-1",
    title: "सच्चा दोस्त 🤝",
    mood: "friendship",
    sher: "दोस्ती आम है लेकिन ऐ दोस्त,\nदोस्त मिलता है बड़ी मुश्किल से। 🤝",
    transliteration: "Dosti aam hai lekin aye dost, dost milta hai badi mushkil se.",
    translation: "Friendship is commonplace everywhere, O friend, but finding a friend who is truly true is rare beyond measure.",
    poet: "Ameer Minai",
    highlights: [
      { phrase: "दोस्ती", color: "#EA580C" },
      { phrase: "मुश्किल से", color: "#DC2626" }
    ]
  },
  {
    id: "fri-2",
    title: "ज़िंदगी की पहचान ✨",
    mood: "friendship",
    sher: "दोस्ती वो नहीं जो जान देती है, 🤝\nदोस्ती वो है जो ज़िंदगी की पहचान देती है। ✨",
    transliteration: "Dosti wo nahi jo jaan deti hai, dosti wo hai jo zindagi ki pehchaan deti hai.",
    translation: "Friendship is not about merely sacrificing your life; it is that which gives your life actual meaning and identity.",
    poet: "Waseem Barelvi",
    highlights: [
      { phrase: "दोस्ती", color: "#EA580C" },
      { phrase: "पहचान", color: "#DC2626" }
    ]
  },
  {
    id: "fri-3",
    title: "दोस्त और फ़रिश्ते 😊",
    mood: "friendship",
    sher: "गुनाहगार समझ कर मुझे न छोड़ देना,\nदोस्त भी गुनाह करते हैं कोई फ़रिश्ते नहीं होते। 😊",
    transliteration: "Gunaahgaar samajh kar mujhe na chhod dena, Dost bhi gunaah karte hain koi farishte nahi hote.",
    translation: "Do not abandon me thinking I am flawed; friends commit mistakes too, they are not flawless angels.",
    poet: "Traditional",
    highlights: [
      { phrase: "गुनाहगार", color: "#EA580C" },
      { phrase: "दोस्त", color: "#DC2626" }
    ]
  },
  {
    id: "fri-4",
    title: "दोस्ती निभाना 🤝",
    mood: "friendship",
    sher: "हम वो नहीं जो भूल जाया करते हैं, 🤝\nहम वो हैं जो दोस्ती निभाया करते हैं।",
    transliteration: "Hum wo nahi jo bhool jaaya karte hain, Hum wo hain jo dosti nibhaaya karte hain.",
    translation: "We are not those who easily forget and drift apart; we are those who honor and live friendship to its end.",
    poet: "Traditional",
    highlights: [
      { phrase: "भूल", color: "#EA580C" },
      { phrase: "दोस्ती", color: "#DC2626" }
    ]
  },
  {
    id: "fri-5",
    title: "ताल्लुक़ ❤️",
    mood: "friendship",
    sher: "एक ताल्लुक़ सा आ जाता है ज़माने के बाद, ❤️\nदोस्ती नाम पड़ता है निभाने के बाद।",
    transliteration: "Ek taalluq sa aa jaata hai zamaane ke baad, Dosti naam pad jaata hai nibhaane ke baad.",
    translation: "A beautiful bond automatically takes root after spending ages together, and it is named friendship once it is proved.",
    poet: "Sudarshan Faakir",
    highlights: [
      { phrase: "ताल्लुक़", color: "#EA580C" },
      { phrase: "दोस्ती", color: "#DC2626" }
    ]
  },

  // --- FUNNY (मज़ाकिया) ---
  {
    id: "fun-1",
    title: "इश्क़ और चाय 😊",
    mood: "funny",
    sher: "इश्क़ में दिल ऐसे टूटता है जैसे गिरे चाय में बिस्कुट, 😊\nन खाने के काबिल बचता है, न निकालने के काबिल!",
    transliteration: "Ishq mein dil aise tootat hai jaise gire chai mein biscuit, Na khaane ke kaabil bachta hai, na nikaalne ke kaabil!",
    translation: "In love, a heart breaks just like a biscuit slipped into hot tea; it is neither fit for consumption, nor can it be safely scooped out!",
    poet: "Chaiwala",
    highlights: [
      { phrase: "इश्क़", color: "#D97706" },
      { phrase: "बिस्कुट", color: "#EA580C" }
    ]
  },
  {
    id: "fun-2",
    title: "लायक नहीं 😊",
    mood: "funny",
    sher: "वो मुझसे मिलने आई थी सिर्फ ये कहने,\nकि तुम मेरे लायक नहीं हो, और मैं खुश हो गया! 😊",
    transliteration: "Wo mujhse milne aayi thi sirf ye kehne, Ki tum mere लायक nahi ho, aur main khush ho gaya!",
    translation: "She traveled all the way to meet me just to declare: 'You do not deserve me,' and I celebrated my freedom!",
    poet: "Mastana",
    highlights: [
      { phrase: "लायक", color: "#D97706" },
      { phrase: "खुश", color: "#16A34A" }
    ]
  },
  {
    id: "fun-3",
    title: "खीर आई है 😋",
    mood: "funny",
    sher: "अर्ज़ किया है कि चेहरे पर हँसी छाई है,\nक्योंकि आज फिर पड़ोसियों के घर खीर आई है। 😊",
    transliteration: "Arz kiya hai ki chehre par hansi shaayi hai, Kyunki aaj phir padosiyon ke ghar kheer aayi hai.",
    translation: "I declare that my face is beaming with absolute joy and bliss, purely because neighbors have cooked delicious pudding today.",
    poet: "Hasya Kavi",
    highlights: [
      { phrase: "हँसी", color: "#16A34A" },
      { phrase: "खीर", color: "#D97706" }
    ]
  },
  {
    id: "fun-4",
    title: "मजनू की जेब 😊",
    mood: "funny",
    sher: "इश्क़ करा तो जाना कि बहुत बड़ा झमेला है,\nमजनू के जेब में अब न कौड़ी न ढेला है। 😊",
    transliteration: "Ishq kara to jaana ki bahut bada jhamela is, Majnu ke jeb mein ab na kaudi na dhela hai.",
    translation: "When I fell in love, I realized it is an incredibly chaotic hassle; poor Majnu's pockets are now completely bankrupt.",
    poet: "Traditional",
    highlights: [
      { phrase: "झमेला", color: "#EA580C" },
      { phrase: "मजनू", color: "#D97706" }
    ]
  },
  {
    id: "fun-5",
    title: "चाँदनी और मच्छर 🦟",
    mood: "funny",
    sher: "चाँदनी रात में तारे चमकते हैं, ✨\nऔर हम आपके प्यार में मच्छर की तरह काटते हैं। 😊",
    transliteration: "Chandni raat mein taare chamakte hain, Aur hum aapke pyaar mein macchar ki tarah kaatate hain.",
    translation: "Stars shine bright on a beautiful moonlit night, and I spend my time itching like a mosquito in your love.",
    poet: "Funny Soul",
    highlights: [
      { phrase: "चाँदनी रात", color: "#D97706" },
      { phrase: "मच्छर", color: "#EA580C" }
    ]
  }
];

export function getShayariTitle(shayari: Partial<Shayari> & { sher?: string; mood?: string; title?: string }): string {
  if (shayari.title && shayari.title.trim()) {
    return shayari.title.trim();
  }
  const mood = (shayari.mood || "").toLowerCase();
  const text = (shayari.sher || "").toLowerCase();

  if (mood.includes("sad") || mood.includes("broken") || mood.includes("pain") || text.includes("रोए") || text.includes("तूफान")) {
    return "Dil Toot Gaya 🥀";
  }
  if (mood.includes("rain") || text.includes("बारिश") || text.includes("boond")) {
    return "Baarish Aur Tum 🌧️";
  }
  if (mood.includes("alone") || text.includes("अकेले") || text.includes("tanha")) {
    return "Akela Hoon 😔";
  }
  if (mood.includes("miss") || text.includes("याद")) {
    return "Yaad Aate Ho 💔";
  }
  if (mood.includes("love") || mood.includes("romantic")) {
    return "Mohabbat ❤️";
  }
  if (mood.includes("attit")) {
    return "Tevar 😎";
  }
  if (mood.includes("moti")) {
    return "Hausla ✨";
  }
  if (mood.includes("frien")) {
    return "Saccha Dost 🤝";
  }
  return "Moody Shayari ✨";
}
