
import { useEffect, useState, Fragment } from "react";
import { Button } from "./Button";
import Cookies from "js-cookie";
import axios from "axios";
import "../css/Main.css";
import "../css/MyPastes.css";
import swal from "sweetalert";
const ViewPaste = (props) => {
    const [curPaste, setCurPaste] = useState([]);
    useEffect(() => {
        if (props.location.pathname) {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('token')
                }
            }
            props.location.pathname = props.location.pathname.replace("/", "");
            axios.get(process.env.REACT_APP_SERVER + props.location.pathname, config)
                .then((res) => {
                    if (res.status === 200) {
                        setCurPaste(res.data)
                    }
                }).catch(err => {
                    console.log(err);
                });
        }
        return () => {
            setCurPaste([])
        }
    }, [props.location])
    const handleCopyText = (text) => {
        navigator.clipboard.writeText(text);
        swal("Text copied to clipboard");
    }
    return (
        <div>
            {curPaste.length === 0 ? (
                <div className='flex-center'>
                    <h1>Paste not found! <i className='fas fa-frown'></i></h1>
                </div>
            ) : (
                <Fragment>
                    {curPaste.map((item) => (
                        <Fragment>
                            <div key={item._id} className='paste'>
                                <h2>{item.title}</h2>
                                {item.data}
                                <Button text={<i className="fas fa-copy"></i>} buttonStyle='btn--outline-flex-end' onClick={() => { handleCopyText(item.data) }} />
                            </div>
                        </Fragment>
                    ))}
                </Fragment>
            )}
        </div>
    )
};

export default ViewPaste;