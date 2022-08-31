import { axiosInstance, axiosLogin } from "config/axiosConfig";

export const authService = {
    login: async (dataAuth) => {
        return await axiosLogin.post('/resource/login', dataAuth)
        .then(res => res)
        .catch(res => {
            return res.response
        })

        
    }

}


export const tableAssignment = {
    asignacion: async (usuario) => {
        return await axiosInstance.get(`/asignacionesF?viIdUsuario=${usuario}`)
        .then(res => res)
        .catch(res => {
            return res
        })
    }

}	



export const tableRecord = {
    record: async (niSecEEta) => {
        return await axiosInstance.get(`/antecedentes-expediente?niSecEETA=${niSecEEta}`)
        .then(res => res)
        .catch(res => {
            return res
        })
    }

}

export const tableInformation= {
    information: async ({niSecEEta,viIdUsuario}) => { 
        return await axiosInstance.get(`/informacionBasica?niSecEEta=${niSecEEta}&viIdUsuario=${viIdUsuario}`, )
        .then(res => res)
        .catch(res => {
            return res.response
        })
    }
 


}

export const saveRecord= {
    saveinformation: async ({niSecEEta,viIdUsuario,niSecDoc}) => { 
        return await axiosInstance.post(`/guardar_antecedente?niSecEEta=${niSecEEta}&viIdUsuario=${viIdUsuario}&niSecDoc=${niSecDoc}`)
        .then(res => res)
        .catch(res => {
            return res.response
        })
    }
}

export const seeAntecedentes={
    seeRecord: async(niSecEEta)=>{
        return await axiosInstance.get(`antecedentes_agregados?niSecEETA=${niSecEEta}`)
        .then(res => res)
        .catch(res => {
            return res.response
        })
    }
}

export const deleteRecord={
    deleteSeeRecord: async({niSecEEta,viIdUsuario,niSecDoc})=>{
        return await axiosInstance.delete(`borrar_antecedente?niSecEEta=${niSecEEta}&niSecDoc=${niSecDoc}&viIdUsuario=${viIdUsuario}`)
        .then(res => res)
        .catch(res => {
            return res.response
        })
    }
}

export const saveSign = {
    saveSignIt: async(data)=>{
        return await axiosInstance.post(`guardar_firma`,data)
        .then(res => res)
        .catch(res =>{
            return res.response
        })
    }
}

export const querySign = {
    queryOfSign : async(niSecEEta)=>{
        return await axiosInstance.get(`firmas?niSecEETA=${niSecEEta}`)
        .then(res => res)
        .catch(res =>{
            return res.response
        })
    }
}