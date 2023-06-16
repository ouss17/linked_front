import api from "../../http-common";

export const SendMail = (data, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` // Ajoutez le token JWT à l'en-tête Authorization
        }
    }
    return async (dispatch) => {
        console.log(data);
        try {
            const res = await api.post(`/mail`, data, config);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};