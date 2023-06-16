import {
    CREATE_ACTU,
    RETRIEVE_ALL_ACTUS_ETABLISSEMENT,
    UPDATE_ACTU,
    DELETE_ACTU,
} from "../actions/types";

const initialState = [];

const AllActusByEtablissementReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ACTU:
            return [...state, payload];
            break;
        case RETRIEVE_ALL_ACTUS_ETABLISSEMENT:
            return payload;
            break;
        case UPDATE_ACTU:
            return state.map((actu) => {
                if (actu.idActu === payload.idActu) {
                    return {
                        ...payload,
                    };
                }
                return actu;
            });
            break;
        case DELETE_ACTU:
            return state.filter((actu) => actu.idActu != payload.idActu);
            break;
        default:
            return state;
            break;
    }
};

export default AllActusByEtablissementReducer;
