import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router';
import MetaData from '../../components/MetaData';
import { AddFeedback } from '../../Redux/actions/FeedbackAction';
import { useDispatch } from 'react-redux';

const Feedback = () => {
    const { userLog, setUserLog } = useContext(UserContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isEmpty = (value) => {
        if (value === "" || value === undefined || value === null) return true;
        return false;
    };

    const [successAction, setSuccessAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);
    const [inputForm, setInputForm] = useState({
        idEtablissement: "",
        idUser: "",
        titleFeedback: "",
        detailFeedback: "",
    })

    const [disableButton, setDisableButton] = useState(true);
    useEffect(() => {
        if (inputForm.titleFeedback.trim() !== "" && inputForm.detailFeedback.trim() !== "") {
            setDisableButton(false);
        } else {
            setDisableButton(true)
        }
    }, [inputForm]);

    useEffect(() => {
        if (!userLog.isLogged) {
            navigate('/')
        } else {
            setInputForm({
                ...inputForm,
                idEtablissement: `/apiLinked/etablissements/1`,
                idUser: `/apiLinked/users/${userLog.id}`
            })
        }
    }, [userLog]);

    const handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputForm({ ...inputForm, [name]: value });
    };

    const emptyValue = () => {
        setInputForm({
            titleFeedback: "",
            detailFeedback: "",
        });
    };

    const SendFeedback = (e) => {
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

        dispatch(AddFeedback(inputForm, userLog.token)).then(res => {
            console.log(res);
            if (res.status !== 201) {
                setErrorAction(true)
                setTimeout(() => {
                    setErrorAction(false)
                }, 5000);
            } else {
                setSuccessAction(true)
                setTimeout(() => {
                    setSuccessAction(false)
                }, 3000);
                emptyValue();
            }
        })
    }


    return (
        <>
            <MetaData title={`Feedback - Linked`} index="false" />
            <h1 className="title titleMain">Feedback</h1>
            {
                successAction
                &&
                <p className='successAction'>Feedback envoyé avec succès !</p>
            }
            {
                errorAction
                &&
                <p className='errorAction'>Une erreur est survenue.</p>
            }
            <form className="form" id="loginForm">
                <div className="fieldsForm">
                    <div className="field">
                        <label for="titleFeedback" className="fieldName">Sujet<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type="text" name="titleFeedback" id="titleFeedback" placeholder="Problème d'eau" />
                    </div>
                    <div className="field">
                        <label for="detailFeedback" className="fieldName">Message <span style={{ color: "red" }}> *</span></label>
                        <textarea onChange={handleChangeInput} className="fieldValue" rows="8" cols="33" name="detailFeedback" id="detailFeedback" placeholder="Il y a une fuite d'eau" ></textarea>
                    </div>
                </div>
                <div className="actionsForm">
                    <button disabled={disableButton} className="button" role='button' onClick={(e) => SendFeedback(e)} id="logIn">
                        <span>Envoyer</span>
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

export default Feedback