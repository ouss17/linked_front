import React, { useContext, useEffect, useState } from 'react'
import MetaData from '../../../components/MetaData'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import UserContext from '../../../context/UserContext';
import { ConnectUser } from '../../../Redux/actions/UserAction';
import { Eye } from '../../../assets/Svg/Svg';

const ChangePassword = () => {
    const [inputState, setInputState] = useState(true);
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
        password: "",
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
                setMsgError("Mot de passe incorrect")
                setErrorAction(true)
                setTimeout(() => {
                    setErrorAction(false)
                }, 5000);
            } else {
                navigate("/settings/newPassword");
            }
        })
        emptyValue();
    }

    return (
        <>
            <MetaData title={`Changer mot de passe - Linked`} index="false" />
            <h1 className="title titleMain">Changer mot de passe</h1>
            {
                errorAction
                &&
                <p className='errorAction'>{msgError}</p>
            }
            <form className="form" id="loginForm">
                <div className="fieldsForm">
                    <div className="field">
                        <label for="password" className="fieldName">Mot de passe <span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type={inputState ? "password" : "text"} name="password" id="password" placeholder="Abcd1234?" />
                        <span className="passwordReveal" onClick={() => setInputState(!inputState)}><Eye /></span>
                    </div>
                </div>
                <div className="actionsForm">
                    <button className="button" role='button' onClick={(e) => logUser(e)} id="logIn">
                        <span>Se connecter</span>
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

export default ChangePassword