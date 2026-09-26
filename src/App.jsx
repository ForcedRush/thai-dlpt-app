import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0D1117",
  surface: "#161B22",
  card: "#1C2333",
  border: "#30363D",
  accent: "#F0A500",
  accentSoft: "#F0A50022",
  red: "#FF6B6B",
  green: "#4CAF82",
  blue: "#58A6FF",
  muted: "#8B949E",
  text: "#E6EDF3",
  textSoft: "#C9D1D9",
};

// Full DLI Thai Basic Course Vocabulary — chapters 1-8 = ILR 1, 9-16 = ILR 2, 17-24 = ILR 3
const VOCAB = [
  // ── ILR 1 · Chapters 1–8 ─────────────────────────────────────────────
  { thai: "สวัสดี", romanized: "sawatdee", english: "Hi, hello", level: 1, pos: "Interjection/Noun", chapter: 1 },
  { thai: "ค่ะ", romanized: "kha", english: "Polite particle (female speaker)", level: 1, pos: "Particle", chapter: 1 },
  { thai: "ครับ", romanized: "khrap", english: "Polite particle (male speaker)", level: 1, pos: "Particle", chapter: 1 },
  { thai: "สบายดีหรือ", romanized: "sabaydee reu", english: "How are you?", level: 1, pos: "Sentence", chapter: 1 },
  { thai: "ผม", romanized: "phom", english: "I (male speaker)", level: 1, pos: "Pronoun", chapter: 1 },
  { thai: "สบายดี", romanized: "sabaydee", english: "I am fine.", level: 1, pos: "Sentence", chapter: 1 },
  { thai: "ขอบคุณ", romanized: "khob khun", english: "Thank you", level: 1, pos: "Verb", chapter: 1 },
  { thai: "คุณ", romanized: "khun", english: "You", level: 1, pos: "Pronoun", chapter: 1 },
  { thai: "ดิฉัน", romanized: "di chan", english: "I (female speaker)", level: 1, pos: "Pronoun", chapter: 1 },
  { thai: "ไม่เป็นไร", romanized: "mai pen rai", english: "You are welcome / No problem / Never mind", level: 1, pos: "Sentence", chapter: 1 },
  { thai: "เรา", romanized: "rao", english: "I (informal) / We", level: 1, pos: "Pronoun", chapter: 1 },
  { thai: "ฉัน", romanized: "chan", english: "I (male and female)", level: 1, pos: "Pronoun", chapter: 1 },
  { thai: "เขา", romanized: "khao", english: "He, she, they", level: 1, pos: "Pronoun", chapter: 1 },
  { thai: "ไป", romanized: "pai", english: "Go", level: 1, pos: "Verb", chapter: 1 },
  { thai: "จะ", romanized: "ja", english: "Will, shall, be going to", level: 1, pos: "Auxiliary Verb", chapter: 1 },
  { thai: "ธุระ", romanized: "thura", english: "Errands, personal engagement", level: 1, pos: "Noun", chapter: 1 },
  { thai: "ชื่อ", romanized: "chue", english: "Name, to be named", level: 1, pos: "Noun/Verb", chapter: 2 },
  { thai: "อะไร", romanized: "a rai", english: "What (interrogative)", level: 1, pos: "Pronoun", chapter: 2 },
  { thai: "ขอโทษ", romanized: "kho thot", english: "Excuse me, sorry, apologize", level: 1, pos: "Verb", chapter: 2 },
  { thai: "นามสกุล", romanized: "nam sakun", english: "Last name", level: 1, pos: "Noun/Verb", chapter: 2 },
  { thai: "ว่า", romanized: "wa", english: "That (conjunction)", level: 1, pos: "Conjunction", chapter: 2 },
  { thai: "ประเทศ", romanized: "prathet", english: "Country", level: 1, pos: "Noun", chapter: 3 },
  { thai: "คน", romanized: "khon", english: "Person", level: 1, pos: "Noun", chapter: 3 },
  { thai: "รัฐ", romanized: "rat", english: "States", level: 1, pos: "Noun", chapter: 3 },
  { thai: "เมือง", romanized: "mueang", english: "City", level: 1, pos: "Noun", chapter: 3 },
  { thai: "เมืองหลวง", romanized: "mueang luang", english: "Capital city", level: 1, pos: "Noun", chapter: 3 },
  { thai: "สัญชาติ", romanized: "sanchat", english: "Nationality", level: 1, pos: "Noun", chapter: 3 },
  { thai: "ภาษาไทย", romanized: "phasa thai", english: "Thai language", level: 1, pos: "Noun", chapter: 4 },
  { thai: "อ่าน", romanized: "an", english: "Read", level: 1, pos: "Verb", chapter: 4 },
  { thai: "เปิด", romanized: "poet", english: "Open", level: 1, pos: "Verb", chapter: 4 },
  { thai: "ปิด", romanized: "pit", english: "Close", level: 1, pos: "Verb", chapter: 4 },
  { thai: "วัน", romanized: "wan", english: "Day", level: 1, pos: "Noun", chapter: 4 },
  { thai: "ได้", romanized: "dai", english: "Can, to be able to", level: 1, pos: "Auxiliary Verb", chapter: 5 },
  { thai: "เขียน", romanized: "khian", english: "To write", level: 1, pos: "Verb", chapter: 5 },
  { thai: "พูด", romanized: "phut", english: "To speak", level: 1, pos: "Verb", chapter: 5 },
  { thai: "เพื่อน", romanized: "pheuan", english: "Friend, buddy", level: 1, pos: "Noun", chapter: 5 },
  { thai: "แม่", romanized: "mae", english: "Mother", level: 1, pos: "Noun", chapter: 5 },
  { thai: "พ่อ", romanized: "pho", english: "Father", level: 1, pos: "Noun", chapter: 5 },
  { thai: "อยู่", romanized: "yu", english: "To be, to live, to reside", level: 1, pos: "Verb", chapter: 5 },
  { thai: "แต่งงาน", romanized: "taeng ngan", english: "To marry", level: 1, pos: "Verb", chapter: 5 },
  { thai: "ปี", romanized: "pi", english: "Year", level: 1, pos: "Noun", chapter: 5 },
  { thai: "ภรรยา", romanized: "phan raya", english: "Wife", level: 1, pos: "Noun", chapter: 5 },
  { thai: "สามี", romanized: "sami", english: "Husband", level: 1, pos: "Noun", chapter: 5 },
  { thai: "ลูก", romanized: "luk", english: "Child, children", level: 1, pos: "Noun", chapter: 5 },
  { thai: "ลูกสาว", romanized: "luk sao", english: "Daughter", level: 1, pos: "Noun", chapter: 5 },
  { thai: "ลูกชาย", romanized: "luk chai", english: "Son", level: 1, pos: "Noun", chapter: 5 },
  { thai: "อายุ", romanized: "ayu", english: "Age", level: 1, pos: "Noun", chapter: 5 },
  { thai: "ครอบครัว", romanized: "khrob khruia", english: "Family", level: 1, pos: "Noun", chapter: 5 },
  { thai: "ปู่", romanized: "pu", english: "Grandfather (paternal)", level: 1, pos: "Noun", chapter: 5 },
  { thai: "ย่า", romanized: "ya", english: "Grandmother (paternal)", level: 1, pos: "Noun", chapter: 5 },
  { thai: "พี่น้อง", romanized: "phi nong", english: "Sibling", level: 1, pos: "Noun", chapter: 6 },
  { thai: "พี่ชาย", romanized: "phi chai", english: "Older brother", level: 1, pos: "Noun", chapter: 6 },
  { thai: "น้องสาว", romanized: "nong sao", english: "Younger sister", level: 1, pos: "Noun", chapter: 6 },
  { thai: "แฟน", romanized: "faen", english: "Boyfriend/girlfriend/significant other", level: 1, pos: "Noun", chapter: 6 },
  { thai: "หย่า", romanized: "ya", english: "To divorce", level: 1, pos: "Verb", chapter: 6 },
  { thai: "บ้าน", romanized: "ban", english: "House, home", level: 1, pos: "Noun", chapter: 6 },
  { thai: "งานวันเกิด", romanized: "ngan wan koet", english: "Birthday party", level: 1, pos: "Noun", chapter: 6 },
  { thai: "งานแต่งงาน", romanized: "ngan taeng ngan", english: "Wedding", level: 1, pos: "Noun", chapter: 6 },
  { thai: "ทำงาน", romanized: "tham ngan", english: "To work", level: 1, pos: "Verb", chapter: 7 },
  { thai: "ทหาร", romanized: "thahan", english: "Service person / military", level: 1, pos: "Noun", chapter: 7 },
  { thai: "ทหารบก", romanized: "thahan bok", english: "Soldier", level: 1, pos: "Noun", chapter: 7 },
  { thai: "นาน", romanized: "nan", english: "Long (time)", level: 1, pos: "Adverb", chapter: 7 },
  { thai: "เดือน", romanized: "duean", english: "Month", level: 1, pos: "Noun", chapter: 7 },
  { thai: "นายสิบ", romanized: "nai sip", english: "NCO (informal)", level: 1, pos: "Noun", chapter: 7 },
  { thai: "นายทหาร", romanized: "nai thahan", english: "Officer (informal)", level: 1, pos: "Noun", chapter: 7 },
  { thai: "ยศ", romanized: "yot", english: "Rank", level: 1, pos: "Noun", chapter: 7 },
  { thai: "บริษัท", romanized: "borrisat", english: "Company, firm", level: 1, pos: "Noun", chapter: 7 },
  { thai: "พยาบาล", romanized: "phayaban", english: "Nurse", level: 1, pos: "Noun", chapter: 7 },
  { thai: "โรงพยาบาล", romanized: "rong phayaban", english: "Hospital", level: 1, pos: "Noun", chapter: 7 },
  { thai: "หมอ", romanized: "mo", english: "Doctor", level: 1, pos: "Noun", chapter: 7 },
  { thai: "ครู", romanized: "khru", english: "Teacher, instructor", level: 1, pos: "Noun", chapter: 7 },
  { thai: "โรงเรียน", romanized: "rong rian", english: "School", level: 1, pos: "Noun", chapter: 7 },
  { thai: "ถนน", romanized: "thanon", english: "Road, street, avenue", level: 1, pos: "Noun", chapter: 8 },
  { thai: "โทรศัพท์", romanized: "thorasat", english: "Phone, to phone", level: 1, pos: "Noun/Verb", chapter: 8 },
  { thai: "มือถือ", romanized: "mue thue", english: "Cell phone", level: 1, pos: "Noun", chapter: 8 },
  { thai: "ธนาคาร", romanized: "thanakhan", english: "Bank", level: 1, pos: "Noun", chapter: 8 },
  { thai: "โรงแรม", romanized: "rong raem", english: "Hotel", level: 1, pos: "Noun", chapter: 8 },
  { thai: "พรุ่งนี้", romanized: "phrung ni", english: "Tomorrow", level: 1, pos: "Adverb", chapter: 8 },
  { thai: "เมื่อวานนี้", romanized: "muea wan ni", english: "Yesterday", level: 1, pos: "Adverb", chapter: 8 },
  { thai: "วันนี้", romanized: "wan ni", english: "Today", level: 1, pos: "Adverb", chapter: 8 },
  // ── ILR 2 · Chapters 9–16 ────────────────────────────────────────────
  { thai: "รถไฟ", romanized: "rot fai", english: "Train", level: 2, pos: "Noun", chapter: 9 },
  { thai: "เครื่องบิน", romanized: "khrueang bin", english: "Airplane", level: 2, pos: "Noun", chapter: 9 },
  { thai: "รถยนต์", romanized: "rot yon", english: "Car, automobile", level: 2, pos: "Noun", chapter: 9 },
  { thai: "สถานี", romanized: "sathani", english: "Station", level: 2, pos: "Noun", chapter: 9 },
  { thai: "สนามบิน", romanized: "sanam bin", english: "Airport", level: 2, pos: "Noun", chapter: 9 },
  { thai: "ตั๋ว", romanized: "tua", english: "Ticket", level: 2, pos: "Noun", chapter: 9 },
  { thai: "ซื้อ", romanized: "sue", english: "To buy", level: 2, pos: "Verb", chapter: 9 },
  { thai: "ชั่วโมง", romanized: "chua mong", english: "Hour", level: 2, pos: "Noun", chapter: 9 },
  { thai: "ราคา", romanized: "rakha", english: "Price", level: 2, pos: "Noun/Verb", chapter: 9 },
  { thai: "บัตรเครดิต", romanized: "bat credit", english: "Credit card", level: 2, pos: "Noun", chapter: 9 },
  { thai: "เงินสด", romanized: "ngoen sot", english: "Cash", level: 2, pos: "Noun", chapter: 9 },
  { thai: "จ่าย", romanized: "jai", english: "To pay", level: 2, pos: "Verb", chapter: 9 },
  { thai: "ข่าว", romanized: "khao", english: "News", level: 2, pos: "Noun", chapter: 9 },
  { thai: "บัญชี", romanized: "banchi", english: "Account", level: 2, pos: "Noun", chapter: 10 },
  { thai: "ดอกเบี้ย", romanized: "dok bia", english: "Interest (money)", level: 2, pos: "Noun", chapter: 10 },
  { thai: "ฝาก", romanized: "fak", english: "To deposit", level: 2, pos: "Verb", chapter: 10 },
  { thai: "ถอน", romanized: "thon", english: "To withdraw", level: 2, pos: "Verb", chapter: 10 },
  { thai: "โอน", romanized: "on", english: "To transfer", level: 2, pos: "Verb", chapter: 10 },
  { thai: "สาขา", romanized: "sakha", english: "Branch", level: 2, pos: "Noun", chapter: 10 },
  { thai: "หนังสือเดินทาง", romanized: "nangsu doen thang", english: "Passport", level: 2, pos: "Noun", chapter: 10 },
  { thai: "ร้านอาหาร", romanized: "ran ahan", english: "Restaurant", level: 2, pos: "Noun", chapter: 11 },
  { thai: "สั่ง", romanized: "sang", english: "To order", level: 2, pos: "Verb", chapter: 11 },
  { thai: "อร่อย", romanized: "aroy", english: "Delicious", level: 2, pos: "Adjective", chapter: 11 },
  { thai: "เผ็ด", romanized: "phet", english: "Hot and spicy", level: 2, pos: "Adjective", chapter: 11 },
  { thai: "ต้มยำกุ้ง", romanized: "tom yam kung", english: "Sour soup with shrimp", level: 2, pos: "Noun", chapter: 11 },
  { thai: "แกงเขียวหวาน", romanized: "kaeng khiao wan", english: "Green curry", level: 2, pos: "Noun", chapter: 11 },
  { thai: "ข้าวเหนียว", romanized: "khao niao", english: "Sticky rice", level: 2, pos: "Noun", chapter: 11 },
  { thai: "ตลาด", romanized: "talat", english: "Market", level: 2, pos: "Noun", chapter: 11 },
  { thai: "แพง", romanized: "phaeng", english: "Expensive", level: 2, pos: "Adjective", chapter: 11 },
  { thai: "ถูก", romanized: "thuk", english: "Cheap / Correct", level: 2, pos: "Adjective", chapter: 11 },
  { thai: "ลด", romanized: "lot", english: "To give a discount, to reduce", level: 2, pos: "Verb", chapter: 11 },
  { thai: "ส่ง", romanized: "song", english: "To send", level: 2, pos: "Verb", chapter: 11 },
  { thai: "จดหมาย", romanized: "chotmai", english: "Mail, letter", level: 2, pos: "Noun", chapter: 11 },
  { thai: "แสตมป์", romanized: "sa taem", english: "Stamp", level: 2, pos: "Noun", chapter: 11 },
  { thai: "ไม่สบาย", romanized: "mai sabai", english: "Not well, to be sick", level: 2, pos: "Adjective", chapter: 12 },
  { thai: "เป็นหวัด", romanized: "pen wat", english: "To have a cold", level: 2, pos: "Verb", chapter: 12 },
  { thai: "ปวดหัว", romanized: "puat hua", english: "Have a headache", level: 2, pos: "Verb", chapter: 12 },
  { thai: "ไข้", romanized: "khai", english: "Fever", level: 2, pos: "Noun", chapter: 12 },
  { thai: "ยา", romanized: "ya", english: "Medicine, drug", level: 2, pos: "Noun", chapter: 12 },
  { thai: "โรงพยาบาล", romanized: "rong phayaban", english: "Hospital", level: 2, pos: "Noun", chapter: 12 },
  { thai: "หมอฟัน", romanized: "mo fan", english: "Dentist", level: 2, pos: "Noun", chapter: 12 },
  { thai: "ออกกำลัง", romanized: "ok kamlang", english: "To exercise", level: 2, pos: "Verb", chapter: 12 },
  { thai: "ความดันโลหิต", romanized: "khwam dan lohit", english: "Blood pressure", level: 2, pos: "Noun", chapter: 12 },
  { thai: "ทหารบก", romanized: "thahan bok", english: "Soldier (army)", level: 2, pos: "Noun", chapter: 13 },
  { thai: "แผนการปฏิบัติการ", romanized: "phaen kan patibat kan", english: "Operation plan", level: 2, pos: "Noun", chapter: 13 },
  { thai: "กองกำลัง", romanized: "kong kamlang", english: "Forces", level: 2, pos: "Noun", chapter: 13 },
  { thai: "ชายแดน", romanized: "chai daen", english: "Border", level: 2, pos: "Noun", chapter: 13 },
  { thai: "ศูนย์บัญชาการ", romanized: "sun banchakar", english: "Command center", level: 2, pos: "Noun", chapter: 13 },
  { thai: "ภารกิจ", romanized: "pharakit", english: "Mission", level: 2, pos: "Noun", chapter: 13 },
  { thai: "สงคราม", romanized: "songkhram", english: "War, battle", level: 2, pos: "Noun", chapter: 13 },
  { thai: "ลาดตระเวน", romanized: "lat trawan", english: "To patrol", level: 2, pos: "Verb", chapter: 13 },
  { thai: "อาวุธ", romanized: "awut", english: "Weapon", level: 2, pos: "Noun", chapter: 13 },
  { thai: "กระสุน", romanized: "krasun", english: "Ammunition, bullet", level: 2, pos: "Noun", chapter: 13 },
  { thai: "แผนที่", romanized: "phaenthi", english: "Map", level: 2, pos: "Noun", chapter: 13 },
  { thai: "ระเบิด", romanized: "raboet", english: "Bomb, explosive", level: 2, pos: "Noun", chapter: 13 },
  { thai: "เรือดำน้ำ", romanized: "ruea dam nam", english: "Submarine", level: 2, pos: "Noun", chapter: 13 },
  { thai: "เครื่องบินรบ", romanized: "khrueang bin rob", english: "War plane", level: 2, pos: "Noun", chapter: 13 },
  { thai: "ทะเลทราย", romanized: "thale sai", english: "Desert", level: 2, pos: "Noun", chapter: 14 },
  { thai: "ฝน", romanized: "fon", english: "Rain", level: 2, pos: "Noun", chapter: 14 },
  { thai: "ภูเขา", romanized: "phu khao", english: "Mountain", level: 2, pos: "Noun", chapter: 14 },
  { thai: "มรสุม", romanized: "morasum", english: "Monsoon", level: 2, pos: "Noun", chapter: 14 },
  { thai: "น้ำท่วม", romanized: "nam thuam", english: "Flood", level: 2, pos: "Noun/Verb", chapter: 14 },
  { thai: "พายุ", romanized: "phayu", english: "Storm", level: 2, pos: "Noun", chapter: 14 },
  { thai: "แผ่นดินไหว", romanized: "phaendin wai", english: "Earthquake", level: 2, pos: "Noun", chapter: 14 },
  { thai: "อุณหภูมิ", romanized: "un haphumii", english: "Temperature", level: 2, pos: "Noun", chapter: 14 },
  { thai: "รัฐบาล", romanized: "ratthaban", english: "Government", level: 2, pos: "Noun", chapter: 15 },
  { thai: "ความปลอดภัย", romanized: "khwam plotphai", english: "Safety, security", level: 2, pos: "Noun", chapter: 15 },
  { thai: "สัญญา", romanized: "sanya", english: "Contract, agreement", level: 2, pos: "Noun/Verb", chapter: 15 },
  { thai: "ระยะทาง", romanized: "raya thang", english: "Distance", level: 2, pos: "Noun", chapter: 15 },
  { thai: "การจราจร", romanized: "kan chara chon", english: "Traffic", level: 2, pos: "Noun", chapter: 15 },
  { thai: "ไข้เลือดออก", romanized: "khai lueat ok", english: "Dengue fever", level: 2, pos: "Noun", chapter: 16 },
  { thai: "โรคติดต่อ", romanized: "rok tittho", english: "Communicable disease", level: 2, pos: "Noun", chapter: 16 },
  { thai: "ระบาด", romanized: "rabat", english: "To spread (disease)", level: 2, pos: "Verb", chapter: 16 },
  { thai: "วัคซีน", romanized: "wak sin", english: "Vaccine", level: 2, pos: "Noun", chapter: 16 },
  { thai: "สุขภาพ", romanized: "sukhaphap", english: "Health", level: 2, pos: "Noun", chapter: 16 },
  { thai: "กายภาพบำบัด", romanized: "kayaphap bambat", english: "Physical therapy", level: 2, pos: "Noun/Verb", chapter: 16 },
  // ── ILR 3 · Chapters 17–24 ───────────────────────────────────────────
  { thai: "ศุลกากร", romanized: "sunlakakhon", english: "Customs", level: 3, pos: "Noun", chapter: 17 },
  { thai: "ยาเสพติด", romanized: "ya sep tit", english: "Narcotic drugs", level: 3, pos: "Noun", chapter: 17 },
  { thai: "กฎหมาย", romanized: "kotmai", english: "Law", level: 3, pos: "Noun", chapter: 17 },
  { thai: "ผิดกฎหมาย", romanized: "phit kotmai", english: "Illegal", level: 3, pos: "Adjective/Verb", chapter: 17 },
  { thai: "ถูกกฎหมาย", romanized: "thuk kotmai", english: "Legal", level: 3, pos: "Adjective/Verb", chapter: 17 },
  { thai: "จับ", romanized: "chap", english: "To arrest, to catch", level: 3, pos: "Verb", chapter: 17 },
  { thai: "ความมั่นคงปลอดภัย", romanized: "khwam mankhong plotphai", english: "Security", level: 3, pos: "Noun", chapter: 17 },
  { thai: "อุบัติเหตุ", romanized: "ubattihet", english: "Accident", level: 3, pos: "Noun", chapter: 17 },
  { thai: "ประวัติศาสตร์", romanized: "prawattisat", english: "History", level: 3, pos: "Noun", chapter: 18 },
  { thai: "พระมหากษัตริย์", romanized: "phra maha kasat", english: "King", level: 3, pos: "Noun", chapter: 18 },
  { thai: "การปกครอง", romanized: "kan pokkhrong", english: "Governing, government (form of)", level: 3, pos: "Noun", chapter: 18 },
  { thai: "ประชาธิปไตย", romanized: "prachathipatai", english: "Democracy", level: 3, pos: "Noun", chapter: 18 },
  { thai: "รัฐธรรมนูญ", romanized: "rattha thamma nun", english: "Constitution", level: 3, pos: "Noun", chapter: 18 },
  { thai: "ราชาธิปไตย", romanized: "racha thipatai", english: "Absolute monarchy", level: 3, pos: "Noun", chapter: 18 },
  { thai: "รัฐประหาร", romanized: "rat pra han", english: "Coup d'état", level: 3, pos: "Noun", chapter: 18 },
  { thai: "เผด็จการ", romanized: "phadet kan", english: "Dictatorship", level: 3, pos: "Noun", chapter: 18 },
  { thai: "อำนาจ", romanized: "amnat", english: "Power", level: 3, pos: "Noun", chapter: 18 },
  { thai: "วัฒนธรรม", romanized: "watthanatham", english: "Culture", level: 3, pos: "Noun", chapter: 18 },
  { thai: "ศาสนา", romanized: "satsana", english: "Religion", level: 3, pos: "Noun", chapter: 18 },
  { thai: "ศิลปะ", romanized: "sinlapa", english: "Art", level: 3, pos: "Noun", chapter: 18 },
  { thai: "สถานการณ์", romanized: "sathankarn", english: "Situation, condition", level: 3, pos: "Noun", chapter: 19 },
  { thai: "ผู้ก่อการร้าย", romanized: "phu ko kan rai", english: "Terrorist", level: 3, pos: "Noun", chapter: 19 },
  { thai: "ต่อต้านการก่อการร้าย", romanized: "tothan kan ko kan rai", english: "Anti-terrorism", level: 3, pos: "Verb", chapter: 19 },
  { thai: "สอบสวน", romanized: "sop suan", english: "To investigate", level: 3, pos: "Verb", chapter: 19 },
  { thai: "ระเบิดพลีชีพ", romanized: "raboet phli chip", english: "Suicide bomb", level: 3, pos: "Noun", chapter: 19 },
  { thai: "สังคม", romanized: "sangkhom", english: "Society, social", level: 3, pos: "Noun", chapter: 19 },
  { thai: "เศรษฐกิจ", romanized: "setthakit", english: "Economy", level: 3, pos: "Noun", chapter: 19 },
  { thai: "ค่าครองชีพ", romanized: "kha khrong chip", english: "Cost of living", level: 3, pos: "Noun", chapter: 19 },
  { thai: "ลงทุน", romanized: "long thun", english: "To invest", level: 3, pos: "Verb", chapter: 22 },
  { thai: "ตลาดหุ้น", romanized: "talat hun", english: "Stock market", level: 3, pos: "Noun", chapter: 22 },
  { thai: "เงินเฟ้อ", romanized: "ngoen foe", english: "Inflation", level: 3, pos: "Noun", chapter: 22 },
  { thai: "การศึกษา", romanized: "kan sueksa", english: "Education", level: 3, pos: "Noun", chapter: 22 },
  { thai: "นักการเมือง", romanized: "nak kanmueang", english: "Politician", level: 3, pos: "Noun", chapter: 24 },
  { thai: "นายกรัฐมนตรี", romanized: "nayok rattha montri", english: "Prime minister", level: 3, pos: "Noun", chapter: 24 },
  { thai: "การเลือกตั้ง", romanized: "kan lueaktang", english: "Election", level: 3, pos: "Noun", chapter: 24 },
  { thai: "ประธานาธิบดี", romanized: "prathanathiobodi", english: "President (of a country)", level: 3, pos: "Noun", chapter: 24 },
  { thai: "สันติภาพ", romanized: "santiphap", english: "Peace", level: 3, pos: "Noun", chapter: 24 },
  { thai: "เจรจา", romanized: "choracha", english: "To negotiate", level: 3, pos: "Verb", chapter: 24 },
  { thai: "ทุจริต", romanized: "thutchrit", english: "Dishonesty, to corrupt", level: 3, pos: "Verb", chapter: 24 },
  { thai: "วินัย", romanized: "winai", english: "Discipline", level: 3, pos: "Noun", chapter: 24 },
  { thai: "ผู้บังคับบัญชา", romanized: "phu bangkhap banchakar", english: "Commander", level: 3, pos: "Noun", chapter: 24 },
  { thai: "ฆาตกรรม", romanized: "khatakam", english: "Murder", level: 3, pos: "Noun", chapter: 24 },
  { thai: "อาชญากรรม", romanized: "atchayakam", english: "Crime", level: 3, pos: "Noun", chapter: 24 },
  { thai: "การข่าว", romanized: "kan khao", english: "Intelligence", level: 3, pos: "Noun", chapter: 24 },
  { thai: "ปฏิบัติการจิตวิทยา", romanized: "patibat kan chitwitthaya", english: "Psychological operation (PSYOP)", level: 3, pos: "Noun", chapter: 24 },
  { thai: "กองร้อย", romanized: "kong roi", english: "Company (military)", level: 3, pos: "Noun", chapter: 13 },
  { thai: "หมวด", romanized: "muat", english: "Platoon", level: 3, pos: "Noun", chapter: 13 },
  { thai: "หมู่", romanized: "mu", english: "Squad", level: 3, pos: "Noun", chapter: 13 },
  { thai: "เรือบรรทุกเครื่องบิน", romanized: "ruea bantuk khrueang bin", english: "Aircraft carrier", level: 3, pos: "Noun", chapter: 13 },
  { thai: "กระทรวงกลาโหม", romanized: "krasuang kla hom", english: "Department of Defense", level: 3, pos: "Noun", chapter: 13 },
];

