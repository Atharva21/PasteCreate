import NavBar from "./Navbar";
import { useState, useEffect } from "react";
const Base = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setIsSignedIn(true);
        }
    }, [])
    return (
        <NavBar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
    )
};

export default Base;