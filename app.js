const AREAS = {
  "Westlands": [-1.267, 36.810],
  "CBD": [-1.286, 36.817],
  "Kilimani": [-1.292, 36.787],
  "Kileleshwa": [-1.279, 36.783],
  "Lavington": [-1.279, 36.769],
  "Parklands": [-1.260, 36.814],
  "Upper Hill": [-1.300, 36.813],
  "Karen": [-1.319, 36.706],
  "South B": [-1.316, 36.840],
  "Eastleigh": [-1.279, 36.850],
  "Kasarani": [-1.222, 36.897],
  "Ngara": [-1.276, 36.826]
};

const DEFAULT_STATE = {
  user: { name: "Alex Mwangi", phone: "+254 712 345 678", role: "sender" },
  points: 240,
  deliveries: [],
  offers: [
    { id: "offer-1", item: "Birthday cake", pickup: "Westlands", dropoff: "Kilimani", distance: 5.2, fee: 542, weightKg: 5.5, sender: "Njeri W." },
    { id: "offer-2", item: "Office documents", pickup: "CBD", dropoff: "Upper Hill", distance: 3.1, fee: 364, weightKg: 5, sender: "Brian K." },
    { id: "offer-3", item: "Phone charger", pickup: "Parklands", dropoff: "Lavington", distance: 7.4, fee: 729, weightKg: 5.2, sender: "Amina O." }
  ],
  earnings: 3250
};
const RATE_PER_KM = 85;
const BASE_FEE = 100;
const COMMISSION_RATE = 0.12;
const TRANSLATIONS = {
  so: {
    "How it works": "Sida ay u shaqayso",
    "I need to get an item delivered.": "Waxaan u baahanahay in shay la ii soo gaarsiiyo.",
    "I want to deliver in my community.": "Waxaan rabaa inaan gaarsiin ka sameeyo bulshadayda.",
    "e.g. Alex Mwangi": "tusaale: Alex Mwangi",
    "Enter a clear phone number": "Geli lambar telefoon oo sax ah",
    "Kilograms (kg)": "Kiiloogaraam (kg)",
    "Grams (g)": "Garaam (g)",
    "Go points": "Dhibcaha Go",
    "As a sender": "Diraha ahaan",
    "Delivery complete": "Gaarsiintu way dhammaatay",
    "Report a problem": "Soo sheeg dhibaato",
    "Delivered": "Waa la gaarsiiyey",
    "Rate courier": "Qiimee gaarsiiyaha",
    "Pickup": "Qaadis",
    "Drop-off": "Dejin",
    "Contact Nairobi Go": "La xiriir Nairobi Go",
    "Get help with a delivery or talk to our community team.": "Caawimaad ka hel gaarsiin ama la hadal kooxda bulshada.",
    "How can we help?": "Sideen kuu caawin karnaa?",
    "Delivery support": "Taageerada gaarsiinta",
    "Courier onboarding": "Diiwaangelinta gaarsiiyaha",
    "Payments": "Lacag-bixinnada",
    "Community feedback": "Fikirka bulshada",
    "Your message": "Fariintaada",
    "Tell us what you need help with…": "Noo sheeg caawimaadda aad u baahan tahay…",
    "Send message": "Dir fariinta",
    "Submitting opens your email app with the message ready to send.": "Markaad dirto, barnaamijka iimaylkaaga ayaa furmaya iyadoo fariintu diyaar u tahay in la diro.",
    "Email support:": "Taageero iimayl:",
    "Nairobi Go community": "Bulshada Nairobi Go",
    "Help make local deliveries safe and respectful for everyone.": "Ka caawi in gaarsiinta maxalliga ahi qof walba u noqoto ammaan iyo ixtiraam.",
    "Protect personal information and meet in safe, agreed locations.": "Ilaali xogta gaarka ah, kuna kulma meel ammaan ah oo la isla oggol yahay.",
    "Your email app is opening with your message.": "Barnaamijka iimaylkaaga ayaa furmaya iyadoo fariintaadu la socoto.",
    "Switch to light mode": "U beddel muuqaalka iftiinka",
    "Switch to dark mode": "U beddel muuqaalka mugdiga",
    "Settings": "Dejinta",
    "Dark mode": "Muuqaalka mugdiga",
    "Language": "Luqadda",
    "Distance and delivery fee are estimates based on area. Final fare may vary slightly with the route.": "Masaafada iyo khidmadda waa qiyaas ku salaysan aagga. Qiimaha kama dambaysta ahi wax yar ayuu ku kala duwanaan karaa jidka.",
    "Go points discount": "Dhimista dhibcaha Go",
    "Your session is saved on this device until you log out. Identity images are not saved or uploaded in this demo.": "Fadhigaagu wuxuu ku kaydsan yahay qalabkan ilaa aad ka baxdo. Sawirrada aqoonsiga laguma kaydiyo ama laguma shubo tusaalahan.",
    "e.g. House keys, a care package": "tusaale: furayaasha guriga, xirmo hadiyad ah",
    "Pickup details, gate code, handling instructions…": "Faahfaahinta qaadista, lambarka albaabka, tilmaamaha maaraynta…",
    "Anything you need, anywhere in Nairobi.": "Wax kasta oo aad u baahan tahay, meel kasta oo Nairobi ah.",
    "Your payment is held securely until delivery is confirmed. Couriers are independent members of the community.": "Lacagtaada si ammaan ah ayaa loo hayaa ilaa gaarsiinta la xaqiijiyo. Gaarsiiyeyaashu waa xubno bulshada ka tirsan oo madax-bannaan.",
    "Demo mode: enter any 6 digits. SMS delivery requires a configured authentication provider.": "Habka tusaalaha: geli 6 lambar kasta. SMS-ku wuxuu u baahan yahay adeeg xaqiijin.",
    "SMS delivery requires a configured authentication provider.": "Dirista SMS-ku waxay u baahan tahay adeeg xaqiijin.",
    "Demo only: identity photos are selected on this device and are not uploaded, verified, or saved. SMS verification requires an authentication provider.": "Tusaale keliya: sawirrada aqoonsiga waxaa laga doortaa qalabkan, lamana raro, xaqiijiyo ama kaydiyo. Xaqiijinta SMS-ku waxay u baahan tahay adeeg.",
    "Email support:": "Taageero iimayl:",
    "Finding a courier": "Gaarsiiye ayaa la raadinayaa",
    "Courier accepted": "Gaarsiiyaha ayaa aqbalay",
    "On the way": "Wuu soo socdaa",
    "Delivered": "Waa la gaarsiiyey",
    "Under review": "Dib ayaa loo eegayaa",
    "In progress": "Wuu socdaa",
    "Completed": "La dhammaystiray",
    "Contact us": "Nala soo xiriir",
    "Community": "Bulshada",
    "TUESDAY": "TALAADO",
    "MONDAY": "ISNIIN",
    "WEDNESDAY": "ARBACO",
    "THURSDAY": "KHAMIIS",
    "FRIDAY": "JIMCO",
    "SATURDAY": "SABTI",
    "SUNDAY": "AXAD",
    "Your city, by Nairobi.": "Magaaladaada, dadka Nairobi.",
    "Made for Nairobi, by Nairobi.": "Waxaa Nairobi u sameeyey dadka Nairobi.",
    "Go points · 100 points = KES 50 off a delivery": "Dhibcaha Go · 100 dhibcood = KES 50 dhimis gaarsiin",
    "Your points go places.": "Dhibcahaagu meel bay ku gaarsiiyaan.",
    "Near Westlands, Nairobi": "U dhow Westlands, Nairobi",
    "Couriers": "Gaarsiiyeyaasha",
    "Requests": "Dalabyada",
    "You": "Adiga",
    "nearby": "kuu dhow",
    "on your route": "jidkaaga",
    "completed": "la dhammaystiray",
    "pending · 48-hour safety window": "sugaya · muddada badbaadada 48 saac",
    "Go points · 100 points = KES 50 off a delivery": "Dhibcaha Go · 100 dhibcood = KES 50 dhimis gaarsiin",
    "Track courier ·": "La soco gaarsiiyaha ·",
    "Nearby": "Dhow",
    "Rate courier · Report issue within 48h": "Qiimee gaarsiiyaha · soo sheeg dhib 48 saac gudahood",
    "Rate courier · Delivery complete": "Qiimee gaarsiiyaha · gaarsiin dhammaatay",
    "Your route": "Jidkaaga",
    "Be respectful to senders, couriers, and neighbours.": "Ixtiraam dirayaasha, gaarsiiyeyaasha iyo deriska.",
    "Only accept deliveries you can safely carry.": "Aqbal oo keliya gaarsiinnada aad si ammaan ah u qaadi karto.",
    "Keep communication clear and report problems promptly.": "Isgaarsiinta caddee oo dhibaatooyinka si degdeg ah u soo sheeg.",
    "Support": "Taageero",
    "Made for Nairobi, by Nairobi.": "Waxaa Nairobi u sameeyey dadka Nairobi.",
    "How it works": "Sida ay u shaqayso",
    "How did it go?": "Sidee ayay u dhacday?",
    "Your rating": "Qiimeyntaada",
    "Report a problem (optional · within 48 hours)": "Soo sheeg dhibaato (ikhtiyaari · 48 saac gudahood)",
    "Lost or damaged item? Tell us what happened.": "Shaygu ma lumay ama ma dhaawacmay? Noo sheeg waxa dhacay.",
    "Cancel": "Jooji",
    "Submit feedback": "Dir jawaab celin",
    "Courier payout is held for 48 hours after delivery. A reported issue keeps the payout on hold for review.": "Lacagta gaarsiiyaha waxaa la hayaa 48 saac kadib gaarsiinta. Dhib la soo sheegay wuxuu sii hayaa lacagta inta dib loo eegayo.",
    "How are you using Nairobi Go?": "Sidee ayaad u isticmaalaysaa Nairobi Go?",
    "Choose a clear photo of yourself (max 10 MB).": "Dooro sawir cad oo naftaada ah (ugu badnaan 10 MB).",
    "Motorcycle couriers only": "Gaarsiiyeyaasha mootooyinka oo keliya",
    "Only motorcycles are supported on Nairobi Go.": "Nairobi Go waxay taageertaa mootooyinka oo keliya.",
    "Enter the registration shown on your motorcycle.": "Geli taarikada diiwaangelinta ee mootadaada.",
    "Upload a clear photo of the front of your ID (max 10 MB).": "Soo geli sawir cad oo dhinaca hore ee aqoonsigaaga ah (ugu badnaan 10 MB).",
    "Upload a clear photo of the back of your ID (max 10 MB).": "Soo geli sawir cad oo dhinaca dambe ee aqoonsigaaga ah (ugu badnaan 10 MB).",
    "For deliveries, between 5 kg and 50 kg.": "Gaarsiinnada, inta u dhexeysa 5 kg iyo 50 kg.",
    "M-Pesa STK push simulated. Your request is live!": "Codsiga M-Pesa waa tusaale. Dalabkaaga waa la diiwaangeliyey!",
    "You’re in! Phone verification is simulated for this demo.": "Waad gashay! Xaqiijinta telefoonku waa tusaale.",
    "You’ve been logged out.": "Waad ka baxday.",
    "Request accepted. It’s now assigned to you.": "Dalabka waa la aqbalay, adiga ayaana loo qoondeeyey.",
    "Drop-off photo saved. Payout is held for 48 hours.": "Sawirka dejinta waa la kaydiyey. Lacagta waxaa la hayaa 48 saac.",
    "Thanks for rating your courier!": "Waad ku mahadsan tahay qiimeynta gaarsiiyaha!",
    "Issue reported. Your courier payout is on hold.": "Dhibaatada waa la soo sheegay. Lacagta gaarsiiyaha waa la hakiyey.",
    "Please choose an image for proof of delivery.": "Dooro sawir caddeyn u ah gaarsiinta.",
    "Live courier tracking requires a connected maps and location service.": "La socodka tooska ah wuxuu u baahan yahay adeeg khariidad iyo goob.",
    "This request is no longer available.": "Dalabkan hadda lama heli karo.",
    "Your changes could not be saved on this device.": "Isbeddellada laguma kaydin karin qalabkan.",
    "Request a delivery, pay by M-Pesa, and track your independent courier.": "Dalbo gaarsiin, ku bixi M-Pesa, lana soco gaarsiiyahaaga madax-bannaan.",
    "Sender": "Diraha",
    "Courier": "Gaarsiiye",
    "I'm using Nairobi Go as a": "Waxaan Nairobi Go u isticmaalayaa",
    "YOUR CITY, CONNECTED": "MAGAALADAADA, ISKU XIDHAN",
    "YOUR CITY, AT YOUR SERVICE": "MAGAALADAADA, ADEEGGAAGA",
    "YOUR CITY, YOUR ROUTE": "MAGAALADAADA, JIDKAAGA",
    "Anything, anywhere": "Wax kasta, meel kasta",
    "in Nairobi.": "Nairobi gudaheeda.",
    "Send what matters with a neighbour you can trust. A local delivery marketplace, made for the way Nairobi moves.": "U dir waxa muhiimka ah deris aad ku kalsoon tahay. Suuq gaarsiin maxalli ah oo loogu talagalay sida Nairobi u socoto.",
    "Get started": "Bilow",
    "A marketplace for independent couriers. Nairobi, Kenya.": "Suuq loogu talagalay gaarsiiyeyaasha madax-bannaan. Nairobi, Kenya.",
    "Good afternoon": "Galab wanaagsan",
    "What can we help you get moving today?": "Maxaan kaa caawin karnaa inaad maanta dirto?",
    "Find a delivery that fits your route.": "Hel gaarsiin ku habboon jidkaaga.",
    "Nairobi, Kenya": "Nairobi, Kenya",
    "Send anything.": "Dir wax kasta.",
    "Get it there.": "Gaarsii halkaas.",
    "From keys you left behind to your weekend shopping. A trusted local courier is just around the corner.": "Laga bilaabo furayaasha kaa haray ilaa alaabta aad soo iibsatay. Gaarsiiye maxalli ah oo lagu kalsoon yahay ayaa kuu dhow.",
    "Book a delivery": "Dalbo gaarsiin",
    "Deliveries": "Gaarsiinnada",
    "Go points": "Dhibcaha Go",
    "Redeem on your next trip": "Ku isticmaal gaarsiintaada xigta",
    "Your rating": "Qiimeyntaada",
    "After your first delivery": "Kadib gaarsiintaada koowaad",
    "Completed so far": "Ilaa hadda la dhammaystiray",
    "Your first is waiting": "Gaarsiintaadii koowaad ayaa ku sugaysa",
    "Your deliveries": "Gaarsiinnadaada",
    "Your activity": "Waxqabadkaaga",
    "in progress": "socda",
    "No deliveries yet. Your first request is just a few taps away.": "Weli gaarsiin ma jirto. Dalabkaaga koowaad wuxuu kuu jiraa dhowr taabasho.",
    "Your city, in motion": "Magaaladaada oo dhaqaaqaysa",
    "Illustrated city preview · live tracking needs map services.": "Muuqaalka magaalada · la socodka tooska ah wuxuu u baahan yahay adeeg khariidad.",
    "Simple as 1, 2, go": "U fudud sida 1, 2, tag",
    "Tell us where it’s going": "Noo sheeg halka loo socdo",
    "Add your pickup, drop-off and item details.": "Ku dar goobaha qaadista, dejinta iyo faahfaahinta shayga.",
    "See your price upfront": "Qiimahaaga horay u arag",
    "Pay securely with M-Pesa to get started.": "Si ammaan ah ugu bixi M-Pesa si aad u bilowdo.",
    "Follow it all the way": "La soco ilaa dhammaadka",
    "Track your courier until it arrives.": "La soco gaarsiiyaha ilaa uu gaaro.",
    "Your points go places.": "Dhibcahaagu meel bay ku gaarsiiyaan.",
    "Delivery requests near you": "Dalabyada gaarsiinta ee kuu dhow",
    "nearby": "kuu dhow",
    "All nearby": "Dhammaan kuwa dhow",
    "Near Westlands": "U dhow Westlands",
    "No requests in this area right now. Check back in a bit.": "Hadda ma jiraan dalabyo aaggan. Mar kale eeg goor dhow.",
    "Your earnings · this week": "Dakhligaaga · toddobaadkan",
    "12% platform commission · paid to M-Pesa": "12% waa komishanka abka · M-Pesa ayaa lagu bixiyaa",
    "Requests around you": "Dalabyada kugu hareeraysan",
    "Demo requests · live availability needs a connected backend.": "Dalabyo tusaale ah · helitaanka tooska ah wuxuu u baahan yahay adeeg backend.",
    "Deliver on your terms": "U gaarsii sidaad rabto",
    "Choose a request nearby": "Dooro dalab kuu dhow",
    "See the item, route and fee before accepting.": "Eeg shayga, jidka iyo khidmadda ka hor intaadan aqbalin.",
    "Pick up and snap a photo": "Qaado oo sawir ka qaad",
    "Keep the sender in the loop at every step.": "Diraha la socodsii tallaabo kasta.",
    "Deliver. Get paid.": "Gaarsii. Lacag hel.",
    "Payout to M-Pesa after the 48-hour safety window.": "M-Pesa ayaa laguugu shubayaa kadib muddada badbaadada ee 48 saac.",
    "Trusted couriers go further.": "Gaarsiiyeyaasha la aamini karo way sii fogaanayaan.",
    "Accept request": "Aqbal dalabka",
    "Delivery fee only": "Khidmadda gaarsiinta oo keliya",
    "Item weight": "Miisaanka shayga",
    "Weight unit": "Halbeegga miisaanka",
    "Deliveries must weigh between 5 kg and 50 kg (5,000–50,000 g).": "Miisaanka gaarsiintu waa inuu u dhexeeyaa 5 kg iyo 50 kg (5,000–50,000 g).",
    "Notes for your courier (optional)": "Qoraal loogu talagalay gaarsiiyaha (ikhtiyaari)",
    "Pickup area": "Goobta laga qaadayo",
    "Drop-off area": "Goobta la dhigayo",
    "What are we delivering?": "Maxaa la gaarsiinayaa?",
    "Book a delivery": "Dalbo gaarsiin",
    "Estimated distance": "Masaafada la qiyaasay",
    "Total to pay": "Wadarta la bixinayo",
    "Delivery fee · KES 85/km": "Khidmadda gaarsiinta · KES 85/km",
    "Continue to M-Pesa": "Ku sii wad M-Pesa",
    "Not now": "Hadda maya",
    "Your profile": "Astaantaada",
    "Account and app preferences.": "Akoonka iyo dejimaha abka.",
    "Log out": "Ka bax",
    "Profile photo": "Sawirka astaanta",
    "Name": "Magaca",
    "Phone": "Telefoon",
    "Role": "Doorka",
    "Vehicle": "Gaadiidka",
    "Motorcycle": "Mooto",
    "National ID · front": "Kaarka aqoonsiga · hore",
    "National ID · back": "Kaarka aqoonsiga · gadaal",
    "Join Nairobi Go": "Ku biir Nairobi Go",
    "One number. Your whole city.": "Hal lambar. Magaaladaada oo dhan.",
    "How will you use Nairobi Go?": "Sidee ayaad u isticmaali doontaa Nairobi Go?",
    "Send something": "Wax dir",
    "Make deliveries": "Gaarsiin samee",
    "Your name": "Magacaaga",
    "Kenyan phone number": "Lambarka telefoonka Kenya",
    "Send me a code": "Kood ii soo dir",
    "Enter your 6-digit code": "Geli koodhkaaga 6-god ah",
    "Verify and continue": "Xaqiiji oo sii wad",
    "Contact Nairobi Go": "La xiriir Nairobi Go",
    "Get help with a delivery or talk to our community team.": "Caawimaad ka hel gaarsiin ama la hadal kooxda bulshada.",
    "Email support": "Taageero iimayl",
    "Community guidelines": "Xeerarka bulshada",
    "Be respectful to senders, couriers, and neighbours.": "Ixtiraam dirayaasha, gaarsiiyeyaasha iyo deriska.",
    "Only accept deliveries you can safely carry.": "Aqbal oo keliya gaarsiinnada aad si ammaan ah u qaadi karto.",
    "Keep communication clear and report problems promptly.": "Isgaarsiinta caddee, dhibaatooyinkana si degdeg ah u soo sheeg.",
    "Contact us": "Nala soo xiriir",
    "Community": "Bulshada"
  },
  sw: {
    "How it works": "Jinsi inavyofanya kazi",
    "I need to get an item delivered.": "Nahitaji kifurushi kisafirishwe kwangu.",
    "I want to deliver in my community.": "Ninataka kufanya usafirishaji katika jamii yangu.",
    "I need to get an item delivered.": "Nahitaji kifurushi kisafirishwe kwangu.",
    "I want to deliver in my community.": "Ninataka kufanya usafirishaji katika jamii yangu.",
    "e.g. Alex Mwangi": "mfano: Alex Mwangi",
    "Kilograms (kg)": "Kilogramu (kg)",
    "Grams (g)": "Gramu (g)",
    "As a sender": "Kama mtumaji",
    "Delivery complete": "Usafirishaji umekamilika",
    "Report a problem": "Ripoti tatizo",
    "Rate courier": "Kadiria msafirishaji",
    "Pickup": "Kuchukua",
    "Drop-off": "Kupeleka",
    "Contact Nairobi Go": "Wasiliana na Nairobi Go",
    "Get help with a delivery or talk to our community team.": "Pata msaada wa usafirishaji au zungumza na timu yetu ya jamii.",
    "How can we help?": "Tunawezaje kukusaidia?",
    "Delivery support": "Msaada wa usafirishaji",
    "Courier onboarding": "Usajili wa msafirishaji",
    "Payments": "Malipo",
    "Community feedback": "Maoni ya jamii",
    "Your message": "Ujumbe wako",
    "Tell us what you need help with…": "Tuambie unahitaji msaada gani…",
    "Send message": "Tuma ujumbe",
    "Submitting opens your email app with the message ready to send.": "Unapotuma, programu yako ya barua pepe itafunguka na ujumbe ukiwa tayari kutumwa.",
    "Email support:": "Msaada wa barua pepe:",
    "Nairobi Go community": "Jamii ya Nairobi Go",
    "Help make local deliveries safe and respectful for everyone.": "Saidia kufanya usafirishaji wa eneo hili uwe salama na wenye heshima kwa wote.",
    "Protect personal information and meet in safe, agreed locations.": "Linda taarifa binafsi na mkutane sehemu salama mlizokubaliana.",
    "Your email app is opening with your message.": "Programu yako ya barua pepe inafunguka ikiwa na ujumbe wako.",
    "Switch to light mode": "Badili kwenda mwonekano wa mwanga",
    "Switch to dark mode": "Badili kwenda mwonekano wa giza",
    "Settings": "Mipangilio",
    "Dark mode": "Mwonekano wa giza",
    "Language": "Lugha",
    "Distance and delivery fee are estimates based on area. Final fare may vary slightly with the route.": "Umbali na ada ni makadirio kulingana na eneo. Bei ya mwisho inaweza kubadilika kidogo kulingana na njia.",
    "Go points discount": "Punguzo la pointi za Go",
    "Your session is saved on this device until you log out. Identity images are not saved or uploaded in this demo.": "Kikao chako huhifadhiwa kwenye kifaa hiki hadi utakapotoka. Picha za kitambulisho hazihifadhiwi wala kupakiwa kwenye jaribio hili.",
    "e.g. House keys, a care package": "mfano: funguo za nyumba, kifurushi cha zawadi",
    "Pickup details, gate code, handling instructions…": "Maelezo ya kuchukua, msimbo wa lango, maagizo ya kushughulikia…",
    "Anything you need, anywhere in Nairobi.": "Chochote unachohitaji, popote Nairobi.",
    "Your payment is held securely until delivery is confirmed. Couriers are independent members of the community.": "Malipo yako yanahifadhiwa kwa usalama hadi usafirishaji uthibitishwe. Wasafirishaji ni wanajamii huru.",
    "Demo mode: enter any 6 digits. SMS delivery requires a configured authentication provider.": "Hali ya jaribio: weka tarakimu 6 zozote. SMS inahitaji huduma ya uthibitishaji.",
    "SMS delivery requires a configured authentication provider.": "Kutuma SMS kunahitaji huduma ya uthibitishaji.",
    "Demo only: identity photos are selected on this device and are not uploaded, verified, or saved. SMS verification requires an authentication provider.": "Jaribio pekee: picha za kitambulisho huchaguliwa kwenye kifaa hiki na hazipakwi, hazihakikishwi wala kuhifadhiwa. Uthibitishaji wa SMS unahitaji huduma.",
    "Email support:": "Msaada wa barua pepe:",
    "Finding a courier": "Tunatafuta msafirishaji",
    "Courier accepted": "Msafirishaji amekubali",
    "On the way": "Njiani",
    "Delivered": "Imefikishwa",
    "Under review": "Inakaguliwa",
    "In progress": "Inaendelea",
    "Completed": "Imekamilika",
    "Contact us": "Wasiliana nasi",
    "Community": "Jamii",
    "TUESDAY": "JUMANNE",
    "MONDAY": "JUMATATU",
    "WEDNESDAY": "JUMATANO",
    "THURSDAY": "ALHAMISI",
    "FRIDAY": "IJUMAA",
    "SATURDAY": "JUMAMOSI",
    "SUNDAY": "JUMAPILI",
    "Your city, by Nairobi.": "Jiji lako, kutoka kwa watu wa Nairobi.",
    "Made for Nairobi, by Nairobi.": "Imetengenezwa Nairobi, na watu wa Nairobi.",
    "Go points · 100 points = KES 50 off a delivery": "Pointi za Go · pointi 100 = punguzo la KES 50",
    "Your points go places.": "Pointi zako zinafika mbali.",
    "Near Westlands, Nairobi": "Karibu na Westlands, Nairobi",
    "Couriers": "Wasafirishaji",
    "Requests": "Maombi",
    "You": "Wewe",
    "on your route": "kwenye njia yako",
    "completed": "zilizokamilika",
    "pending · 48-hour safety window": "inasubiri · kipindi cha usalama cha saa 48",
    "Go points · 100 points = KES 50 off a delivery": "Pointi za Go · pointi 100 = punguzo la KES 50",
    "Track courier ·": "Fuatilia msafirishaji ·",
    "Nearby": "Karibu",
    "Rate courier · Report issue within 48h": "Kadiria msafirishaji · ripoti tatizo ndani ya saa 48",
    "Rate courier · Delivery complete": "Kadiria msafirishaji · usafirishaji umekamilika",
    "Support": "Msaada",
    "How did it go?": "Ilwaje?",
    "Report a problem (optional · within 48 hours)": "Ripoti tatizo (si lazima · ndani ya saa 48)",
    "Lost or damaged item? Tell us what happened.": "Kifurushi kimepotea au kuharibika? Tuambie kilichotokea.",
    "Cancel": "Ghairi",
    "Submit feedback": "Tuma maoni",
    "Courier payout is held for 48 hours after delivery. A reported issue keeps the payout on hold for review.": "Malipo ya msafirishaji hushikiliwa kwa saa 48 baada ya kufikisha. Tatizo lililoripotiwa husimamisha malipo hadi likaguliwe.",
    "Choose a clear photo of yourself (max 10 MB).": "Chagua picha yako iliyo wazi (isiyozidi MB 10).",
    "Motorcycle couriers only": "Wasafirishaji wa pikipiki pekee",
    "Only motorcycles are supported on Nairobi Go.": "Nairobi Go inaruhusu pikipiki pekee.",
    "Enter the registration shown on your motorcycle.": "Weka nambari ya usajili iliyo kwenye pikipiki yako.",
    "Upload a clear photo of the front of your ID (max 10 MB).": "Pakia picha wazi ya mbele ya kitambulisho chako (isiyozidi MB 10).",
    "Upload a clear photo of the back of your ID (max 10 MB).": "Pakia picha wazi ya nyuma ya kitambulisho chako (isiyozidi MB 10).",
    "For deliveries, between 5 kg and 50 kg.": "Kwa usafirishaji, kati ya kilo 5 na kilo 50.",
    "M-Pesa STK push simulated. Your request is live!": "Ombi la M-Pesa ni la majaribio. Ombi lako limewasilishwa!",
    "You’re in! Phone verification is simulated for this demo.": "Umeingia! Uthibitishaji wa simu ni wa majaribio.",
    "You’ve been logged out.": "Umetoka kwenye akaunti.",
    "Request accepted. It’s now assigned to you.": "Ombi limekubaliwa na limekabidhiwa kwako.",
    "Drop-off photo saved. Payout is held for 48 hours.": "Picha ya kupeleka imehifadhiwa. Malipo yanasubiri kwa saa 48.",
    "Thanks for rating your courier!": "Asante kwa kumkadiri msafirishaji!",
    "Issue reported. Your courier payout is on hold.": "Tatizo limeripotiwa. Malipo ya msafirishaji yamesimamishwa.",
    "Please choose an image for proof of delivery.": "Tafadhali chagua picha ya kuthibitisha usafirishaji.",
    "Live courier tracking requires a connected maps and location service.": "Ufuatiliaji wa moja kwa moja unahitaji huduma ya ramani na eneo.",
    "This request is no longer available.": "Ombi hili halipatikani tena.",
    "Your changes could not be saved on this device.": "Mabadiliko yako hayakuweza kuhifadhiwa kwenye kifaa hiki.",
    "Request a delivery, pay by M-Pesa, and track your independent courier.": "Agiza usafirishaji, lipa kwa M-Pesa na umfuatilie msafirishaji huru.",
    "Sender": "Mtumaji",
    "Courier": "Msafirishaji",
    "I'm using Nairobi Go as a": "Ninatumia Nairobi Go kama",
    "YOUR CITY, CONNECTED": "Jiji lako, limeunganishwa",
    "YOUR CITY, AT YOUR SERVICE": "Jiji lako, huduma yako",
    "YOUR CITY, YOUR ROUTE": "Jiji lako, njia yako",
    "Anything, anywhere": "Chochote, popote",
    "in Nairobi.": "Nairobi.",
    "Send what matters with a neighbour you can trust. A local delivery marketplace, made for the way Nairobi moves.": "Tuma unachohitaji kupitia jirani unayemwamini. Soko la usafirishaji la eneo lako, lililoundwa kwa maisha ya Nairobi.",
    "Get started": "Anza",
    "A marketplace for independent couriers. Nairobi, Kenya.": "Soko la wasafirishaji huru. Nairobi, Kenya.",
    "Good afternoon": "Habari za mchana",
    "What can we help you get moving today?": "Tunaweza kukusaidia kusafirisha nini leo?",
    "Find a delivery that fits your route.": "Pata usafirishaji unaolingana na njia yako.",
    "Nairobi, Kenya": "Nairobi, Kenya",
    "Send anything.": "Tuma chochote.",
    "Get it there.": "Kifikishe huko.",
    "From keys you left behind to your weekend shopping. A trusted local courier is just around the corner.": "Kuanzia funguo ulizosahau hadi bidhaa zako za wikendi. Msafirishaji wa eneo unayemwamini yuko karibu.",
    "Book a delivery": "Agiza usafirishaji",
    "Deliveries": "Usafirishaji",
    "Go points": "Pointi za Go",
    "Redeem on your next trip": "Tumia kwenye usafirishaji wako ujao",
    "Your rating": "Ukadiriaji wako",
    "After your first delivery": "Baada ya usafirishaji wako wa kwanza",
    "Completed so far": "Zilizokamilika hadi sasa",
    "Your first is waiting": "Usafirishaji wako wa kwanza unakusubiri",
    "Your deliveries": "Usafirishaji wako",
    "Your activity": "Shughuli zako",
    "in progress": "zinaendelea",
    "No deliveries yet. Your first request is just a few taps away.": "Bado hakuna usafirishaji. Ombi lako la kwanza liko hatua chache tu.",
    "Your city, in motion": "Jiji lako linaendelea",
    "Illustrated city preview · live tracking needs map services.": "Muonekano wa jiji · ufuatiliaji wa moja kwa moja unahitaji huduma za ramani.",
    "Simple as 1, 2, go": "Rahisi kama 1, 2, twende",
    "Tell us where it’s going": "Tuambie inakoenda",
    "Add your pickup, drop-off and item details.": "Weka sehemu za kuchukua, kupeleka na maelezo ya kifurushi.",
    "See your price upfront": "Jua bei mapema",
    "Pay securely with M-Pesa to get started.": "Lipa kwa usalama kupitia M-Pesa ili kuanza.",
    "Follow it all the way": "Fuatilia hadi mwisho",
    "Track your courier until it arrives.": "Fuatilia msafirishaji hadi kifurushi kifike.",
    "Your points go places.": "Pointi zako zinafika mbali.",
    "Delivery requests near you": "Maombi ya usafirishaji karibu nawe",
    "nearby": "karibu",
    "All nearby": "Zote zilizo karibu",
    "Near Westlands": "Karibu na Westlands",
    "No requests in this area right now. Check back in a bit.": "Hakuna maombi katika eneo hili kwa sasa. Angalia tena baadaye.",
    "Your earnings · this week": "Mapato yako · wiki hii",
    "12% platform commission · paid to M-Pesa": "Kamisheni ya mfumo ni 12% · hulipwa kupitia M-Pesa",
    "Requests around you": "Maombi yaliyo karibu nawe",
    "Demo requests · live availability needs a connected backend.": "Maombi ya mfano · huduma ya moja kwa moja inahitaji backend.",
    "Deliver on your terms": "Safirisha kwa masharti yako",
    "Choose a request nearby": "Chagua ombi lililo karibu",
    "See the item, route and fee before accepting.": "Angalia kifurushi, njia na malipo kabla ya kukubali.",
    "Pick up and snap a photo": "Chukua kifurushi na upige picha",
    "Keep the sender in the loop at every step.": "Mjulishe mtumaji katika kila hatua.",
    "Deliver. Get paid.": "Fikisha. Lipawe.",
    "Payout to M-Pesa after the 48-hour safety window.": "Malipo yatatumwa kwa M-Pesa baada ya kipindi cha usalama cha saa 48.",
    "Trusted couriers go further.": "Wasafirishaji wanaoaminika hufika mbali.",
    "Accept request": "Kubali ombi",
    "Delivery fee only": "Ada ya usafirishaji pekee",
    "Item weight": "Uzito wa kifurushi",
    "Weight unit": "Kipimo cha uzito",
    "Deliveries must weigh between 5 kg and 50 kg (5,000–50,000 g).": "Vifurushi lazima viwe na uzito wa kilo 5 hadi 50 (gramu 5,000–50,000).",
    "Notes for your courier (optional)": "Maelezo kwa msafirishaji (si lazima)",
    "Pickup area": "Eneo la kuchukua",
    "Drop-off area": "Eneo la kupeleka",
    "What are we delivering?": "Tunasafirisha nini?",
    "Estimated distance": "Umbali unaokadiriwa",
    "Total to pay": "Jumla ya kulipa",
    "Delivery fee · KES 85/km": "Ada ya usafirishaji · KES 85/km",
    "Continue to M-Pesa": "Endelea kwa M-Pesa",
    "Not now": "Si sasa",
    "Your profile": "Wasifu wako",
    "Account and app preferences.": "Akaunti na mipangilio ya programu.",
    "Log out": "Toka",
    "Profile photo": "Picha ya wasifu",
    "Name": "Jina",
    "Phone": "Simu",
    "Role": "Jukumu",
    "Vehicle": "Gari",
    "Motorcycle": "Pikipiki",
    "National ID · front": "Kitambulisho · mbele",
    "National ID · back": "Kitambulisho · nyuma",
    "Join Nairobi Go": "Jiunge na Nairobi Go",
    "One number. Your whole city.": "Nambari moja. Jiji lako lote.",
    "How will you use Nairobi Go?": "Utatumiaje Nairobi Go?",
    "Send something": "Tuma kifurushi",
    "Make deliveries": "Fanya usafirishaji",
    "Your name": "Jina lako",
    "Kenyan phone number": "Nambari ya simu ya Kenya",
    "Send me a code": "Nitumie msimbo",
    "Enter your 6-digit code": "Weka msimbo wako wa tarakimu 6",
    "Verify and continue": "Thibitisha na uendelee",
    "Contact Nairobi Go": "Wasiliana na Nairobi Go",
    "Get help with a delivery or talk to our community team.": "Pata msaada kuhusu usafirishaji au zungumza na timu yetu ya jamii.",
    "Email support": "Msaada kwa barua pepe",
    "Community guidelines": "Mwongozo wa jamii",
    "Be respectful to senders, couriers, and neighbours.": "Waheshimu watumaji, wasafirishaji na majirani.",
    "Only accept deliveries you can safely carry.": "Kubali tu vifurushi unavyoweza kubeba kwa usalama.",
    "Keep communication clear and report problems promptly.": "Wasiliana wazi na uripoti matatizo mara moja."
  }
};
const app = document.getElementById("app");
const toast = document.getElementById("toast");
let toastTimer;
let state = loadState();
let authRole = "sender";
let currentTab = "available";
let profilePhotoPreview = "";
let currentArea = Object.prototype.hasOwnProperty.call(AREAS, loadPreference("location", "Westlands"))
  ? loadPreference("location", "Westlands")
  : "Westlands";
