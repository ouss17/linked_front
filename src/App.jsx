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

import { useDispatch, useSelector } from "react-redux";


import './App.css';
import Confidentialite from "./pages/Cookies";
import { GetEtablissementConfig } from "./Redux/actions/EtablissementConfigAction";
import { GetEtablissement } from "./Redux/actions/EtablissementAction";
import { GetActusByEtablissement } from "./Redux/actions/ActusAction";
import { GetCategoriesActive } from "./Redux/actions/CategoryAction";
import Usage from "./pages/Usage";
import About from "./pages/About";
import Contributions from "./pages/Settings/Contributions";
import LoginUser from "./pages/User/LoginUser";
import CreateUser from "./pages/User/CreateUser";
import StripePaymentForm from "./pages/Payment/Stripe";
import { GetMe } from "./Redux/actions/UserAction";
import UserContext from "./context/UserContext";
import Profile from "./pages/User/Profile";
import ChangePassword from "./pages/User/Profile/ChangePassword";
import NewPassword from "./pages/User/Profile/NewPassword";

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

  const [userLog, setUserLog] = useState({
    username: "",
    role: "",
    idEtablissement: "",
    isLogged: false,
    emailUser: "",
    token: '',
    setUser: () => { },
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetEtablissement(1)).then(() => {
      dispatch(GetEtablissementConfig(1)).then(() => {
        dispatch(GetActusByEtablissement(1)).then(() => {
          dispatch(GetCategoriesActive(1))
        })
      })
    })
  }, []);

  const userLogged = useSelector((state) => state.MeReducer);

  useEffect(() => {
    let serverAuthentifier = document.querySelector("[data-is-authenticated]");

    let user = Cookies.get(USER_CONNECTED_STORAGE);
    let userE = Cookies.get(USER_CONNECTED_STORAGE + 'e');

    if (user) {
      dispatch(GetMe({}, user)).then((res) => {
        console.log(res);
        if (res.idUser) {
          setUserLog({
            username: res.nameUser,
            role: res.roles,
            paymentCards: res.paymentCards,
            idEtablissement: res.idEtablissement,
            emailUser: userE,
            isLogged: true,
            token: user
          })
          // let decodedUser = Buffer.from(user, "base64").toString("utf-8");
          // decodedUser = JSON.parse(decodedUser);
          // setState((prevState) => ({
          //   ...prevState,
          //   ...decodedUser,
          // }));
        } else {
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
          navigate('/')
        }
      })
      // if ((serverAuthentifier.dataset.isAuthenticated = "false")) {
      /*         sleep(3000).then(() => {
        Cookies.remove(USER_CONNECTED_STORAGE, {
          path: "/",
          sameSite: "Lax",
          secure: true,
        });
      }); */
      // } else {
      // let decodedUser = Buffer.from(user, "base64").toString("utf-8");
      // decodedUser = JSON.parse(decodedUser);
      // setState((prevState) => ({
      //   ...prevState,
      //   ...decodedUser,
      // }));
      // }

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
      <UserContext.Provider value={{ userLog, setUserLog }}>

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
              <Route path="settings/confidentialite" element={<Confidentialite />} />
              <Route path="settings/legal" element={<About />} />
              <Route path="settings/utilisation" element={<Usage />} />
              <Route path="settings/contributions" element={<Contributions />} />
              <Route path="settings/login" element={<LoginUser />} />
              <Route path="settings/register" element={<CreateUser />} />
              <Route path="settings/profile" element={<Profile />} />
              <Route path="settings/changePassword" element={<ChangePassword />} />
              <Route path="settings/newPassword" element={<NewPassword />} />
              <Route path="/payment/stripe" element={<StripePaymentForm />} />

              {/* LOGGED ROUTES */}

              {AuthenticatedRoutes.map((route) =>
                StructurationRoutes(route, uniqid())
              )}
            </Route>

            {<Route path="*" element={<Navigate to="/" replace />} />}
          </Routes>
        </ScrollToTop>
      </UserContext.Provider>
    </>
  );
}

export default App
