import {
    RETRIEVE_FEEDBACK,
} from "../actions/types";
const initialState = [];


const FeedbackReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case RETRIEVE_FEEDBACK:
            return payload;
            break;

        default:
            return state;
            break;
    }
};

export default FeedbackReducer;