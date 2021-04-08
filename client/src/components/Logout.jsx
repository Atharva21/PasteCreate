import { useEffect } from "react";
import "../css/Main.css";
const Logout = ({ setIsSignedIn }) => {
    useEffect(() => {
        localStorage.removeItem('name')
        localStorage.removeItem('token')
        setIsSignedIn(false);
    }, [setIsSignedIn]);
    return (
        <div className='flex-center' style={{ marginTop: '2rem' }}>
            <h2>You've been logged out</h2>
        </div>
    )
};
export default Logout;