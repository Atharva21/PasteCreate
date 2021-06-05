
import { useEffect, useState, Fragment, useContext } from "react";
import { Button } from "./Button";
import axios from "axios";
import common from "../css/Common.module.css";
import styles from "../css/MyPastes.module.css";
import swal from "sweetalert";
import Spinner from "./Spinner";
import AuthContext from "../store/auth-context";
import CopyClipboard from "./utils/CopyClipboard";
const ViewPaste = () => {
    const [currentPaste, setCurrentPaste] = useState([]);
    const [isPasteLoading, setIsPasteLoading] = useState(true);
    const authCtx = useContext(AuthContext);
    useEffect(() => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + authCtx.token
            }
        }
        const pathName = window.location.pathname.replace("/", "");
        axios.get(process.env.REACT_APP_SERVER + pathName, config)
            .then((res) => {
                if (res.status === 200) {
                    setCurrentPaste(res.data)
                    setIsPasteLoading(false)
                }
            }).catch(err => {
                console.log(err);
                setIsPasteLoading(false)
            });
        return () => {
            setCurrentPaste([])
        }
    }, [authCtx.token])

    const handleCopyText = (text) => {
        CopyClipboard(text);
        swal("Text copied to clipboard");
    }

    return (
        <div>
            {isPasteLoading && <Spinner />}
            {!isPasteLoading && currentPaste.length === 0 ? (
                <div className={common.flexCenter}>
                    <h1>Paste not found! <i className='fas fa-frown'></i></h1>
                </div>
            ) : (
                <Fragment>
                    {currentPaste.map((item, index) => (
                        <div key={index} className={styles.paste}>
                            <h2>{item.title}</h2>
                            {item.data}
                            <Button text={<i className="fas fa-copy"> Copy text</i>} buttonStyle='btn--outline-flex-end' onClick={() => { handleCopyText(item.data) }} />
                        </div>
                    ))}
                </Fragment>
            )}
        </div>
    )
};

export default ViewPaste;