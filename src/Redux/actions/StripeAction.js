import {
    CREATE_STRIPE_PAYMENT
} from "./types";
import api from "../../http-common";

export const CreateStripePayment = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.post(`/create_stripe_payment_intent`, data);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};