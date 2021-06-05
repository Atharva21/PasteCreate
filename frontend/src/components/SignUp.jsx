import "../css/SignInSignUp.css";
import { Button } from "./Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
const SignUp = () => {
    let history = useHistory();
    const handleSignUp = async (e) => {
        e.preventDefault();
        const payload = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }
        try {
            const res = await axios.post(process.env.REACT_APP_SERVER + '/account/sign-up', payload);
            if (res.status === 200) {
                swal({
                    title: "Your account has been created",
                    text: "Please sign in!",
                    icon: "success",
                    button: "Aww yiss!",
                })
                    .then(() => {
                        history.push("/sign-in");
                    });

            } else {
                swal("Server error please try again");
            }
        } catch (err) {
            swal("Server error please try again");
        }
    };
    return (
        <div className='form-container'>
            <form className="sign-up-form" onSubmit={handleSignUp}>
                <label htmlFor="name">Name</label>
                <input required type="text" name="name" id="name" className='form-item' />
                <label htmlFor="email">Email</label>
                <input required type="email" name="email" id="email" className='form-item' />
                <label htmlFor="password">Password</label>
                <input required type="password" name="password" id="password" className='form-item' />
                <Button text="Submit" buttonStyle='btn--outline' className='form-item' />
            </form>
        </div>
    )
};

export default SignUp;