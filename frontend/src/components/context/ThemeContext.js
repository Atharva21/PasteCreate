import React, { useContext, useState, useEffect } from "react";

const ThemeContext = React.createContext();

const ThemeUpdateContext = React.createContext();

export function useTheme() {
    return useContext(ThemeContext)
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('dark')))

    const toggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        if (darkMode === true)
            document.body.classList.add('dark-mode')
        else
            document.body.classList.remove('dark-mode')
    }, [darkMode])

    return (
        <ThemeContext.Provider value={darkMode} > 
            <ThemeUpdateContext.Provider value={toggleTheme}>
            {children} 
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
};