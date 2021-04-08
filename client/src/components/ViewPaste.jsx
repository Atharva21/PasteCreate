
import { useEffect, useState, Fragment } from "react";
import { Button } from "./Button";
import axios from "axios";
import "../css/Main.css";
import "../css/MyPastes.css";
import swal from "sweetalert";
const ViewPaste = (props) => {
    const [currentPaste, setCurrentPaste] = useState([]);
    const [isPasteLoading, setIsPasteLoading] = useState(true);

    useEffect(() => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
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
    }, [])

    const handleCopyText = (text) => {
        navigator.clipboard.writeText(text);
        swal("Text copied to clipboard");
    }

    return (
        <div>
            {!isPasteLoading && currentPaste.length === 0 ? (
                <div className='flex-center'>
                    <h1>Paste not found! <i className='fas fa-frown'></i></h1>
                </div>
            ) : (
                <Fragment>
                    {currentPaste.map((item, index) => (
                        <div key={index} className='paste'>
                            <h2>{item.title}</h2>
                            {item.data}
                            <Button text={<i className="fas fa-copy"></i>} buttonStyle='btn--outline-flex-end' onClick={() => { handleCopyText(item.data) }} />
                        </div>
                    ))}
                </Fragment>
            )}
        </div>
    )
};

export default ViewPaste;