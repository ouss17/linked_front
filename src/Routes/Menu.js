import React from "react";
import { Actus, Gear, Home, Marker, Media } from "../assets/Svg/Svg";

/**
 * Contient les routes et Role autorisé pour accéder à la page
 **/
export const navigations = [
  {
    name: "",
    path: "",
    require: ["ROLE_USER", "ROLE_ADMIN", "ROLE_DEPARTEMENT", "ROLE_STRUCTURE"],
    icon: <Home />,
    showMessage: true,
    submenu: [],
  },
  {
    name: "",
    path: "localisation",
    require: ["ROLE_ADMIN", "ROLE_DEPARTEMENT", "ROLE_STRUCTURE"],
    icon: <Marker />,
    showMessage: true,
    submenu: [],
  },
  {
    name: "",
    path: "medias",
    require: ["ROLE_ADMIN", "ROLE_DEPARTEMENT", "ROLE_STRUCTURE"],
    icon: <Media />,
    showMessage: true,
    submenu: [],
  },

  {
    name: "",
    path: "actus",
    require: ["ROLE_ADMIN", "ROLE_DEPARTEMENT", "ROLE_STRUCTURE"],
    icon: <Actus />,
    showMessage: true,
    submenu: [],
  },
  {
    name: "",
    path: "settings",
    require: ["ROLE_ADMIN", "ROLE_DEPARTEMENT", "ROLE_STRUCTURE"],
    icon: <Gear />,
    showMessage: true,
    submenu: [],
  },
];