const PASSAGES = [
  {
    level: 2, title: "ประวัติกรุงเทพมหานคร", titleEn: "History of Bangkok",
    text: `กรุงเทพมหานครเป็นเมืองหลวงของประเทศไทย ก่อตั้งขึ้นในปี พ.ศ. ๒๓๒๕ โดยพระบาทสมเด็จพระพุทธยอดฟ้าจุฬาโลก รัชกาลที่ ๑ แห่งราชวงศ์จักรี กรุงเทพฯ ตั้งอยู่บริเวณปากแม่น้ำเจ้าพระยา และปัจจุบันเป็นศูนย์กลางทางเศรษฐกิจ การเมือง และวัฒนธรรมของประเทศไทย ประชากรในเขตกรุงเทพมหานครมีมากกว่าสิบล้านคน ทำให้เป็นหนึ่งในเมืองที่มีประชากรหนาแน่นที่สุดในเอเชียตะวันออกเฉียงใต้`,
    translation: `Bangkok is the capital city of Thailand. It was founded in 1782 by King Rama I of the Chakri dynasty. Bangkok is situated at the mouth of the Chao Phraya River, and today it is the economic, political, and cultural center of Thailand. The population in the Bangkok metropolitan area is more than ten million, making it one of the most densely populated cities in Southeast Asia.`,
    questions: [
      { q: "In what year was Bangkok founded?", options: ["1700", "1782", "1850", "1900"], correct: 1 },
      { q: "Where is Bangkok located?", options: ["At the mouth of the Mekong River", "At the mouth of the Chao Phraya River", "In the center of the country", "On the northern border"], correct: 1 },
      { q: "Which dynasty's first king founded Bangkok?", options: ["Ayutthaya dynasty", "Sukhothai dynasty", "Chakri dynasty", "Lanna dynasty"], correct: 2 },
      { q: "What is Bangkok's approximate population?", options: ["2 million", "5 million", "Over 10 million", "20 million"], correct: 2 },
    ],
  },
  {
    level: 2, title: "ระบบการศึกษาของไทย", titleEn: "Thailand's Education System",
    text: `ระบบการศึกษาของประเทศไทยแบ่งออกเป็นสามระดับหลัก ได้แก่ การศึกษาขั้นพื้นฐาน การศึกษาระดับอุดมศึกษา และการศึกษาวิชาชีพ การศึกษาภาคบังคับในประเทศไทยครอบคลุมระยะเวลาเก้าปี ตั้งแต่ชั้นประถมศึกษาปีที่หนึ่งถึงชั้นมัธยมศึกษาปีที่สาม รัฐบาลไทยส่งเสริมการเรียนรู้ภาษาอังกฤษในโรงเรียนเพื่อเตรียมนักเรียนให้พร้อมสำหรับประชาคมอาเซียน มหาวิทยาลัยในประเทศไทยมีมากกว่าหนึ่งร้อยแห่งทั่วประเทศ`,
    translation: `Thailand's education system is divided into three main levels: basic education, higher education, and vocational education. Compulsory education in Thailand covers nine years, from Grade 1 through Grade 9. The Thai government promotes English language learning in schools to prepare students for the ASEAN community. There are more than one hundred universities throughout Thailand.`,
    questions: [
      { q: "How many main levels does Thailand's education system have?", options: ["Two", "Three", "Four", "Five"], correct: 1 },
      { q: "How many years of compulsory education are required?", options: ["6 years", "9 years", "12 years", "15 years"], correct: 1 },
      { q: "Why does the Thai government promote English learning?", options: ["To attract foreign investment", "To prepare students for the ASEAN community", "To train military officers", "To reduce unemployment"], correct: 1 },
      { q: "Approximately how many universities are in Thailand?", options: ["Over 10", "Over 50", "Over 100", "Over 200"], correct: 2 },
    ],
  },
  {
    level: 2, title: "ภูมิประเทศของประเทศไทย", titleEn: "Thailand's Geography",
    text: `ประเทศไทยมีพื้นที่ประมาณห้าแสนสามหมื่นสี่พันตารางกิโลเมตร ตั้งอยู่ในภูมิภาคเอเชียตะวันออกเฉียงใต้ ประเทศไทยมีพรมแดนติดกับเมียนมา ลาว กัมพูชา และมาเลเซีย ภาคเหนือของไทยมีภูเขาสูงและอากาศเย็น ส่วนภาคใต้ติดทะเลอันดามันและอ่าวไทย ฤดูมรสุมส่งผลกระทบต่อปริมาณน้ำฝนในหลายภูมิภาค`,
    translation: `Thailand has an area of approximately 513,000 square kilometers, located in Southeast Asia. Thailand shares borders with Myanmar, Laos, Cambodia, and Malaysia. Northern Thailand has high mountains and cool weather, while the south borders the Andaman Sea and the Gulf of Thailand. The monsoon season affects rainfall in many regions.`,
    questions: [
      { q: "Approximately how large is Thailand's area?", options: ["213,000 sq km", "313,000 sq km", "513,000 sq km", "713,000 sq km"], correct: 2 },
      { q: "Which country does NOT share a border with Thailand?", options: ["Myanmar", "Vietnam", "Laos", "Malaysia"], correct: 1 },
      { q: "What characterizes northern Thailand's climate?", options: ["Hot and humid year-round", "Desert-like and dry", "High mountains and cool weather", "Tropical rainforest"], correct: 2 },
      { q: "What two bodies of water border southern Thailand?", options: ["Pacific Ocean and South China Sea", "Andaman Sea and Gulf of Thailand", "Indian Ocean and Bay of Bengal", "Mekong River and Chao Phraya River"], correct: 1 },
    ],
  },
  {
    level: 3, title: "นโยบายความมั่นคงของอาเซียน", titleEn: "ASEAN Security Policy",
    text: `สมาคมประชาชาติแห่งเอเชียตะวันออกเฉียงใต้ หรืออาเซียน มีบทบาทสำคัญในการรักษาเสถียรภาพของภูมิภาค นโยบายความมั่นคงร่วมกันของสมาชิกทั้งสิบประเทศมุ่งเน้นการแก้ไขข้อพิพาทโดยสันติวิธีและการเสริมสร้างความร่วมมือทางการทูต การประชุมสุดยอดอาเซียนจัดขึ้นทุกปีเพื่อหารือเกี่ยวกับความมั่นคง เศรษฐกิจ และการพัฒนาในภูมิภาค ปัญหาข้อพิพาทในทะเลจีนใต้ยังคงเป็นประเด็นที่ต้องการการเจรจาอย่างต่อเนื่อง`,
    translation: `The Association of Southeast Asian Nations, or ASEAN, plays an important role in maintaining regional stability. The collective security policy of all ten member countries emphasizes resolving disputes through peaceful means and strengthening diplomatic cooperation. The ASEAN Summit is held annually to discuss security, economics, and regional development. Disputes in the South China Sea remain an issue requiring ongoing negotiations.`,
    questions: [
      { q: "How many member countries does ASEAN have?", options: ["5", "8", "10", "12"], correct: 2 },
      { q: "How does ASEAN's policy emphasize resolving disputes?", options: ["Through military force", "Through peaceful means", "Through economic sanctions", "Through secret negotiations"], correct: 1 },
      { q: "How often is the ASEAN Summit held?", options: ["Every six months", "Annually", "Every two years", "Every five years"], correct: 1 },
      { q: "What ongoing issue requires continued negotiation?", options: ["Trade tariffs with China", "Disputes in the South China Sea", "Nuclear nonproliferation", "Refugee resettlement"], correct: 1 },
    ],
  },
  {
    level: 3, title: "กองทัพไทยและการฝึกร่วม", titleEn: "Thai Military and Joint Training",
    text: `กองทัพไทยประกอบด้วยกองทัพบก กองทัพเรือ และกองทัพอากาศ ทุกปีกองทัพไทยร่วมกับกองทัพสหรัฐอเมริกาในการฝึกร่วมคอบร้าโกลด์ ซึ่งเป็นการฝึกทางทหารที่ใหญ่ที่สุดในเอเชียตะวันออกเฉียงใต้ การฝึกนี้มีวัตถุประสงค์เพื่อเสริมสร้างความร่วมมือระหว่างกองทัพพันธมิตรและเพิ่มขีดความสามารถในการรับมือกับภัยพิบัติ นอกจากนี้ยังมีการฝึกด้านการแพทย์ทหารและการช่วยเหลือด้านมนุษยธรรมร่วมกัน`,
    translation: `The Thai military consists of the Army, Navy, and Air Force. Every year, the Thai military joins with the United States military in the Cobra Gold joint exercise, the largest military exercise in Southeast Asia. This exercise aims to strengthen cooperation between allied forces and increase capabilities for disaster response. There is also joint training in military medicine and humanitarian assistance.`,
    questions: [
      { q: "What are the three branches of the Thai military?", options: ["Army, Navy, Marines", "Army, Navy, Air Force", "Army, Air Force, Coast Guard", "Navy, Air Force, Special Forces"], correct: 1 },
      { q: "What is the name of the Thai-US joint exercise?", options: ["Tiger Strike", "Pacific Shield", "Cobra Gold", "Dragon Fury"], correct: 2 },
      { q: "What is one stated goal of the joint exercise?", options: ["Develop new weapons", "Increase disaster response capabilities", "Test nuclear readiness", "Train for urban warfare"], correct: 1 },
      { q: "What additional training area is mentioned?", options: ["Cyber warfare", "Military medicine and humanitarian assistance", "Naval blockade tactics", "Intelligence gathering"], correct: 1 },
    ],
  },
  {
    level: 3, title: "สถานการณ์ความมั่นคงภาคใต้", titleEn: "Southern Security Situation",
    text: `สถานการณ์ความมั่นคงในจังหวัดชายแดนภาคใต้ของประเทศไทยยังคงเป็นปัญหาที่ซับซ้อน กลุ่มผู้ก่อความไม่สงบได้ปฏิบัติการในพื้นที่จังหวัดปัตตานี ยะลา และนราธิวาสมาเป็นเวลานาน รัฐบาลไทยได้ดำเนินการเจรจาสันติภาพกับตัวแทนกลุ่มดังกล่าวหลายครั้ง โดยมีมาเลเซียทำหน้าที่เป็นผู้อำนวยความสะดวก กองกำลังรักษาความปลอดภัยปฏิบัติการลาดตระเวนและสร้างความสัมพันธ์กับชุมชนในพื้นที่อย่างต่อเนื่อง`,
    translation: `The security situation in Thailand's southern border provinces remains a complex problem. Insurgent groups have operated in the provinces of Pattani, Yala, and Narathiwat for a long time. The Thai government has conducted peace negotiations with representatives of these groups multiple times, with Malaysia serving as facilitator. Security forces continuously conduct patrols and build relationships with local communities.`,
    questions: [
      { q: "Which three provinces are mentioned as areas of insurgent activity?", options: ["Chiang Mai, Chiang Rai, Mae Hong Son", "Pattani, Yala, Narathiwat", "Nakhon Ratchasima, Ubon, Surin", "Songkhla, Trang, Satun"], correct: 1 },
      { q: "What country serves as a facilitator for peace negotiations?", options: ["Singapore", "Indonesia", "Malaysia", "Cambodia"], correct: 2 },
      { q: "What two activities do security forces perform?", options: ["Air strikes and evacuations", "Intelligence gathering and counterterrorism", "Patrols and community relationship building", "Border closures and checkpoints"], correct: 2 },
      { q: "How is the southern security situation described?", options: ["Fully resolved", "A minor issue", "A complex problem", "Recently emerged"], correct: 2 },
    ],
  },
];

