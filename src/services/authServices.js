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

export const queryAutogestion = {
    queryOfAutogestion : async(niSecEEta)=>{
        return await axiosInstance.get(`autogestion?niSecEETa=${niSecEEta}`)
        .then(res => res)
        .catch(res =>{
            return res.response
        })
    }
}
export const queryUser = {
    queryUserIt: async(niSecExp)=>{
        return await axiosInstance.get(`consulta_usuario?niSecExp=${niSecExp}`)
        .then(res => res)
        .catch(res =>{
            return res.response
        })
    }
}
export const obligaIt = {
    queryObligaIt: async({niSecEETA,niSecTer})=>{
        return await axiosInstance.get(`consulta_obligacionesIt?niSecEETA=${niSecEETA}&niSecTer=${niSecTer}`)
        .then(res => res)
        .catch(res =>{
            return res.response
        })
    }
    
}

export const saveObligaIt = {
    saveItObliga: async({niSecEEta,nioLinea,niSecDoc,niSecTer,viObligacion,viPeriodica,niPlazo,viCumple,viObs,viMotivoParcial,viIdUsuario})=>{
        return await axiosInstance.post(`guardar_ObligacionIt?niSecEEta=${niSecEEta}&niSecTer=${niSecTer}&nioLinea=${nioLinea}&niSecDoc=${niSecDoc}&viObligacion=${viObligacion}&viPeriodica=${viPeriodica}&niPlazo=${niPlazo}&viCumple=${viCumple}&viObs=${viObs}&viMotivoParcial=${viMotivoParcial}&viIdUsuario=${viIdUsuario}`)
        .then(res => res)
        .catch(res =>{
            return res.response
        })
    }
}

export const seeActs = {
    ActsExp: async(niSecExp)=>{
        return await axiosInstance.get(`actos_expediente?niSecExp=${niSecExp}`)
        .then(res => res)
        .catch(res =>{
            return res.response
        })
    }
}

export const queryCoordinates = {
    coordinatesProcedure: async({niSecEETA, viUsuario})=>{
        return await axiosInstance.get(`consulta_coordenadas?niSecEETA=${niSecEETA}&viUsuario=${viUsuario}`)
        .then(res => res)
        .catch(res =>{
            return res.response
        })
    }
}