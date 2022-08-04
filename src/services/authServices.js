import { axiosInstance, axiosLogin } from "Helpers/auth-helpers";

export const authService = {
    login: async (dataAuth) => {
        return await axiosLogin.post('/resource/login', dataAuth).then(res => res.data)
    }
}
