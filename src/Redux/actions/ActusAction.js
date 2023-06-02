import {
    CREATE_ACTU,
    RETRIEVE_ACTUS_ETABLISSEMENT,
    RETRIEVE_ACTUS_ETABLISSEMENT_CATEGORY,
    RETRIEVE_ACTUS_ETABLISSEMENT_AVAILABLE,
    RETRIEVE_ACTU,
    UPDATE_ACTU,
    DELETE_ACTU,
} from "./types";
import api from "../../http-common";


export const GetActusByEtablissement = (idEtablissement) => {
    return async (dispatch) => {
        try {
            const res = await api.get("/actus/etablissement/" + idEtablissement + "?hydra:false");
            dispatch({ payload: res.data, type: RETRIEVE_ACTUS_ETABLISSEMENT });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};


export const GetActusByCategory = (idEtablissement, idCategory) => {
    return async (dispatch) => {
        try {
            const res = await api.get("/actus/category/" + idEtablissement + "/" + idCategory);
            dispatch({ payload: res.data, type: RETRIEVE_ACTUS_ETABLISSEMENT_CATEGORY });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const GetActusAvailable = () => {
    return async (dispatch) => {
        try {
            const res = await api.get(`/actus/available`);
            dispatch({ payload: res.data, type: RETRIEVE_ACTUS_ETABLISSEMENT_AVAILABLE });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const GetActu = (idActu) => {
    return async (dispatch) => {
        try {
            const res = await api.get(`/actus/${idActu}`);
            dispatch({ payload: res.data, type: RETRIEVE_ACTU });
            return res;
        } catch (error) {
            console.log(error);
            return error;
            return error;
        }
    };
};

export const AddActu = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.post("/actus", data);
            dispatch({ payload: res.data, type: CREATE_ACTU });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const UpdateActu = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.put(`/actus/${data.idActu}`, data);
            dispatch({ payload: res.data, type: UPDATE_ACTU });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const DeleteActu = (data) => {
    return async (dispatch) => {
        try {
            const res = await api.delete(`/actus/${data.idActu}`);
            dispatch({ payload: data, type: DELETE_ACTU });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};
