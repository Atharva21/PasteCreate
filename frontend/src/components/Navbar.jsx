import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MyPastes from "./MyPastes";
import NewPaste from "./NewPaste";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ViewPaste from "./ViewPaste";
import { MenuItems } from "./MenuItems";
import styles from "../css/NavBar.module.css";
import { useContext } from "react";

import { useState } from "react";
import Logout from "./Logout";
import AuthContext from "../store/auth-context";
const NavBar = ({ toggleDarkMode, darkMode }) => {
    const [clicked, setClicked] = useState(false);
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    const handleClick = () => {
        setClicked(!clicked);
    };

    const getNavItem = (item, index) => {
        const navItem = (<Link key={index} to={item.url} className={item.cName}>
            <li onClick={handleClick}>
                <div>
                    {item.title}
                </div>
            </li>
        </Link>);
        if (item.showAlways) {
            return navItem;
        }
        if (item.login === isLoggedIn) {
            return navItem;
        }
    }
    return (
        <Router>
            <nav className={styles.navbarItems}>
                <Link to="/">
                    <h1 className={styles.navbarLogo}>PasteCreate <i className="fas fa-clipboard"></i>
                    </h1>
                </Link>
                <div className={styles.menuIcon} onClick={handleClick}>
                    <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={clicked ? `${styles.navMenu} ${styles.active}` : `${styles.navMenu}`}>
                    {MenuItems.map((item, index) => {
                        return (
                            getNavItem(item, index)
                        )
                    })}
                    <i className={darkMode ? `nav-links fas fa-sun ${styles.darkmodeToggler} ${styles.navLinks}` : ` nav-links fas fa-moon ${styles.darkmodeToggler} ${styles.navLinks}`} onClick={toggleDarkMode}></i>
                </ul>

            </nav >
            <Switch>
                <Route path="/sign-in" >
                    <SignIn />
                </Route>
                <Route path="/sign-up" component={SignUp}>
                </Route>
                <Route exact path="/my-pastes" component={MyPastes} />
                <Route path="/new">
                    <NewPaste />
                </Route>
                <Route exact={true} path="/" component={NewPaste}>
                </Route>
                <Route exact={true} path="/logout">
                    <Logout />
                </Route>
                <Route path="/:url?" component={ViewPaste}>
                </Route>
            </Switch>
        </Router >
    )
};

export default NavBar;