// ─── LISTENING ITEMS ──────────────────────────────────────────────────────────
const LISTENING_ITEMS = [
  {
    level: 2, titleEn: "Phone Conversation",
    script: `สวัสดีครับ ผมชื่อสมชาย ขอพูดกับคุณวิภาได้ไหมครับ เธอไม่อยู่ครับ จะฝากข้อความไว้ไหมครับ ได้เลยครับ ช่วยบอกว่าผมโทรมา และขอให้เธอโทรกลับหาผมด้วยนะครับ ขอบคุณครับ`,
    translation: `Hello. My name is Somchai. May I speak with Wipa? She's not here. Would you like to leave a message? Sure. Please tell her I called and ask her to call me back. Thank you.`,
    questions: [
      { q: "What is the caller's name?", options: ["Wipa", "Somchai", "Somkid", "Wirat"], correct: 1 },
      { q: "What does the caller want?", options: ["To speak with a manager", "To leave a package", "To speak with Wipa", "To cancel an appointment"], correct: 2 },
      { q: "What message does he leave?", options: ["He will visit tomorrow", "He wants her to call him back", "He left a document at the office", "He needs to reschedule"], correct: 1 },
      { q: "Where is Wipa at the time of the call?", options: ["In a meeting", "At lunch", "Not present", "On another call"], correct: 2 },
    ],
  },
  {
    level: 2, titleEn: "Weather Forecast",
    script: `พยากรณ์อากาศสำหรับวันนี้ กรุงเทพมหานครมีฝนตกในตอนบ่าย อุณหภูมิสูงสุดประมาณ ๓๒ องศาเซลเซียส ลมแรงปานกลาง ประชาชนควรระวังน้ำท่วมในพื้นที่ลุ่มต่ำ คาดว่าพรุ่งนี้อากาศจะแจ่มใสขึ้น`,
    translation: `Today's weather forecast: Bangkok will have rain in the afternoon. Maximum temperature approximately 32 degrees Celsius. Moderate winds. Residents should be cautious of flooding in low-lying areas. Tomorrow is expected to be clearer.`,
    questions: [
      { q: "When is rain expected in Bangkok?", options: ["In the morning", "In the afternoon", "At night", "All day"], correct: 1 },
      { q: "What is the maximum temperature forecast?", options: ["28°C", "30°C", "32°C", "35°C"], correct: 2 },
      { q: "What should residents in low-lying areas watch out for?", options: ["Strong winds", "Flooding", "Extreme heat", "Air pollution"], correct: 1 },
      { q: "What is tomorrow's weather expected to be like?", options: ["More rain", "A typhoon", "Clearer", "Cooler"], correct: 2 },
    ],
  },
  {
    level: 2, titleEn: "Market Announcement",
    script: `ประกาศจากทางตลาด วันนี้ตลาดจะปิดเวลาหกโมงเย็น เนื่องจากมีงานพิเศษในคืนนี้ ลูกค้าที่มีรถจอดอยู่ในลานจอดรถโปรดนำรถออกก่อนห้าโมงเย็น ขอบคุณครับ`,
    translation: `Announcement from the market: Today the market will close at 6:00 PM due to a special event tonight. Customers with vehicles in the parking lot, please remove them before 5:00 PM. Thank you.`,
    questions: [
      { q: "What time will the market close today?", options: ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"], correct: 2 },
      { q: "Why is the market closing early?", options: ["Renovation work", "A special event tonight", "A public holiday", "Flooding"], correct: 1 },
      { q: "By what time must customers remove their cars?", options: ["3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"], correct: 2 },
      { q: "Where are the cars that need to be moved?", options: ["On the street", "In the parking lot", "At the entrance", "Behind the building"], correct: 1 },
    ],
  },
  {
    level: 3, titleEn: "Military Briefing",
    script: `สถานการณ์ความมั่นคงในภาคใต้ยังคงมีความตึงเครียด กองกำลังรักษาความปลอดภัยได้ปฏิบัติการลาดตระเวนตามแนวชายแดนเป็นประจำทุกวัน เมื่อคืนที่ผ่านมาพบเหตุระเบิดในพื้นที่หนึ่ง ไม่มีผู้เสียชีวิต แต่มีผู้บาดเจ็บสองคน การสืบสวนอยู่ระหว่างดำเนินการ ผู้บัญชาการได้สั่งเพิ่มกำลังพลในพื้นที่`,
    translation: `The security situation in the south remains tense. Security forces conduct daily patrol operations along the border. Last night, a bombing incident occurred in one area. There were no fatalities, but two people were injured. An investigation is underway. The commander has ordered additional personnel deployed to the area.`,
    questions: [
      { q: "How often do security forces conduct patrols?", options: ["Weekly", "Every other day", "Daily", "Twice a week"], correct: 2 },
      { q: "What happened last night?", options: ["A border crossing was closed", "A bombing occurred", "A soldier went missing", "A convoy was ambushed"], correct: 1 },
      { q: "What were the casualties from the incident?", options: ["Two dead, none injured", "No deaths, two injured", "One dead, three injured", "No casualties"], correct: 1 },
      { q: "What action did the commander take?", options: ["Ordered a ceasefire", "Ordered evacuation of civilians", "Ordered additional personnel deployed", "Ordered airstrikes"], correct: 2 },
    ],
  },
  {
    level: 3, titleEn: "Government Announcement",
    script: `รัฐบาลประกาศมาตรการใหม่เพื่อกระตุ้นเศรษฐกิจหลังจากสถานการณ์การระบาดของโรค มาตรการดังกล่าวรวมถึงการลดภาษีสำหรับธุรกิจขนาดเล็กและขนาดกลาง การเพิ่มงบประมาณด้านโครงสร้างพื้นฐาน และการส่งเสริมการท่องเที่ยวภายในประเทศ นายกรัฐมนตรีระบุว่ามาตรการเหล่านี้จะช่วยให้เศรษฐกิจฟื้นตัวได้ภายในสองปี`,
    translation: `The government announced new measures to stimulate the economy following a disease outbreak. These measures include tax reductions for small and medium businesses, increased infrastructure budgets, and promotion of domestic tourism. The Prime Minister stated that these measures will help the economy recover within two years.`,
    questions: [
      { q: "Which businesses benefit from tax reductions?", options: ["Large corporations only", "Foreign companies", "Small and medium businesses", "State enterprises"], correct: 2 },
      { q: "What is one stimulus measure announced?", options: ["Increased military spending", "Promotion of domestic tourism", "Foreign investment incentives", "Reduction of import tariffs"], correct: 1 },
      { q: "How long will recovery take according to the Prime Minister?", options: ["Six months", "One year", "Two years", "Five years"], correct: 2 },
      { q: "What event prompted these economic measures?", options: ["A natural disaster", "A military coup", "A disease outbreak", "An election result"], correct: 2 },
    ],
  },
  {
    level: 3, titleEn: "Intelligence Report",
    script: `รายงานข่าวกรองระบุว่ากลุ่มก่อการร้ายได้วางแผนโจมตีเป้าหมายในเขตเมือง หน่วยปฏิบัติการพิเศษได้รับคำสั่งให้เฝ้าระวังและปฏิบัติการสกัดกั้น ข้อมูลที่รวบรวมได้ชี้ให้เห็นว่ากลุ่มดังกล่าวมีสมาชิกอย่างน้อยสิบห้าคน และมีอาวุธปืนและวัตถุระเบิดอยู่ในครอบครอง ประชาชนในพื้นที่ได้รับการแจ้งเตือนให้รายงานสิ่งผิดปกติ`,
    translation: `An intelligence report indicates that a terrorist group has planned attacks on targets in the urban area. Special operations units have been ordered to stand guard and conduct interdiction operations. Collected information indicates that the group has at least fifteen members and possesses firearms and explosives. Residents in the area have been warned to report any suspicious activity.`,
    questions: [
      { q: "What has the terrorist group planned?", options: ["A border crossing", "Attacks on urban targets", "A kidnapping", "A cyberattack"], correct: 1 },
      { q: "What units were ordered to conduct interdiction?", options: ["Regular police", "Border patrol", "Special operations units", "National guard"], correct: 2 },
      { q: "Approximately how many members does the group have?", options: ["At least 5", "At least 10", "At least 15", "At least 20"], correct: 2 },
      { q: "What are residents asked to do?", options: ["Evacuate the area", "Report suspicious activity", "Stay indoors", "Cooperate with checkpoints"], correct: 1 },
    ],
  },
];

// ─── API call ────────────────────────────────────────────────────────────────
async function callClaude(systemPrompt, userMessage, { jsonMode = false } = {}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Gemini API key is missing. In Vercel, add VITE_GEMINI_API_KEY to the Production environment and redeploy."
    );
  }

  const model = "gemini-3.8-flash";
  const generationConfig = {
    // Thinking eats into maxOutputTokens before the visible answer is written,
    // so keep it low and give plenty of headroom or long answers get cut off mid-string.
    maxOutputTokens: 4096,
    thinkingConfig: { thinkingLevel: "low" },
  };
  if (jsonMode) {
    generationConfig.responseMimeType = "application/json";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: "user", parts: [{ text: userMessage }] }],
    generationConfig,
  });

  // 503 (overloaded) and 429 (rate limited) are transient — retry with backoff
  // before giving up, so a brief demand spike doesn't surface as a user-facing error.
  const MAX_ATTEMPTS = 4;
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
    } catch (networkErr) {
      lastError = networkErr;
      if (attempt < MAX_ATTEMPTS) {
        await sleep(backoffMs(attempt));
        continue;
      }
      throw lastError;
    }

    if (!response.ok) {
      const errorText = await response.text();
      lastError = new Error(`Gemini API error ${response.status}: ${errorText}`);

      if (response.status === 429) {
        // Distinguish a genuine daily/quota exhaustion (retrying won't help for
        // a long time) from a short burst rate-limit (worth a quick retry).
        let quotaExhausted = false;
        let retrySeconds = null;
        try {
          const parsed = JSON.parse(errorText);
          const violations = parsed?.error?.details?.find(
            (d) => d["@type"] === "type.googleapis.com/google.rpc.QuotaFailure"
          )?.violations;
          if (violations?.some((v) => /PerDay/i.test(v.quotaId || ""))) {
            quotaExhausted = true;
          }
          const retryInfo = parsed?.error?.details?.find(
            (d) => d["@type"] === "type.googleapis.com/google.rpc.RetryInfo"
          );
          if (retryInfo?.retryDelay) {
            retrySeconds = parseFloat(retryInfo.retryDelay);
          }
        } catch {
          // errorText wasn't JSON — fall through and treat as a normal 429
        }

        if (quotaExhausted || (retrySeconds != null && retrySeconds > 10)) {
          throw new Error(
            "You've hit Gemini's free-tier daily quota for this model (20 requests/day). " +
              "It resets on its own, or you can enable billing on your Google AI Studio project " +
              "to raise the limit: https://ai.google.dev/gemini-api/docs/rate-limits"
          );
        }
      }

      if ((response.status === 503 || response.status === 429) && attempt < MAX_ATTEMPTS) {
        await sleep(backoffMs(attempt));
        continue;
      }
      throw lastError;
    }

    const data = await response.json();

    const candidate = data.candidates?.[0];
    if (!candidate || !candidate.content || !Array.isArray(candidate.content.parts)) {
      throw new Error("Gemini returned an unexpected response.");
    }

    if (candidate.finishReason === "MAX_TOKENS") {
      throw new Error("Gemini response was cut off (hit the token limit). Try again.");
    }

    return candidate.content.parts.map((part) => part.text || "").join("");
  }

  throw lastError;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function backoffMs(attempt) {
  // Exponential backoff with jitter: ~600ms, ~1.2s, ~2.4s
  const base = 600 * 2 ** (attempt - 1);
  return base + Math.random() * 300;
}

