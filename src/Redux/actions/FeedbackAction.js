import {
    CREATE_FEEDBACK,
    RETRIEVE_FEEDBACKS,
    RETRIEVE_FEEDBACKS_ETABLISSEMENT,
    RETRIEVE_FEEDBACK,
    DELETE_FEEDBACK,
} from "./types";
import api from "../../http-common";

export const GetFeedbacks = () => {
    return async (dispatch) => {
        try {
            const res = await api.get("/feedbacks");
            dispatch({ payload: res.data, type: RETRIEVE_FEEDBACKS });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const GetFeedbacksByEtablissement = (idEtablissement) => {
    return async (dispatch) => {
        try {
            const res = await api.get(`/feedbacks/etablissement/${idEtablissement}`);
            dispatch({ payload: res.data, type: RETRIEVE_FEEDBACKS_ETABLISSEMENT });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const GetFeedback = (idFeedback) => {
    return async (dispatch) => {
        try {
            const res = await api.get(`/feebacks/${idFeedback}`);
            dispatch({ payload: res.data, type: RETRIEVE_FEEDBACK });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};


export const AddFeedback = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.post("/feedbacks", data);
            dispatch({ payload: res.data, type: CREATE_FEEDBACK });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const DeleteFeedback = (data) => {
    return async (dispatch) => {
        try {
            const res = await api.delete(`/feedbacks/${data.idFeedback}`);
            dispatch({ payload: data, type: DELETE_FEEDBACK });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};
