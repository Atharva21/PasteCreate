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
import { MenuItems } from "./MenuItems";
import "../css/NavBar.css";

import { useState } from "react";
import { Button } from "./Button";
const Header = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    };
    return (
        <Router>
            <nav className="NavbarItems">
                <h1 className="navbar-logo">PasteCrate <i className="fab fa-react"></i></h1>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <Link to={item.url} className={item.cName}>
                                <li key={index}>
                                    <div>
                                        {item.title}
                                    </div>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
                <Link to={isSignedIn ? 'logout' : 'sign-in'}><Button text={isSignedIn ? 'Log out' : 'Sign in'} /></Link>
                {!isSignedIn ? <Link to='sign-up'><Button text='Sign up' /></Link> : ('')}
            </nav>

            <Switch>

                <Route path="/sign-in">
                    <SignIn setIsSignedIn={setIsSignedIn} />
                </Route>

                <Route path="/sign-up">
                    <SignUp />
                </Route>

                <Route exact path="/my-pastes" component={MyPastes} />
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/new">
                    <NewPaste />
                </Route>
                <Route>
                    <HomePage />
                </Route>
            </Switch>
        </Router>
    )
};

export default Header;