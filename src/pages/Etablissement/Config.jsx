import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../components/MetaData';
import { UpdateEtablissementConfig } from '../../Redux/actions/EtablissementConfigAction';

const Config = () => {

    const { userLog, setUserLog } = useContext(UserContext);
    const navigate = useNavigate()
    useEffect(() => {
        if (!userLog.isLogged) {
            navigate('/');
        }
    }, [userLog])

    const dispatch = useDispatch();
    const etablissementConfig = useSelector((state) => state.EtablissementConfigReducer);

    const [inputForm, setInputForm] = useState({
        degree: "",
        fajr: 0,
        dhuhr: 0,
        asr: 0,
        maghrib: 0,
        isha: 0,
    });

    useEffect(() => {
        if (etablissementConfig.idEtablissementConfig) {
            setInputForm({ ...inputForm, degree: etablissementConfig.degree, idEtablissementConfig: etablissementConfig.idEtablissementConfig, fajr: etablissementConfig.fajr, dhuhr: etablissementConfig.dhuhr, asr: etablissementConfig.asr, maghrib: etablissementConfig.maghrib, isha: etablissementConfig.isha })
        }
    }, [etablissementConfig]);

    const handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputForm({ ...inputForm, [name]: value });
    };


    const SaveConfig = (e) => {
        e.preventDefault();

        dispatch(UpdateEtablissementConfig({ ...inputForm, degree: inputForm.degree, fajr: parseInt(inputForm.fajr), dhuhr: parseInt(inputForm.dhuhr), asr: parseInt(inputForm.asr), maghrib: parseInt(inputForm.maghrib), isha: parseInt(inputForm.isha) }, userLog.token)).then(res => {
            console.log(res);
            if (res.status !== 200) {

            } else {

            }
        })
    }
    return (
        <>
            <MetaData title={`Configuration Etablissement - Linked`} index="false" />
            <form className="form" id="loginForm">
                <div className="fieldsForm">
                    <div className="field">
                        <label for="degree" className="fieldName">Angle<span style={{ color: "red" }}> *</span></label>
                        <select onChange={handleChangeInput} className="fieldValue" type="text" name="degree" id="degree" >
                            <option disabled>Choisissez votre angle</option>
                            <option selected={etablissementConfig.degree && etablissementConfig.degree == 15 ? true : false} value={15}>15°</option>
                            <option selected={etablissementConfig.degree && etablissementConfig.degree == 17 ? true : false} value={17}>17°</option>
                            <option selected={etablissementConfig.degree && etablissementConfig.degree == 17.5 ? true : false} value={17.5}>17.5°</option>
                            <option selected={etablissementConfig.degree && etablissementConfig.degree == 18 ? true : false} value={18}>18°</option>
                            <option selected={etablissementConfig.degree && etablissementConfig.degree == 18.2 ? true : false} value={18.2}>18.2°</option>
                            <option selected={etablissementConfig.degree && etablissementConfig.degree == 18.5 ? true : false} value={18.5}>18.5°</option>
                        </select>
                    </div>
                    <div className="field">
                        <label for="fajr" className="fieldName">Ajustements Fajr<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type="number" name="fajr" id="fajr" placeholder="0" defaultValue={etablissementConfig.fajr ? etablissementConfig.fajr : ""} />
                    </div>
                    <div className="field">
                        <label for="dhuhr" className="fieldName">Ajustements Dhuhr<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type="number" name="dhuhr" id="dhuhr" placeholder="0" defaultValue={etablissementConfig.dhuhr ? etablissementConfig.dhuhr : ""} />
                    </div>
                    <div className="field">
                        <label for="asr" className="fieldName">Ajustements Asr<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type="number" name="asr" id="asr" placeholder="0" defaultValue={etablissementConfig.asr ? etablissementConfig.asr : ""} />
                    </div>
                    <div className="field">
                        <label for="maghrib" className="fieldName">Ajustements Maghrib<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type="number" name="maghrib" id="maghrib" placeholder="0" defaultValue={etablissementConfig.maghrib ? etablissementConfig.maghrib : ""} />
                    </div>
                    <div className="field">
                        <label for="isha" className="fieldName">Ajustements Fajr<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChangeInput} className="fieldValue" type="number" name="isha" id="isha" placeholder="0" defaultValue={etablissementConfig.isha ? etablissementConfig.isha : ""} />
                    </div>
                </div>
                <div className="actionsForm">
                    <button className="button" role='button' onClick={(e) => SaveConfig(e)} id="logIn">
                        <span>Modifier la configuration</span>
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

export default Config