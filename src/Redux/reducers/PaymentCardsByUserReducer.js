import {
    CREATE_PAYMENTCARD,
    RETRIEVE_PAYMENTCARDS_USER,
    UPDATE_PAYMENTCARD,
    DELETE_PAYMENTCARD,
} from "../actions/types";

const initialState = [];

const PaymentCardsByUserReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PAYMENTCARD:
            return [...state, payload];
            break;
        case RETRIEVE_PAYMENTCARDS_USER:
            return payload;
            break;
        case UPDATE_PAYMENTCARD:
            return state.map((paymentCard) => {
                if (paymentCard.idPaymentCard === payload.idPaymentCard) {
                    return {
                        ...payload,
                    };
                }
                return paymentCard;
            });
            break;
        case DELETE_PAYMENTCARD:
            return state.filter((paymentCard) => paymentCard.idPaymentCard != payload.idPaymentCard);
            break;
        default:
            return state;
            break;
    }
};

export default PaymentCardsByUserReducer;
