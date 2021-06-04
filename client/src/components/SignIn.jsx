import "../css/SignInSignUp.css";
import { Button } from "./Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLoader, useUpdateLoader } from "./LoadingContext";
import { useContext } from "react";
import swal from "sweetalert";
import Spinner from "./Spinner";
import AuthContext from "../store/auth-context";
const SignIn = () => {
    let history = useHistory()
    const isLoading = useLoader()
    const setLoader = useUpdateLoader()
    const authCtx = useContext(AuthContext);
    const handleSignIn = async (e) => {
        e.preventDefault();
        const payload = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        setLoader(true)
        try {
            const res = await axios.post(process.env.REACT_APP_SERVER + 'account/sign-in', payload);
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', res.data.id)
                authCtx.login(res.data.token, res.data.expiry);
                history.push("/");
            } else {
                setLoader(false)
                swal("Invalid credentials");
            }
        } catch (err) {
            setLoader(false)
            swal("Invalid credentials");
        }
    }
    return (
        <>
            {isLoading &&
                <Spinner />
            }
            <div className='form-container'>
                <form className="sign-up-form" onSubmit={handleSignIn}>
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" className='form-item' />
                    <label htmlFor="password">Password</label>
                    <input required type="password" name="password" id="password" className='form-item' />
                    <Button text="Sign in" buttonStyle='btn--outline' className='form-item' />
                </form>
            </div>
        </>
    )
};

export default SignIn;