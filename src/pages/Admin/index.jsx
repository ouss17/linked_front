import React, { useContext, useEffect, useState } from 'react'
import MetaData from '../../components/MetaData'
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Users from './Users';
import Categories from './Categories';

const Admin = () => {

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
                    <li onClick={() => setCurrentMenu(0)} style={{ color: currentMenu == 0 ? "var(--main-color)" : 'black' }}>Utilisateurs</li>
                </ul>
            </div>
            {
                currentMenu == 0
                    ?
                    <Users />
                    :
                    <Categories />
            }
        </>
    )
}

export default Admin