import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import parse from "html-react-parser";

import enText from "../assets/translations/en.json";
import sloText from "../assets/translations/sl.json";
import { ReactNodeProps } from "../types/PropTypes";
import { Language } from "../types/enums";

type LanguageContextType = {
  language: string;
  toggleLanguage: () => void;
  changeLanguage: (newLanguage: Language) => void;
  text: Record<string, Record<string, string>>;
  formatTextWithLineBreaks: (text: string) => ReactNode[];
  formatHtml: (html: string) => ReactNode | string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: Language.ENGLISH,
  toggleLanguage: () => {},
  changeLanguage: () => {},
  text: {},
  formatTextWithLineBreaks: () => [],
  formatHtml: () => "",
});

export function LanguageProvider({ children }: ReactNodeProps) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || Language.ENGLISH;
  });

  function changeLanguage(newLanguage: Language) {
    setLanguage(newLanguage);
  }

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(
      language === Language.ENGLISH ? Language.SLOVENIAN : Language.ENGLISH,
    );
  };

  const formatTextWithLineBreaks = (text: string) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const formatHtml = (text: string) => {
    return parse(text || "");
  };

  const text = language === Language.ENGLISH ? enText : sloText;

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage: toggleLanguage,
        changeLanguage: changeLanguage,
        text,
        formatTextWithLineBreaks,
        formatHtml,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