let language = ["en", "so", "sw"].includes(loadPreference("language", "en")) ? loadPreference("language", "en") : "en";
let darkMode = loadPreference("theme", "light") === "dark";

function loadPreference(key, fallback) {
  try {
    return localStorage.getItem(`nairobi-go-${key}`) || fallback;
  } catch (error) {
    console.error(`Could not load ${key} preference.`, error);
    return fallback;
  }
}

function setPreference(key, value) {
  try {
    localStorage.setItem(`nairobi-go-${key}`, value);
  } catch (error) {
    console.error(`Could not save ${key} preference.`, error);
    notify("Your preference could not be saved on this device.");
  }
}

function t(text) {
  return TRANSLATIONS[language]?.[text] || text;
}

function translateMarkup(markup) {
  const template = document.createElement("template");
  template.innerHTML = markup;
  if (language === "en") return template.innerHTML;
  const translations = TRANSLATIONS[language] || {};
  const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (translations[trimmed]) {
      node.nodeValue = raw.replace(trimmed, translations[trimmed]);
    }
  }
  template.content.querySelectorAll("*").forEach(element => {
    for (const attribute of ["placeholder", "aria-label", "title"]) {
      const value = element.getAttribute(attribute);
      if (value && translations[value]) element.setAttribute(attribute, translations[value]);
    }
  });
  return template.innerHTML;
}

