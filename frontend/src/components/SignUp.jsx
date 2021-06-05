import styles from "../css/SignInSignUp.module.css";
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
        <div className={styles.formContainer}>
            <form className={styles.signInForm} onSubmit={handleSignUp}>
                <label htmlFor="name">Name</label>
                <input required type="text" name="name" id="name" className={styles.formItem}/>
                <label htmlFor="email">Email</label>
                <input required type="email" name="email" id="email" className={styles.formItem} />
                <label htmlFor="password">Password</label>
                <input required type="password" name="password" id="password" className={styles.formItem} />
                <Button text="Submit" buttonStyle='btn--outline btn formBtn' className={styles.formItem}/>
            </form>
        </div>
    )
};

export default SignUp;