import {
    RETRIEVE_ACTUS_ETABLISSEMENT,
} from "../actions/types";

const initialState = [];

const ActusByEtablissementReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_ACTUS_ETABLISSEMENT:
            return payload;
            break;
        default:
            return state;
            break;
    }
};

export default ActusByEtablissementReducer;
