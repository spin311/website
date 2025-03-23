import {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext();

export function ThemeProvider({children}) {
    const [darkMode, setDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem("darkMode")) || false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    }

    return (
        <ThemeContext.Provider value={{darkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );

}

export function useTheme() {
    return useContext(ThemeContext);
}