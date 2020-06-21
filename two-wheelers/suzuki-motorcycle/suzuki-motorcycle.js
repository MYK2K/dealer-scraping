const fetch = require('node-fetch');

const dealers = [
  {
    "id": 1697,
    "code": "48103",
    "trade_name": "AARAVIKA SUZUKI",
    "phone_number": "9384099014, 8646855555, 9003589842",
    "address": "No 96, Kasi Circle, Jawaharlal Nehru Street, Jafferkhanpet Road,  Ashok Nagar, Ekkattuthangal, Chennai-600083,Tamil Nadu",
    "email_sale": "",
    "latitude": "13.0299553",
    "longitude": "80.2086213"
  },
  {
    "id": 1698,
    "code": "308113",
    "trade_name": "AARUSH SUZUKI",
    "phone_number": "91332786040, 9133536633\r\n\r\n",
    "address": "Showroom : 19-5-10\/4, First Floor,  opposite police station, Bhadurpura, Hyderabad- 500064. Telangana \/ Workshop : 19-5-6\/2\/A , Bhadurpura Near Mohammedia Hospital Hyderabad-500064, Telangana",
    "email_sale": "",
    "latitude": "17.3538568",
    "longitude": "78.4575307"
  },
  {
    "id": 612,
    "code": "291211",
    "trade_name": "ACE KUDALE SUZUKI",
    "phone_number": "8308832222 \/ 9822288260 \/ 7722021844 \/07722021841\/ 9552598813 (sales) \/ 9552599702? (service)",
    "address": "Opp Udit Packaging Pvt Ltd, Opp Prathmesh Hotel,Gate No 1419\/B, Taluka Shirur, Dist. Pune, Shikrapur-412208, Maharashtra",
    "email_sale": "neeraj.kudale@acekudalecar.com",
    "latitude": "18.693968",
    "longitude": "-0.127625"
  },
  {
    "id": 776,
    "code": "291212",
    "trade_name": "ACE KUDALE SUZUKI",
    "phone_number": "9822288260",
    "address": "satyam shivam complax near munswa bridge sainat nagar kharadi Pune 411014 , Maharashtra",
    "email_sale": "neeraj.kudale@acekudalecar.com",
    "latitude": "18.5203",
    "longitude": "73.8543"
  },
  {
    "id": 734,
    "code": "458201",
    "trade_name": "ALFA SUZUKI",
    "phone_number": "9419051101",
    "address": "National Highway, Batengoo Anantnag-192101, Jammu & Kashmir",
    "email_sale": "alfaautomobilespvtltd@gmail.com",
    "latitude": "32.70533",
    "longitude": "74.88"
  },
  {
    "id": 1676,
    "code": "115103",
    "trade_name": "ALUVA SUZUKI",
    "phone_number": "9249455995",
    "address": "Door No 17 C1 & C2, Choornikara Panchayat, NH-47 , Opposite Metro Pillar No 143, Dist. Ernakulam, Ambattukavu, Aluva-683106, Kerala",
    "email_sale": "",
    "latitude": "10.072812",
    "longitude": "76.380942"
  },
  {
    "id": 504,
    "code": "115203",
    "trade_name": "ALUVA SUZUKI",
    "phone_number": "9249455995 \/ 0484-2603855 \/ 09946799933.",
    "address": "No 26\/29C, KVK Building, Near Vengalloor Signal, PO Thodupuzha, Pin-685605, Kerala",
    "email_sale": "aluva.suzuki@gmail.com",
    "latitude": "9.912442",
    "longitude": "76.730766"
  },
  {
    "id": 615,
    "code": "75201",
    "trade_name": "ANIMESH SUZUKI",
    "phone_number": "8336968743 (sales), 8584074204(service), 9883402333",
    "address": "52\/6, P G E Plaza, Parbati Bihar, Baguihati, VIP Near Big Bazaar, VIP Road, Kolkata -700059, West Bengal",
    "email_sale": "mondalmotorsllp@rediffmail.com",
    "latitude": "22.615588",
    "longitude": "88.430918"
  },
  {
    "id": 538,
    "code": "213201",
    "trade_name": "APCO SUZUKI",
    "phone_number": "0496-3220404",
    "address": "19\/186 B,C,D,E,F,G, Karimbanapalam , NR. CO-OPERATIVE HOSPITAL JN.,NH BYEPASS, Vadakara - 673101,Kozhikode , Kerala",
    "email_sale": "vatakara.apco9@gmail.com",
    "latitude": "11.588949",
    "longitude": "75.588799"
  },
  {
    "id": 536,
    "code": "213203",
    "trade_name": "APCO SUZUKI",
    "phone_number": "9895120737\/9539010020, 0495 3922629, 0495 3277099`",
    "address": "12\/133, PUZHAKKAL BUILDING, NEAR CRESCENT HOSPITAL, FEROKE CHUNGAM,CALICUT -673631,Kerala",
    "email_sale": "gmapcosuzuki@gmail.com,apcosuzukirmk@gmail.com",
    "latitude": "11.422317",
    "longitude": "75.936526"
  },
  {
    "id": 533,
    "code": "213207",
    "trade_name": "APCO SUZUKI",
    "phone_number": "9895120737 \/ 0493-6207733 \/ 0495-2369453",
    "address": "MP XVIII\/685,686, Edappetty, Kainatty, Kalpetta North(PO), Dist. Wayanad-673122, Kerala",
    "email_sale": "hapbco@yahoo.co.in",
    "latitude": "11.703206",
    "longitude": "76.0834"
  },
  {
    "id": 613,
    "code": "213211",
    "trade_name": "APCO SUZUKI",
    "phone_number": "0495-2436711 \/ 9539010016\/ 9895112244",
    "address": "14\/299 D, P T Tower, Athani, NH Bye Pass Road, Pantheerankave-673109, Kerala",
    "email_sale": "mmraziapco@gmail.com,gmapcosuzuki@gmail.com,hapbco@yahoo.co.in",
    "latitude": "11.232924",
    "longitude": "75.849204"
  },
  {
    "id": 511,
    "code": "34202",
    "trade_name": "APPLE AUTO",
    "phone_number": "9141155331 \/ 8884446502 \/ 080 26789999 \/ 080 64555507",
    "address": "# 3, 100 Ft Ring Road, BTM Layout 1St Stage, 1st Phase, Near Advaitha Petrol Bunk, Bangalore-560068",
    "email_sale": "appleautosales@gmail.com",
    "latitude": "12.889268",
    "longitude": "77.63991"
  },
  {
    "id": 513,
    "code": "34207",
    "trade_name": "APPLE AUTO",
    "phone_number": "8884446505 \/ 8884446507 \/ 080-26661919",
    "address": "No. 44\/42-1, Doddakallasandra, Near Konanagunte Cross, Opp Metal Closure, Kanakapura Maini Road, Dist. Bangalore-560062, Karnataka",
    "email_sale": "appleautosales@gmail.com,appleautoservice@gmail.com",
    "latitude": "12.883396",
    "longitude": "77.548594"
  },
  {
    "id": 732,
    "code": "34214",
    "trade_name": "APPLE AUTO",
    "phone_number": "9448889999, 8884446509",
    "address": "No 10\/4, Opp Rajarajeshwari Nagar Arch Gate, Mysore Road, Nayandhahalli, Rajarajeshwari Nagar, Bangalore-560098, Karnataka",
    "email_sale": "appleautosales@gmail.com",
    "latitude": "12.929744",
    "longitude": "77.505554"
  },
  {
    "id": 1677,
    "code": "225101",
    "trade_name": "ARUN MOTORS",
    "phone_number": "9364291414 ",
    "address": "Plot No H-21, 80 Feet Road, Anna Nagar, Madurai-625020, Tamil Nadu",
    "email_sale": "",
    "latitude": "9.923840",
    "longitude": "78.141190"
  },
  {
    "id": 491,
    "code": "225201",
    "trade_name": "Arunachal Motors",
    "phone_number": "9344481414\/ 0452-2333414 , 2332414, 9364291414",
    "address": "153, NORTH VELI STREET, OPP. SIMMAKAL BUS STOP ,MADURAI -625001",
    "email_sale": "arun_motors@gmail.com,arun_motors@rediffmail.com",
    "latitude": "9.925201",
    "longitude": "78.119775"
  },
  {
    "id": 518,
    "code": "34203",
    "trade_name": "ARYAN SUZUKI",
    "phone_number": "09986967556, 98450 61888, 9341406637, 080-4908 1000, 99 00 11 7858",
    "address": "WHITE FIELD ROAD: #35\/1, RAMAGONDANAHALLI, VARTHUR MAIN ROAD, BANGALORE - 560066. LAND MARK: OPP. SIGMA TECH PARK",
    "email_sale": "branch.aryansuzuki@gmail.com",
    "latitude": "12.956737",
    "longitude": "77.73959"
  },
  {
    "id": 512,
    "code": "34205",
    "trade_name": "ARYAN SUZUKI",
    "phone_number": "09741406067, 9341406637,99 00 11 7858-PH.: 080-256 11 000.",
    "address": "454, OLD MADRAS ROAD,OPP. T.C. PALYA BUS STOP,BHATTARAHALLI, K.R. PURAM,BANGALORE - 560049.",
    "email_sale": "aryansuzuki@yahoo.co.in",
    "latitude": "13.02271",
    "longitude": "77.713782"
  },
  {
    "id": 767,
    "code": "34212",
    "trade_name": "ARYAN SUZUKI",
    "phone_number": "7338080322, 8095620537",
    "address": "C-02, Ground Floor, K K Veni Plaza, ITPL, 1st Main Road, B Narayanapura, Dooravani Nagar Post, Mahadevapura, Bangalore-560016, Karnataka",
    "email_sale": "aryan.mahadevpura@gmail.com,aryansuzuki@yahoo.co.in",
    "latitude": "12.99128",
    "longitude": "77.687367"
  },
  {
    "id": 446,
    "code": "291202",
    "trade_name": "AUTOMATIC SUZUKI",
    "phone_number": "020-65606661\/62\/63, Sales- 8087087511\/12, Service- 8087087513 ",
    "address": "Shree-Prasad Building, Sheila Vihar Colony, Opposite Planet Ford, Paud Road, Kothrud, Pune-411007, Maharashtra",
    "email_sale": "kothrudsuzuki@vsnl.net",
    "latitude": "18.506393",
    "longitude": "73.823159"
  },
  {
    "id": 448,
    "code": "291203",
    "trade_name": "AUTOMATIC SUZUKI",
    "phone_number": "020 - 24320208",
    "address": "Shop No 1, 2 & 3, Baba Apartment, Opp. Pune Water Purification Center, Pune - 411030",
    "email_sale": "kothrudsuzuki@vsnl.net",
    "latitude": "18.52043",
    "longitude": "73.856744"
  },
  {
    "id": 447,
    "code": "291206",
    "trade_name": "AUTOMATIC SUZUKI",
    "phone_number": "020 65104632 \/ 34",
    "address": "Automatic Suzuki, Near Pirangut Bus Stand,Pirangut, Taluka Mulshi. Dist. :- Pune 412115",
    "email_sale": "kothrudsuzuki@vsnl.net",
    "latitude": "18.52043",
    "longitude": "73.856744"
  },
  {
    "id": 1670,
    "code": "34109",
    "trade_name": "AVANISH SUZUKI",
    "phone_number": "9538250911",
    "address": "#57, 2nd Main, Manasanagara, Upadhyayara Sangha, Badavane, Nagarabhavi- Bangaluru-560072, Karnataka",
    "email_sale": "directors@avanishmotors.com",
    "latitude": "12.958645",
    "longitude": "77.517924"
  },
  {
    "id": 748,
    "code": "281201",
    "trade_name": "BEDI SUZUKI",
    "phone_number": "9878051000",
    "address": "Plot No. 17, Hira Bagh, Rajpura Road, Patiala city, Patiala -147001, Punjab",
    "email_sale": "valinsuzuki@gmail.com",
    "latitude": "30.33081",
    "longitude": "76.41518"
  },
  {
    "id": 540,
    "code": "104201",
    "trade_name": "BELLAD SUZUKI",
    "phone_number": "9880285032 \/9880285015 9880285011, 9880297023,",
    "address": "Kamareddi Building, Near J.S.S College, P.B Road, Vidyagiri, Dharwad-580004, Karnataka",
    "email_sale": "bellad_suzuki@rediffmail.com,automobile@belladlimited.com",
    "latitude": "15.440267",
    "longitude": "75.020671"
  },
  {
    "id": 541,
    "code": "104202",
    "trade_name": "BELLAD SUZUKI",
    "phone_number": "9916056789\/9986035015\/0836-2372247\/0836-2374896",
    "address": "Shirahatti Complex, Near Gaddi Petrol Pump, Hatalageri Road, Gadag- 582101",
    "email_sale": "bellad_suzuki@rediffmail.com",
    "latitude": "15.433248",
    "longitude": "75.644861"
  },
  {
    "id": 451,
    "code": "323201",
    "trade_name": "BHAGIRATH SUZUKI",
    "phone_number": "09922112159 , 0233-2211899",
    "address": "Shantiniketan, Miraj Sangli Road, Wantmure Corner, Miraj-416410, MH",
    "email_sale": "bhagirathsuzuki@rediffmail.com",
    "latitude": "16.816502",
    "longitude": "74.642473"
  },
  {
    "id": 454,
    "code": "71201",
    "trade_name": "BRANCH HEND SUZUKI",
    "phone_number": "07263-255255 \/ 8806191970",
    "address": "Opp Panchayat Samiti, Tower Chowk, Nandura Road, Dist. Buldhana, Khamgaon-444303, Maharashtra",
    "email_sale": "hendsuzuki@gmail.com",
    "latitude": "20.711622",
    "longitude": "76.566128"
  },
  {
    "id": 535,
    "code": "213204",
    "trade_name": "CEE PEE SUZUKI",
    "phone_number": "8157900093, 8157900094 \/ 08157900025 \/ 0495-2325033 \/ 9495500001",
    "address": "MV-III \/ 132B, Opp P P Mall, KVR Complex, Mukkom-Calicut Road, Dist. Kozhikode, Mukkom-673602, Kerala",
    "email_sale": "ceepeesuzuki@gmail.com,md@ceepeesuzuki.com",
    "latitude": "11.321249",
    "longitude": "75.996346"
  },
  {
    "id": 537,
    "code": "213206",
    "trade_name": "CEE PEE SUZUKI",
    "phone_number": "8157900034, 8157900038 \/ 9947500003 \/ 0495-2325033 \/ 9495500001",
    "address": "Dottapan Kulam, Beenachi, Wayanad District, Sulthan Bathery, Pin 673592, Kerala",
    "email_sale": "ceepeesuzuki@gmail.com,md@ceepeesuzuki.com",
    "latitude": "11.665612",
    "longitude": "76.262665"
  },
  {
    "id": 532,
    "code": "213208",
    "trade_name": "CEE PEE SUZUKI",
    "phone_number": "9447740406, 9747116406 \/ 8157900025 \/0495-2324033\/ 2328033 \/ 949500001",
    "address": "Edachira, Kozhikode District, Kodalundy-673302, Kerala",
    "email_sale": "md@ceepeesuzuki.com,ceepeesuzuki@gmail.com",
    "latitude": "10.013857",
    "longitude": "76.370964"
  },
  {
    "id": 534,
    "code": "213210",
    "trade_name": "CEE PEE SUZUKI",
    "phone_number": "8156800065 \/ 9207900043\/ 8157900025 \/0495-2324033\/ 2328033 \/ 949500001",
    "address": "Building no: MP 8\/273 \u2013 1, Chettapalam, Vemom (PO), Mysore Road, Mananthavady - 670645, Wayanad District, Kerala",
    "email_sale": "md@ceepeesuzuki.com,ceepeesuzuki@gmail.com",
    "latitude": "11.803410",
    "longitude": "76.005500"
  },
  {
    "id": 469,
    "code": "42202",
    "trade_name": "CROWN SUZUKI",
    "phone_number": "9909907234",
    "address": "G-11, Bajrang Square, Opp ONGC gate, Near Baroda Dairy, Makarpura Road, Vadodara-390009, GJ",
    "email_sale": "crownsuzuki@yahoo.com",
    "latitude": "22.277841",
    "longitude": "73.152402"
  },
  {
    "id": 547,
    "code": "22201",
    "trade_name": "DAMAN SUZUKI",
    "phone_number": "8872020325 , 9915959990 , 9814659990, 01874-500426-27-28",
    "address": "Plot No 7, Improvement Trust, Opp Brahmin Sabha, Batala Road, Gurdaspur-143521, PB",
    "email_sale": "damansuzuki@gmail.com",
    "latitude": "32.03059",
    "longitude": "75.392885"
  },
  {
    "id": 713,
    "code": "97212",
    "trade_name": "DHARAM SUZUKI",
    "phone_number": "9313672402 \/ 9911402402",
    "address": "RR-11, Mianwali Nagar, Opp Metro Pillar No 300, Near Petrol Pump, Rohtak Road- Peera Garhi, Delhi-110087, Delhi",
    "email_sale": "dharam.suzuki@gmail.com",
    "latitude": "28.679813",
    "longitude": "77.089005"
  },
  {
    "id": 770,
    "code": "359206",
    "trade_name": "DHARMARAJ",
    "phone_number": "9712530000 \/ 9925740000 \/ 9925760000 \/ 0261-4000590",
    "address": "RS No 13\/A,Block No 21, TP-45, FP-50, Shop No C-1\/2 Ground Floor, Mahendra Park-C, Besides Roshini Fast Food, Opp Essar Petrol Pump, Jahangirpura-395009, Surat, Gujarat",
    "email_sale": "dharmarajauto@yahoo.co.in",
    "latitude": "21.239447",
    "longitude": "72.788732"
  },
  {
    "id": 472,
    "code": "359203",
    "trade_name": "Dharmaraj Automobiles Private Limited",
    "phone_number": "0261-4044304\/305, 9712530000",
    "address": "5 to 8, Krutika Row House, Nr, Ashok Pan Center, Opp. Raghuveer Bunglow, City Light, Surat - 395007",
    "email_sale": "dharmarajauto@yahoo.co.in",
    "latitude": "21.165768",
    "longitude": "72.793939"
  },
  {
    "id": 670,
    "code": "359205",
    "trade_name": "DHARMARAJ AUTOMOBILES PVT LTD",
    "phone_number": "76250 88805, 080-4455 4447",
    "address": "Shop No 33-34, Fortune Mall, THE SHOPING ISLAND, Near Galaxy Circle, PAL GAM, Surat-395009. Gujarat",
    "email_sale": "dharmarajauto@yahoo.co.in",
    "latitude": "21.192071",
    "longitude": "72.77604"
  },
  {
    "id": 706,
    "code": "96201",
    "trade_name": "DOON SUZUKI",
    "phone_number": "9897006128, 0135-2714509",
    "address": "65C, Rajpur Road, Behl Chowk, Dehradun - 248001, Uttarakhand",
    "email_sale": "dehradun.suzuki@gmail.com",
    "latitude": "30.333705",
    "longitude": "78.053049"
  },
  {
    "id": 441,
    "code": "97201",
    "trade_name": "DWARKA SUZUKI",
    "phone_number": "011-25331888\/ 9250010042 \/ 9250010043",
    "address": "A-48 Gulab Bagh, Nawada opposite Metro Pillar no. 748, Uttam Nagar, New Delhi-110059",
    "email_sale": "dwarkasuzuki@yahoo.com",
    "latitude": "28.621272",
    "longitude": "77.061327"
  },
  {
    "id": 438,
    "code": "97202",
    "trade_name": "DWARKA SUZUKI",
    "phone_number": "9811053742, 011-25022800, 8588876464\/65\/66",
    "address": "S - 4 & 5, NEW ROSHAN PURA, MAIN GURGAON ROAD, NAJAFGARH, NEW DELHI-110043",
    "email_sale": "dwarkasuzuki@yahoo.com",
    "latitude": "28.579466",
    "longitude": "76.945983"
  },
  {
    "id": 784,
    "code": "97209",
    "trade_name": "DWARKA SUZUKI",
    "phone_number": "7290046813-14, 011-40159998, 9811053742, 9212082501",
    "address": "I \/ 21, TILAK NAGAR, Near PNB, NEW DELHI - 110018",
    "email_sale": "tilaknagar@dwarkasuzuki.com,dwarkasuzuki@gmail.com",
    "latitude": "28.63965",
    "longitude": "77.09404"
  },
  {
    "id": 778,
    "code": "97210",
    "trade_name": "G L SUZUKI",
    "phone_number": "8800919404, 9311118755, 9311119755",
    "address": "SHOP NO -: 3699 &3700 , NETAJI SUBHASH MARG, NEAR SABZI MANDI , DARYA GANJ , NEW DELHI 110002",
    "email_sale": "glsuzuki@yahoo.com",
    "latitude": "28.614179",
    "longitude": "77.202266"
  },
  {
    "id": 502,
    "code": "212202",
    "trade_name": "G SQUARE SUZUKI",
    "phone_number": "8086400094 \/ 8086600092 \/ 8606060092",
    "address": "Marian Complex, Opposite AKJM School, NH-183, Near HDFC Bank, Dist. Kottayam, Kanjirapally-686507, Kerala",
    "email_sale": "ginskurian@gmail.com,gsquaresuzuki@gmail.com",
    "latitude": "9.713305",
    "longitude": "76.683045"
  },
  {
    "id": 452,
    "code": "217201",
    "trade_name": "GANESH SUZUKI",
    "phone_number": "09423776612 \/ 09423776614",
    "address": "Anil Motors Pvt Ltd. Shahu Chowk , Bidar Road , Udygir , Maharashtra . Pin - 413517",
    "email_sale": "ganesh.latursuzuki@gmail.com",
    "latitude": "18.408734",
    "longitude": "77.056446"
  },
  {
    "id": 780,
    "code": "97213",
    "trade_name": "GANPATI SUZUKI",
    "phone_number": "9350995899, 9810632869, (Nirbhay), 011-22801122",
    "address": "F-671, Khajuri Khas, Main Wazirabad Road, Near Bank of Baroda, Delhi - 110094 ",
    "email_sale": "ganpatisuzuki@gmail.com",
    "latitude": "28.7116",
    "longitude": "77.2292"
  },
  {
    "id": 1687,
    "code": "097216",
    "trade_name": "GANPATI SUZUKI",
    "phone_number": "9350995899",
    "address": "F-10, Khasra No 89\/1, Village Ghonda Gujran Khadar, Prasadi Mohalla, 3rd Pusta, New Usmanpur, Shahdara-110053, Delhi",
    "email_sale": "ganpatisuzuki@gmail.com",
    "latitude": "28.689572",
    "longitude": "77.267968"
  },
  {
    "id": 682,
    "code": "473201",
    "trade_name": "GEM SUZUKI",
    "phone_number": "9133392319",
    "address": "House No 1-44\/2, Plot No 93, Survey No 228 & 229\/1, Madinaguda, Serilingampally Mandal, Ranga Reddy District, Hyderabad-500049, Telangana",
    "email_sale": "hyderabad.gemmotors.sales@suzukidealers.net",
    "latitude": "17.504876",
    "longitude": "78.358481"
  },
  {
    "id": 705,
    "code": "400204",
    "trade_name": "GLOBAL SUZUKI",
    "phone_number": "8281112616, 0491 - 2542017 \/ 94447715758",
    "address": "II\/1007,1008,1009,1010,1012 &1013 Palakkad Kozhikode NH Near Kunthipuzha, Dist. Palakkad, Mannarkkad-678582, Kerala",
    "email_sale": "agmglobalsuzuki@gmail.com",
    "latitude": "10.993237",
    "longitude": "76.460997"
  },
  {
    "id": 497,
    "code": "280201",
    "trade_name": "GOLDEN SUZUKI",
    "phone_number": "0469-2615585, 9446505585 , 9446505586",
    "address": "Thundiyil Building. Aarattukadavu, Kuttoor P O, Thiruvalla, PIN:689106, KR",
    "email_sale": "thiruvallasuzukisales@gmail.com",
    "latitude": "9.390421",
    "longitude": "76.572594"
  },
  {
    "id": 496,
    "code": "280202",
    "trade_name": "GOLDEN SUZUKI",
    "phone_number": "9349543380, 04735-229900",
    "address": "Near RTO, Pullimukku, Ranni-689674, KR",
    "email_sale": "goldensuzuki.ranni@gmail.com",
    "latitude": "9.386569",
    "longitude": "76.785555"
  },
  {
    "id": 495,
    "code": "280203",
    "trade_name": "GOLDEN SUZUKI",
    "phone_number": "9349543390, 04868-251144",
    "address": "Kattappana Bye Pass PO, Iddukki District, Kattappana-685508, KR",
    "email_sale": "goldensuzuki.ktp@gmail.com",
    "latitude": "9.756835",
    "longitude": "77.116864"
  },
  {
    "id": 494,
    "code": "280204",
    "trade_name": "GOLDEN SUZUKI",
    "phone_number": "9946106981 , 9645140004, 04734-223323",
    "address": "PATHANAMTHITTA SUZUKI, NALUTHUNDIL BUILDING, THATTA ROAD, PANNIVIZA, ADOOR P O, PINCODE-691523, KR",
    "email_sale": "goldensuzuki.ranni@gmail.com",
    "latitude": "9.264758",
    "longitude": "76.787041"
  },
  {
    "id": 783,
    "code": "291210",
    "trade_name": "HEERA SUZUKI",
    "phone_number": "9923771175, 020-65115353, 020-69735353",
    "address": "Sr No. 91\/1, Hiraman Landge Niwas, Pune Nashik Road, Opp Jaya Marble, Bhosari,Panjarpol, Dist. Pune, - 411039, Maharashtra",
    "email_sale": "heerasuzuki@gmail.com",
    "latitude": "18.5196",
    "longitude": "73.8554"
  },
  {
    "id": 590,
    "code": "374202",
    "trade_name": "INDEL SUZUKI",
    "phone_number": "8111999100",
    "address": "VII\/310 A. Near Indian Coffee House, Akkikkavau PO, Dist. Thrissur, Kunnamkulam - 680523, Kerala",
    "email_sale": "indelsuzuki.kkm@gmail.com",
    "latitude": "10.651588",
    "longitude": "76.071099"
  },
  {
    "id": 775,
    "code": "374203",
    "trade_name": "INDEL SUZUKI",
    "phone_number": "9495603030 \/ 8111999100",
    "address": "VII\/310 A. Near Indian Coffee House, Akkikkavau PO, Dist. Thrissur, Kunnamkulam - 680523, Kerala",
    "email_sale": "indelsuzuki.kkm@gmail.com",
    "latitude": "10.651063",
    "longitude": "76.068659"
  },
  {
    "id": 434,
    "code": "164201",
    "trade_name": "JABALPUR SUZUKI",
    "phone_number": "0983590390 \/ 0761-4038882-3",
    "address": "Opp Bhanwar Tal Garden, Jabalpur Hospital Road, Napier Town-482002, Jabalpur, MP",
    "email_sale": "bharat_group@yahoo.com,jabalpursuzuki@yahoo.com",
    "latitude": "23.160238",
    "longitude": "79.931354"
  },
  {
    "id": 769,
    "code": "164202",
    "trade_name": "JABALPUR SUZUKI",
    "phone_number": "9893590392, 9630031118",
    "address": "11\/12, Bedi Nagar, Opp Reliance Petrol Pump, Nagpur Road, Sharda Chowk, Madan Mahal-482001, Jabalpur, Madhya Pradesh",
    "email_sale": "jabalpursuzuki@yahoo.com",
    "latitude": "23.154245",
    "longitude": "79.906416"
  },
  {
    "id": 731,
    "code": "412201",
    "trade_name": "JAIN'S SUZUKI",
    "phone_number": "044-22644001-002 \/ 9840273316 \/ 8190083334",
    "address": "No 41-A, Abirami Nagar, Irumbuliyar, GST Road, Tambaram West, Chennai - 600045, Tamil Nadu",
    "email_sale": "jainssuzuki@gmail.com",
    "latitude": "12.932281",
    "longitude": "80.12293"
  },
  {
    "id": 474,
    "code": "172201",
    "trade_name": "JAMNAGAR SUZUKI",
    "phone_number": "9638233433, 0286-2222631",
    "address": "Opp Grass Godown, Udyognagar Main road, Porbander-360576 , GJ",
    "email_sale": "dreamz_motors@yahoo.co.in",
    "latitude": "26.849967",
    "longitude": "75.77396"
  },
  {
    "id": 553,
    "code": "113201",
    "trade_name": "KANTIPUDI",
    "phone_number": "9248087726\/0884-2357273",
    "address": "#69-4-12 Opp: Boals club Sarpavaram Junction, PITHAPURAM ROAD, KAKINADA-533005, East Godavari, AP",
    "email_sale": "kantipudisuzuki@gmail.com,kantipudisuzuki@yahoo.co.in",
    "latitude": "17.028868",
    "longitude": "82.249107"
  },
  {
    "id": 442,
    "code": "301201",
    "trade_name": "KARAN AUTOMOBILES",
    "phone_number": "9993456789",
    "address": "PANDRI ROAD, BHAGAT PLAZA, NEAR LODHI PARA CHOWK, RAIPUR-492001, CG",
    "email_sale": "karanautomobiles@gmail.com",
    "latitude": "21.232989",
    "longitude": "81.658299"
  },
  {
    "id": 548,
    "code": "112201",
    "trade_name": "KARAN SUZUKI",
    "phone_number": "922920040 \/ 9179009000\/ 8602006333",
    "address": "Gurduwara Road, Beside SBI Bank, Durg- 490001, CG",
    "email_sale": "bhilaisuzuki@gmail.com",
    "latitude": "21.190449",
    "longitude": "81.284917"
  },
  {
    "id": 433,
    "code": "162201",
    "trade_name": "KHANDELWAL MOTORS",
    "phone_number": "9755666699, 0731-4086600",
    "address": "7-A Vaishali Nagar, Opp Dutt Mandir, Annapurna Main Road, Indore-452009",
    "email_sale": "sales@khandelwalmotors.in,bharat@khandelwalmotors.in",
    "latitude": "22.692145",
    "longitude": "75.838003"
  },
  {
    "id": 740,
    "code": "162203",
    "trade_name": "KHANDELWAL MOTORS",
    "phone_number": "0731-4980700, 626223636, 0731-4995900",
    "address": "112,113, Manpasand Colony, Kalani Nagar- Airport Road, Indore-452001, Madhya Pradesh",
    "email_sale": "khandelwalmotors.sales@gmail.com",
    "latitude": "22.725043",
    "longitude": "75.82373"
  },
  {
    "id": 523,
    "code": "88201",
    "trade_name": "Khwaja Suzuki",
    "phone_number": "7674885111, 08564257177",
    "address": "Khwaja Suzuki, Door no: 11\/589 Mydukur road, Proddatur-516360,(Cuddapah) AP:",
    "email_sale": "khwajaautomotives.proddatur@gmail.com",
    "latitude": "14.747032",
    "longitude": "78.55659"
  },
  {
    "id": 522,
    "code": "253202",
    "trade_name": "KPR SUZUKI",
    "phone_number": "0821 ? 2446677\/9686204353",
    "address": "L31\/1, FIVE LIGHTS CIRCLE, LASHKAR MOHALLA, MYSORE - 570001",
    "email_sale": "mysoresuzuki@gmail.com",
    "latitude": "12.318114",
    "longitude": "76.659425"
  },
  {
    "id": 1685,
    "code": "264105",
    "trade_name": "KUBERA SUZUKI",
    "phone_number": "9022659035 (Landline), 7391966744 (Mobile)",
    "address": "Showroom : Ground Floor Survey No 188\/2A\/5- 188\/2A\/13,  Mamta Pride , Near Haldi Lawns , Opp swami Narayan Mandir,                                                                  New Adgaon Naka, Panchvati, Nashi Shivar, Nashik, 422003, Maharashtra\r\n<br\/>\r\nWorkshop : Plot No 14, Bappa Sitaram Road , Behind  Adgaon Naka, Near Aurangabad Naka, Nashik 422003, Maharashtra    ",
    "email_sale": "kuberasuzuki@gmail.com",
    "latitude": "9.923840",
    "longitude": "78.141190"
  },
  {
    "id": 1686,
    "code": "402101",
    "trade_name": "LAKSHMI SUZUKI",
    "phone_number": "9844255540, 8431846360",
    "address": "#1342\/5 &5A, Beside PSS Plaza, Ranganatha Badavane, Hadadi Road, Davangere-577005, Karnataka",
    "email_sale": "kalleshwaramotors@gmail.com",
    "latitude": "14.4499552",
    "longitude": "75.9202965"
  },
  {
    "id": 546,
    "code": "232201",
    "trade_name": "MANGATTIL SUZUKI",
    "phone_number": "0494-2641888, 07356449966 \/ '0494-2425199,2426199, 9995470000, 8139062501",
    "address": "9\/270,271, NH-17, Vee Pee Complex, Calicut Road, Meempara, Dist. Mallapuram, Valancherry-676552 , Kerala",
    "email_sale": "mangattilsuzuki@gmail.com",
    "latitude": "10.782101",
    "longitude": "75.932629"
  },
  {
    "id": 733,
    "code": "232203",
    "trade_name": "MANGATTIL SUZUKI",
    "phone_number": "8086525555",
    "address": "42\/554-B,C, Calicut Road, Thurakkal Bapputty Bypass Road, Manchery Municipality, Near A M Motors, Manjeri-676121, Kerala",
    "email_sale": "gm.mangattilsuzuki@gmail.com",
    "latitude": "11.118937",
    "longitude": "76.112108"
  },
  {
    "id": 722,
    "code": "75203",
    "trade_name": "MOHAN MOTOR",
    "phone_number": "8585048494, 9831639393, 9007013785",
    "address": "Ecosuite Business Tower, First Floor,plot-II-D\/22, Action Area-ll, New-Town, Street No 676 & 775, Rajarhat, Kolkata-700156, WB",
    "email_sale": "sales@mohanmotorsuzuki.com",
    "latitude": "22.6221767",
    "longitude": "88.4554224"
  },
  {
    "id": 1755,
    "code": "265101",
    "trade_name": "NAVASARI SUZUKI",
    "phone_number": "9227901100, 957400994",
    "address": "Shop No 5,6,7,8 First & Ground Floor, Besides Swadisht Hotel, NH No 8, Village Thala, Dist. Navsari, Chikhli-396521, Gujarat",
    "email_sale": "navsari9_Suzuki@rediffmail.com, bansalkishore@yahoo.com",
    "latitude": "20.948152",
    "longitude": "72.95574"
  },
  {
    "id": 781,
    "code": "34213",
    "trade_name": "NINESTAR SUZUKI",
    "phone_number": "7625088805, 080-44554447",
    "address": "Survey No 183, (BBMP No 567,, 645f\/2), Doresanipalya, Anthappa Layout, Bilekekahalli junction, Near IIM, Phase-IV, J P Nagar, Bannerghatta Main Road, Bangalore-560075, KN",
    "email_sale": "info@ninestarsuzuki.com",
    "latitude": "12.757608",
    "longitude": "77.656137"
  },
  {
    "id": 1743,
    "code": "34113",
    "trade_name": "ORION SUZUKI",
    "phone_number": "9945083900",
    "address": "Door No 6, 1st & 2nd floor, Veracious Presidio, 100ft Ring Road, 15th Cross, 6th Phase, J P Nagar, Opp Renault Showroom, Bangalaru-560078, Karnataka",
    "email_sale": "orionmotomart@gmail.com",
    "latitude": "12.9062125",
    "longitude": "77.5806847"
  },
  {
    "id": 606,
    "code": "114201",
    "trade_name": "PADMAJA SUZUKI",
    "phone_number": "9505867888 \/9951134999 \/ 08674-244449 \/ 08674-244446",
    "address": "Door No 16, 386A, Pammaru Road, Dist. Krishna, Gudiwada--521301, Andhra Pradesh",
    "email_sale": "pcc.padmajasuzukigdv@gmail.com",
    "latitude": "16.352676",
    "longitude": "80.954285"
  },
  {
    "id": 662,
    "code": "214201",
    "trade_name": "PADMAJA SUZUKI",
    "phone_number": "9035609333",
    "address": "Old door No.1\/119 & new Door No 9-68, Ashok Nagar, M G Road, Patamata, District Krishna, Pin-520010, AP",
    "email_sale": "padmajacc@gmail.com,ceopadmajasuzuki@gmail.com",
    "latitude": "16.493585",
    "longitude": "80.664156"
  },
  {
    "id": 785,
    "code": "392205",
    "trade_name": "PADMAJA SUZUKI",
    "phone_number": "8886617022 ,8886617024-25, 9885794646",
    "address": "Showroom: Varun Point, 35-05-88\/1, NH-5, Beside Petrol Bunk, Muralinagar, Vishakapatnam - 530007, Andhra PradeshWorkshop : Plot No D12,Industrial Estate ,Murali nagar-530007",
    "email_sale": "pcc.suzuki@gmail.com,pccvizag@gmail.com",
    "latitude": "17.818731",
    "longitude": "83.195453"
  },
  {
    "id": 739,
    "code": "392206",
    "trade_name": "PADMAJA SUZUKI",
    "phone_number": "7032097762 \/ 9885794646 \/ 9885922622",
    "address": "Dr No 7-8-1\/1, TS No 1012 & 1013. Block 40, Varun Towers, Kasturba Marg, Siripuram, Vishakapatnam-530007, AP",
    "email_sale": "pcc.srpm@gmail.com,padmajasuzukivizag@gmail.com",
    "latitude": "17.719718",
    "longitude": "83.319524"
  },
  {
    "id": 542,
    "code": "110202",
    "trade_name": "PAI SALES",
    "phone_number": "0824-2453733 \/ 7411573777\/ 9845083804",
    "address": "V Square Building, Near Bank of Baroda, Kulur Ferry Road, Urwa, Chilimbi, Mangalore-575006, KN",
    "email_sale": "paisales@gmail.com",
    "latitude": "12.873857",
    "longitude": "74.850472"
  },
  {
    "id": 508,
    "code": "400201",
    "trade_name": "PALAKKAD SUZUKI",
    "phone_number": "09539590590, 9946100007; 0491-2572233",
    "address": "9\/517, Naz Plaza, M.M. Nazar Complex, PWD Road, Aamakkulam, Vadakkancherry, Dist-Palakkad, Vadakkancherry-678683, Kerala",
    "email_sale": "palakkadsuzuki@yahoo.co.in",
    "latitude": "10.78673",
    "longitude": "76.654793"
  },
  {
    "id": 456,
    "code": "304202",
    "trade_name": "PATEL SUZUKI",
    "phone_number": "9974100707, 9724800404, 9724322282",
    "address": "Shop No 1,2, Aakanksha Complex, 11-Vijay Plot Corner, Near Suryakant Hotel, Opp. Jay Kay House, Gondal Road, Rajkot-360002, Gujarat.",
    "email_sale": "gmsales.patelsuzuki@gmail.com",
    "latitude": "22.2163",
    "longitude": "70.8014"
  },
  {
    "id": 681,
    "code": "304206",
    "trade_name": "PATEL SUZUKI",
    "phone_number": "9724322282",
    "address": "Beside Aditya Motors, Opp Rajkamal Petrol Pump, Near Gondal Chowkdi, Gondal Road, Rajkot-360004, Gujarat",
    "email_sale": "gmsales.patelsuzuki@gmail.com",
    "latitude": "22.238444",
    "longitude": "70.800494"
  },
  {
    "id": 488,
    "code": "116201",
    "trade_name": "PEAK SUZUKI",
    "phone_number": "8754010668, Sales-9944760000,9500990668\/ Service-9952555000",
    "address": "1\/3-8, CHB Colony Street No.-4,Near Konguvelalar Mandapam, Velur Road, Tiruchengode-637211",
    "email_sale": "peaksuzuki.erode@gmail.com",
    "latitude": "11.371271",
    "longitude": "77.890825"
  },
  {
    "id": 487,
    "code": "116202",
    "trade_name": "PEAK SUZUKI",
    "phone_number": "894507668 Showroom 9944860000 Workshop 9952444000",
    "address": "NO.59, NEHRU STREET, (OPP. TO SEETHA KALYANA MANDAPAM), ERODE MAIN ROAD, GOBICHETTIPALAYAM - 638476.",
    "email_sale": "peaksuzuki.gobi@gmail.com",
    "latitude": "11.45041",
    "longitude": "77.430036"
  },
  {
    "id": 763,
    "code": "116203",
    "trade_name": "PEAK SUZUKI",
    "phone_number": "7338845664",
    "address": "134\/A, Near Annamaar Petrol Bunk, Karur Byepass Main Road, Moolapalayam, Dist. Erode-638002, TN",
    "email_sale": "peaksuzki.mplm@gmail.com,erode.peak.sales@suzukidealers.net",
    "latitude": "11.315694",
    "longitude": "77.730901"
  },
  {
    "id": 460,
    "code": "5207",
    "trade_name": "PETAL SUZUKI",
    "phone_number": "079-4005766\/27498989\/40057581",
    "address": "Ground Floor, Swagat Plaza, Ambali- Bopal Road, Bopal-380058, Ahmedabad, GJ",
    "email_sale": "petalsuzukisales3@groupplanetpetal.com,petalsuzukiservice3@groupplanetpetal.com",
    "latitude": "23.025840",
    "longitude": "72.476440"
  },
  {
    "id": 467,
    "code": "5209",
    "trade_name": "PETAL SUZUKI",
    "phone_number": "9825009341",
    "address": "GROUND FLOOR, 107 & 108 SIGNATURE-2, Nr, SARKHEJ CROSS ROAD, OPP RELIEF HOTEL, SARKHEJ, AHMEDABAD 380055.",
    "email_sale": "petalsuzuki.dgm@gmail.com",
    "latitude": "22.979771",
    "longitude": "72.492711"
  },
  {
    "id": 607,
    "code": "5214",
    "trade_name": "PETAL SUZUKI",
    "phone_number": " 079-4005766 \/ 40057581",
    "address": "6,7, Camps Corner, Opp. Sales India, Prahalad Nagar, Satelite, Dist. Ahmedabad-380015, Gujarat",
    "email_sale": "petalsuzuki@gmail.com",
    "latitude": "23.011627",
    "longitude": "72.507018"
  },
  {
    "id": 464,
    "code": "5203",
    "trade_name": "PLANET SUZUKI",
    "phone_number": "9825303181",
    "address": "18-19-20, Madhuram Park Near Geeta Gauri Cinema, Sonini chal, Odhav-382415, Ahmedabad, GJ",
    "email_sale": "planetsuzukiodhav@gmail.com,planetodhavsales@groupplanetpetal.com",
    "latitude": "23.021047",
    "longitude": "72.642362"
  },
  {
    "id": 473,
    "code": "359201",
    "trade_name": "PRIDE SUZUKI",
    "phone_number": "0261-6560919, 9099965596",
    "address": "Chamunda Nagar, Near Adarsh Soc., Laxmikant Ashram Main Road, Katargam, SURAT-395006",
    "email_sale": "pridesuzuki.katargam@gmail.com",
    "latitude": "21.235231",
    "longitude": "72.832699"
  },
  {
    "id": 471,
    "code": "359202",
    "trade_name": "PRIDE SUZUKI",
    "phone_number": "091-8866063967- Showroom, 091-9099965598- Mr. Sanjaybhai",
    "address": "Pride Suzuki, Khan Empire, Opp. Golden Hotel, Bardoli-Surat Road, Bardoli-394601, GJ",
    "email_sale": "pridesuzuki@gmail.com.",
    "latitude": "21.118499",
    "longitude": "73.092554"
  },
  {
    "id": 475,
    "code": "242201",
    "trade_name": "RACE SUZUKI",
    "phone_number": "9638539671, 08905212696",
    "address": "Near Patel Tower, Unjha-Palanpur Highway-road, ,Near Unjha Chowk, Unjha -384170, GJ",
    "email_sale": "mehsanasuzuki06@rediffmail.com",
    "latitude": "23.806316",
    "longitude": "72.384387"
  },
  {
    "id": 786,
    "code": "162202",
    "trade_name": "RAJ SUZUKI",
    "phone_number": "0731-4976373, 09109101110 ",
    "address": "G-1 & G-2,Gravity Mall,Mamandir, Miniplex, Bhamori, Vijay Nagar , Dist. Indore-452010, Madhya Pradesh",
    "email_sale": "rajsuzukivijaynagar@gmail.com",
    "latitude": "22.753148",
    "longitude": "75.894163"
  },
  {
    "id": 528,
    "code": "10201",
    "trade_name": "RAJAVALSAM SUZUKI",
    "phone_number": "9961410308",
    "address": "NEAR PUMP JUNCTION, AROOR PO, CHERTHALA TALUK, PINCODE-688534, KR",
    "email_sale": "dileep.suzuki@gmail.com,rajavalsam.suzuki@gmail.com",
    "latitude": "9.470412",
    "longitude": "76.327547"
  },
  {
    "id": 531,
    "code": "10203",
    "trade_name": "RAJAVALSAM SUZUKI",
    "phone_number": "8589043477,8138907074, 8589043431,8589004343, 8589043438 \/ 0477-2267818 \/ 09961410308\/ 99452055771",
    "address": "Near Saraswathi Temple, Thattarambalam, Dist. Allappuzha, P.O Mavelikara-690103, KR",
    "email_sale": "rajavalsam.mvl@gmail.com,apillai47@gmail.com,rajavalsam.suzuki@gmail.com",
    "latitude": "9.470412",
    "longitude": "76.327547"
  },
  {
    "id": 782,
    "code": "10204",
    "trade_name": "RAJAVALSAM SUZUKI",
    "phone_number": "8589043438, 0477-2267818, 99452055771, 9745851121",
    "address": "Shabhodra Complex, Nr Karthiyayini Hotel, Ottapunna Junction, Cherthala PO, Dist- Alappuzha, Cherthala-688524, Kerala",
    "email_sale": "rajavalsam.suzuki@gmail.com",
    "latitude": "9.68444",
    "longitude": "76.3356"
  },
  {
    "id": 529,
    "code": "10205",
    "trade_name": "RAJAVALSAM SUZUKI",
    "phone_number": ": 8138007073\/ 8589043432\/ ,8589004343 \/ 8589043438; 0477-2267818; 99452055771",
    "address": "Near Palamood Junction, Charummoodu PO, Nooranad Panchayat, Dist-Alappuzha, Charummoodu-690505, Kerala",
    "email_sale": "rajavalsam.chmd@gmail.com,rajavalsam.suzuki@gmail.com",
    "latitude": "9.172371",
    "longitude": "76.608055"
  },
  {
    "id": 530,
    "code": "10206",
    "trade_name": "RAJAVALSAM SUZUKI",
    "phone_number": "8138007075 \/ 04792413440,\/ 8589043438 \/ 99452055771\/ 04734-256544",
    "address": "Near Kacheri Junction, P.O. Haripad, Dist.Alleppey (ALLAPUZHA), Haripad-690514, Kerala",
    "email_sale": "rajavalsam.hpd@gmail.com,pillai47@gmail.com",
    "latitude": "9.281531",
    "longitude": "76.453417"
  },
  {
    "id": 484,
    "code": "202201",
    "trade_name": "RAYAPUDI SUZUKI",
    "phone_number": "9247052577 \/9885456105",
    "address": "4-5\/1A, Opposite Pala Kendram, Laxmidevi Pally, Kothagudem-507101, Dist: Khammam, Andhra Pradesh",
    "email_sale": "raypudisuzuki@gmail.com",
    "latitude": "17.556004",
    "longitude": "80.614396"
  },
  {
    "id": 1714,
    "code": "97109",
    "trade_name": "RDB SUZUKI",
    "phone_number": "9999663532, 9811014630",
    "address": "Branch : E-49\/7, Okhla Phase-2, New Delhi-110020",
    "email_sale": "anilbansal.rdb@gmail.com,rdbsuzuki@gmail.com",
    "latitude": "28.531640",
    "longitude": "77.276010"
  },
  {
    "id": 439,
    "code": "97204",
    "trade_name": "RDB Suzuki",
    "phone_number": "9711262314 \/  9999663532 \/  9711262056",
    "address": "C-198-199, Pul Prehladpur, MB road, Badarpur, New Delhi-110044",
    "email_sale": "anilbansal.rdb@gmail.com,rdbsuzuki@gmail.com",
    "latitude": "28.511837",
    "longitude": "77.251002"
  },
  {
    "id": 436,
    "code": "97206",
    "trade_name": "RDB SUZUKI",
    "phone_number": "011-41706608 \/  8860451818 \/ 9999663532",
    "address": "R-1A, Ansal Chamber-1, Bikaji Cama Place, New Delhi-110066",
    "email_sale": "rdbsuzuki@gmail.com,delhi.rdb.ceo@suzukidealers.net, ankitbansal.rdb@gmail.com",
    "latitude": "28.568739",
    "longitude": "77.188877"
  },
  {
    "id": 453,
    "code": "247203",
    "trade_name": "RIYA SUZUKI",
    "phone_number": "9769868222 , 9769137222, 022-27644422 , 022-27644411 \/ 9619831025",
    "address": "Shop 2,3,4,5,6 Shiv Parvati Appartemnet , Sector-9 near D-Mart, Airoli, Navi Munbai-400708",
    "email_sale": "riyamotors@hotmail.com,riya.suzuki@gmail.com",
    "latitude": "19.145443",
    "longitude": "72.991083"
  },
  {
    "id": 777,
    "code": "97208",
    "trade_name": "ROHINI SUZUKI",
    "phone_number": "98911112755",
    "address": "A-30, Krishan Vihar,Kanjhawla Road, Delhi-110086",
    "email_sale": "glimpex55@gmail.com",
    "latitude": "27.8827",
    "longitude": "78.2237"
  },
  {
    "id": 486,
    "code": "79201",
    "trade_name": "ROONWAL SUZUKI",
    "phone_number": "044-2529 0317\/ 2529 2118 \/25350317",
    "address": "Sri Roonwal Motors Pvt Ltd,68,Waltax Road,Sowcarpat, Chennai - 600079",
    "email_sale": "roonwalsuzuki@yahoo.com",
    "latitude": "13.08268",
    "longitude": "80.270718"
  },
  {
    "id": 545,
    "code": "84201",
    "trade_name": "S & S SUZUKI",
    "phone_number": "08572-246233 \/ 9000940008 \/ 9959429444\/",
    "address": "Shop No.4,5 and 6,Door No.22 229\/33, Tirupati Road, Kattamanchi, CHITTOOR - 517001, Andhra Pradesh",
    "email_sale": "garudasuzuki@gmail.com",
    "latitude": "13.24994",
    "longitude": "79.102343"
  },
  {
    "id": 701,
    "code": "131201",
    "trade_name": "S R SUZUKI",
    "phone_number": "7065563003",
    "address": "B--147 Sector -10, Dist. Gautam Budh Nagar, Noida - 201301 Uttar Pradesh",
    "email_sale": "sr.suzukinoida@gmail.com",
    "latitude": "28.58212",
    "longitude": "77.326699"
  },
  {
    "id": 478,
    "code": "308202",
    "trade_name": "SABOO SUZUKI",
    "phone_number": "040-65457777\/ 9248011111\/9393477777",
    "address": "Shop No. 7 to 9, M.D.R. Arcade , Plot no. 56 to 59, Survey no. 201, Malani Co- operative Housing Building Society Ltd., Chinna Thokatta Village, New Bowenpally -500011, Secunderabad, Telangana",
    "email_sale": "bowenpally@saboo.me",
    "latitude": "17.459563",
    "longitude": "78.478036"
  },
  {
    "id": 479,
    "code": "308204",
    "trade_name": "SABOO SUZUKI",
    "phone_number": "9248077777\/9248077777, 040-65457777",
    "address": "26-139, St. No.1, Row.2, Safilguda X Road, Malkajgiri-500047, Secunderabad, Telangana",
    "email_sale": "malkajgiri@saboo.in.",
    "latitude": "17.463666",
    "longitude": "78.53916"
  },
  {
    "id": 1715,
    "code": "185101",
    "trade_name": "SAINI KANGRA SUZUKI",
    "phone_number": "9882168216, 01892-260413",
    "address": "Branch : V P O Arla, Near Railway Crossing, Palampur, Kangra-176102, Himachal Pradesh",
    "email_sale": "sainisuzuki@gmail.com",
    "latitude": "32.0829279",
    "longitude": "76.5049461"
  },
  {
    "id": 490,
    "code": "320201",
    "trade_name": "SALEM SUZUKI",
    "phone_number": "94432 41189",
    "address": "115,Vedigounder colony,Bye-Pass Road, Opp:Nedunsalai Nagar,Salem-636005",
    "email_sale": "ammantwowheelers@yahoo.co.in,senthil_safea@yahoo.co.in",
    "latitude": "11.603683",
    "longitude": "78.150742"
  },
  {
    "id": 514,
    "code": "34201",
    "trade_name": "SAPTAGIRI SUZUKI",
    "phone_number": "9845029331, 080-23183700\/701\/702.",
    "address": "56\/1, Cheluva Complex, Magadi Main Road, Kottigepalya (Opp Bus Stop) Viswaneedam Post, Banglore-560091",
    "email_sale": "dr_rajkumar_road_suzuki@yahoo.co.in",
    "latitude": "13.000327",
    "longitude": "77.549709"
  },
  {
    "id": 516,
    "code": "34206",
    "trade_name": "SAPTAGIRI SUZUKI",
    "phone_number": "9845029331 \/ 080-28395711-12-13",
    "address": "No. 2 T Dasarahalli Main Road, Near Old Check Post, Tumkur Road, NH-4, Bangalore-560057 , KN",
    "email_sale": "jshree.kumar@gmail.com,saptagiri_suzuki@yahoo.com",
    "latitude": "13.05518",
    "longitude": "77.602465"
  },
  {
    "id": 515,
    "code": "34208",
    "trade_name": "SAPTAGIRI SUZUKI",
    "phone_number": "9686988557 \/ 9686576355 \/ 9845029331",
    "address": "Ground Floor, Katha No. 650\/A & 650\/B, Survey No. 126\/2, Opp. Vishwa Vijaya Vittala Kalyan Mantapa, Near Ashrama Bus Stop, Arsinakunte Village, Kasaba Hobli, Bangalore Rural District, Nelamangala-562123, Karnataka",
    "email_sale": "saptagiri_suzuki@yahoo.com",
    "latitude": "13.087419",
    "longitude": "77.411006"
  },
  {
    "id": 517,
    "code": "34209",
    "trade_name": "SAPTAGIRI SUZUKI",
    "phone_number": "9844417737\/9740820224\/ 9845029331 \/ 080-22381444\/22381555\/22381666",
    "address": "No 1\/1, Ground Floor, Jeevan Building, Kuamara Park East,Near Shivananda Circle, Sheshadripuram, Bangalore-560020, KN",
    "email_sale": "saptagirisuzuki@yahoo.com",
    "latitude": "12.993533",
    "longitude": "77.57874"
  },
  {
    "id": 526,
    "code": "144202",
    "trade_name": "SARIPUDI SUZUKI",
    "phone_number": "9399944333 \/ 08632264355",
    "address": "Old R.T.O office building ,Main road , Pattabhipuram-522007, AP",
    "email_sale": "anil@saripudisuzuki.com",
    "latitude": "16.309217",
    "longitude": "80.416846"
  },
  {
    "id": 450,
    "code": "327201",
    "trade_name": "SATARA SUZUKI",
    "phone_number": "02166-223249, 08806344502",
    "address": "Sagunamatanagar , Lonand Phaltan Road, Jinti Naka, PHALTAN- 415523",
    "email_sale": "gajananautosatara@yahoo.co.in",
    "latitude": "17.984451",
    "longitude": "74.436042"
  },
  {
    "id": 768,
    "code": "359207",
    "trade_name": "SEEMA SUZUKI",
    "phone_number": "7573917771",
    "address": "Plot No 8,9, Near Bhakti Dham Mandir, Opp Mahavir Textile Market, Surat, Kadodara Main Road, Magob , Puna Kumbharia-Parvatpatiya, Surat-395010, Gujarat",
    "email_sale": "seemasuzuki@gmail.com",
    "latitude": "21.193635",
    "longitude": "72.870789"
  },
  {
    "id": 774,
    "code": "38201",
    "trade_name": "SHAIBA SUZUKI",
    "phone_number": "9800425680\/ 9800465580\/ 9800892525\/ 9332145638\/ 8509598669\/ 7872526526",
    "address": "Beside Signature Hotel , Ushagram, B.B.College More, Dist-Burdwan, Asansol, Pin-713303, West Bengal",
    "email_sale": "shaiba.suzuki@gmail.com",
    "latitude": "24.0875",
    "longitude": "86.8353"
  },
  {
    "id": 444,
    "code": "291201",
    "trade_name": "SHIV SUZUKI",
    "phone_number": "020-65101515, 09049042200",
    "address": "Gulmohor building, Kalewadi Phata, Thergaon, Chinchwad, Pune-411033",
    "email_sale": "sales@shivsuzuki.com",
    "latitude": "18.633205",
    "longitude": "73.8051"
  },
  {
    "id": 437,
    "code": "97207",
    "trade_name": "SHRISHAKTI SUZUKI",
    "phone_number": "8800398634 , 8800398635, 011-22004800, 22005400",
    "address": "C-92, South Ganesh Nagar, Delhi-110092",
    "email_sale": "md@shrishaktisuzuki.in\/delhi.mdmotors.sales@suzukidealers.net",
    "latitude": "28.620906",
    "longitude": "77.281413"
  },
  {
    "id": 449,
    "code": "6201",
    "trade_name": "SIDDHESH MOTORS",
    "phone_number": "09970342160\/ 9326415005",
    "address": "Opp. Oza Petrol Pump, Sangamner Road, At Post & Taluka- Shrirampur, Distt- Ahmednagar, Maharashtra-371509",
    "email_sale": "siddheshmotors@rediffmail.com",
    "latitude": "19.095208",
    "longitude": "74.749592"
  },
  {
    "id": 544,
    "code": "524201",
    "trade_name": "SONI SUZUKI",
    "phone_number": "09814302493, 8968558408, 9023694555",
    "address": "Near JR Theater, Ropar Chandigarh Road, Dist. Rupnagar, Ropar-140001, Punjab",
    "email_sale": "soniautodealersnangal@gmail.com",
    "latitude": "30.965917",
    "longitude": "76.523023"
  },
  {
    "id": 549,
    "code": "396201",
    "trade_name": "SRI KRISHNA MOTORS",
    "phone_number": "9393794848 , 9348393552",
    "address": "DR NO. 3-6-5 , Town Railway St. Road, Sivaraopet, Bhimavaram-534202, Andhra Pradesh",
    "email_sale": "slkelr@hotmail.com",
    "latitude": "16.544893",
    "longitude": "81.521241"
  },
  {
    "id": 550,
    "code": "396202",
    "trade_name": "SRI KRISHNA MOTORS",
    "phone_number": "9393494846",
    "address": "Dr No: PAIDIPARRU, TANUKU, West Godavari Dist. AP-534211",
    "email_sale": "seshunara@yahoo.co.in",
    "latitude": "16.752491",
    "longitude": "81.705421"
  },
  {
    "id": 758,
    "code": "152201",
    "trade_name": "TRUST SUZUKI",
    "phone_number": "9760039145 \/ 7088110174",
    "address": "Near A to Z Workshop, Hotel Khanna, Sonali Bridge, Haridwar Road, Roorkee-247884, Uttarkhand",
    "email_sale": "haridwar.trust.sales@suzukidealers.net,tarun.trust@gmail.com",
    "latitude": "29.88269",
    "longitude": "77.929392"
  },
  {
    "id": 735,
    "code": "378201",
    "trade_name": "UDAIPUR SUZUKI",
    "phone_number": "7726008818 \/ 9414024197\/ 02494-2461484",
    "address": "Main 100 Feet Road, R K Circle, Pula Shbhagpura Road, Fatehpura, Udaipur-313001, Rajasthan",
    "email_sale": "udaipur.suzuki@gmail.com",
    "latitude": "24.606925",
    "longitude": "73.704175"
  },
  {
    "id": 440,
    "code": "97205",
    "trade_name": "UMANG AUTO",
    "phone_number": "011-27029991, 27029998, 9266078000, 9810416600,9868701172",
    "address": "KH-NO.- 1143\/2, Main Road, Ground floor, Village-Rithala,(Near Rithala Metro Station), Delhi-110086,",
    "email_sale": "umangmotors@yahoo.co.in,delhi.umang.sales@suzukidealers.net,delhi.umang.ceo@suzukidealers.net",
    "latitude": "28.701985",
    "longitude": "77.078869"
  },
  {
    "id": 779,
    "code": "97211",
    "trade_name": "UMANG AUTO",
    "phone_number": "9999288055, 8459464512, 9810416600, 27029991",
    "address": "C-280, Rajdhani Enclave, Mahendra Park Chowk, RANI BAGH - 110034, DELHI",
    "email_sale": "umangmotors.ranibagh@gmail.com,umangmotors@yahoo.co.in",
    "latitude": "28.685982",
    "longitude": "77.132525"
  },
  {
    "id": 519,
    "code": "34204",
    "trade_name": "VALUE SUZUKI",
    "phone_number": "9945873848 \/ 080-42796777",
    "address": "Value Suzuki,No 2, 1 st Main Road, MIG,Yelahanka New Town,Bangalore -560064",
    "email_sale": "valuesuzuki@gmail.com",
    "latitude": "13.100485",
    "longitude": "77.594013"
  },
  {
    "id": 443,
    "code": "66201",
    "trade_name": "VARUN SUZUKI",
    "phone_number": "7.39e19",
    "address": "FRONT OF MADANLAL PETROL PUMP,CHAMPA ROAD,JANJGIR-CHAMPA-495668 (C.G)",
    "email_sale": "varunsuzuki.janjgir@gmail.com",
    "latitude": "22.015334",
    "longitude": "82.595328"
  },
  {
    "id": 551,
    "code": "115202",
    "trade_name": "VTJ SUZUKI",
    "phone_number": "8606971902, 0484 3193362",
    "address": "VTJ Suzuki,Near BOT Bridge,Opp ICIC Bank,Thoppumpady,Cochin - 682006",
    "email_sale": "salesmanager@vtjsuzuki.com",
    "latitude": "9.913073",
    "longitude": "76.276875"
  },
  {
    "id": 509,
    "code": "115204",
    "trade_name": "VTJ SUZUKI",
    "phone_number": "8606244411 , 8606971902, 9745430001; 0484-4230523",
    "address": "Pallithazham, Opposite MORE Supermarket, District Ernakulam, Mulanthuruthy-682314, Kerala",
    "email_sale": "mlty.sales@vtjsuzuki.com,md@vtjsuzuki.com",
    "latitude": "9.898397",
    "longitude": "76.383986"
  }
];