function applyTheme() {
  document.documentElement.dataset.theme = darkMode ? "dark" : "light";
}

function loadState() {
  try {
    const saved = localStorage.getItem("nairobi-go-state");
    return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : structuredClone(DEFAULT_STATE);
  } catch (error) {
    console.error("Could not load saved Nairobi Go state.", error);
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  try {
    localStorage.setItem("nairobi-go-state", JSON.stringify(state));
  } catch (error) {
    console.error("Could not save Nairobi Go state.", error);
    notify("Your changes could not be saved on this device.");
  }
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function money(amount) {
  return `KES ${Math.round(amount).toLocaleString("en-KE")}`;
}

function notify(message) {
  toast.textContent = t(message);
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
}

function routeDistance(from, to) {
  const a = AREAS[from] || AREAS.CBD;
  const b = AREAS[to] || AREAS.CBD;
  const radians = degrees => degrees * Math.PI / 180;
  const deltaLat = radians(b[0] - a[0]);
  const deltaLon = radians(b[1] - a[1]);
  const h = Math.sin(deltaLat / 2) ** 2
    + Math.cos(radians(a[0])) * Math.cos(radians(b[0])) * Math.sin(deltaLon / 2) ** 2;
  return Math.max(.8, Math.round(6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)) * 1.3 * 10) / 10);
}

