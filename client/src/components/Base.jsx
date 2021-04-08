import NavBar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
const Base = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

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
            }
        } catch (err) {
            setIsSignedIn(false)
        }
    };

    useEffect(() => {
        checkLoginStatus()
    }, [checkLoginStatus])

    return (
        <NavBar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
    )
};

export default Base;