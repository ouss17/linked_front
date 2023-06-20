import React, { useContext } from 'react'
import MetaData from '../../components/MetaData';
import { Book, Group, MultipleGear, Plume, Puzzle, User, UserLock, UserPro } from '../../assets/Svg/Svg';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Cookies from "js-cookie";
import { USER_CONNECTED_STORAGE } from '../../constant';

const Settings = () => {
    const { userLog, setUserLog } = useContext(UserContext);
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
            id: "",
            username: "",
            role: "",
            paymentCards: "",
            emailUser: "",
            idEtablissement: "",
            isLogged: false,
        })
    }


    return (
        <>
            <MetaData title={`Paramètres - Linked`} index="false" />
            <h1 className="title titleMain">Paramètres</h1>
            <div id="allSets">
                {
                    userLog.isLogged &&
                    <Link to="/settings/profile" className="setting" id="login">
                        <h2 className="title titleThird"><User /> Profil</h2>
                    </Link>

                }
                {
                    userLog.isLogged
                    &&
                    userLog.idEtablissement !== null
                    &&
                    userLog.role.includes("ROLE_GERANT")
                    &&
                    <Link to="/settings/etablissement" className="setting" id="login">
                        <h2 className="title titleThird"><MultipleGear /> Gestion de l'établissement</h2>
                    </Link>

                }
                {
                    userLog.isLogged
                    &&
                    userLog.role.includes("ROLE_ADMIN")
                    &&
                    <Link to="/settings/admin" className="setting" id="login">
                        <h2 className="title titleThird"><MultipleGear /> Admin</h2>
                    </Link>

                }
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

                {
                    userLog.isLogged
                    &&
                    userLog.idEtablissement == null
                    &&
                    <Link to="/settings/gestionEtablissement" className="setting" id="login">
                        <h2 className="title titleThird"><UserPro /> Vous voulez gérer un établissement ?</h2>
                    </Link>

                }
                <Link to="/settings/legal" className="setting" id="infoL">
                    <h2 className="title titleThird"><Plume /> Informations légales</h2>
                </Link>
                <Link to="/settings/confidentialite" className="setting" id="infoL">
                    <h2 className="title titleThird"><UserLock /> Politique de confidentialité</h2>
                </Link>
                <Link to="/settings/utilisation" className="setting" id="infoL">
                    <h2 className="title titleThird"><Book /> Conditions générales d'utilisation</h2>
                </Link>
                <Link to="/settings/contributions" className="setting" id="contributions">
                    <h2 className="title titleThird"><Puzzle /> Contributions</h2>
                </Link>
            </div>
        </>
    )
}

export default Settings