function nearestArea(latitude, longitude) {
  return Object.entries(AREAS).reduce((nearest, [area, coordinates]) => {
    const distance = Math.hypot(
      (coordinates[0] - latitude) * 111,
      (coordinates[1] - longitude) * 111 * Math.cos(latitude * Math.PI / 180)
    );
    return distance < nearest.distance ? { area, distance } : nearest;
  }, { area: "Westlands", distance: Infinity }).area;
}

function deliveryFee(distance) {
  return Math.round(BASE_FEE + distance * RATE_PER_KM);
}

function statusLabel(status) {
  return t(({
    searching: "Finding a courier",
    accepted: "Courier accepted",
    picked_up: "On the way",
    delivered: "Delivered",
    disputed: "Under review"
  })[status] || "In progress");
}

function render() {
  settleEligiblePayouts();
  applyTheme();
  if (!state.user) {
    app.innerHTML = translateMarkup(`<main class="auth-landing">
      <a class="brand" href="#" aria-label="Nairobi Go home">${logo()}<span class="brand-name">nairobi<span>go</span></span></a>
      ${preferencesBar()}
      <section class="auth-welcome"><p class="eyebrow">YOUR CITY, CONNECTED</p><h1>Anything, anywhere<br>in Nairobi.</h1><p>Send what matters with a neighbour you can trust. A local delivery marketplace, made for the way Nairobi moves.</p><button class="primary-button" data-action="auth">Get started <span class="button-icon">→</span></button></section>
      ${mapIllustration()}<p class="auth-note">A marketplace for independent couriers. Nairobi, Kenya.</p></main>`);
    return;
  }
  app.innerHTML = translateMarkup(`<div class="app-shell">${header()}<main class="main">${state.user.role === "sender" ? senderDashboard() : courierDashboard()}</main>${footer()}</div>`);
}

