import { useEffect } from "react";
import "../css/Main.css";
const Logout = ({ setIsSignedIn }) => {
    useEffect(() => {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage.clear();
        setIsSignedIn(false);
    }, [setIsSignedIn]);
    return (
        <div className='flex-center' style={{ marginTop: '2rem' }}>
            <h2>You've been logged out</h2>
        </div>
    )
};
export default Logout;