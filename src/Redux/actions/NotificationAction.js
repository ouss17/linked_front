import {
    CREATE_NOTIFCATION,
    RETRIEVE_NOTIFICATIONS,
    RETRIEVE_NOTIFICATION,
    UPDATE_NOTIFCATION,
    DELETE_NOTIFCATION,
} from "./types";
import api from "../../http-common";


export const GetNotifications = () => {
    return async (dispatch) => {
        try {
            const res = await api.get(`/notifications`);
            dispatch({ payload: res.data, type: RETRIEVE_NOTIFICATIONS });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const GetNotification = (idNotification) => {
    return async (dispatch) => {
        try {
            const res = await api.get(`/notifications/${idNotification}`);
            dispatch({ payload: res.data, type: RETRIEVE_NOTIFICATION });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const AddNotification = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.post(`/notifications`, data);
            dispatch({ payload: res.data, type: CREATE_NOTIFCATION });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const UpdateNotification = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.put(`/notifications/${data.idNotification}`, data);
            dispatch({ payload: res.data, type: UPDATE_NOTIFCATION });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const DeleteNotification = (data) => {
    return async (dispatch) => {
        try {
            const res = await api.delete(`/notifications/${data.idNotification}`);
            dispatch({ payload: data, type: DELETE_NOTIFCATION });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};
