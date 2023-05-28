import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "../Menu";

const Layout = () => {
    const location = useLocation();

    return (
        <div id="container">
            <div id="container2">
                <Outlet />
            </div>
            <Menu
            />
        </div>
    );
};

export default Layout;