function logo() {
  return `<span class="brand-mark city-pin-mark"><img src="nairobi-go-logo.png" alt="" aria-hidden="true"></span>`;
}

function header() {
  return `<header class="topbar"><a class="brand" href="#" data-action="home">${logo()}<span class="brand-name">nairobi<span>go</span></span></a>
    <div class="top-links">${preferencesBar()}
    <button class="profile-button" data-action="profile"><span class="avatar">${profilePhotoPreview ? `<img src="${profilePhotoPreview}" alt="">` : escapeHtml((state.user.name || "A")[0])}</span><span class="profile-name">${escapeHtml((state.user.name || "Profile").split(" ")[0])}</span><span aria-hidden="true">⌄</span></button></div>
  </header>`;
}

function preferencesBar() {
  return `<details class="settings-menu"><summary class="settings-trigger"><span class="settings-gear" aria-hidden="true">⚙</span>${t("Settings")}<span class="settings-chevron" aria-hidden="true">⌄</span></summary><div class="settings-panel"><div class="settings-links"><button class="settings-link" data-action="how">How it works</button><button class="settings-link" data-action="contact">Contact us</button></div><div class="settings-option"><label for="language-select">Language</label><select class="language-select" id="language-select" aria-label="Language"><option value="en" ${language === "en" ? "selected" : ""}>English</option><option value="so" ${language === "so" ? "selected" : ""}>Soomaali</option><option value="sw" ${language === "sw" ? "selected" : ""}>Kiswahili</option></select></div><div class="settings-option"><span>Dark mode</span><button class="theme-toggle" data-action="theme" aria-label="${darkMode ? "Switch to light mode" : "Switch to dark mode"}" aria-pressed="${darkMode}" title="${darkMode ? "Switch to light mode" : "Switch to dark mode"}">${darkMode ? "☀" : "☾"}</button></div></div></details>`;
}

function senderDashboard() {
  const active = state.deliveries.filter(delivery => !["delivered", "disputed"].includes(delivery.status));
  const completed = state.deliveries.filter(delivery => delivery.status === "delivered");
  const locale = { en: "en-KE", so: "so-KE", sw: "sw-KE" }[language] || "en-KE";
  const day = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "Africa/Nairobi" }).format(new Date()).toUpperCase();
  return `<div class="welcome-row"><div><p class="eyebrow">${t(day)}, NAIROBI</p><h1>${t("Good afternoon")}, ${escapeHtml((state.user.name || "there").split(" ")[0])}.</h1><p class="subtitle">What can we help you get moving today?</p></div><button class="location-pill" type="button" data-action="location" aria-label="Change location"><span>●</span> ${escapeHtml(currentArea)}, Nairobi　⌄</button></div>
  <div class="dashboard-grid"><div class="column">
    <section class="hero-card"><div class="hero-content"><p class="eyebrow">YOUR CITY, AT YOUR SERVICE</p><h2>Send anything.<br>Get it there.</h2><p>From keys you left behind to your weekend shopping. A trusted local courier is just around the corner.</p><button class="primary-button" data-action="new-delivery">Book a delivery <span class="button-icon">→</span></button></div></section>
    <div class="stats-row"><article class="card stat-card"><div class="stat-label">Deliveries</div><div class="stat-value">${completed.length}</div><div class="stat-note">${completed.length ? "Completed so far" : "Your first is waiting"}</div></article><article class="card stat-card"><div class="stat-label">Go points</div><div class="stat-value green">${state.points.toLocaleString()}</div><div class="stat-note">Redeem on your next trip</div></article><article class="card stat-card"><div class="stat-label">Your rating</div><div class="stat-value">${completed.length ? "5.0 ★" : "—"}</div><div class="stat-note">${completed.length ? "As a sender" : "After your first delivery"}</div></article></div>
    <section class="card section-card"><div class="section-heading"><h3>Your deliveries</h3><span class="subtle-label">${active.length ? `${active.length} in progress` : "Your activity"}</span></div>
      <div class="delivery-list">${active.length || completed.length ? [...active, ...completed].slice(0, 4).map(deliveryItem).join("") : `<div class="empty-state"><span>📦</span>No deliveries yet. Your first request is just a few taps away.</div>`}</div>
    </section>
  </div><div class="column right-column">
    ${mapCard("Your city, in motion", "Illustrated city preview · live tracking needs map services.")}
    <section class="card steps-card"><div class="section-heading"><h3>Simple as 1, 2, go</h3></div><div class="steps-list"><div class="step"><div class="step-number">1</div><div><strong>Tell us where it’s going</strong><span>Add your pickup, drop-off and item details.</span></div></div><div class="step"><div class="step-number">2</div><div><strong>See your price upfront</strong><span>Pay securely with M-Pesa to get started.</span></div></div><div class="step"><div class="step-number">3</div><div><strong>Follow it all the way</strong><span>Track your courier until it arrives.</span></div></div></div></section>
    <section class="loyalty-card"><div><strong>Your points go places.</strong><span>${state.points} ${t("Go points · 100 points = KES 50 off a delivery")}</span></div><span class="loyalty-star">✳</span></section>
  </div></div>`;
}

function deliveryItem(delivery) {
  const isDone = delivery.status === "delivered";
  return `<article class="delivery-card"><div class="delivery-icon">${isDone ? "✓" : "📦"}</div><div><div class="delivery-title">${escapeHtml(delivery.item)}</div><div class="delivery-route">${escapeHtml(delivery.pickup)} <span aria-hidden="true">→</span> ${escapeHtml(delivery.dropoff)}</div>${delivery.weightKg ? `<div class="delivery-route">${delivery.weightKg.toLocaleString("en-KE")} kg</div>` : ""}${delivery.status === "accepted" || delivery.status === "picked_up" ? `<button class="proof-button" data-action="track" data-id="${escapeHtml(delivery.id)}">Track courier · ${escapeHtml(delivery.courier || "Nearby")}</button>` : ""}${delivery.status === "delivered" && !delivery.rated ? `<button class="proof-button" data-action="rate" data-id="${escapeHtml(delivery.id)}">Rate courier · ${Date.now() < delivery.payoutAvailableAt ? "Report issue within 48h" : "Delivery complete"}</button>` : ""}</div><div class="delivery-meta"><span class="status ${delivery.status === "delivered" ? "done" : "active"}">${statusLabel(delivery.status)}</span><div class="price">${money(delivery.fee)}</div></div></article>`;
}

