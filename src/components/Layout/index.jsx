import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "../Menu";
import ChargeContext from "../../context/ChargeContext";

const Layout = () => {
    const location = useLocation();
    const { charge, setCharge } = useContext(ChargeContext);

    return (
        <div id="container">

            {
                charge &&
                <>
                    <div id="container2">
                        <Outlet />
                    </div>
                    <Menu
                    />
                </>
            }
        </div>
    );
};

export default Layout;
