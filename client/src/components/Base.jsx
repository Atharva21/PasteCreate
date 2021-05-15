import NavBar from "./Navbar";
import { useState, useEffect } from "react";
import { LoadingProvider } from "./LoadingContext";
import Footer from "./Footer";

const Base = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
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
            <NavBar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Footer />
        </LoadingProvider>
    )
};

export default Base;