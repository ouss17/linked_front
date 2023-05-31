import {
    RETRIEVE_ACTU,
} from "../actions/types";
const initialState = [];


const ActuReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case RETRIEVE_ACTU:
            return payload;
            break;

        default:
            return state;
            break;
    }
};

export default ActuReducer;