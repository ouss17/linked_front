import React, { useState } from 'react'
import MetaData from '../../components/MetaData';
import { Eye } from '../../assets/Svg/Svg';
import { AddUser } from '../../Redux/actions/UserAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

const CreateUser = () => {
    const [inputState, setInputState] = useState(true);
    const [successAction, setSuccessAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userLog, setUserLog } = useContext(UserContext);

    useEffect(() => {
        if (userLog.isLogged) {
            navigate("/");
        }
    }, [userLog]);

    const isEmpty = (value) => {
        if (value === "" || value === undefined || value === null) return true;
        return false;
    };

    const [msgEmail, setMsgEmail] = useState("");
    const [msgError, setMsgError] = useState("");

    const [inputForm, setInputForm] = useState({
        nameUser: "",
        username: "",
        password: "",
    });

    const [disableButton, setDisableButton] = useState(true);
    useEffect(() => {
        if (inputForm.username.trim() !== "" && inputForm.password.trim() !== "" && inputForm.nameUser.trim() !== "") {
            setDisableButton(false);
        } else {
            setDisableButton(true)
        }
    }, [inputForm]);

    const [error, setError] = useState({ name: "", message: "" });

    const handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputForm({ ...inputForm, [name]: value });
    };

    const emptyValue = () => {
        setInputState({
            nameUser: "",
            username: "",
            password: "",
        });
    };

    const saveUser = (e) => {
        e.preventDefault();
        const inputName = Object.keys(inputForm);
        let listError = [];
        var emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        inputName.forEach((element) => {
            if (isEmpty(inputState[element])) {
                listError.push({
                    name: element,
                    message: "ce champ doit être remplis",
                });
            }
        });


        if (inputForm.username.match(emailRegex) !== null) {
            dispatch(AddUser(inputForm)).then(res => {
                console.log(res);
                if (res.status == 500) {
                    setMsgError(res.data.detail)
                    setErrorAction(true)
                    setTimeout(() => {
                        setErrorAction(false)
                    }, 5000);
                } else {
                    setSuccessAction(true)
                    setTimeout(() => {
                        setSuccessAction(false)
                        navigate("/settings/login");
                    }, 3000);
                }
            })
            setMsgEmail("");
        } else {
            if (inputForm.username.match(emailRegex) == null) {
                setMsgEmail("Veuillez entrer une adresse email valide");
            } else {
                setMsgEmail("");
            }
        }
    };
    return (
        <>
            <MetaData title={`S'enregistrer - Linked`} index="false" />
            <h1 className="title titleMain">S'enregistrer</h1>
            {
                successAction
                &&
                <p className='successAction'>Compte créé avec succès.</p>
            }
            {
                errorAction
                &&
                <p className='errorAction'>{msgError}</p>
            }
            <form className="form" id="loginForm">
                <div className="fieldsForm">
                    <div className="field">
                        <label for="username" className="fieldName">Adresse email <span style={{ color: "red" }}> *</span></label>
                        <p className='errorField'>{msgEmail !== "" && msgEmail}</p>
                        <input onChange={handleChangeInput} className="fieldValue" type="text" name="username" id="username" placeholder="user@gmail.com" />
                    </div>
                    <div className="field">
                        <label for="nameUser" className="fieldName">Nom d'utilisateur <span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type="text" name="nameUser" id="nameUser" placeholder="user" />
                    </div>
                    <div className="field">
                        <label for="password" className="fieldName">Mot de passe <span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type={inputState ? "password" : "text"} name="password" id="password" placeholder="Abcd1234?" />
                        <span className="passwordReveal" onClick={() => setInputState(!inputState)}><Eye /></span>
                    </div>
                </div>
                <div className="actionsForm">
                    <button disabled={disableButton} className="button" role='button' onClick={(e) => saveUser(e)} id="logIn">
                        <span>S'enregistrer</span>
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateUser