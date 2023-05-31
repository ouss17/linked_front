import {
    RETRIEVE_USER,
} from "../actions/types";

const initialState = [];

const UserReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_USER:
            return payload;
            break;
        default:
            return state;
            break;
    }
};

export default UserReducer;
