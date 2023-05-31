import {
    RETRIEVE_ACTUS_ETABLISSEMENT_CATEGORY,
} from "../actions/types";
const initialState = [];


const ActusByCategoryReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case RETRIEVE_ACTUS_ETABLISSEMENT_CATEGORY:
            return payload;
            break;

        default:
            return state;
            break;
    }
};

export default ActusByCategoryReducer;