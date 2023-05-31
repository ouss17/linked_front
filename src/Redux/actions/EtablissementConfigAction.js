import {
    CREATE_ETABLISSEMENT_CONFIG,
    RETRIEVE_ETABLISSEMENT_CONFIG,
    UPDATE_ETABLISSEMENT_CONFIG,
    DELETE_ETABLISSEMENT_CONFIG,
} from "./types";
import api from "../../http-common";


export const GetEtablissementConfig = (idEtablissementConfig) => {
    return async (dispatch) => {
        try {
            const res = await api.get(`/etablissement_configs/${idEtablissementConfig}`);
            dispatch({ payload: res.data, type: RETRIEVE_ETABLISSEMENT_CONFIG });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};


export const AddEtablissementConfig = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.post("/etablissement_configs", data);
            dispatch({ payload: res.data, type: CREATE_ETABLISSEMENT_CONFIG });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const UpdateEtablissementConfig = (data) => {
    return async (dispatch) => {
        try {
            const res = await api.put(`/etablissement_configs/${data.idEtablissementConfig}`, data);
            dispatch({ payload: res.data, type: UPDATE_ETABLISSEMENT_CONFIG });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const DeleteEtablissementConfig = (data) => {
    return async (dispatch) => {
        try {
            const res = await api.delete(`/etablissement_configs/${data.idEtablissementConfig}`);
            dispatch({ payload: data, type: DELETE_ETABLISSEMENT_CONFIG });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};