function courierDashboard() {
  const accepted = state.deliveries.filter(delivery => delivery.courierId === state.user.phone && !["delivered", "disputed"].includes(delivery.status));
  const available = state.offers.filter(offer => !offer.acceptedBy).filter(offer => currentTab === "available" || offer.pickup === currentArea);
  const pendingPayout = state.deliveries
    .filter(delivery => delivery.courierId === state.user.phone && delivery.status === "delivered" && !delivery.payoutReleased)
    .reduce((sum, delivery) => sum + (delivery.payout || 0), 0);
  return `<div class="welcome-row"><div><p class="eyebrow">${t("YOUR CITY, YOUR ROUTE")}</p><h1>${t("Good afternoon")}, ${escapeHtml((state.user.name || "there").split(" ")[0])}.</h1><p class="subtitle">Find a delivery that fits your route.</p></div><button class="location-pill" type="button" data-action="location" aria-label="Change location"><span>●</span> Near ${escapeHtml(currentArea)}, Nairobi　⌄</button></div>
  <div class="dashboard-grid"><div class="column">
    <section class="card courier-earnings"><div><div class="earnings-caption">Your earnings · this week</div><div class="earnings-total">${money(state.earnings)}</div><div class="earnings-caption">12% platform commission · paid to M-Pesa</div>${pendingPayout ? `<div class="earnings-caption pending-caption">${money(pendingPayout)} pending · 48-hour safety window</div>` : ""}</div><div class="earnings-icon">↗</div></section>
    <section class="card section-card"><div class="section-heading"><h3>Delivery requests near you</h3><span class="subtle-label">${state.offers.filter(offer => !offer.acceptedBy).length} nearby</span></div>
      <div class="section-nav"><button class="nav-pill ${currentTab === "available" ? "active" : ""}" data-action="courier-tab" data-tab="available">All nearby</button><button class="nav-pill ${currentTab === "westlands" ? "active" : ""}" data-action="courier-tab" data-tab="westlands">Near ${escapeHtml(currentArea)}</button></div>
      <div class="delivery-list">${available.length ? available.map(offerCard).join("") : `<div class="empty-state"><span>🛣️</span>No requests in this area right now. Check back in a bit.</div>`}</div></section>
    <section class="card section-card"><div class="section-heading"><h3>Your active deliveries</h3><span class="subtle-label">${accepted.length} on your route</span></div><div class="delivery-list">${accepted.length ? accepted.map(courierActiveCard).join("") : `<div class="empty-state">Accept a request and it’ll show up here.</div>`}</div></section>
  </div><div class="column right-column">
    ${mapCard("Requests around you", "Demo requests · live availability needs a connected backend.")}
    <section class="card steps-card"><div class="section-heading"><h3>Deliver on your terms</h3></div><div class="steps-list"><div class="step"><div class="step-number">1</div><div><strong>Choose a request nearby</strong><span>See the item, route and fee before accepting.</span></div></div><div class="step"><div class="step-number">2</div><div><strong>Pick up and snap a photo</strong><span>Keep the sender in the loop at every step.</span></div></div><div class="step"><div class="step-number">3</div><div><strong>Deliver. Get paid.</strong><span>Payout to M-Pesa after the 48-hour safety window.</span></div></div></div></section>
    <section class="loyalty-card"><div><strong>Trusted couriers go further.</strong><span>${state.deliveries.filter(delivery => delivery.courierId === state.user.phone && delivery.status === "delivered").length} completed · ${state.earnings ? "5.0 ★" : "New courier"}</span></div><span class="loyalty-star">✳</span></section>
  </div></div>`;
}

function offerCard(offer) {
  return `<article class="request-card"><div class="request-head"><div><h3>${escapeHtml(offer.item)}</h3><p>Request from ${escapeHtml(offer.sender)}</p></div><div class="request-offer">${money(Math.round(offer.fee * (1 - COMMISSION_RATE)))}</div></div><div class="request-route"><div class="route-markers"><span class="marker"></span><span class="route-line"></span><span class="marker drop"></span></div><div class="route-text"><span>${escapeHtml(offer.pickup)}</span><span>${escapeHtml(offer.dropoff)}</span></div></div><div class="request-footer"><span class="request-distance">${offer.distance} km · ${offer.weightKg} kg</span><button class="primary-button" data-action="accept" data-id="${escapeHtml(offer.id)}">Accept request</button></div></article>`;
}

function courierActiveCard(delivery) {
  const actionName = delivery.status === "accepted" ? "pickup" : "dropoff";
  const proofName = delivery.status === "accepted" ? "pickupProof" : "dropoffProof";
  return `<article class="delivery-card"><div class="delivery-icon">📦</div><div><div class="delivery-title">${escapeHtml(delivery.item)}</div><div class="delivery-route">${escapeHtml(delivery.pickup)} → ${escapeHtml(delivery.dropoff)}</div>${delivery[proofName] ? `<span class="proof-ready">✓ Photo added</span>` : ""}<button class="proof-button" data-action="proof" data-id="${escapeHtml(delivery.id)}" data-proof="${actionName}">${delivery.status === "accepted" ? "📷 Confirm pickup" : "📷 Confirm drop-off"}</button></div><div class="delivery-meta"><span class="status active">${statusLabel(delivery.status)}</span><div class="price">${money(Math.round(delivery.fee * (1 - COMMISSION_RATE)))}</div></div></article>`;
}

function mapCard(title, subtitle) {
  return `<section class="card map-card"><div class="map-head"><h3>${title}</h3><p>${subtitle}</p></div>${mapIllustration()}<div class="map-legend"><span><i class="legend-dot"></i>Couriers</span><span><i class="legend-dot orange"></i>Requests</span><span><i class="legend-dot blue"></i>You</span></div></section>`;
}

function mapIllustration() {
  return `<div class="map-illustration" role="img" aria-label="Illustrated map of Nairobi with delivery locations"><span class="park"></span><span class="map-label one">WESTLANDS</span><span class="map-label two">PARKLANDS</span><span class="map-label three">KILIMANI</span><span class="map-label four">CBD</span><span class="map-pin p1"><span>⌂</span></span><span class="map-pin p2"><span>⌂</span></span><span class="map-pin p3"><span>⌂</span></span></div>`;
}

function footer() {
  return `<footer class="footer"><span>© ${new Date().getFullYear()} Nairobi Go · ${t("Made for Nairobi, by Nairobi.")}</span><div class="footer-links"><a href="#" data-action="how">How it works</a><a href="#" data-action="contact">Contact us</a><a href="#" data-action="community">Community</a></div></footer>`;
}

function openLocationPicker() {
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.innerHTML = `<section class="modal" role="dialog" aria-modal="true" aria-labelledby="location-title">
    <div class="modal-header"><div><h2 id="location-title">Your location</h2><p>Choose your Nairobi area or use your device location.</p></div><button class="close-button" data-action="close" aria-label="Close">×</button></div>
    <form id="location-form"><div class="field"><label for="location-area">Nairobi area</label><select id="location-area" name="area">${areaOptions(currentArea)}</select></div>
      <div class="modal-actions"><button type="button" class="outline-button" data-action="use-location">Use my current location</button><button type="submit" class="primary-button">Save location</button></div>
      <p class="disclaimer">Device location needs browser permission. You can also choose an area manually.</p>
    </form></section>`;
  modal.innerHTML = translateMarkup(modal.innerHTML);
  document.body.append(modal);
  modal.querySelector("#location-form").addEventListener("submit", event => {
    event.preventDefault();
    currentArea = modal.querySelector("#location-area").value;
    currentTab = "available";
    setPreference("location", currentArea);
    closeModal();
    render();
    notify(`Location updated to ${currentArea}.`);
  });
}

