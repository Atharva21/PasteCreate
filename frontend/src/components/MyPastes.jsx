import { useEffect, useState, Fragment, useContext } from "react";
import axios from "axios";
import pageStyle from "../css/MyPastes.module.css";
import commonStyles from "../css/Common.module.css";
import { Button } from "./Button";
import swal from "sweetalert";
import { useLoader, useUpdateLoader } from "./LoadingContext";
import Spinner from "./Spinner";
import CopyClipboard from "./utils/CopyClipboard";
import AuthContext from "../store/auth-context";

const MyPastes = () => {
    const [curPaste, setCurPaste] = useState(false);
    const [myPastes, setMyPastes] = useState([]);
    const isLoading = useLoader();
    const setLoader = useUpdateLoader();
    const authCtx = useContext(AuthContext);
    useEffect(() => {
        setLoader(true)
        let config = {
            headers: {
                'Authorization': 'Bearer ' + authCtx.token
            }
        }
        try {
            const getPasteData = async () => {
                const res = await axios.get(process.env.REACT_APP_SERVER + "paste/my-pastes", config);
                if (res.status === 200) {
                    setMyPastes(res.data);
                    setLoader(false)
                }
            }
            getPasteData()
        } catch (err) {
            setLoader(false)
        }
    }, [setLoader, authCtx.token]);

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
                            'Authorization': 'Bearer ' +  authCtx.token
                        }
                    }
                    try {
                        const deletePasteData = async () => {
                            const res = await axios.post(process.env.REACT_APP_SERVER + "paste/delete-paste", {
                                id: data
                            }, config);
                            if (res.status === 200) {
                                const pastes = myPastes.filter(paste => paste._id !== data);
                                swal("Poof! Your paste has been deleted!", {
                                    icon: "success",
                                });
                                setMyPastes(pastes);
                            } else {
                                swal("Some error deleting your paste");
                            }
                        }
                        deletePasteData();
                    } catch (err) {
                        console.log(err);
                    }
                }
            });
    };

    const handleCopyUrl = (url) => {
        const completeUrl = process.env.REACT_APP_DOMAIN + "/" + url;
        CopyClipboard(completeUrl)
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
            {isLoading === true && <Spinner />}
            {isLoading === false &&
                <div className={pageStyle.pastesContainer}>
                    {!curPaste && myPastes.length ? (myPastes.map((item, index) =>
                        <Fragment key={index}>
                            <div className={pageStyle.paste} >
                                <h2>{item.title.slice(0, 50)}</h2>
                                <div>
                                    {item.data.slice(0, 200) + "..."}
                                </div>
                                <div className={pageStyle.myPasteBtnContainer}>
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
                            {myPastes.length === 0 && isLoading === false  ? (
                                <div className={commonStyles.flexCenter}>
                                    <h1>Looks like you have no pastes <i className='fas fa-frown'></i></h1>
                                </div>
                            ) : (
                                <Fragment>
                                    {curPaste ? (
                                        <Fragment>
                                            <i className='fa fa-window-close' onClick={
                                                clearCurrentPaste
                                            }></i>
                                            < div id={Date.now()} className={pageStyle.paste} >
                                                {curPaste.data}
                                                <div className={pageStyle.myPasteBtnContainer}>
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
            }
        </div >
    )
};

export default MyPastes;