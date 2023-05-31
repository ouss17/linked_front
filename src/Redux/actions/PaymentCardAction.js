import {
    CREATE_PAYMENTCARD,
    RETRIEVE_PAYMENTCARDS_USER,
    UPDATE_PAYMENTCARD,
    DELETE_PAYMENTCARD,
} from "./types";
import api from "../../http-common";


export const GetPaymentCardsByUser = (idUser) => {
    return async (dispatch) => {
        try {
            const res = await api.get(`/payment_cards/${idUser}`);
            dispatch({ payload: res.data, type: RETRIEVE_PAYMENTCARDS_USER });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const AddPaymentCard = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.post(`/payment_cards`, data);
            dispatch({ payload: res.data, type: CREATE_PAYMENTCARD });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const UpdatePaymentCard = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.put(`/payment_cards/${data.idPaymentCard}`, data);
            dispatch({ payload: res.data, type: UPDATE_PAYMENTCARD });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const DeletePaymentCard = (data) => {
    return async (dispatch) => {
        try {
            const res = await api.delete(`/payment_cards/${data.idPaymentCard}`);
            dispatch({ payload: data, type: DELETE_PAYMENTCARD });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};
