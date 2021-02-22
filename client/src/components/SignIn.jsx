import "../css/SignInSignUp.css";
import { Button } from "./Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
const SignIn = ({ setIsSignedIn }) => {
    let history = useHistory();
    const handleSignIn = async (e) => {
        e.preventDefault();
        const payload = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        try {
            const res = await axios.post('http://localhost:8282/account/sign-in', payload);
            if (res.status === 200) {
                setIsSignedIn(true);
                history.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='form-container'>
            <form className="sign-up-form" onSubmit={handleSignIn}>
                <label htmlFor="email">Email</label>
                <input required type="email" name="email" id="email" className='form-item' />
                <label htmlFor="password">Password</label>
                <input required type="password" name="password" id="password" className='form-item' />
                <Button text="Sign in" buttonStyle='btn--outline' className='form-item' />
            </form>
        </div>
    )
};

export default SignIn;