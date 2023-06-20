import {
    CREATE_ETABLISSEMENT_CONFIG,
    RETRIEVE_ETABLISSEMENT_CONFIG,
    UPDATE_ETABLISSEMENT_CONFIG,
    DELETE_ETABLISSEMENT_CONFIG,
} from "../actions/types";

const initialState = [];

const EtablissementConfigReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ETABLISSEMENT_CONFIG:
            return [...state, payload];
            break;
        case RETRIEVE_ETABLISSEMENT_CONFIG:
            return payload;
            break;
        case UPDATE_ETABLISSEMENT_CONFIG:
            return {
                ...payload,
            };
            break;
        case DELETE_ETABLISSEMENT_CONFIG:
            return state.filter((etablissementConfig) => etablissementConfig.idEtablissementConfig != payload.idEtablissementConfig);
            break;
        default:
            return state;
            break;
    }
};

export default EtablissementConfigReducer;
