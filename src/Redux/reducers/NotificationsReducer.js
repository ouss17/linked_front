import {
    CREATE_NOTIFICATION,
    RETRIEVE_NOTIFICATIONS,
    UPDATE_NOTIFICATION,
    DELETE_NOTIFICATION,
} from "../actions/types";

const initialState = [];

const NotificationsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_NOTIFICATION:
            return [...state, payload];
            break;
        case RETRIEVE_NOTIFICATIONS:
            return payload;
            break;
        case UPDATE_NOTIFICATION:
            return state.map((notification) => {
                if (notification.idNotification === payload.idNotification) {
                    return {
                        ...payload,
                    };
                }
                return notification;
            });
            break;
        case DELETE_NOTIFICATION:
            return state.filter((notification) => notification.idNotification != payload.idNotification);
            break;
        default:
            return state;
            break;
    }
};

export default NotificationsReducer;
