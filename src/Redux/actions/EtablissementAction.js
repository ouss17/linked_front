import {
    CREATE_ETABLISSEMENT,
    RETRIEVE_ETABLISSEMENTS,
    RETRIEVE_ETABLISSEMENT,
    UPDATE_ETABLISSEMENT,
    DELETE_ETABLISSEMENT,
} from "./types";
import api from "../../http-common";


export const GetEtablissements = () => {
    return async (dispatch) => {
        try {
            const res = await api.get("/etablissements");
            dispatch({ payload: res.data, type: RETRIEVE_ETABLISSEMENTS });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const GetEtablissement = (idEtablissement) => {
    return async (dispatch) => {
        try {
            const res = await api.get(`/etablissements/${idEtablissement}`);
            dispatch({ payload: res.data, type: RETRIEVE_ETABLISSEMENT });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};


export const AddEtablissement = (data, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.post("/etablissements", data, token);
            dispatch({ payload: res.data, type: CREATE_ETABLISSEMENT });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const UpdateEtablissement = (data, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.put(`/etablissements/${data.idEtablissement}`, data, token);
            dispatch({ payload: res.data, type: UPDATE_ETABLISSEMENT });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const DeleteEtablissement = (data, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        try {
            const res = await api.delete(`/etablissements/${data.idEtablissement}`, token);
            dispatch({ payload: data, type: DELETE_ETABLISSEMENT });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};
