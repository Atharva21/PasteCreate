import NavBar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
const Base = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('dark')))

    const toggleDarkMode = () => {
        localStorage.setItem('dark', JSON.stringify(!darkMode))
        setDarkMode(!darkMode);
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

    const checkLoginStatus = async () => {
        try {
            const result = await axios.post(process.env.REACT_APP_SERVER + "account/logged-in", {},
                {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
            if (result.status === 200) {
                setIsSignedIn(true)
            } else {
                setIsSignedIn(true)
                localStorage.removeItem('name')
                localStorage.removeItem('token')
            }
        } catch (err) {
            setIsSignedIn(false)
            localStorage.removeItem('name')
            localStorage.removeItem('token')
        }
    };

    useEffect(() => {
        checkLoginStatus()
    }, [checkLoginStatus])

    return (
        <NavBar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    )
};

export default Base;