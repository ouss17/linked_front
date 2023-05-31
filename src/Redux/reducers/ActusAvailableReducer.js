import {
    RETRIEVE_ACTUS_ETABLISSEMENT_AVAILABLE,
} from "../actions/types";
const initialState = [];


const ActusAvailableReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case RETRIEVE_ACTUS_ETABLISSEMENT_AVAILABLE:
            return payload;
            break;

        default:
            return state;
            break;
    }
};

export default ActusAvailableReducer;