// ─── Shared UI ───────────────────────────────────────────────────────────────
const Badge = ({ children, color = COLORS.accent }) => (
  <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
    {children}
  </span>
);

const Btn = ({ onClick, children, variant = "primary", disabled, style = {} }) => {
  const base = { border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, transition: "all 0.15s", fontSize: 14, fontFamily: "inherit", ...style };
  const variants = {
    primary: { background: COLORS.accent, color: "#000" },
    ghost: { background: "transparent", color: COLORS.textSoft, border: `1px solid ${COLORS.border}` },
    danger: { background: COLORS.red + "22", color: COLORS.red, border: `1px solid ${COLORS.red}44` },
    success: { background: COLORS.green + "22", color: COLORS.green, border: `1px solid ${COLORS.green}44` },
  };
  return <button style={{ ...base, ...variants[variant] }} onClick={onClick} disabled={disabled}>{children}</button>;
};

const Card = ({ children, style = {}, ...props }) => (
  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24, ...style }} {...props}>{children}</div>
);

// ─── NAV ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "◈" },
  { id: "flashcards", label: "Flashcards", icon: "⬡" },
  { id: "reading", label: "AI Reading", icon: "✦" },
  { id: "test", label: "Mock Test", icon: "◎" },
  { id: "tutor", label: "AI Tutor", icon: "✦" },
];

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({ progress, onNav }) {
  const total = VOCAB.length;
  const known = progress.known?.length || 0;
  const pct = Math.round((known / total) * 100);

  const ilr1Count = VOCAB.filter(v => v.level === 1).length;
  const ilr2Count = VOCAB.filter(v => v.level === 2).length;
  const knownByLevel = l => (progress.known || []).filter(t => VOCAB.find(v => v.thai === t && v.level === l)).length;
  const k1 = knownByLevel(1), k2 = knownByLevel(2), k3 = knownByLevel(3);
  const estILR = k3 >= 10 ? "ILR 3" : k2 >= 15 ? "ILR 2+" : k2 >= 5 || k1 >= ilr1Count * 0.7 ? "ILR 2" : k1 >= 10 ? "ILR 1+" : "ILR 1";

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <h2 style={{ color: COLORS.accent, fontFamily: "'Playfair Display', serif", fontSize: 28, margin: 0 }}>Thai DLPT Prep</h2>
        <p style={{ color: COLORS.muted, margin: "6px 0 0", fontSize: 14 }}>Defense Language Proficiency Test · Study Dashboard</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        {[
          { label: "Vocab Mastered", value: `${known}/${total}`, color: COLORS.accent },
          { label: "Tests Taken", value: progress.tests || 0, color: COLORS.blue },
          { label: "Study Streak", value: `${progress.streak || 1} day${(progress.streak || 1) !== 1 ? "s" : ""}`, color: COLORS.green },
          { label: "Est. ILR Level", value: estILR, color: COLORS.red },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ color: COLORS.textSoft, fontWeight: 600 }}>Vocabulary Progress</span>
          <span style={{ color: COLORS.accent, fontWeight: 700 }}>{pct}%</span>
        </div>
        <div style={{ background: COLORS.border, borderRadius: 99, height: 10 }}>
          <div style={{ background: `linear-gradient(90deg, ${COLORS.accent}, #FF6B6B)`, width: `${pct}%`, height: "100%", borderRadius: 99, transition: "width 1s ease" }} />
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {NAV_ITEMS.filter(n => n.id !== "dashboard").map(n => (
          <Card key={n.id} style={{ cursor: "pointer", transition: "border-color 0.2s", borderColor: COLORS.border }}
            onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
            onClick={() => onNav(n.id)}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{n.icon}</div>
            <div style={{ fontWeight: 700, color: COLORS.text }}>{n.label}</div>
            <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>
              {n.id === "flashcards" && "Drill Thai vocabulary"}
              {n.id === "reading" && "AI-generated passages"}
              {n.id === "test" && "Reading & listening exams"}
              {n.id === "tutor" && "Ask AI anything"}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── FLASHCARDS ───────────────────────────────────────────────────────────────
function Flashcards({ progress, setProgress }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState("all");
  const [done, setDone] = useState(false);
  const [showRomanized, setShowRomanized] = useState(true);

  const filtered = VOCAB.filter(v => filter === "all" || v.level === parseInt(filter));
  const card = filtered[idx];

  const known = progress.known || [];
  const isKnown = card && known.includes(card.thai);

  function mark(asKnown) {
    const newKnown = asKnown
      ? [...new Set([...known, card.thai])]
      : known.filter(k => k !== card.thai);
    setProgress(p => ({ ...p, known: newKnown }));
    next();
  }

  function next() {
    setFlipped(false);
    if (idx + 1 >= filtered.length) { setDone(true); return; }
    setTimeout(() => setIdx(i => i + 1), 150);
  }

  function restart() { setIdx(0); setFlipped(false); setDone(false); }

  if (done) return (
    <div style={{ textAlign: "center", padding: 60 }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <h3 style={{ color: COLORS.accent, fontSize: 24 }}>Deck Complete!</h3>
      <p style={{ color: COLORS.muted }}>You reviewed all {filtered.length} cards.</p>
      <Btn onClick={restart}>Review Again</Btn>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ color: COLORS.muted, fontSize: 13 }}>Filter by level:</span>
        {[
          { val: "all", label: `All (${VOCAB.length})` },
          { val: "1", label: `ILR 1 — Ch. 1–8 (${VOCAB.filter(v=>v.level===1).length})` },
          { val: "2", label: `ILR 2 — Ch. 9–16 (${VOCAB.filter(v=>v.level===2).length})` },
          { val: "3", label: `ILR 3 — Ch. 17–24 (${VOCAB.filter(v=>v.level===3).length})` },
        ].map(f => (
          <Btn key={f.val} variant={filter === f.val ? "primary" : "ghost"} onClick={() => { setFilter(f.val); setIdx(0); setDone(false); }} style={{ padding: "6px 14px", fontSize: 12 }}>
            {f.label}
          </Btn>
        ))}
        <span style={{ marginLeft: "auto", color: COLORS.muted, fontSize: 13 }}>{idx + 1} / {filtered.length}</span>
        <Btn variant={showRomanized ? "primary" : "ghost"} onClick={() => setShowRomanized(r => !r)} style={{ padding: "6px 14px", fontSize: 12 }}>
          {showRomanized ? "ก→ABC On" : "ก→ABC Off"}
        </Btn>
      </div>

      {card && (
        <div onClick={() => setFlipped(!flipped)} style={{ cursor: "pointer", perspective: 1000 }}>
          <div style={{
            background: flipped ? COLORS.accent : COLORS.card,
            border: `2px solid ${flipped ? COLORS.accent : COLORS.border}`,
            borderRadius: 16, padding: "60px 30px", textAlign: "center",
            minHeight: 220, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s ease",
          }}>
            {!flipped ? (
              <>
                <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.text, letterSpacing: 4, marginBottom: 12 }}>{card.thai}</div>
                {showRomanized && <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 8 }}>{card.romanized}</div>}
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                  <Badge color={COLORS.muted}>Ch. {card.chapter}</Badge>
                  <Badge color={COLORS.blue}>{card.pos}</Badge>
                </div>
                <div style={{ marginTop: 20, fontSize: 12, color: COLORS.muted + "88" }}>Tap to reveal</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 32, fontWeight: 700, color: "#000", marginBottom: 8 }}>{card.english}</div>
                <div style={{ fontSize: 14, color: "#00000088" }}>
                  {card.thai}{showRomanized ? ` · ${card.romanized}` : ""}
                </div>
                <Badge color="#000">{["", "ILR 1", "ILR 2", "ILR 3"][card.level]}</Badge>
              </>
            )}
          </div>
        </div>
      )}

      {flipped && (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Btn variant="danger" onClick={() => mark(false)}>✗ Still Learning</Btn>
          <Btn variant="success" onClick={() => mark(true)}>✓ Got It</Btn>
        </div>
      )}

      {!flipped && (
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <Btn variant="ghost" onClick={() => { setFlipped(false); setIdx(i => Math.max(0, i - 1)); }}>← Back</Btn>
          <Btn variant="ghost" onClick={next}>Skip →</Btn>
        </div>
      )}

      {isKnown && <div style={{ textAlign: "center" }}><Badge color={COLORS.green}>✓ Marked as Known</Badge></div>}
    </div>
  );
}