const createFile = (dealers) => {
  console.info('Create File')
  const fs = require('fs');
  const totalDealers = dealers.length;
  const headers = `"Dealer Name","Dealer Type","Address","City","State","Pincode","Contact","Email"\n`;
  const fileName = 'suzuki-motorcycle-dealers.csv';
  let write = [];
  // fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;})

  for (i = 0; i < totalDealers; i++) {
    let dealer = dealers[i];
    write.push(`"${dealer.trade_name.trim()}","Branch","${dealer.address.trim().replace(/[\r\n]+/g," ")}","${dealer.city.trim()}","${dealer.state.trim()}","${dealer.pincode.trim()}","${dealer.phone_number.trim() || ''}","${dealer.email_sale.trim() || ''}"`);
    if (i%50 == 0) {
      let temp = write.join('\n') + '\n';
      fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
      write = [];
    }
  };

  let temp = write.join('\n') + '\n';
  fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
  write = [];
}

const getData = async (dealers) => {
  const apiUrl = 'http://www.postalpincode.in/api/pincode/';
  const totalDealers = dealers.length;
  
  for (let i = 0; i < totalDealers; i++) {
    console.info('Start', i + 1);
    let dealer = dealers[i];
    let pincode = dealer.address.trim().match(/\d{6}/)[0];
    let request = await fetch(apiUrl + pincode);
    let response = await request.json();
    dealer.city = response.Status != 'Error' ? response.PostOffice[0].District : '';
    dealer.state = response.Status != 'Error' ? response.PostOffice[0].State : '';
    dealer.pincode = pincode;
    console.info('End', i + 1);
  }
  
  createFile(dealers);
}

getData(dealers);