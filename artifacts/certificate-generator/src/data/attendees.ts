export interface AttendeeRecord {
  email: string;
  phone: string;
  isUnlimited?: boolean;
}

/**
 * Verified attendee list from "Usernames and pass.xlsx"
 * 226 unique registered attendees for Google Fresher's Fuse 2026 at BIHER
 */
export const REGISTERED_ATTENDEES: AttendeeRecord[] = [
  // Special Access Accounts
  { email: "Mad1", phone: "123", isUnlimited: false },
  { email: "MUnc", phone: "1234", isUnlimited: true }, // Unlimited generation account

  { email: "krrishraj143akkii@gmail.com", phone: "9905512795" },
  { email: "manin5081977@gmail.com", phone: "7092177345" },
  { email: "kotakushal03@gmail.com", phone: "7780520327" },
  { email: "balajibj2410@gmail.com", phone: "9025576628" },
  { email: "yashwanth.g1729@gmail.com", phone: "7013605410" },
  { email: "srishanthreddy69@gmail.com", phone: "6305938315" },
  { email: "sandhyakumari0524@gmail.com", phone: "8114517486" },
  { email: "gtejeesh@gmail.com", phone: "9933219075" },
  { email: "thannerinishanth63@gmail.com", phone: "9063863063" },
  { email: "ajayravikumar2008@gmail.com", phone: "8248150580" },
  { email: "tejakelem@gmail.com", phone: "9347383255" },
  { email: "sundaraneediveerendramani@gmail.com", phone: "9381242698" },
  { email: "syedbajivali786@gmail.com", phone: "7670895382" },
  { email: "syedbajivali786", phone: "7670895382" },
  { email: "yuvas2118@gmail.com", phone: "8350098938" },
  { email: "thanishraj28@gmail.com", phone: "9841741306" },
  { email: "hemanthvadlapatla@gmail.com", phone: "8688817473" },
  { email: "srihariprasathreddy@gmail.com", phone: "9080357122" },
  { email: "pragnya1722@gmail.com", phone: "7013450937" },
  { email: "nivashsj@gmail.com", phone: "9150592686" },
  { email: "dhanuriot@gmail.com", phone: "7569319088" },
  { email: "palanibharathi2004@gmail.com", phone: "9787796387" },
  { email: "thumalaharsha@gmail.com", phone: "8801234439" },
  { email: "rudrashkapat88@gmail.com", phone: "6385554850" },
  { email: "nanmaran0407@gmail.com", phone: "9025513608" },
  { email: "nmunisaurrymukunddhan2008@gmail.com", phone: "9604381456" },
  { email: "syedibrzzz786@gmail.com", phone: "9789031802" },
  { email: "rashvinarl0209@gmail.com", phone: "8870600279" },
  { email: "avula9564@gmail.com", phone: "8629479814" },
  { email: "eniyasasi30@gmail.com", phone: "7695947334" },
  { email: "harshakavala12345@gmail.com", phone: "9704451769" },
  { email: "thameemansari300509@gmail.com", phone: "9791071761" },
  { email: "rishitarshrivastava12@gmail.com", phone: "9082458610" },
  { email: "callmearyaofficial0003@gmail.com", phone: "9080741269" },
  { email: "manesatyagiridhar@gmail.com", phone: "8555938583" },
  { email: "y57904131@gmail.com", phone: "9789631151" },
  { email: "kusumareddyt2009@gmail.com", phone: "9182878685" },
  { email: "karanbalaji683@gmail.com", phone: "9025272010" },
  { email: "priyadharsangm@gmail.com", phone: "9344051287" },
  { email: "harshithamaale27@gmail.com", phone: "7842048414" },
  { email: "poojaparimalamurugan@gmail.com", phone: "9342326303" },
  { email: "davinarizpah@gmail.com", phone: "9342311328" },
  { email: "ponnayishanmuk@gmail.com", phone: "8919005671" },
  { email: "mugilganapathy@gmail.com", phone: "9361283909" },
  { email: "ramasamy1672@gmail.com", phone: "9940499151" },
  { email: "anishchandra090@gmail.com", phone: "9347826664" },
  { email: "mukeshkuppan761@gmail.com", phone: "7550187688" },
  { email: "nendrambakamgiridhar@gmail.com", phone: "9110313840" },
  { email: "puriniharish21@gmail.com", phone: "9059051649" },
  { email: "guntanakkalahemasree@gmail.com", phone: "9100209221" },
  { email: "xsujit328@gmail.com", phone: "9342212334" },
  { email: "vkaaviya005@gmail.com", phone: "9239293443" },
  { email: "kismathmohammad014@gmail.com", phone: "6369923430" },
  { email: "samuganeethiprashath@gmail.com", phone: "7305808806" },
  { email: "paranjyothi280@gmail.com", phone: "8919186087" },
  { email: "rikshithaprasanna2709@gmail.com", phone: "9398030545" },
  { email: "antonyjohan190@gmail.com", phone: "8248392822" },
  { email: "nivethaambethkar8@gmail.com", phone: "7010767332" },
  { email: "azhagurani294@gmail.com", phone: "9500953391" },
  { email: "penikalapatimuktheshnaidu@gmail.com", phone: "6300399541" },
  { email: "kirubas359@gmail.com", phone: "6383781026" },
  { email: "reddyarunkumar845@gmail.com", phone: "9949245673" },
  { email: "dornalateju4@gmail.com", phone: "6305406617" },
  { email: "sonikarthika2009@gmail.com", phone: "8341400894" },
  { email: "avalapatineeraj@gmail.com", phone: "9492093926" },
  { email: "k.pradeep162009@gmail.com", phone: "9841950406" },
  { email: "dimpulchowdary7@gmail.com", phone: "8179925019" },
  { email: "kalyanjee2007@gmail.com", phone: "9142555157" },
  { email: "janapatihariprasad1996@gmail.com", phone: "9494287129" },
  { email: "pragathivedha134@gmail.com", phone: "7010081245" },
  { email: "pravinkumar4743@gmail.com", phone: "8248095574" },
  { email: "agaagavi@gmail.com", phone: "7358503186" },
  { email: "marktheo874@gmail.com", phone: "9150572036" },
  { email: "jagadishwar470ps@gmail.com", phone: "9884434503" },
  { email: "chejarlamanoharreddy55@gmail.com", phone: "6305521799" },
  { email: "jagannadambhanu2009@gmail.com", phone: "9052776429" },
  { email: "preethi081106@gmail.com", phone: "9600951461" },
  { email: "jayadeepanr@gmail.com", phone: "7418398091" },
  { email: "srisabarivasan.08@gmail.com", phone: "8098754477" },
  { email: "tharunprasads16@gmail.com", phone: "9384191629" },
  { email: "vishalini.amvk96@gmail.com", phone: "6380499871" },
  { email: "guthulasrivarun@gmail.com", phone: "6302201616" },
  { email: "kaviyapriyakp04@gmail.com", phone: "8015387404" },
  { email: "karthikeyan05122008@gmail.com", phone: "8220285309" },
  { email: "pranaveemurugesan15@gmail.com", phone: "9150001973" },
  { email: "santhoshk59736@gmail.com", phone: "7305838586" },
  { email: "tamilsudar115@gmail.com", phone: "9003620207" },
  { email: "eshwarsanthosh.7786@gmail.com", phone: "9032872309" },
  { email: "sreenitin94@gmail.com", phone: "9566151820" },
  { email: "smartaslam750@gmail.com", phone: "7305563085" },
  { email: "sabari150308@gmail.com", phone: "8925174811" },
  { email: "vvasanth2809@gmail.com", phone: "8610500690" },
  { email: "pmmugunthan2008@gmail.com", phone: "9342740461" },
  { email: "thraa2311@gmail.com", phone: "7904397517" },
  { email: "vadlapudireventh19@gmail.com", phone: "9440745696" },
  { email: "srivenkatkumar18@gmail.com", phone: "9866017799" },
  { email: "rudrash0088@gmail.com", phone: "6385554850" },
  { email: "rupavathypaul208@gmail.com", phone: "8610659131" },
  { email: "rowdyshiva1508@gmail.com", phone: "8555901449" },
  { email: "dhanyajeyaram15@gmail.com", phone: "8807405706" },
  { email: "laavanya0505@gmail.com", phone: "6380307491" },
  { email: "aditis20233@gmail.com", phone: "9905916055" },
  { email: "nishanth18022009@gmail.com", phone: "7845622389" },
  { email: "praneethreddykattamanchi@gmail.com", phone: "7996236939" },
  { email: "mehatharshans@gmail.com", phone: "8825919909" },
  { email: "valanroshan02@gmail.com", phone: "9360215488" },
  { email: "srijayanatarajan10@gmail.com", phone: "7397484630" },
  { email: "monishaarjunan22@gmail.com", phone: "7305900675" },
  { email: "l69133370@gmail.com", phone: "9490546228" },
  { email: "karamalakalyani2009@gmail.com", phone: "9063582627" },
  { email: "marudhu650@gmail.com", phone: "8072854012" },
  { email: "jaya@gmail.com", phone: "9345711049" },
  { email: "jaya", phone: "9345711049" },
  { email: "himeshdevani@gmail.com", phone: "8328092776" },
  { email: "deepikashreevenkatesan0@gmail.com", phone: "6381089827" },
  { email: "ithayageetha04@gmail.com", phone: "8148683883" },
  { email: "rarunkumar04112009@gmail.com", phone: "6374931706" },
  { email: "kirubakaran2537@gmail.com", phone: "9344528992" },
  { email: "sricharanrasamalla@gmail.com", phone: "9032662730" },
  { email: "navadeepkumardokka@gmail.com", phone: "7330660029" },
  { email: "kaviya7227@gmail.com", phone: "7639884285" },
  { email: "mahalingambas08@gmail.com", phone: "8610650160" },
  { email: "kanishkaavenkatraman@gmail.com", phone: "8428171605" },
  { email: "mohithnivas2709@gmail.com", phone: "9940830637" },
  { email: "shubhamsethy2008@gmail.com", phone: "9390570557" },
  { email: "santhoshnagaraja2008@gmail.com", phone: "8940714113" },
  { email: "heriskrisly@gmail.com", phone: "8925196036" },
  { email: "mahadhana7777@gmail.com", phone: "9514071704" },
  { email: "dharshinim2311@gmail.com", phone: "8610975675" },
  { email: "mridular2026@gmail.com", phone: "6379624832" },
  { email: "navadeepvikram@gmail.com", phone: "8297737121" },
  { email: "muthulururamcharan143@gmail.com", phone: "9281166944" },
  { email: "chintavenkatagowtham06@gmail.com", phone: "9392309186" },
  { email: "gppugaz143@gmail.com", phone: "7397686583" },
  { email: "selvam30032008@gmail.com", phone: "8072552564" },
  { email: "kalakatlausman1@gmail.com", phone: "8688807054" },
  { email: "pbunnu065@gmail.com", phone: "9059553664" },
  { email: "chirankesav963@gmail.com", phone: "9885017747" },
  { email: "gopichandkurri@gmail.com", phone: "9182012039" },
  { email: "madhumitha.s.3180@gmail.com", phone: "6369466204" },
  { email: "aviligondaharsha06@gmail.com", phone: "6303364810" },
  { email: "aviligondaharsha06", phone: "6303364810" },
  { email: "adityamuppirisetti1808@gmail.com", phone: "8143482217" },
  { email: "jeevajeeva16445@gmail.com", phone: "9363896337" },
  { email: "priyanganesh0806@gmail.com", phone: "9384921496" },
  { email: "sharathchandra379456@gmail.com", phone: "7708309459" },
  { email: "ssanjith061@gmail.com", phone: "7397349944" },
  { email: "chandrakirthna@gmail.com", phone: "9347367980" },
  { email: "sasibharathsasi1@gmail.com", phone: "7845763514" },
  { email: "naretiyashwanth2@gmail.com", phone: "63079914512" },
  { email: "daakshitha07@gmail.com", phone: "9390332976" },
  { email: "aswarnarajkumar@gmail.com", phone: "9080556117" },
  { email: "sanjayragav85@gmail.com", phone: "9342732958" },
  { email: "manisharunkumar04@gmail.com", phone: "7200779918" },
  { email: "deekshithpalanivel21@gmail.com", phone: "9789125345" },
  { email: "mounikas2830@gmail.com", phone: "8610052327" },
  { email: "saipranayreddy987@gmail.com", phone: "9347209745" },
  { email: "g.nithyashree2008@gmail.com", phone: "9445100067" },
  { email: "karanbalaji2010@gmail.com", phone: "9025272010" },
  { email: "dhanusri20092008@gmail.com", phone: "9025341235" },
  { email: "vighnaraj8883@gmail.com", phone: "9514036096" },
  { email: "bavithrans744@gmail.com", phone: "9344473859" },
  { email: "srimathiganesan09@gmail.com", phone: "9360875225" },
  { email: "karthikeyanp1612@gmail.com", phone: "7338784777" },
  { email: "muralirao0308@gmail.com", phone: "8940170448" },
  { email: "srisuriya282@gmail.com", phone: "9080271168" },
  { email: "periaraja875@gmail.com", phone: "9150881875" },
  { email: "suriyakumarsuriya985@gmail.com", phone: "9344799049" },
  { email: "ragavendrakumar927@gmail.com", phone: "8248969429" },
  { email: "saranyuvan1983@gmail.com", phone: "9171729698" },
  { email: "pkumarreddy969@gmail.com", phone: "9618446910" },
  { email: "pkumarreddy969@gmail.com", phone: "9618447910" },
  { email: "rahulvelmurugan007@gmail.com", phone: "7695989187" },
  { email: "harshikasuresh60@gmail.com", phone: "9043232145" },
  { email: "jayasrimahalakshmi@gmail.com", phone: "9488344663" },
  { email: "kavyasri180908@gmail.com", phone: "9342730101" },
  { email: "b.deepakraj2008@gmail.com", phone: "9940156942" },
  { email: "praveenkumar.s62008@gmail.com", phone: "8825828005" },
  { email: "sathishp17112008@gmail.com", phone: "8248430752" },
  { email: "vishnu.offical28@gamil.com", phone: "7358900598" },
  { email: "vishnu.offical28@gmail.com", phone: "7358900598" }
];