// ─── AI READING PRACTICE ──────────────────────────────────────────────────────
function Reading() {
  const [level, setLevel] = useState(2);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [passage, setPassage] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [error, setError] = useState("");

  const TOPICS = ["Military operations", "Thai government", "Weather & geography", "Daily life", "Economy", "History", "Public health", "Border security"];

  async function generate() {
    setLoading(true); setPassage(null); setAnswers({}); setSubmitted(false); setShowTranslation(false); setError("");
    const chosenTopic = topic || TOPICS[Math.floor(Math.random() * TOPICS.length)];
    try {
      const raw = await callClaude(
        `You are a Thai DLPT passage generator. Generate a Thai reading passage and comprehension questions at ILR level ${level}.
Return ONLY valid JSON, no markdown, no backticks. Schema:
{
  "title": "Thai title",
  "titleEn": "English title",
  "text": "Thai passage text (4-6 sentences, appropriate for ILR ${level})",
  "translation": "Full English translation",
  "questions": [
    { "q": "English question", "options": ["A","B","C","D"], "correct": 0 },
    { "q": "English question", "options": ["A","B","C","D"], "correct": 2 },
    { "q": "English question", "options": ["A","B","C","D"], "correct": 1 }
  ]
}
Topic: ${chosenTopic}. Make questions test actual comprehension of the Thai text. All questions and answer choices must be in English.`,
        "Generate the passage now.",
        { jsonMode: true }
      );
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setPassage(parsed);
    } catch (e) {
      console.error("AI Reading error:", e);
      setError(e?.message || "Failed to generate passage. Please try again.");
    }
    setLoading(false);
  }

  const score = submitted && passage ? passage.questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0) : null;

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <h2 style={{ color: COLORS.accent, fontFamily: "'Playfair Display', serif", fontSize: 26, margin: 0 }}>AI Reading Practice</h2>
        <p style={{ color: COLORS.muted, marginTop: 6, fontSize: 14 }}>Generate a custom Thai reading passage at any level, on any topic.</p>
      </div>

      <Card>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 6 }}>ILR LEVEL</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 3].map(l => (
                <Btn key={l} variant={level === l ? "primary" : "ghost"} onClick={() => setLevel(l)} style={{ padding: "6px 16px", fontSize: 13 }}>
                  ILR {l}
                </Btn>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 6 }}>TOPIC (optional)</div>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Thai military, border security…"
              style={{ width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", color: COLORS.text, fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>
          <Btn onClick={generate} disabled={loading}>{loading ? "Generating…" : "✦ Generate Passage"}</Btn>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
          {TOPICS.map(t => (
            <div key={t} onClick={() => setTopic(t)} style={{ background: COLORS.surface, border: `1px solid ${topic === t ? COLORS.accent : COLORS.border}`, color: topic === t ? COLORS.accent : COLORS.muted, borderRadius: 20, padding: "3px 10px", fontSize: 11, cursor: "pointer" }}>{t}</div>
          ))}
        </div>
      </Card>

      {error && <Card style={{ borderColor: COLORS.red }}><p style={{ color: COLORS.red, margin: 0 }}>{error}</p></Card>}

      {loading && (
        <Card style={{ textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✦</div>
          <div style={{ color: COLORS.muted }}>Generating ILR {level} passage<span style={{ animation: "blink 1s infinite", color: COLORS.accent }}>...</span></div>
        </Card>
      )}

      {passage && !loading && (
        <>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ color: COLORS.accent, fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 4 }}>{passage.title}</div>
                <div style={{ color: COLORS.muted, fontSize: 13 }}>{passage.titleEn}</div>
              </div>
              <Badge color={COLORS.blue}>ILR {level}</Badge>
            </div>
            <p style={{ color: COLORS.textSoft, lineHeight: 2.1, fontSize: 18, letterSpacing: "0.05em", margin: 0 }}>{passage.text}</p>
            <Btn variant="ghost" onClick={() => setShowTranslation(!showTranslation)} style={{ marginTop: 14, fontSize: 12 }}>
              {showTranslation ? "Hide" : "Show"} Translation
            </Btn>
            {showTranslation && <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.8, marginTop: 12, fontStyle: "italic", margin: "12px 0 0" }}>{passage.translation}</p>}
          </Card>

          <Card>
            <h3 style={{ color: COLORS.text, marginTop: 0 }}>Comprehension Questions</h3>
            {passage.questions.map((q, qi) => (
              <div key={qi} style={{ marginBottom: 20 }}>
                <div style={{ color: COLORS.textSoft, fontWeight: 600, marginBottom: 10, fontSize: 14 }}>{qi + 1}. {q.q}</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {q.options.map((opt, oi) => {
                    let bg = COLORS.surface, border = COLORS.border, color = COLORS.textSoft;
                    if (submitted) {
                      if (oi === q.correct) { bg = COLORS.green + "22"; border = COLORS.green; color = COLORS.green; }
                      else if (answers[qi] === oi) { bg = COLORS.red + "22"; border = COLORS.red; color = COLORS.red; }
                    } else if (answers[qi] === oi) { bg = COLORS.accentSoft; border = COLORS.accent; color = COLORS.accent; }
                    return (
                      <div key={oi} onClick={() => !submitted && setAnswers(a => ({ ...a, [qi]: oi }))}
                        style={{ background: bg, border: `1px solid ${border}`, color, borderRadius: 8, padding: "10px 14px", cursor: submitted ? "default" : "pointer", transition: "all 0.15s", fontSize: 14 }}>
                        {String.fromCharCode(65 + oi)}. {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {!submitted
              ? <Btn onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < passage.questions.length}>Submit Answers</Btn>
              : <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ color: score === passage.questions.length ? COLORS.green : COLORS.red, fontWeight: 700, fontSize: 18 }}>
                    Score: {score}/{passage.questions.length}
                  </span>
                  <Btn variant="ghost" onClick={() => { setAnswers({}); setSubmitted(false); }}>Try Again</Btn>
                  <Btn onClick={generate}>Generate New Passage</Btn>
                </div>
            }
          </Card>
        </>
      )}
    </div>
  );
}

// ─── MOCK TEST ────────────────────────────────────────────────────────────────
function MockTest({ setProgress }) {
  const [testType, setTestType] = useState(null); // null | "reading" | "listening"

  if (testType === "reading") return <ReadingMockTest setProgress={setProgress} onBack={() => setTestType(null)} />;
  if (testType === "listening") return <ListeningMockTest setProgress={setProgress} onBack={() => setTestType(null)} />;

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <h2 style={{ color: COLORS.accent, fontFamily: "'Playfair Display', serif", fontSize: 26, margin: 0 }}>Mock DLPT Tests</h2>
        <p style={{ color: COLORS.muted, marginTop: 6, fontSize: 14 }}>Choose a test type to begin your simulated exam.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card style={{ cursor: "pointer", textAlign: "center", padding: 40, transition: "border-color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.accent}
          onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
          onClick={() => setTestType("reading")}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>≡</div>
          <h3 style={{ color: COLORS.text, margin: "0 0 8px" }}>Reading Test</h3>
          <p style={{ color: COLORS.muted, fontSize: 13, margin: "0 0 16px" }}>
            Read {PASSAGES.length} Thai passages and answer English comprehension questions. Timed 15 minutes.
          </p>
          <Badge color={COLORS.accent}>{PASSAGES.flatMap(p => p.questions).length} Questions</Badge>
        </Card>
        <Card style={{ cursor: "pointer", textAlign: "center", padding: 40, transition: "border-color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.blue}
          onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
          onClick={() => setTestType("listening")}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔊</div>
          <h3 style={{ color: COLORS.text, margin: "0 0 8px" }}>Listening Test</h3>
          <p style={{ color: COLORS.muted, fontSize: 13, margin: "0 0 16px" }}>
            Listen to {LISTENING_ITEMS.length} Thai audio clips and answer English comprehension questions. Timed 15 minutes.
          </p>
          <Badge color={COLORS.blue}>{LISTENING_ITEMS.flatMap(l => l.questions).length} Questions</Badge>
        </Card>
      </div>
    </div>
  );
}

function ReadingMockTest({ setProgress, onBack }) {
  const [phase, setPhase] = useState("intro");
  const [pIdx, setPIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900);
  const timerRef = useRef(null);

  const allQs = PASSAGES.flatMap((p, pi) => p.questions.map((q, qi) => ({ ...q, passageIdx: pi, localIdx: qi })));
  const globalOffset = PASSAGES.slice(0, pIdx).reduce((a, p) => a + p.questions.length, 0);

  useEffect(() => {
    if (phase === "active") {
      timerRef.current = setInterval(() => setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); finish(); return 0; }
        return t - 1;
      }), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  function finish() {
    clearInterval(timerRef.current);
    setPhase("results");
    setProgress(p => ({ ...p, tests: (p.tests || 0) + 1 }));
  }

  const score = allQs.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
  const pct = Math.round((score / allQs.length) * 100);
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  if (phase === "intro") return (
    <Card style={{ textAlign: "center", padding: 60 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>≡</div>
      <h2 style={{ color: COLORS.accent, fontFamily: "'Playfair Display', serif" }}>Mock Reading Test</h2>
      <p style={{ color: COLORS.muted, maxWidth: 420, margin: "0 auto 8px" }}>
        Read each Thai passage carefully, then answer English comprehension questions.
      </p>
      <p style={{ color: COLORS.muted, fontSize: 13, maxWidth: 420, margin: "0 auto 24px" }}>
        {PASSAGES.length} passages · {allQs.length} questions · 15 minute time limit
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Btn variant="ghost" onClick={onBack}>← Back</Btn>
        <Btn onClick={() => setPhase("active")}>Begin Test</Btn>
      </div>
    </Card>
  );

  if (phase === "results") {
    const ilr = pct >= 90 ? "3" : pct >= 75 ? "2+" : pct >= 60 ? "2" : "1+";
    return (
      <Card style={{ textAlign: "center", padding: 60 }}>
        <div style={{ fontSize: 64, fontWeight: 900, color: pct >= 75 ? COLORS.green : COLORS.red }}>{pct}%</div>
        <h3 style={{ color: COLORS.text }}>Estimated ILR Level: <span style={{ color: COLORS.accent }}>{ilr}</span></h3>
        <p style={{ color: COLORS.muted }}>{score} of {allQs.length} correct</p>
        <p style={{ color: COLORS.muted, fontSize: 13 }}>{pct >= 75 ? "Strong performance! Keep it up." : "Review passages and vocabulary, then try again."}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
          <Btn variant="ghost" onClick={onBack}>← Back to Tests</Btn>
          <Btn onClick={() => { setPhase("intro"); setPIdx(0); setAnswers({}); setTimeLeft(900); }}>Retake</Btn>
        </div>
      </Card>
    );
  }

  const passage = PASSAGES[pIdx];
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {PASSAGES.map((p, i) => (
            <Btn key={i} variant={pIdx === i ? "primary" : "ghost"} onClick={() => setPIdx(i)} style={{ padding: "6px 12px", fontSize: 12 }}>
              {p.titleEn}
            </Btn>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ color: timeLeft < 120 ? COLORS.red : COLORS.muted, fontWeight: 700, fontFamily: "monospace", fontSize: 18 }}>⏱ {mm}:{ss}</span>
          <Btn variant="ghost" onClick={finish} style={{ fontSize: 12 }}>Submit Test</Btn>
        </div>
      </div>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ color: COLORS.accent, fontFamily: "'Playfair Display', serif", fontSize: 18 }}>{passage.title}</div>
          <Badge color={COLORS.blue}>ILR {passage.level}</Badge>
        </div>
        <p style={{ color: COLORS.textSoft, lineHeight: 2.0, fontSize: 18, letterSpacing: "0.05em", margin: 0 }}>{passage.text}</p>
      </Card>

      <Card>
        <h4 style={{ color: COLORS.text, margin: "0 0 16px" }}>Questions</h4>
        {passage.questions.map((q, qi) => {
          const gIdx = globalOffset + qi;
          return (
            <div key={qi} style={{ marginBottom: 20 }}>
              <div style={{ color: COLORS.textSoft, fontWeight: 600, marginBottom: 10, fontSize: 14 }}>{qi + 1}. {q.q}</div>
              <div style={{ display: "grid", gap: 8 }}>
                {q.options.map((opt, oi) => (
                  <div key={oi} onClick={() => setAnswers(a => ({ ...a, [gIdx]: oi }))}
                    style={{
                      background: answers[gIdx] === oi ? COLORS.accentSoft : COLORS.surface,
                      border: `1px solid ${answers[gIdx] === oi ? COLORS.accent : COLORS.border}`,
                      color: answers[gIdx] === oi ? COLORS.accent : COLORS.textSoft,
                      borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontSize: 14, transition: "all 0.15s",
                    }}>{String.fromCharCode(65 + oi)}. {opt}</div>
                ))}
              </div>
            </div>
          );
        })}
      </Card>

      <div style={{ display: "flex", gap: 12 }}>
        <Btn variant="ghost" onClick={() => setPIdx(i => Math.max(0, i - 1))} disabled={pIdx === 0}>← Prev Passage</Btn>
        {pIdx < PASSAGES.length - 1
          ? <Btn onClick={() => setPIdx(i => i + 1)}>Next Passage →</Btn>
          : <Btn onClick={finish}>Submit Test ✓</Btn>
        }
      </div>
    </div>
  );
}

function ListeningMockTest({ setProgress, onBack }) {
  const [phase, setPhase] = useState("intro");
  const [itemIdx, setItemIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState({});
  const [showScript, setShowScript] = useState({});
  const timerRef = useRef(null);
  const utterRef = useRef(null);

  const allQs = LISTENING_ITEMS.flatMap((l, li) => l.questions.map((q, qi) => ({ ...q, itemIdx: li, localIdx: qi })));
  const globalOffset = LISTENING_ITEMS.slice(0, itemIdx).reduce((a, l) => a + l.questions.length, 0);

  useEffect(() => {
    if (phase === "active") {
      timerRef.current = setInterval(() => setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); finish(); return 0; }
        return t - 1;
      }), 1000);
    }
    return () => { clearInterval(timerRef.current); window.speechSynthesis?.cancel(); };
  }, [phase]);

  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    // Prefer Thai voice if available
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find(v => v.lang.startsWith("th"));
    if (thaiVoice) utter.voice = thaiVoice;
    utter.lang = "th-TH";
    utter.rate = 0.85;
    utter.onstart = () => setPlaying(true);
    utter.onend = () => setPlaying(false);
    utter.onerror = () => setPlaying(false);
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
    setPlayed(p => ({ ...p, [itemIdx]: true }));
  }

  function stopSpeech() { window.speechSynthesis?.cancel(); setPlaying(false); }

  function finish() {
    clearInterval(timerRef.current);
    stopSpeech();
    setPhase("results");
    setProgress(p => ({ ...p, tests: (p.tests || 0) + 1 }));
  }

  const score = allQs.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
  const pct = Math.round((score / allQs.length) * 100);
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  if (phase === "intro") return (
    <Card style={{ textAlign: "center", padding: 60 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔊</div>
      <h2 style={{ color: COLORS.accent, fontFamily: "'Playfair Display', serif" }}>Mock Listening Test</h2>
      <p style={{ color: COLORS.muted, maxWidth: 420, margin: "0 auto 8px" }}>
        Listen to each Thai audio clip, then answer English comprehension questions.
      </p>
      <p style={{ color: COLORS.muted, fontSize: 13, maxWidth: 420, margin: "0 auto 6px" }}>
        {LISTENING_ITEMS.length} clips · {allQs.length} questions · 15 minute time limit
      </p>
      <p style={{ color: COLORS.blue, fontSize: 12, maxWidth: 420, margin: "0 auto 24px" }}>
        ⓘ Uses your browser's text-to-speech. A Thai voice will be used if available on your system.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Btn variant="ghost" onClick={onBack}>← Back</Btn>
        <Btn onClick={() => setPhase("active")}>Begin Test</Btn>
      </div>
    </Card>
  );

  if (phase === "results") {
    const ilr = pct >= 90 ? "3" : pct >= 75 ? "2+" : pct >= 60 ? "2" : "1+";
    return (
      <Card style={{ textAlign: "center", padding: 60 }}>
        <div style={{ fontSize: 64, fontWeight: 900, color: pct >= 75 ? COLORS.green : COLORS.red }}>{pct}%</div>
        <h3 style={{ color: COLORS.text }}>Estimated ILR Level: <span style={{ color: COLORS.accent }}>{ilr}</span></h3>
        <p style={{ color: COLORS.muted }}>{score} of {allQs.length} correct</p>
        <p style={{ color: COLORS.muted, fontSize: 13 }}>{pct >= 75 ? "Excellent listening skills!" : "Practice more listening and review the scripts."}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
          <Btn variant="ghost" onClick={onBack}>← Back to Tests</Btn>
          <Btn onClick={() => { setPhase("intro"); setItemIdx(0); setAnswers({}); setTimeLeft(900); setPlayed({}); setShowScript({}); }}>Retake</Btn>
        </div>
      </Card>
    );
  }

  const item = LISTENING_ITEMS[itemIdx];
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {LISTENING_ITEMS.map((l, i) => (
            <Btn key={i} variant={itemIdx === i ? "primary" : "ghost"} onClick={() => { stopSpeech(); setItemIdx(i); }} style={{ padding: "6px 12px", fontSize: 12 }}>
              {l.titleEn} {played[i] ? "✓" : ""}
            </Btn>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ color: timeLeft < 120 ? COLORS.red : COLORS.muted, fontWeight: 700, fontFamily: "monospace", fontSize: 18 }}>⏱ {mm}:{ss}</span>
          <Btn variant="ghost" onClick={finish} style={{ fontSize: 12 }}>Submit Test</Btn>
        </div>
      </div>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ color: COLORS.accent, fontFamily: "'Playfair Display', serif", fontSize: 18 }}>{item.titleEn}</div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>ILR {item.level} · Click play to listen</div>
          </div>
          <Badge color={COLORS.blue}>ILR {item.level}</Badge>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
          <button onClick={() => playing ? stopSpeech() : speak(item.script)}
            style={{
              background: playing ? COLORS.red + "22" : COLORS.blue + "22",
              border: `2px solid ${playing ? COLORS.red : COLORS.blue}`,
              color: playing ? COLORS.red : COLORS.blue,
              borderRadius: 50, width: 52, height: 52, fontSize: 20, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: playing ? "blink 1s infinite" : "none",
            }}>
            {playing ? "⏹" : "▶"}
          </button>
          <div>
            <div style={{ color: COLORS.textSoft, fontSize: 13, fontWeight: 600 }}>{playing ? "Playing…" : played[itemIdx] ? "Played — replay anytime" : "Press ▶ to listen"}</div>
            <div style={{ color: COLORS.muted, fontSize: 11 }}>You may replay as many times as needed</div>
          </div>
        </div>

        <Btn variant="ghost" onClick={() => setShowScript(s => ({ ...s, [itemIdx]: !s[itemIdx] }))} style={{ fontSize: 11 }}>
          {showScript[itemIdx] ? "Hide" : "Show"} Thai Script
        </Btn>
        {showScript[itemIdx] && (
          <div style={{ marginTop: 12, padding: 12, background: COLORS.surface, borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
            <p style={{ color: COLORS.textSoft, lineHeight: 2.0, fontSize: 16, letterSpacing: "0.04em", margin: "0 0 8px" }}>{item.script}</p>
            <p style={{ color: COLORS.muted, fontSize: 13, fontStyle: "italic", margin: 0 }}>{item.translation}</p>
          </div>
        )}
      </Card>

      <Card>
        <h4 style={{ color: COLORS.text, margin: "0 0 16px" }}>Questions</h4>
        {item.questions.map((q, qi) => {
          const gIdx = globalOffset + qi;
          return (
            <div key={qi} style={{ marginBottom: 20 }}>
              <div style={{ color: COLORS.textSoft, fontWeight: 600, marginBottom: 10, fontSize: 14 }}>{qi + 1}. {q.q}</div>
              <div style={{ display: "grid", gap: 8 }}>
                {q.options.map((opt, oi) => (
                  <div key={oi} onClick={() => setAnswers(a => ({ ...a, [gIdx]: oi }))}
                    style={{
                      background: answers[gIdx] === oi ? COLORS.accentSoft : COLORS.surface,
                      border: `1px solid ${answers[gIdx] === oi ? COLORS.accent : COLORS.border}`,
                      color: answers[gIdx] === oi ? COLORS.accent : COLORS.textSoft,
                      borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontSize: 14, transition: "all 0.15s",
                    }}>{String.fromCharCode(65 + oi)}. {opt}</div>
                ))}
              </div>
            </div>
          );
        })}
      </Card>

      <div style={{ display: "flex", gap: 12 }}>
        <Btn variant="ghost" onClick={() => { stopSpeech(); setItemIdx(i => Math.max(0, i - 1)); }} disabled={itemIdx === 0}>← Prev Clip</Btn>
        {itemIdx < LISTENING_ITEMS.length - 1
          ? <Btn onClick={() => { stopSpeech(); setItemIdx(i => i + 1); }}>Next Clip →</Btn>
          : <Btn onClick={finish}>Submit Test ✓</Btn>
        }
      </div>
    </div>
  );
}

// ─── AI TUTOR ─────────────────────────────────────────────────────────────────
function AiTutor() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "สวัสดีครับ! I'm your Thai DLPT study tutor. Ask me anything — Thai grammar, vocabulary, DLPT tips, or request a custom practice sentence!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(m => [...m, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const reply = await callClaude(
        `You are an expert Thai language tutor specializing in helping students prepare for the Defense Language Proficiency Test (DLPT) in Thai. 
You help with: Thai reading comprehension at ILR levels 1-3+, vocabulary, grammar, tone marks, script reading, and DLPT test strategies.
When providing Thai text, also give romanized pronunciation and English translation.
Be encouraging, clear, and pedagogically effective. Keep responses concise but helpful.`,
        userMsg
      );
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      const fallback = "Sorry, I had trouble connecting. Please try again.";
      setMessages(m => [...m, { role: "assistant", content: e?.message || fallback }]);
    }
    setLoading(false);
  }

  const PROMPTS = ["Explain Thai tone marks", "Give me a reading practice sentence at ILR 2", "What are common DLPT reading strategies?", "Translate: ความมั่นคงแห่งชาติ"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "70vh" }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%", background: m.role === "user" ? COLORS.accent : COLORS.card,
              color: m.role === "user" ? "#000" : COLORS.textSoft,
              border: `1px solid ${m.role === "user" ? COLORS.accent : COLORS.border}`,
              borderRadius: 12, padding: "12px 16px", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap",
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex" }}>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "12px 16px" }}>
              <span style={{ color: COLORS.muted }}>Thinking</span>
              <span style={{ color: COLORS.accent, animation: "blink 1s infinite" }}>...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        {PROMPTS.map(p => (
          <div key={p} onClick={() => { setInput(p); }} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "4px 12px", fontSize: 12, color: COLORS.muted, cursor: "pointer" }}>{p}</div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask your Thai tutor anything..."
          style={{ flex: 1, background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "12px 16px", color: COLORS.text, fontSize: 14, outline: "none", fontFamily: "inherit" }}
        />
        <Btn onClick={send} disabled={loading || !input.trim()}>Send</Btn>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [progress, setProgress] = useState({ known: [], tests: 0, streak: 1 });

  const VIEWS = { dashboard: Dashboard, flashcards: Flashcards, reading: Reading, test: MockTest, tutor: AiTutor };
  const View = VIEWS[tab];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=IBM+Plex+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; } body { margin: 0; } ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: ${COLORS.bg}; } ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; } @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <div style={{ width: 200, background: COLORS.surface, borderRight: `1px solid ${COLORS.border}`, padding: "24px 12px", display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
          <div style={{ color: COLORS.accent, fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 800, padding: "0 12px 20px", borderBottom: `1px solid ${COLORS.border}`, marginBottom: 8 }}>
            🇹🇭 DLPT Thai
          </div>
          {NAV_ITEMS.map(n => (
            <div key={n.id} onClick={() => setTab(n.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                background: tab === n.id ? COLORS.accentSoft : "transparent",
                color: tab === n.id ? COLORS.accent : COLORS.muted,
                fontWeight: tab === n.id ? 700 : 400,
                transition: "all 0.15s",
                fontSize: 14,
              }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span> {n.label}
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: 32, overflowY: "auto", maxWidth: 900 }}>
          <View progress={progress} setProgress={setProgress} onNav={setTab} />
        </div>
      </div>
    </div>
  );
}
