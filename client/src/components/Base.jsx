import NavBar from "./Navbar";
import { useState, useEffect } from "react";
import { LoadingProvider } from "./LoadingContext";
import axios from "axios";

const Base = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('dark')))

    const toggleDarkMode = () => {
        localStorage.setItem('dark', JSON.stringify(!darkMode))
        setDarkMode(!darkMode)
    };

    const checkLoginStatus = async () => {
        try {
            const result = await axios.post(process.env.REACT_APP_SERVER + "account/logged-in", {},
                {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
            if (result.status === 200) {
                setIsSignedIn(true)
            }
        } catch (err) {
            setIsSignedIn(false)
            localStorage.clear()
        }

    };

    useEffect(() => {
        let mode = JSON.parse(localStorage.getItem('dark'))
        if (mode === true) {
            setDarkMode(true)
        } else {
            setDarkMode(false)
        }
        checkLoginStatus()
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
        </LoadingProvider>
    )
};

export default Base;