import { createContext } from "react";

export default createContext({
    username: "",
    role: "",
    isLogged: false,
    token: '',
    idEtablissement: "",
    emailUser: "",
    setUser: () => { },
});
