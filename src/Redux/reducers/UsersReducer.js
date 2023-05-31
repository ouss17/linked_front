import {
    CREATE_USER,
    RETRIEVE_USERS,
    UPDATE_USER,
    DELETE_USER
} from "../actions/types";

const initialState = [];

const UsersReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_USER:
            return [...state, payload];
            break;
        case RETRIEVE_USERS:
            return payload;
            break;
        case UPDATE_USER:
            return state.map((user) => {
                if (user.idUser === payload.idUser) {
                    return {
                        ...payload,
                    };
                }
                return user;
            });
            break;
        case DELETE_USER:
            return state.filter((user) => user.idUser != payload.idUser);
            break;
        default:
            return state;
            break;
    }
};

export default UsersReducer;
