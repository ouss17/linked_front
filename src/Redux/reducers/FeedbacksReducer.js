import {
    RETRIEVE_FEEDBACKS,
} from "../actions/types";
const initialState = [];


const FeedbacksReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case RETRIEVE_FEEDBACKS:
            return payload;
            break;

        default:
            return state;
            break;
    }
};

export default FeedbacksReducer;