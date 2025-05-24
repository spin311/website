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

type LanguageContextType = {
  language: string;
  changeLanguage: () => void;
  text: Record<string, Record<string, string>>;
  formatTextWithLineBreaks: (text: string) => ReactNode[];
  formatHtml: (html: string) => ReactNode | string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  changeLanguage: () => {},
  text: {},
  formatTextWithLineBreaks: () => [],
  formatHtml: () => "",
});

export function LanguageProvider({ children }: ReactNodeProps) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = () => {
    setLanguage(language === "en" ? "slo" : "en");
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

  const text = language === "en" ? enText : sloText;

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
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
