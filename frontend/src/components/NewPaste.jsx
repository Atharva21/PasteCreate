import styles from "../css/NewPaste.module.css";
import { Button } from "./Button";
import React, { useContext } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useLoader, useUpdateLoader } from "./LoadingContext";
import Spinner from "./Spinner";
import AuthContext from "../store/auth-context";
const NewPaste = () => {
    const [isPrivate, setIsPrivate] = React.useState(false)
    const [inputFields, setInputFields] = React.useState({})
    const isLoading = useLoader()
    const setLoader = useUpdateLoader()
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const handlePrivateCheckBox = (e) => {
        setInputFields(prev => {
            const target = e.target;
            return {
                ...prev,
                [target.name]: !isPrivate
            }
        });
        setIsPrivate(!isPrivate)
    }
    const submitNewPaste = async (e) => {
        e.preventDefault()
        e.target.reset()
        setLoader(true)
        try {
            const result = await axios.post(process.env.REACT_APP_SERVER + "paste/save-paste", {
                title: inputFields.title,
                data: inputFields.paste,
                private: inputFields.private
            },
                {
                    headers: { 'Authorization': 'Bearer ' + authCtx.token }
                });
            if (result.status === 200) {
                if (!isLoggedIn)
                    swal(`Please copy the URL ${result.data}`, "", "success")
                else
                    swal(`Paste saved!`, "", "success")
                setInputFields({})
            }
            setLoader(false)
        } catch (err) {
            console.log(err);
            setLoader(false)
        }
    };

    const handleChangeInputField = (e) => {
        setInputFields(prev => {
            const target = e.target;
            return {
                ...prev,
                [target.name]: target.value
            }
        });
    }

    return (
        <React.Fragment>
            {isLoading === true && <Spinner />}
            <form className={styles.newPasteContainer} onSubmit={submitNewPaste}>
                <textarea placeholder="Paste your text here" id={styles.pasteArea} name="paste" onChange={(e) => handleChangeInputField(e)} />
                <label htmlFor="title" className={styles.label}>Title</label>
                <input type="text" name="title" id={styles.title} onChange={(e) => handleChangeInputField(e)} />
                {isLoggedIn && <div className={styles.privatePasteCheckboxContainer}>
                    <label htmlFor="private">Private paste</label>
                    <input type="checkbox" name="private" id={styles.private} onChange={handlePrivateCheckBox} defaultChecked={isPrivate} />
                </div>}
                <div className={styles.submitPasteBtn}>
                    <Button text="Submit" buttonStyle='btn--outline' />
                </div>
            </form>
        </React.Fragment>
    )
};

export default NewPaste;