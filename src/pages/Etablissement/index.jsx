import React, { useContext, useEffect, useState } from 'react'
import MetaData from '../../components/MetaData'
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import AllActus from './AllActus';
import Config from './Config';
import Feedbacks from './Feedbacks';

const ConfigEtablissement = () => {

    const [currentMenu, setCurrentMenu] = useState(0);
    const { userLog, setUserLog } = useContext(UserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!userLog.isLogged) {
            navigate('/')
        }
    }, [userLog]);

    return (
        <>
            <MetaData title={`Gestion de l'établissement - Linked`} index="false" />
            <h1 className="title titleMain">Gestion de l'établissement</h1>
            <div className="menu-config">
                <ul>
                    <li onClick={() => setCurrentMenu(0)} style={{ color: currentMenu == 0 ? "var(--main-color)" : 'black' }}>Publications</li>
                    <li onClick={() => setCurrentMenu(1)} style={{ color: currentMenu == 1 ? "var(--main-color)" : 'black' }}>Configurations</li>
                    <li onClick={() => setCurrentMenu(2)} style={{ color: currentMenu == 2 ? "var(--main-color)" : 'black' }}>Retours d'utilisateurs</li>
                </ul>
            </div>
            {
                currentMenu == 0
                    ?
                    <AllActus />
                    :
                    currentMenu == 1
                        ?
                        <Config />
                        :
                        <Feedbacks />
            }
        </>
    )
}

export default ConfigEtablissement