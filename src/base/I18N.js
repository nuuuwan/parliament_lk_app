import SINHALA_DICTIONARY from "./SINHALA_DICTIONARY.js";
import TAMIL_DICTIONARY from "./TAMIL_DICTIONARY.js";
const BASE_LANG = "en";

const DICTIONARY = {
  si: SINHALA_DICTIONARY,
  ta: TAMIL_DICTIONARY,
};

export const LANG_TO_LABEL = {
  si: "සිංහල",
  ta: "தமிழ்",
  en: "English",
};

export default class I18N {
  constructor(lang) {
    this.lang = lang;

    if (lang != BASE_LANG && !DICTIONARY[this.lang]) {
      console.error("Missing lang", this.lang);
    }
  }

  setLang(lang) {
    this.lang = lang;
  }

  t(s) {
    if (this.lang === BASE_LANG) {
      return s;
    }

    if (!DICTIONARY[this.lang][s]) {
      console.error(s);
      return s;
    }

    return DICTIONARY[this.lang][s];
  }
}
