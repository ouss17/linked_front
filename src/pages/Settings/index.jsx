import React, { useContext } from 'react'
import MetaData from '../../components/MetaData';
import { Book, Group, Plume, Puzzle, User, UserLock } from '../../assets/Svg/Svg';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Cookies from "js-cookie";
import { USER_CONNECTED_STORAGE } from '../../constant';

const Settings = () => {
    const { userLog, setUserLog } = useContext(UserContext);
    console.log(userLog, 'userlog');
    const destroySession = () => {
        Cookies.remove(USER_CONNECTED_STORAGE, {
            path: "/",
            sameSite: "Lax",
            secure: true,
        });
        setUserLog({
            username: "",
            role: "",
            paymentCards: "",
            idEtablissement: "",
            isLogged: false,
        })
    }


    return (
        <>
            <MetaData title={`Paramètres - Linked`} index="false" />
            <h1 className="title titleMain">Paramètres</h1>
            <div id="allSets">
                <Link to="/" className="setting" id="us">
                    <h2 className="title titleThird"><Group /> Qui sommes-nous ?</h2>
                </Link>
                <Link to="/settings/legal" className="setting" id="infoL">
                    <h2 className="title titleThird"><Plume /> Informations légales</h2>
                </Link>
                <Link to="/settings/confidentialite" className="setting" id="infoL">
                    <h2 className="title titleThird"><UserLock /> Politique de confidentialité</h2>
                </Link>
                <Link to="/settings/utilisation" className="setting" id="infoL">
                    <h2 className="title titleThird"><Book /> Conditions générales d'utilisation</h2>
                </Link>
                {
                    !userLog.isLogged ?
                        <Link to="/settings/login" className="setting" id="login">
                            <h2 className="title titleThird"><User /> Connexion</h2>
                        </Link>
                        :
                        <Link to="/" onClick={destroySession} className="setting" id="login">
                            <h2 className="title titleThird"><User /> Déconnexion</h2>
                        </Link>
                }
                <Link to="/settings/contributions" className="setting" id="contributions">
                    <h2 className="title titleThird"><Puzzle /> Contributions</h2>
                </Link>
            </div>
        </>
    )
}

export default Settings