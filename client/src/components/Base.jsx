import NavBar from "./Navbar";
import { useState, useEffect } from "react";
import { LoadingProvider } from "./LoadingContext";

const Base = () => {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('dark')))

    const toggleDarkMode = () => {
        localStorage.setItem('dark', JSON.stringify(!darkMode))
        setDarkMode(!darkMode)
    };

    useEffect(() => {
        let mode = JSON.parse(localStorage.getItem('dark'))
        if (mode === true) {
            setDarkMode(true)
        } else {
            setDarkMode(false)
        }
    }, []);

    useEffect(() => {
        if (darkMode === true)
            document.body.classList.add('dark-mode')
        else
            document.body.classList.remove('dark-mode')
    }, [darkMode])

    return (
        <LoadingProvider>
            <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </LoadingProvider>
    )
};

export default Base;