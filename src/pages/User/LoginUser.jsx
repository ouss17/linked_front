import React, { useContext, useState } from 'react'
import MetaData from '../../components/MetaData';
import { Link, useNavigate } from 'react-router-dom';
import { Eye } from '../../assets/Svg/Svg';
import { ConnectUser, GetMe } from '../../Redux/actions/UserAction';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { USER_CONNECTED_STORAGE } from '../../constant';
import UserContext from '../../context/UserContext';
import { useEffect } from 'react';

const LoginUser = () => {

    const [inputState, setInputState] = useState(true);
    const [successAction, setSuccessAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);
    const { userLog, setUserLog } = useContext(UserContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (userLog.isLogged) {
            navigate("/");
        }
    }, [userLog]);

    const isEmpty = (value) => {
        if (value === "" || value === undefined || value === null) return true;
        return false;
    };

    const [disableButton, setDisableButton] = useState(true);
    const [msgError, setMsgError] = useState("");
    const [inputForm, setInputForm] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (inputForm.username.trim() !== "" && inputForm.password.trim() !== "") {
            setDisableButton(false);
        } else {
            setDisableButton(true)
        }
    }, [inputForm]);

    const handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputForm({ ...inputForm, [name]: value });
    };

    const emptyValue = () => {
        setInputForm({
            username: "",
            password: "",
        });
    };

    const logUser = (e) => {
        e.preventDefault();
        const inputName = Object.keys(inputForm);
        let listError = [];
        inputName.forEach((element) => {
            if (isEmpty(inputForm[element])) {
                listError.push({
                    name: element,
                    message: "ce champ doit être remplis",
                });
            }
        });

        dispatch(ConnectUser(inputForm)).then(res => {
            console.log(res);
            if (res.status !== 200) {
                setMsgError("Le nom d'utilisateur ou le mot de passe est incorrect")
                setErrorAction(true)
                setTimeout(() => {
                    setErrorAction(false)
                }, 5000);
            } else {
                Cookies.set(USER_CONNECTED_STORAGE, res.data.token, { expires: 30 });
                setSuccessAction(true)
                dispatch(GetMe({}, res.data.token)).then((res2) => {
                    console.log(res2);
                    if (res2.idUser) {
                        setUserLog({
                            id: res2.idUser,
                            username: res2.nameUser,
                            role: res2.idRole,
                            paymentCards: res2.paymentCards,
                            idEtablissement: res2.idEtablissement,
                            emailUser: res2.userEmail,
                            isLogged: true,
                            token: res.data.token
                        })
                    }
                })
                setTimeout(() => {
                    setSuccessAction(false)
                    navigate("/");
                }, 3000);
            }
        })
    }

    return (
        <>
            <MetaData title={`Connexion - Linked`} index="false" />
            <h1 className="title titleMain">Connexion</h1>
            {
                successAction
                &&
                <p className='successAction'>Connecté !</p>
            }
            {
                errorAction
                &&
                <p className='errorAction'>{msgError}</p>
            }
            <form className="form" id="loginForm">
                <div className="fieldsForm">
                    <div className="field">
                        <label for="username" className="fieldName">Nom d'utilisateur<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type="text" name="username" id="username" placeholder="user@gmail.com" />
                    </div>
                    <div className="field">
                        <label for="password" className="fieldName">Mot de passe <span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type={inputState ? "password" : "text"} name="password" id="password" placeholder="Abcd1234?" />
                        <span className="passwordReveal" onClick={() => setInputState(!inputState)}><Eye /></span>
                    </div>
                </div>
                <div className="noAccount">
                    <Link to="/settings/register">Pas de compte ? Enregistrez-vous ici !</Link>
                </div>
                <div className="actionsForm">
                    <button disabled={disableButton} className="button" role='button' onClick={(e) => logUser(e)} id="logIn">
                        <span>Se connecter</span>
                        <svg className="icons" id="loginFail" viewBox="0 0 15 15">
                            <polyline points="0 0 15 15"></polyline>
                            <polyline points="0 16 16 0"></polyline>
                        </svg>
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginUser