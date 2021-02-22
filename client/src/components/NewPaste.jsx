import "../css/NewPaste.css";
import { Button } from "./Button";
import React from "react";
const NewPaste = () => {
    return (
        <React.Fragment>
            <div className='new-paste-container'>
                <h2>Enter text here</h2>
                <textarea id="text-paste-area" />
                <div className='submit-btn-paste'>
                    <Button text="Submit" buttonStyle='btn--outline' />
                </div>
            </div>
        </React.Fragment>
    )
};

export default NewPaste;