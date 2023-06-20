import {
    RETRIEVE_ROLES,
} from "../actions/types";
const initialState = [];


const RolesReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case RETRIEVE_ROLES:
            return payload;
            break;

        default:
            return state;
            break;
    }
};

export default RolesReducer;