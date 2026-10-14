export type LanguageCode = "en" | "hi" | "gu";

export type LanguageOption = {
  code: LanguageCode;
  name: string;
  nativeName: string;
  shortName: string;
};

export const SETTINGS_LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    shortName: "EN",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    shortName: "हि",
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    shortName: "ગુ",
  },
];
