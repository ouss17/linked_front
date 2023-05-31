import {
    RETRIEVE_ETABLISSEMENTS,
} from "../actions/types";
const initialState = [];


const EtablissementsReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case RETRIEVE_ETABLISSEMENTS:
            return payload;
            break;

        default:
            return state;
            break;
    }
};

export default EtablissementsReducer;