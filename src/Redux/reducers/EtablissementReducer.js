import {
    CREATE_ETABLISSEMENT,
    RETRIEVE_ETABLISSEMENT,
    UPDATE_ETABLISSEMENT,
    DELETE_ETABLISSEMENT,
} from "../actions/types";

const initialState = [];

const EtablissementReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ETABLISSEMENT:
            return [...state, payload];
            break;
        case RETRIEVE_ETABLISSEMENT:
            return payload;
            break;
        case UPDATE_ETABLISSEMENT:
            return state.map((etablissement) => {
                if (etablissement.idEtablissement === payload.idEtablissement) {
                    return {
                        ...payload,
                    };
                }
                return etablissement;
            });
            break;
        case DELETE_ETABLISSEMENT:
            return state.filter((etablissement) => etablissement.idEtablissement != payload.idEtablissement);
            break;
        default:
            return state;
            break;
    }
};

export default EtablissementReducer;
