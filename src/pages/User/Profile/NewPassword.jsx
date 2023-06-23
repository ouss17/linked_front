import React, { useContext, useEffect, useState } from 'react'
import MetaData from '../../../components/MetaData'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import UserContext from '../../../context/UserContext';
import { ChangePass } from '../../../Redux/actions/UserAction';
import { Eye } from '../../../assets/Svg/Svg';
import Cookies from "js-cookie";
import { USER_CONNECTED_STORAGE } from '../../../constant';

const NewPassword = () => {
    const [inputState, setInputState] = useState(true);
    const [successAction, setSuccessAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);
    const { userLog, setUserLog } = useContext(UserContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isEmpty = (value) => {
        if (value === "" || value === undefined || value === null) return true;
        return false;
    };

    const [msgError, setMsgError] = useState("");
    const [inputForm, setInputForm] = useState({
        username: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    useEffect(() => {
        if (userLog.isLogged) {
            setInputForm({ ...inputForm, username: userLog.username })
        } else {
            navigate('/');
        }
    }, [userLog]);

    const handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputForm({ ...inputForm, [name]: value });
    };

    const emptyValue = () => {
        setInputForm({
            ...inputForm,
            newPassword: "",
            confirmNewPassword: "",
        });
    };
    const destroySession = () => {
        Cookies.remove(USER_CONNECTED_STORAGE, {
            path: "/",
            sameSite: "Lax",
            secure: true,
        });
        Cookies.remove(USER_CONNECTED_STORAGE + 'e', {
            path: "/",
            sameSite: "Lax",
            secure: true,
        });
        setUserLog({
            username: "",
            role: "",
            paymentCards: "",
            emailUser: "",
            idEtablissement: "",
            isLogged: false,
        })
    }
    const logUser = (e) => {
        e.preventDefault();
        const inputName = Object.keys(inputForm);
        let listError = [];
        inputName.forEach((element) => {
            if (isEmpty(inputForm[element])) {
                listError.push({
                    name: element,
                    message: "ce champ doit être rempli",
                });
            }
        });
        if (inputForm.newPassword == inputForm.confirmNewPassword) {

            dispatch(ChangePass(inputForm, userLog.token)).then(res => {
                console.log(res);
                if (res.status !== 200) {
                    setMsgError(res.data.detail)
                    setErrorAction(true)
                    setTimeout(() => {
                        setErrorAction(false)
                    }, 5000);
                } else {
                    setSuccessAction(true)

                    setTimeout(() => {
                        setSuccessAction(false)
                        destroySession();
                        navigate("/settings");
                    }, 3000);
                }
            })
        } else {
            setMsgError("Les mots de passe ne sont pas les même.")
            setErrorAction(true)
            setTimeout(() => {
                setErrorAction(false)
            }, 5000);

        }
    }

    return (
        <>
            <MetaData title={`Changer mot de passe - Linked`} index="false" />
            <h1 className="title titleMain">Changer mot de passe</h1>
            {
                successAction
                &&
                <p className='successAction'>Le mot de passe à été modifié avec succès !</p>
            }
            {
                errorAction
                &&
                <p className='errorAction'>{msgError}</p>
            }
            <form className="form" id="loginForm">
                <div className="fieldsForm">
                    <div className="field">
                        <label for="newPassword" className="fieldName">Nouveau mot de passe <span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type={inputState ? "password" : "text"} name="newPassword" id="newPassword" placeholder="Abcd1234?" />
                        <span className="passwordReveal" onClick={() => setInputState(!inputState)}><Eye /></span>
                    </div>
                    <div className="field">
                        <label for="confirmNewPassword" className="fieldName">Confirmation du mot de passe <span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type={inputState ? "password" : "text"} name="confirmNewPassword" id="confirmNewPassword" placeholder="Abcd1234?" />
                        <span className="passwordReveal" onClick={() => setInputState(!inputState)}><Eye /></span>
                    </div>
                </div>
                <div className="actionsForm">
                    <button className="button" role='button' onClick={(e) => logUser(e)} id="logIn">
                        <span>Valider</span>
                        <svg className="icons" id="loginFail" viewBox="0 0 15 15">
                            <polyline points="0 0 15 15"></polyline>
                            <polyline points="0 16 16 0"></polyline>
                        </svg>
                    </button>
                </div>
            </form >
        </>
    )
}

export default NewPassword