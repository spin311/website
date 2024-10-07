import {createContext, useContext, useState} from "react";
import enText from "../assets/translations/en.json";
import sloText from "../assets/translations/sl.json";
import React from "react";

const LanguageContext  = createContext();

export function LanguageProvider({children}) {
    const [language, setLanguage] = useState("en");

    const changeLanguage = () => {
        setLanguage(language === "en" ? "slo" : "en");
    }

    const formatTextWithLineBreaks = (text) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    const text = language === "en" ? enText : sloText;

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, text, formatTextWithLineBreaks}}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}