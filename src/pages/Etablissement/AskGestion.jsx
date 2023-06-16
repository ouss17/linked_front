import React, { useContext, useEffect, useState } from 'react'
import MetaData from '../../components/MetaData'
import UserContext from '../../context/UserContext';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { SendMail } from '../../Redux/actions/mailAction';

const AskGestion = () => {
    const [successAction, setSuccessAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);
    const { userLog, setUserLog } = useContext(UserContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userLog.isLogged) {
            navigate("/");
        }
    }, [userLog]);

    const [msgError, setMsgError] = useState("");
    const [inputForm, setInputForm] = useState({
        phone: "",
    });

    const handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputForm({ ...inputForm, [name]: value });
    };

    const emptyValue = () => {
        setInputForm({
            phone: "",
        });
    };

    const sendAsk = (e) => {
        e.preventDefault();
        let regex = /^(0[67]\d{8}|\+33[67]\d{8})$/;
        if (inputForm.phone.trim() !== "") {
            if (regex.test(inputForm.phone)) {
                dispatch(SendMail({
                    amount: null,
                    username: userLog.username,
                    sender: userLog.emailUser,
                    email: "mr.ousmanediarra@gmail.com",
                    mosquee: "mosquée Al Rahma",
                    subject: "Demande de gestion d'établissement",
                    content: "<p> Bonjour administrateurs de Linked, j'aimerais prendre en charge la gestion de la mosquee.</p> <p>Voici mon numéro de téléphone : " + inputForm.phone + "</p> <p>Merci !</p> <p>Cordialement</p>"
                }, userLog.token))
            } else {
                setMsgError("Votre numéro de téléphone n'est pas valide, veuillez entrer un numéro commençant par 06, 07, +336 ou +337");
            }
        }
    }

    return (
        <>
            <MetaData title={`Demande gestion - Linked`} index="false" />
            <h1 className="title titleMain">Demande de gestion d'établissement</h1>
            {
                successAction
                &&
                <p className='successAction'>Votre demande a été envoyée.</p>
            }
            {
                errorAction
                &&
                <p className='errorAction'>{msgError}</p>
            }
            <form className="form" id="loginForm">
                <div className="fieldsForm">
                    <div className="field">
                        <p style={{ textAlign: "justify" }}>Vous êtes en train d'effectuer une demande de gestion d'établissement. En cliquant sur le bouton d'envoi, les administrateurs seront notifiés de cette demande et vous recontacteront dans les plus brefs délais pour un petit entretien vocal servant à déterminer l'issue de votre demande. Pour cela, veuillez entrer votre numéro de téléphone dans le champ ci-dessous. Ce numéro ne sera pas enregistré sur le site par la suite. </p>
                    </div>
                    <div className="field">
                        <label for="phone" className="fieldName">N° de téléphone<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type="text" name="phone" id="phone" placeholder="062545****" />
                    </div>
                </div>
                <div className="actionsForm">
                    <button className="button" role='button' onClick={(e) => sendAsk(e)} id="logIn">
                        <span>Faire ma demande</span>
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

export default AskGestion