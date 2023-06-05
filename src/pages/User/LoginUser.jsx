import React, { useState } from 'react'
import MetaData from '../../components/MetaData';
import { Link } from 'react-router-dom';
import { Eye } from '../../assets/Svg/Svg';

const LoginUser = () => {
    const [inputState, setInputState] = useState(true);

    return (
        <>
            <MetaData title={`Connexion - Linked`} index="false" />
            <h1 className="title titleMain">Connexion</h1>
            <form className="form" id="loginForm">
                <div className="fieldsForm">
                    <div className="field">
                        <label for="userName" className="fieldName">Nom d'utilisateur ou adresse email <span style={{ color: "red" }}> *</span></label>
                        <input className="fieldValue" type="text" name="userName" id="userName" placeholder="user ou user@gmail.com" />
                    </div>
                    <div className="field">
                        <label for="userPass" className="fieldName">Mot de passe <span style={{ color: "red" }}> *</span></label>
                        <input className="fieldValue" type={inputState ? "password" : "text"} name="userPass" id="userPass" placeholder="Abcd1234?" />
                        <span className="passwordReveal" onClick={() => setInputState(!inputState)}><Eye /></span>
                    </div>
                </div>
                <div className="noAccount">
                    <Link to="/settings/register">Pas de compte ? Enregistrez-vous ici !</Link>
                </div>
                <div className="actionsForm">
                    <button className="button" id="logIn">
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