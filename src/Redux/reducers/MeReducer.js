import {
    RETRIEVE_ME,
    UPDATE_ME,
} from "../actions/types";

const initialState = [];

const MeReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_ME:
            return payload;
            break;
        case UPDATE_ME:
            return state.map((user) => {
                if (user.idUser === payload.idUser) {
                    return {
                        ...payload,
                    };
                }
                return user;
            });
            break;
        default:
            return state;
            break;
    }
};

export default MeReducer;
