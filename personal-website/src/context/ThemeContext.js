import {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext();

export function ThemeProvider({children}) {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{darkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );

}

export function useTheme() {
    return useContext(ThemeContext);
}