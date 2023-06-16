import {
    CREATE_FEEDBACK,
    RETRIEVE_FEEDBACKS,
    RETRIEVE_FEEDBACKS_ETABLISSEMENT,
    RETRIEVE_FEEDBACK,
    DELETE_FEEDBACK,
} from "./types";
import api from "../../http-common";

export const GetFeedbacks = (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        try {
            const res = await api.get("/feedback", config);
            dispatch({ payload: res.data, type: RETRIEVE_FEEDBACKS });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const GetFeedbacksByEtablissement = (idEtablissement, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        try {
            const res = await api.get(`/feedback/etablissement/${idEtablissement}`, config);
            dispatch({ payload: res.data, type: RETRIEVE_FEEDBACKS_ETABLISSEMENT });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const GetFeedback = (idFeedback, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        try {
            const res = await api.get(`/feeback/${idFeedback}`, config);
            dispatch({ payload: res.data, type: RETRIEVE_FEEDBACK });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};


export const AddFeedback = (data, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.post("/feedback", data, config);
            dispatch({ payload: res.data, type: CREATE_FEEDBACK });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const DeleteFeedback = (data, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        try {
            const res = await api.delete(`/feedback/${data.idFeedback}`, config);
            dispatch({ payload: data, type: DELETE_FEEDBACK });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};
