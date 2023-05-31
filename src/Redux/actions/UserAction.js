import {
    CREATE_USER,
    RETRIEVE_USER,
    RETRIEVE_USERS,
    RETRIEVE_ME,
    UPDATE_USER,
    DELETE_USER,
    UPDATE_ME,
} from "./types";
import api from "../../http-common";

export const GetUsers = (idUser) => {
    return async (dispatch) => {
        try {
            const res = await api.get(`/users`);
            dispatch({ payload: res.data, type: RETRIEVE_USERS });
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const GetUser = (idUser) => {
    return async (dispatch) => {
        try {
            const res = await api.get(`/users/${idUser}`);
            dispatch({ payload: res.data, type: RETRIEVE_USER });
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const GetMe = (data) => {
    return async (dispatch) => {
        try {
            const res = await api.post(`/me`, data);
            dispatch({ payload: res.data, type: RETRIEVE_ME });
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const LoginUser = (data) => {
    return async (dispatch) => {
        try {
            const res = await api.post(`/login_check/`, data);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const AddUser = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.post(`/users`, data);
            dispatch({ payload: res.data, type: CREATE_USER });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const UpdateUser = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.put(`/users/${data.idUser}`, data);
            dispatch({ payload: res.data, type: UPDATE_USER });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const UpdateMe = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.put(`/users/${data.idUser}`, data);
            dispatch({ payload: res.data, type: UPDATE_ME });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const DeleteUser = (data) => {
    return async (dispatch) => {
        try {
            const res = await api.delete(`/users/${data.idUser}`);
            dispatch({ payload: data, type: DELETE_USER });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};
