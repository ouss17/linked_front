import {
    CREATE_CATEGORY,
    RETRIEVE_CATEGORIES,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
} from "../actions/types";

const initialState = [];

const CategoriesReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_CATEGORY:
            return [...state, payload];
            break;
        case RETRIEVE_CATEGORIES:
            return payload;
            break;
        case UPDATE_CATEGORY:
            return state.map((category) => {
                if (category.idCategory === payload.idCategory) {
                    return {
                        ...payload,
                    };
                }
                return category;
            });
            break;
        case DELETE_CATEGORY:
            return state.filter((category) => category.idCategory != payload.idCategory);
            break;
        default:
            return state;
            break;
    }
};

export default CategoriesReducer;
