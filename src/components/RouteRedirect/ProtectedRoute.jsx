import React from "react";
import { Outlet } from "react-router-dom";
import { USER_CONNECTED_STORAGE } from "../../constant";
import { Buffer } from "buffer";
import propTypes from "prop-types";
import Cookies from "js-cookie";

const ProtectedRoute = ({ isAllowed }) => {
  let localStorageToParse = Cookies.get(USER_CONNECTED_STORAGE);
  let decoded = localStorageToParse
    ? Buffer.from(localStorageToParse, "base64").toString("utf-8")
    : "";
  let userLocalStorage = decoded ? JSON.parse(decoded) : "";

  return isAllowed.includes(userLocalStorage.role) && <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: propTypes.arrayOf(propTypes.string).isRequired,
};

ProtectedRoute.defaultProps = { isAllowed: ["ROLE_ADMIN"] };

export default ProtectedRoute;
