import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation
} from "react-router-dom";

// import Klaro with CSS
import * as Klaro from "klaro";

import ScrollToTop from "./components/Navbar/scrollToTop";

import ProtectedRoute from "./components/RouteRedirect/ProtectedRoute";

import { USER_CONNECTED_STORAGE } from "./constant";

import { Buffer } from "buffer";

import Cookies from "js-cookie";

import uniqid from "uniqid";

import AuthenticatedRoutes from "./Routes/AuthenticatedRoutes";

import Horaires from "./pages/Horaires/Horaires";
import Localisation from "./pages/Localisation/Localisation";
import GetCategories from "./pages/Category/GetCategories";
import GetContentByCategory from "./pages/Category/GetContentByCategory";
import GetActus from "./pages/Actus/GetActus";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";

import './App.css';
import Confidentialite from "./pages/Cookies";

const App = () => {
  const config = {
    lang: "fr",
    translations: {
      fr: {
        privacyPolicyUrl: "/confidentialite",
        consentModal: {
          description:
            "Nous conservons vos choix pendant 6 mois. Vous pouvez changer d’avis à tout moment en cliquant sur l’icône « gérer mes choix de cookies » en bas de chaque page de notre site Internet.",
        },
        purposes: {
          security: {
            title: "Security",
          },
          livechat: {
            title: "Livechat",
          },
          advertising: {
            title: "Advertising",
          },
          styling: {
            title: "Styling",
          },
        },
      },
    },
    apps: [
      {
        name: "utilisateur",
        title: "Token",
        description:
          "Nous y également un token qui dure le temps de la session qui nous permet de sécuriser l'acces à notre serveur de fichiers.",
        purposes: ["Informations de connexion"],
        default: true,
        required: true,
      },
      {
        name: "PHPSESSID",
        title: `${process.env.REACT_APP_NAME_SITE.toUpperCase()} Session ID`,
        description:
          "Expire quand on quitte la session de navigation qui permet de s’authentifier pour effectuer des requetes API",
        purposes: ["Informations de connexion"],
        default: true,
        required: true,
      },
      {
        name: "Klaro",
        title: "Sauvegarde du consentement des cookies",
        description:
          "Nous stockons vos choix de consentement dans la gestion des cookies",
        purposes: ["Consentement"],
        default: true,
      },
    ],
  };
  // we assign the Klaro module to the window, so that we can access it in JS
  window.klaro = Klaro;
  window.klaroConfig = config;
  // we set up Klaro with the config
  Klaro.setup(config);

  const [state, setState] = useState({
    username: "",
    role: "",
    isLogged: false,
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let serverAuthentifier = document.querySelector("[data-is-authenticated]");

    let user = Cookies.get(USER_CONNECTED_STORAGE);

    if (user) {
      if ((serverAuthentifier.dataset.isAuthenticated = "false")) {
        /*         sleep(3000).then(() => {
          Cookies.remove(USER_CONNECTED_STORAGE, {
            path: "/",
            sameSite: "Lax",
            secure: true,
          });
        }); */
      } else {
        let decodedUser = Buffer.from(user, "base64").toString("utf-8");
        decodedUser = JSON.parse(decodedUser);
        setState((prevState) => ({
          ...prevState,
          ...decodedUser,
        }));
      }

      if (pathname.includes("/admin")) {
        let currentPath = localStorage.getItem("path");
        if (currentPath) {
          navigate(currentPath);
          localStorage.removeItem("path");
        }
      }
    }
  }, []);

  const StructurationRoutes = (obj, key) => {
    if (obj.subNavigations.length > 0) {
      return (
        <Route key={key} element={<ProtectedRoute isAllowed={obj.allowed} />}>
          <Route path={obj.path}>
            {obj.subNavigations.map((subRoute) => (
              <Route
                key={uniqid()}
                path={subRoute.path}
                element={subRoute.element}
                index={subRoute.index}
              >
                {subRoute.subNavigations !== undefined ||
                  subRoute.subNavigations.length > 0
                  ? StructurationRoutes(subRoute, uniqid())
                  : null}
              </Route>
            ))}
          </Route>
        </Route>
      );
    } else {
      return (
        <Route
          key={uniqid()}
          element={<ProtectedRoute isAllowed={obj.allowed} />}
        >
          <Route path={obj.path} element={obj.element} />
        </Route>
      );
    }
  };
  return (
    <>
      <ScrollToTop>
        <Routes>
          {/* PUBLIC */}

          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Horaires />} />
            <Route path="/localisation" element={<Localisation />} />
            <Route path="/medias" element={<GetCategories />} />
            <Route path="/medias/:id" element={<GetContentByCategory />} />
            <Route path="/actus" element={<GetActus />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/confidentialite" element={<Confidentialite />} />

            {/* LOGGED ROUTES */}

            {AuthenticatedRoutes.map((route) =>
              StructurationRoutes(route, uniqid())
            )}
          </Route>

          {<Route path="*" element={<Navigate to="/" replace />} />}
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default App
