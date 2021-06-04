import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import HomePage from "./HomePage";
import MyPastes from "./MyPastes";
import NewPaste from "./NewPaste";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ViewPaste from "./ViewPaste";
import { MenuItems } from "./MenuItems";
import "../css/NavBar.css";
import { useContext } from "react";

import { useState } from "react";
import Logout from "./Logout";
import AuthContext from "../store/auth-context";
const Header = ({ toggleDarkMode, darkMode }) => {
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
            <nav className="NavbarItems">
                <Link to="/">
                    <h1 className="navbar-logo">PasteCreate <i className="fas fa-clipboard"></i>
                    </h1>
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            getNavItem(item, index)
                        )
                    })}
                    <i className={darkMode ? 'fas fa-sun dark-mode-toggler nav-links' : 'fas fa-moon dark-mode-toggler nav-links'} onClick={toggleDarkMode}></i>
                </ul>

            </nav >
            <Switch>
                <Route path="/sign-in" >
                    <SignIn />
                </Route>
                <Route path="/sign-up" component={SignUp}>
                </Route>
                <Route exact path="/my-pastes" component={MyPastes} />
                <Route path="/home" component={HomePage}>
                </Route>
                <Route path="/new">
                    <NewPaste />
                </Route>
                <Route exact={true} path="/" component={HomePage}>
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

export default Header;