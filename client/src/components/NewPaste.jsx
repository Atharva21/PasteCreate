import "../css/NewPaste.css";
import { Button } from "./Button";
import React from "react";
import axios from "axios";
import swal from 'sweetalert';
const NewPaste = ({ isSignedIn }) => {
    const [isPrivate, setIsPrivate] = React.useState(false);
    const [inputFields, setInputFields] = React.useState({});
    const handlePrivateCheckBox = (e) => {
        setInputFields(prev => {
            const target = e.target;
            return {
                ...prev,
                [target.name]: !isPrivate
            }
        });
        setIsPrivate(!isPrivate);
    }
    const submitNewPaste = async (e) => {
        e.preventDefault();
        e.target.reset();
        try {
            const result = await axios.post(process.env.REACT_APP_SERVER + "paste/save-paste", {
                title: inputFields.title,
                data: inputFields.paste,
                private: inputFields.private
            },
                {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
            if (result.status === 200) {
                swal(result.data, "", "success");
                setInputFields({});
            }
        } catch (err) {
            console.log(err);
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
            <form className='new-paste-container' onSubmit={submitNewPaste}>
                <textarea placeholder="Paste your text here" id="text-paste-area" name="paste" onChange={(e) => handleChangeInputField(e)} />
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" onChange={(e) => handleChangeInputField(e)} />
                {isSignedIn && <div className='private-paste-checkbox-container'>
                    <label htmlFor="private">Private paste</label>
                    <input type="checkbox" name="private" id="private" onChange={handlePrivateCheckBox} defaultChecked={isPrivate} />
                </div>}
                <div className='submit-btn-paste'>
                    <Button text="Submit" buttonStyle='btn--outline' />
                </div>
            </form>
        </React.Fragment>
    )
};

export default NewPaste;