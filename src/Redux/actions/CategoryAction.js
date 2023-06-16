import {
    CREATE_CATEGORY,
    RETRIEVE_CATEGORIES,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    RETRIEVE_CATEGORIES_ACTIVE,
    RETRIEVE_CATEGORY
} from "./types";
import api from "../../http-common";


export const GetCategories = () => {
    return async (dispatch) => {
        try {
            const res = await api.get("/categories");
            dispatch({ payload: res.data, type: RETRIEVE_CATEGORIES });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const GetCategory = (idCategory) => {
    return async (dispatch) => {
        try {
            const res = await api.get("/categories/" + idCategory);
            dispatch({ payload: res.data, type: RETRIEVE_CATEGORY });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const GetCategoriesActive = (idEtablissement) => {
    return async (dispatch) => {
        try {
            const res = await api.get("/categories/active/" + idEtablissement);
            dispatch({ payload: res.data, type: RETRIEVE_CATEGORIES_ACTIVE });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const AddCategory = (data, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.post("/categories", data, config);
            dispatch({ payload: res.data, type: CREATE_CATEGORY });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const UpdateCategory = (data, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.put(`/categories/${data.idCategory}`, data, config);
            dispatch({ payload: res.data, type: UPDATE_CATEGORY });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const DeleteCategory = (data, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        try {
            const res = await api.delete(`/categories/${data.idCategory}`, config);
            dispatch({ payload: data, type: DELETE_CATEGORY });
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};
