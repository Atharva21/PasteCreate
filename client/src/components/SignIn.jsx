import "../css/SignInSignUp.css";
import { Button } from "./Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
const SignIn = ({ setIsSignedIn }) => {
    let history = useHistory();
    const handleSignIn = async (e) => {
        e.preventDefault();
        const payload = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        try {
            const res = await axios.post(process.env.REACT_APP_SERVER + 'account/sign-in', payload);
            if (res.status === 200) {
                document.cookie = `token=${res.data.token};max-age=86400;domain=` + process.env.REACT_APP_SERVER_NAME;
                localStorage.setItem('user', res.data.id)
                localStorage.setItem('name', res.data.name)
                setIsSignedIn(true);
                history.push("/");
            } else {
                swal("Invalid credentials");
            }
        } catch (err) {
            swal("Invalid credentials");
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