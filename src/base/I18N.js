const BASE_LANG = "en";

let lang = "en";

const DICTIONARY = {
  si: {
    "Parliament of Sri Lanka": "ශ්‍රී ලංකා පාර්ලිමේන්තුව",
    "The Parliament of Sri Lanka": "ශ්‍රී ලංකා පාර්ලිමේන්තුව",
    "App & Visualization by": "යෙදුම සහ දෘශ්‍යකරණය",
    "Data from": "දත්ත",
  },
};

export function t(s) {
  if (lang === BASE_LANG) {
    return s;
  }
  if (!DICTIONARY[lang]) {
    console.error("Missing lang", lang);
    return s;
  }

  if (!DICTIONARY[lang][s]) {
    console.error(`Missing word(${lang}): ${s}`);
    return s;
  }

  return DICTIONARY[lang][s];
}