function useDeviceLocation() {
  if (!navigator.geolocation) {
    notify("Device location is not available in this browser. Choose an area manually.");
    return;
  }
  navigator.geolocation.getCurrentPosition(position => {
    currentArea = nearestArea(position.coords.latitude, position.coords.longitude);
    currentTab = "available";
    setPreference("location", currentArea);
    closeModal();
    render();
    notify(`Location updated to ${currentArea}.`);
  }, error => {
    if (error.code === error.PERMISSION_DENIED) {
      notify("Location permission was denied. Allow it in your browser settings or choose an area manually.");
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      notify("Your device location is unavailable right now. Choose an area manually.");
    } else if (error.code === error.TIMEOUT) {
      notify("Getting your location timed out. Try again or choose an area manually.");
    } else {
      notify("Could not get your location. Choose an area manually.");
    }
  }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
}

function openInfoModal(section = "contact") {
  const contact = section === "contact";
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.innerHTML = contact
    ? `<section class="modal" role="dialog" aria-modal="true" aria-labelledby="info-title"><div class="modal-header"><div><h2 id="info-title">Contact Nairobi Go</h2><p>Get help with a delivery or talk to our community team.</p></div><button class="close-button" data-action="close" aria-label="Close">×</button></div>
      <form id="contact-form" class="auth-step"><div class="field"><label for="contact-topic">How can we help?</label><select id="contact-topic"><option>Delivery support</option><option>Courier onboarding</option><option>Payments</option><option>Community feedback</option></select></div><div class="field"><label for="contact-message">Your message</label><textarea id="contact-message" maxlength="1000" required placeholder="Tell us what you need help with…"></textarea></div><button class="primary-button" type="submit">Send message</button><p class="disclaimer">Submitting opens your email app with the message ready to send.</p></form>
      <p class="contact-email">Email support: <a href="mailto:mohanmoha708@gmail.com">mohanmoha708@gmail.com</a></p></section>`
    : `<section class="modal" role="dialog" aria-modal="true" aria-labelledby="info-title"><div class="modal-header"><div><h2 id="info-title">Nairobi Go community</h2><p>Help make local deliveries safe and respectful for everyone.</p></div><button class="close-button" data-action="close" aria-label="Close">×</button></div><div class="community-guidelines"><h3>Community guidelines</h3><ul><li>Be respectful to senders, couriers, and neighbours.</li><li>Only accept deliveries you can safely carry.</li><li>Keep communication clear and report problems promptly.</li><li>Protect personal information and meet in safe, agreed locations.</li></ul><button class="secondary-button" data-action="contact">Contact us</button></div></section>`;
  modal.innerHTML = translateMarkup(modal.innerHTML);
  if (contact) {
    modal.querySelector("#contact-form").addEventListener("submit", event => {
      event.preventDefault();
      if (!event.currentTarget.reportValidity()) return;
      const topic = modal.querySelector("#contact-topic").value;
      const message = modal.querySelector("#contact-message").value.trim();
      const subject = `Nairobi Go support: ${topic}`;
      const body = `Topic: ${topic}\n\n${message}`;
      window.location.href = `mailto:mohanmoha708@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      notify("Your email app is opening with your message.");
    });
  }
  document.body.append(modal);
}

function areaOptions(selected) {
  return Object.keys(AREAS).map(area => `<option value="${area}" ${area === selected ? "selected" : ""}>${area}</option>`).join("");
}

function openDeliveryModal() {
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.dataset.modal = "true";
  modal.innerHTML = `<section class="modal" role="dialog" aria-modal="true" aria-labelledby="delivery-title">
    <div class="modal-header"><div><h2 id="delivery-title">Book a delivery</h2><p>Anything you need, anywhere in Nairobi.</p></div><button class="close-button" data-action="close" aria-label="Close">×</button></div>
    <form id="delivery-form"><div class="form-grid">
      <div class="field"><label for="pickup">Pickup area</label><select id="pickup" name="pickup">${areaOptions(currentArea)}</select></div>
      <div class="field"><label for="dropoff">Drop-off area</label><select id="dropoff" name="dropoff">${areaOptions("CBD")}</select></div>
      <div class="field full"><label for="item">What are we delivering?</label><input id="item" name="item" required maxlength="80" placeholder="e.g. House keys, a care package"></div>
      <div class="field"><label for="weight">Item weight</label><input id="weight" name="weight" type="number" min="5" max="50" step="0.1" value="5" required></div>
      <div class="field"><label for="weightUnit">Weight unit</label><select id="weightUnit" name="weightUnit"><option value="kg">Kilograms (kg)</option><option value="g">Grams (g)</option></select></div>
      <p class="weight-hint field full">Deliveries must weigh between 5 kg and 50 kg (5,000–50,000 g).</p>
      <div class="field full"><label for="notes">Notes for your courier (optional)</label><textarea id="notes" name="notes" maxlength="240" placeholder="Pickup details, gate code, handling instructions…"></textarea></div>
    </div>
    <div class="estimate" id="estimate"></div>
    <div class="modal-actions"><button type="button" class="outline-button" data-action="close">Not now</button><button type="submit" class="primary-button">Continue to M-Pesa <span class="button-icon">→</span></button></div>
    <p class="disclaimer">Your payment is held securely until delivery is confirmed. Couriers are independent members of the community.</p></form></section>`;
  modal.innerHTML = translateMarkup(modal.innerHTML);
  document.body.append(modal);
  const form = modal.querySelector("form");
  ["pickup", "dropoff"].forEach(id => modal.querySelector(`#${id}`).addEventListener("input", () => updateEstimate(form)));
  form.querySelector("#weightUnit").addEventListener("change", () => updateWeightConstraints(form, true));
  form.addEventListener("submit", submitDelivery);
  updateEstimate(form);
}

function updateEstimate(form) {
  const data = new FormData(form);
  const distance = routeDistance(data.get("pickup"), data.get("dropoff"));
  const fee = deliveryFee(distance);
  const pointsDiscount = Math.min(Math.floor(state.points / 100) * 50, fee);
  form.querySelector("#estimate").innerHTML = translateMarkup(`<div class="estimate-line"><span>Estimated distance</span><strong>${distance} km</strong></div><div class="estimate-line"><span>Delivery fee · KES ${RATE_PER_KM}/km</span><strong>${money(fee)}</strong></div>${pointsDiscount ? `<div class="estimate-line"><span>Go points discount</span><strong>−${money(pointsDiscount)}</strong></div>` : ""}<div class="estimate-line total"><span>Total to pay</span><strong>${money(fee - pointsDiscount)}</strong></div><div class="estimate-note">Distance and delivery fee are estimates based on area. Final fare may vary slightly with the route. ${pointsDiscount ? `Your ${state.points} points save ${money(pointsDiscount)}.` : ""}</div>`);
}

function submitDelivery(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const item = String(data.get("item") || "").trim();
  if (!item) {
    form.querySelector("#item").focus();
    return;
  }
  const weightValue = Number(data.get("weight"));
  const weightUnit = String(data.get("weightUnit"));
  const weightKg = weightUnit === "g" ? weightValue / 1000 : weightValue;
  if (!Number.isFinite(weightKg) || weightKg < 5 || weightKg > 50) {
    form.querySelector("#weight").setCustomValidity("Delivery weight must be between 5 kg and 50 kg.");
    form.querySelector("#weight").reportValidity();
    form.querySelector("#weight").addEventListener("input", event => event.currentTarget.setCustomValidity(""), { once: true });
    return;
  }
  const pickup = String(data.get("pickup"));
  const dropoff = String(data.get("dropoff"));
  const distance = routeDistance(pickup, dropoff);
  const fee = deliveryFee(distance);
  const discount = Math.min(Math.floor(state.points / 100) * 50, fee);
  const delivery = {
    id: `delivery-${Date.now()}`,
    pickup, dropoff, item, weightKg, fee: fee - discount, distance,
    notes: String(data.get("notes") || ""),
    status: "searching",
    createdAt: Date.now(),
    courier: ""
  };
  if (discount) state.points = Math.max(0, state.points - Math.ceil(discount / 50) * 100);
  state.deliveries.unshift(delivery);
  saveState();
  closeModal();
  render();
  notify("M-Pesa STK push simulated. Your request is live!");
}

function updateWeightConstraints(form, convertValue) {
  const input = form.querySelector("#weight");
  const unit = form.querySelector("#weightUnit").value;
  const previousValue = Number(input.value);
  const previousUnit = input.dataset.unit || "kg";
  input.min = unit === "g" ? "5000" : "5";
  input.max = unit === "g" ? "50000" : "50";
  input.step = unit === "g" ? "100" : "0.1";
  input.dataset.unit = unit;
  if (convertValue && Number.isFinite(previousValue)) {
    input.value = String(previousUnit === unit ? previousValue : unit === "g" ? previousValue * 1000 : previousValue / 1000);
  }
}

function closeModal() {
  document.querySelector(".modal-backdrop")?.remove();
}

function openAuth(initialRole = "sender") {
  authRole = initialRole;
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.dataset.modal = "true";
  modal.innerHTML = `<section class="modal" role="dialog" aria-modal="true" aria-labelledby="auth-title"><div class="modal-header"><div><h2 id="auth-title">Join Nairobi Go</h2><p>One number. Your whole city.</p></div><button class="close-button" data-action="close" aria-label="Close">×</button></div>
    <form id="auth-form" class="auth-step"><div class="field"><label>How will you use Nairobi Go?</label><div class="auth-role-row"><button type="button" class="role-choice selected" data-auth-role="sender"><strong>📦 Send something</strong><span>I need to get an item delivered.</span></button><button type="button" class="role-choice" data-auth-role="courier"><strong>🚲 Make deliveries</strong><span>I want to deliver in my community.</span></button></div></div>
    <div class="field"><label for="authName">Your name</label><input id="authName" name="name" required autocomplete="name" placeholder="e.g. Alex Mwangi"></div>
    <div class="field"><label for="authPhone">Kenyan phone number</label><input id="authPhone" name="phone" required type="tel" autocomplete="tel" placeholder="+254 7XX XXX XXX"></div>
    <div class="field"><label for="profilePhoto">Profile photo</label><input id="profilePhoto" name="profilePhoto" type="file" accept="image/*" capture="user" required><span class="upload-hint">Choose a clear photo of yourself (max 10 MB).</span></div>
    <div id="courier-fields" class="auth-step courier-fields" hidden>
      <div class="vehicle-only"><span class="vehicle-icon">🏍️</span><span><strong>Motorcycle couriers only</strong><small>Only motorcycles are supported on Nairobi Go.</small></span></div>
      <div class="field"><label for="vehiclePlate">Motorcycle number plate</label><input id="vehiclePlate" name="vehiclePlate" maxlength="12" pattern="[A-Za-z0-9 -]{5,12}" placeholder="e.g. KDA 123A" autocomplete="off"><span class="upload-hint">Enter the registration shown on your motorcycle.</span></div>
      <div class="field"><label for="idFront">National ID · front</label><input id="idFront" name="idFront" type="file" accept="image/*" capture="environment"><span class="upload-hint">Upload a clear photo of the front of your ID (max 10 MB).</span></div>
      <div class="field"><label for="idBack">National ID · back</label><input id="idBack" name="idBack" type="file" accept="image/*" capture="environment"><span class="upload-hint">Upload a clear photo of the back of your ID (max 10 MB).</span></div>
    </div>
    <button class="primary-button" type="submit">Send me a code <span class="button-icon">→</span></button></form>
    <p class="disclaimer">Demo only: identity photos are selected on this device and are not uploaded, verified, or saved. SMS verification requires an authentication provider.</p></section>`;
  modal.innerHTML = translateMarkup(modal.innerHTML);
  document.body.append(modal);
  modal.querySelector("#auth-form").addEventListener("submit", requestOtp);
  modal.querySelectorAll("[data-auth-role]").forEach(button => button.addEventListener("click", () => {
    authRole = button.dataset.authRole;
    modal.querySelectorAll("[data-auth-role]").forEach(choice => choice.classList.toggle("selected", choice === button));
    const courierFields = modal.querySelector("#courier-fields");
    courierFields.hidden = authRole !== "courier";
    ["vehiclePlate", "idFront", "idBack"].forEach(id => {
      modal.querySelector(`#${id}`).required = authRole === "courier";
    });
  }));
  if (initialRole === "courier") modal.querySelector('[data-auth-role="courier"]').click();
}

function requestOtp(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const name = String(new FormData(form).get("name") || "").trim();
  const profilePhoto = form.querySelector("#profilePhoto").files[0];
  const vehiclePlate = String(new FormData(form).get("vehiclePlate") || "").trim().toUpperCase();
  const idFront = form.querySelector("#idFront").files[0];
  const idBack = form.querySelector("#idBack").files[0];
  const uploads = [profilePhoto, ...(authRole === "courier" ? [idFront, idBack] : [])];
  for (const file of uploads) {
    if (!file || !file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
      notify("Choose a valid image file no larger than 10 MB for each required photo.");
      return;
    }
  }
  if (authRole === "courier" && !/^[A-Z0-9 -]{5,12}$/.test(vehiclePlate)) {
    form.querySelector("#vehiclePlate").setCustomValidity("Enter a valid motorcycle registration plate.");
    form.querySelector("#vehiclePlate").reportValidity();
    form.querySelector("#vehiclePlate").addEventListener("input", event => event.currentTarget.setCustomValidity(""), { once: true });
    return;
  }
  const phoneInput = String(new FormData(form).get("phone") || "").trim();
  const digits = phoneInput.replace(/[\s()-]/g, "");
  const isKenyanNumber = /^(?:\+254|254|0)?(?:7|1)\d{8}$/.test(digits);
  if (!isKenyanNumber) {
    form.querySelector("#authPhone").setCustomValidity("Enter a valid phone number.");
    form.querySelector("#authPhone").reportValidity();
    form.querySelector("#authPhone").addEventListener("input", event => event.currentTarget.setCustomValidity(""), { once: true });
    return;
  }
  const phone = digits.startsWith("+254") ? digits : digits.startsWith("254") ? `+${digits}` : digits.startsWith("0") ? `+254${digits.slice(1)}` : `+254${digits}`;
  form.removeEventListener("submit", requestOtp);
  form.innerHTML = translateMarkup(`<div class="field"><label for="otp">Enter your 6-digit code</label><input id="otp" class="otp-digits" name="otp" required inputmode="numeric" maxlength="6" pattern="[0-9]{6}" placeholder="••••••"></div><p class="disclaimer">Demo mode: enter any 6 digits. SMS delivery requires a configured authentication provider.</p><button class="primary-button" type="submit">Verify and continue</button>`);
  form.addEventListener("submit", event => {
    event.preventDefault();
    const otp = form.querySelector("#otp").value;
    if (!/^\d{6}$/.test(otp)) {
      form.querySelector("#otp").reportValidity();
      return;
    }
    profilePhotoPreview = URL.createObjectURL(profilePhoto);
    state.user = { name, phone, role: authRole, ...(authRole === "courier" ? { vehicle: "Motorcycle", vehiclePlate } : {}) };
    saveState();
    closeModal();
    render();
    notify("You’re in! Phone verification is simulated for this demo.");
  });
  form.querySelector("#otp").focus();
}

function openProfile() {
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.dataset.modal = "true";
  modal.innerHTML = `<section class="modal" role="dialog" aria-modal="true" aria-labelledby="profile-title"><div class="modal-header"><div><h2 id="profile-title">Your profile</h2><p>Account and app preferences.</p></div><button class="close-button" data-action="close" aria-label="Close">×</button></div>
  <div class="profile-panel"><div class="profile-photo-row">${profilePhotoPreview ? `<img class="profile-photo-large" src="${profilePhotoPreview}" alt="Your profile photo">` : `<span class="avatar">${escapeHtml((state.user.name || "A")[0])}</span>`}<span>Profile photo</span></div><div class="profile-row"><span>Name</span><strong>${escapeHtml(state.user.name)}</strong></div><div class="profile-row"><span>Phone</span><strong>${escapeHtml(state.user.phone)}</strong></div><div class="profile-row"><span>Role</span><strong>${state.user.role === "sender" ? "Sender" : "Courier"}</strong></div>${state.user.role === "courier" ? `<div class="profile-row"><span>Vehicle</span><strong>Motorcycle · ${escapeHtml(state.user.vehiclePlate || "")}</strong></div><div class="profile-row"><span>ID verification</span><strong>Photos selected · demo only</strong></div>` : ""}<div class="profile-row"><span>Go points</span><strong>${state.points.toLocaleString()}</strong></div><div class="profile-row"><span>Marketplace</span><strong>Independent couriers</strong></div><button class="outline-button logout-button" data-action="logout">Log out</button><p class="disclaimer">Your session is saved on this device until you log out. Identity images are not saved or uploaded in this demo.</p></div></section>`;
  modal.innerHTML = translateMarkup(modal.innerHTML);
  document.body.append(modal);
}

function acceptOffer(id) {
  const offer = state.offers.find(item => item.id === id);
  if (!offer || offer.acceptedBy) return notify("This request is no longer available.");
  offer.acceptedBy = state.user.phone;
  const delivery = {
    ...offer,
    id: offer.id,
    status: "accepted",
    courier: state.user.name,
    courierId: state.user.phone,
    createdAt: Date.now(),
    sender: offer.sender
  };
  state.deliveries.unshift(delivery);
  saveState();
  render();
  notify("Request accepted. It’s now assigned to you.");
}

function updateDeliveryStatus(id, status) {
  const delivery = state.deliveries.find(item => item.id === id);
  if (!delivery) return;
  delivery.status = status;
  if (status === "delivered") {
    delivery.deliveredAt = Date.now();
    delivery.payoutAvailableAt = Date.now() + 48 * 60 * 60 * 1000;
    delivery.payout = Math.round(delivery.fee * (1 - COMMISSION_RATE));
    delivery.pointsEarned = Math.max(1, Math.floor(delivery.fee / 100));
    state.points += delivery.pointsEarned;
  }
  saveState();
  render();
}

function settleEligiblePayouts() {
  if (!state.user) return;
  let released = false;
  for (const delivery of state.deliveries) {
    if (delivery.courierId === state.user.phone
      && delivery.status === "delivered"
      && !delivery.payoutReleased
      && delivery.payoutAvailableAt <= Date.now()) {
      delivery.payoutReleased = true;
      state.earnings += delivery.payout || Math.round(delivery.fee * (1 - COMMISSION_RATE));
      released = true;
    }
  }
  if (released) saveState();
}

function openRating(id) {
  const delivery = state.deliveries.find(item => item.id === id);
  if (!delivery) return;
  const issueWindowOpen = Date.now() < delivery.payoutAvailableAt && !delivery.payoutReleased;
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.innerHTML = `<section class="modal" role="dialog" aria-modal="true" aria-labelledby="rating-title"><div class="modal-header"><div><h2 id="rating-title">How did it go?</h2><p>Share a rating for ${escapeHtml(delivery.courier || "your courier")}.</p></div><button class="close-button" data-action="close" aria-label="Close">×</button></div><div class="field"><label for="rating">Your rating</label><select id="rating"><option value="5">★★★★★ — Great</option><option value="4">★★★★☆ — Good</option><option value="3">★★★☆☆ — Okay</option><option value="2">★★☆☆☆ — Not great</option><option value="1">★☆☆☆☆ — Poor</option></select></div><div class="field" style="margin-top:14px"><label for="issue">Report a problem ${issueWindowOpen ? "(optional · within 48 hours)" : "(48-hour report window closed)"}</label><textarea id="issue" ${issueWindowOpen ? "" : "disabled"} placeholder="${issueWindowOpen ? "Lost or damaged item? Tell us what happened." : "The report window has closed."}"></textarea></div><div class="modal-actions"><button class="outline-button" data-action="close">Cancel</button><button class="primary-button" data-action="submit-rating" data-id="${escapeHtml(id)}">Submit feedback</button></div><p class="disclaimer">Courier payout is held for 48 hours after delivery. A reported issue keeps the payout on hold for review.</p></section>`;
  modal.innerHTML = translateMarkup(modal.innerHTML);
  document.body.append(modal);
}

function handleAction(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "new-delivery") openDeliveryModal();
  if (action === "location") openLocationPicker();
  if (action === "use-location") useDeviceLocation();
  if (action === "auth") openAuth();
  if (action === "close") closeModal();
  if (action === "profile") openProfile();
  if (action === "logout") {
    closeModal();
    if (profilePhotoPreview) URL.revokeObjectURL(profilePhotoPreview);
    profilePhotoPreview = "";
    state.user = null;
    saveState();
    render();
    notify("You’ve been logged out.");
  }
  if (action === "home") {
    event.preventDefault();
    render();
  }
  if (action === "courier-tab") {
    currentTab = button.dataset.tab;
    render();
  }
  if (action === "accept") acceptOffer(button.dataset.id);
  if (action === "proof") {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.hidden = true;
    input.addEventListener("change", () => {
      const photo = input.files?.[0];
      const delivery = state.deliveries.find(item => item.id === button.dataset.id);
      if (!photo || !delivery) return;
      if (!photo.type.startsWith("image/")) {
        notify("Please choose an image for proof of delivery.");
        input.remove();
        return;
      }
      const proof = button.dataset.proof;
      delivery[proof === "pickup" ? "pickupProof" : "dropoffProof"] = photo.name;
      updateDeliveryStatus(delivery.id, proof === "pickup" ? "picked_up" : "delivered");
      if (proof === "dropoff") notify("Drop-off photo saved. Payout is held for 48 hours.");
      input.remove();
    });
    document.body.append(input);
    input.click();
  }
  if (action === "rate") openRating(button.dataset.id);
  if (action === "track") notify("Live courier tracking requires a connected maps and location service.");
  if (action === "submit-rating") {
    const delivery = state.deliveries.find(item => item.id === button.dataset.id);
    const issue = document.querySelector("#issue").value.trim();
    if (delivery) {
      if (issue && (delivery.payoutReleased || Date.now() >= delivery.payoutAvailableAt)) {
        notify("The 48-hour issue reporting window has closed.");
        document.querySelector("#issue").value = "";
        return;
      }
      delivery.rated = true;
      delivery.rating = Number(document.querySelector("#rating").value);
      if (issue) delivery.status = "disputed";
      saveState();
      closeModal();
      render();
      notify(issue ? "Issue reported. Your courier payout is on hold." : "Thanks for rating your courier!");
    }
  }
  if (action === "how") {
    button.closest(".settings-menu")?.removeAttribute("open");
    notify("Request a delivery, pay by M-Pesa, and track your independent courier.");
  }
  if (action === "contact") {
    event.preventDefault();
    button.closest(".settings-menu")?.removeAttribute("open");
    closeModal();
    openInfoModal("contact");
  }
  if (action === "community") {
    event.preventDefault();
    openInfoModal("community");
  }
  if (action === "support") openInfoModal("contact");
  if (action === "terms") openInfoModal("community");
  if (action === "theme") {
    darkMode = !darkMode;
    setPreference("theme", darkMode ? "dark" : "light");
    applyTheme();
    const themeButton = app.querySelector('[data-action="theme"]');
    if (themeButton) {
      themeButton.textContent = darkMode ? "☀" : "☾";
      themeButton.setAttribute("aria-label", t(darkMode ? "Switch to light mode" : "Switch to dark mode"));
      themeButton.setAttribute("aria-pressed", String(darkMode));
      themeButton.title = t(darkMode ? "Switch to light mode" : "Switch to dark mode");
    }
  }
}

document.body.addEventListener("click", handleAction);
app.addEventListener("change", event => {
  if (event.target.matches("#language-select")) {
    language = event.target.value;
    setPreference("language", language);
    render();
  }
});
document.body.addEventListener("click", event => {
  if (event.target.classList.contains("modal-backdrop")) closeModal();
});

render();
