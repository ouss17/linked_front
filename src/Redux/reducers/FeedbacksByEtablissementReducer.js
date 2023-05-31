import {
    CREATE_FEEDBACK,
    RETRIEVE_FEEDBACKS_ETABLISSEMENT,
    DELETE_FEEDBACK,
} from "../actions/types";

const initialState = [];

const FeedbacksByEtablissementReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_FEEDBACK:
            return [...state, payload];
            break;
        case RETRIEVE_FEEDBACKS_ETABLISSEMENT:
            return payload;
            break;
        case DELETE_FEEDBACK:
            return state.filter((feedback) => feedback.idFeeback != payload.idFeeback);
            break;
        default:
            return state;
            break;
    }
};

export default FeedbacksByEtablissementReducer;
