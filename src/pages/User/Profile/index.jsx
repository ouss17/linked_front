import React, { useContext, useEffect } from 'react'
import UserContext from '../../../context/UserContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { userLog, setUserLog } = useContext(UserContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (!userLog.isLogged) {
            navigate("/");
        } else {
            console.log(userLog);
        }
    }, [userLog]);
    return (
        <form className="form" id="loginForm">
            <div className="fieldsForm">
                <div className="field">
                    <label for="username" className="fieldName">Nom d'utilisateur</label>
                    <input disabled className="fieldValue" value={userLog.username} type="text" name="username" id="username" placeholder="user@gmail.com" />
                </div>
                <div className="field">
                    <label for="emailUser" className="fieldName">Adresse email</label>
                    <input disabled className="fieldValue" value={userLog.emailUser} type={"text"} name="emailUser" id="emailUser" placeholder="Abcd1234?" />
                </div>
            </div>
            <div className="changePass">
                <Link to="/settings/changePassword">Changer de mot de passe</Link>
            </div>
        </form>
    )
}

export default Profile