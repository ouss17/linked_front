import {
    RETRIEVE_CATEGORIES_ACTIVE,
} from "../actions/types";
const initialState = [];


const CategoriesActiveReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case RETRIEVE_CATEGORIES_ACTIVE:
            return payload;
            break;

        default:
            return state;
            break;
    }
};

export default CategoriesActiveReducer;