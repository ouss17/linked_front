import {
    RETRIEVE_CATEGORY,
} from "../actions/types";
const initialState = [];


const CategoryReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case RETRIEVE_CATEGORY:
            return payload;
            break;

        default:
            return state;
            break;
    }
};

export default CategoryReducer;