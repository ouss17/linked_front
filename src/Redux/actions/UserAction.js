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

export const GetMe = (data, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        try {
            const res = await api.post(`/me`, data, config);
            dispatch({ payload: res.data, type: RETRIEVE_ME });
            return res.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const ConnectUser = (data) => {
    return async (dispatch) => {
        try {
            const res = await api.post(`/login_check`, data);
            return res;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };
};

export const AddUser = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.post(`/register`, data);
            dispatch({ payload: res.data, type: CREATE_USER });
            return res;
        } catch (error) {
            console.log(error.response);
            return error.response;
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