/**
 * Normalizes an email for resilient matching
 */
export function normalizeEmail(email: string): string {
  return (email || '').toLowerCase().replace(/\s+/g, '').trim();
}

/**
 * Normalizes a phone number (strips country codes if 12/11 digits, extracts 10 digits)
 */
export function normalizePhone(phone: string): string {
  const digits = (phone || '').replace(/\D/g, '').trim();
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

/**
 * Validates attendee credentials against the official list
 */
export function verifyAttendeeCredentials(inputEmail: string, inputPhone: string): AttendeeRecord | null {
  const cleanEmail = normalizeEmail(inputEmail);
  const cleanPhone = normalizePhone(inputPhone);

  if (!cleanEmail || !cleanPhone) {
    return null;
  }

  const match = REGISTERED_ATTENDEES.find((attendee) => {
    const attEmail = normalizeEmail(attendee.email);
    const attPhone = normalizePhone(attendee.phone);

    // Email match: exact, or username prefix match
    const isEmailMatch =
      attEmail === cleanEmail ||
      (cleanEmail.endsWith('@gmail.com') && attEmail === cleanEmail.replace('@gmail.com', '')) ||
      (attEmail.endsWith('@gmail.com') && attEmail.replace('@gmail.com', '') === cleanEmail);

    // Phone match: exact match, or endsWith for full 10-digit mobile numbers with country prefixes
    const isPhoneMatch =
      attPhone === cleanPhone ||
      (attPhone.length >= 10 && cleanPhone.length >= 10 && (attPhone.endsWith(cleanPhone) || cleanPhone.endsWith(attPhone)));

    return isEmailMatch && isPhoneMatch;
  });

  return match || null;
}
