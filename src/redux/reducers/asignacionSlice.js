import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const asignacionSlice = createSlice({
    name: "asignacion",
    initialState: {
        data: [],
        error: {
            message:''
        }
    },
    reducers: {
        successAsignacion: (state, action) => {
            state.data = action.payload.lista_asignaciones;
            state.error = {
                message:''
            }
        }
    }
});



export const { successAsignacion } = asignacionSlice.actions;

export const identifierActions = {
    FETCH_ALL_ASINGNAMENTS: 'FETCH_ALL_ASINGNAMENTS'
}

export const asignacionPersistConfig = {
    key:'asignacion',
    storage: storage,
}

export const dataAssignament = (state) => state.asignacion.data


export default asignacionSlice.reducer;