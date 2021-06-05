import { useContext, useEffect } from "react";
import styles from "../css/Common.module.css";
import AuthContext from "../store/auth-context";
const Logout = () => {
    const authCtx = useContext(AuthContext);
    useEffect(() => {
        authCtx.logout();
    }, [authCtx]);
    return (
        <div className={styles.flexCenter} style={{ marginTop: '2rem' }}>
            <h2>You've been logged out</h2>
        </div>
    )
};
export default Logout;