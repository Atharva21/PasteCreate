import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../css/MyPastes.css";
import "../css/Main.css";
import { Button } from "./Button";
import swal from "sweetalert";
const MyPastes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [curPaste, setCurPaste] = useState(false);
    const [myPastes, setMyPastes] = useState([]);
    useEffect(() => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        try {
            const getPasteData = async () => {
                const res = await axios.get(process.env.REACT_APP_SERVER + "paste/my-pastes", config);
                if (res.status === 200) {
                    setMyPastes(res.data);
                } else {
                    // show msg
                }
            }
            getPasteData();
        } catch (err) {
            console.log(err);
        }

    }, []);

    const handleDeletePaste = (data) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this paste!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let config = {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }
                    try {
                        const deletePasteData = async () => {
                            const res = await axios.post(process.env.REACT_APP_SERVER + "paste/delete-paste", {
                                id: data
                            }, config);
                            if (res.status === 200) {
                                const pastes = myPastes.filter(paste => paste._id !== data);
                                swal("Your paste has been deleted");
                                setMyPastes(pastes);
                            } else {
                                swal("Some error deleting your paste");
                            }
                            setIsLoading(false);
                        }
                        deletePasteData();
                    } catch (err) {
                        console.log(err);
                        setIsLoading(false);
                    }
                    swal("Poof! Your paste has been deleted!", {
                        icon: "success",
                    });
                }
            });

    };

    const handleCopyUrl = (url) => {
        const completeUrl = process.env.DOMAIN + "/" + url;
        navigator.clipboard.writeText(completeUrl);
        swal("Link copied to clipboard");
    };

    const clearCurrentPaste = () => {
        setCurPaste(false);
    }

    const handleViewPaste = (data) => {
        setCurPaste(data);
    };

    return (
        <div>
            <div className='pastes-container'>
                {!curPaste && myPastes.length ? (myPastes.map((item, index) =>
                    <Fragment>
                        <div key={index} className='paste' >
                            <h2>{item.title.slice(0, 50)}</h2>
                            <div>
                                {item.data.slice(0, 200) + "..."}
                            </div>
                            <div className='my-paste-btn-container'>
                                <Button text='View' buttonStyle='btn--outline' onClick={(e) => { handleViewPaste(item, e) }} />
                                <Button text='Delete' buttonStyle='btn--outline' onClick={(e) => { handleDeletePaste(item._id, e) }} />
                                <Button text={<i className="fas fa-copy"></i>} buttonStyle='btn--outline' onClick={() => { handleCopyUrl(item.url) }}
                                />
                            </div>
                            <div>
                                <p>{item.private && ('Note: Paste is private')}</p>
                            </div>
                        </div>
                    </Fragment>
                )) : (
                    <Fragment>
                        {myPastes.length === 0 && !isLoading ? (
                            <div className='flex-center'>
                                <h1>Looks like you have no pastes <i className='fas fa-frown'></i></h1>
                            </div>
                        ) : (
                            <Fragment>
                                {isLoading && curPaste ? (
                                    <Fragment>
                                        <i className='fa fa-window-close' onClick={
                                            clearCurrentPaste
                                        }></i>
                                        < div id={Date.now()} className='paste' >
                                            {curPaste.data}
                                            <div className='my-paste-btn-container'>
                                                <Button text={<i className="fas fa-copy"></i>} buttonStyle='btn--outline' onClick={() => { handleCopyUrl(curPaste.url) }}
                                                />
                                            </div>
                                        </div>
                                    </Fragment>
                                ) : ("")}
                            </Fragment>
                        )}

                    </Fragment>
                )
                }
            </div >
        </div >
    )
};

export default MyPastes;