import {
    RETRIEVE_NOTIFICATION,
} from "../actions/types";
const initialState = [];


const NotificationReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case RETRIEVE_NOTIFICATION:
            return payload;
            break;

        default:
            return state;
            break;
    }
};

export default NotificationReducer;