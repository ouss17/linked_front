import {
    RETRIEVE_ROLES,
} from "./types";
import api from "../../http-common";


export const GetRoles = (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        try {
            const res = await api.get("/roles", config);
            dispatch({ payload: res.data, type: RETRIEVE_ROLES });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};
