import React, { useEffect, useState } from 'react'
import { Actus, Gear, Home, Marker, Masjid, Media } from '../../assets/Svg/Svg'
import { Link } from 'react-router-dom'

const Menu = () => {
    const [menuActive, setMenuActive] = useState('/');
    const [arrayMenu, setArrayMenu] = useState([
        {
            id: "actus",
            link: "actus",
            component: <Actus fill={"none"} stroke={"black"} />
        },
        {
            id: "medias",
            link: "medias",
            component: <Media fill={"none"} stroke={"black"} fill2={"black"} stroke2={"none"} />
        },
        {
            id: "horaires",
            link: "/",
            component: <Home fill={"none"} stroke={"white"} />
        },
        {
            id: "localisation",
            link: "localisation",
            component: <Marker fill={"none"} stroke={"black"} />
        },
        {
            id: "settings",
            link: "settings",
            component: <Gear fill={"none"} stroke={"black"} />
        },
    ]);


    const ChangeMenuActive = (id, link) => {
        setMenuActive(link);
        const item = document.getElementById(id);
        document.getElementById('indicator').style.transition = 'all 500ms';
        document.getElementById('indicator').style.left = `${item.offsetLeft - 5}px`;
    }

    useEffect(() => {
        setArrayMenu([
            {
                id: "actus",
                link: "actus",
                component: <Actus fill={"none"} stroke={menuActive === "actus" ? "white" : "black"} />
            },
            {
                id: "medias",
                link: "medias",
                component: <Media fill={"none"} stroke={menuActive === "medias" ? "white" : "black"} fill2={menuActive === "medias" ? "white" : "black"} stroke2={"none"} />
            },
            {
                id: "horaires",
                link: "/",
                component: <Home fill={"none"} stroke={menuActive === "/" ? "white" : "black"} />
            },
            {
                id: "localisation",
                link: "localisation",
                component: <Marker fill={"none"} stroke={menuActive === "localisation" ? "white" : "black"} />
            },
            {
                id: "settings",
                link: "settings",
                component: <Gear fill={"none"} stroke={menuActive === "settings" ? "white" : "black"} />
            },
        ])
    }, [menuActive]);



    return (
        <nav id="navBar">
            <ul className="items">
                {
                    arrayMenu.map((menu, index) => (
                        menu.link === menuActive
                            ?
                            <li key={index} className="item active" id={menu.id} onClick={() => ChangeMenuActive(menu.id, menu.link)}>
                                <Link to={menu.link} className='link'>
                                    {
                                        menu.link === "actus"
                                        &&
                                        <div className="markerNews"></div>
                                    }
                                    <div className="icon">
                                        {menu.component}
                                    </div>
                                </Link>
                            </li>
                            :
                            <li key={index} className="item" id={menu.id} onClick={() => ChangeMenuActive(menu.id, menu.link)}>
                                <Link to={menu.link} className='link'>
                                    {
                                        menu.link === "actus"
                                        &&
                                        <div className="markerNews"></div>
                                    }
                                    <div className="icon">
                                        {menu.component}
                                    </div>
                                </Link>
                            </li>
                    ))
                }
                <div id="indicator">
                    <Masjid />
                </div>
            </ul>
        </nav>
    )
}

export default Menu