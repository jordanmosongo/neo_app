import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    evenements: {},
    evenementSelect: {},
    participants: {}

}

const evenementSlice = createSlice({
    name: 'evenements',
    initialState,
    reducers: {
        addEvenements: (state, action) => {
            state.evenements = action.payload
        },
        addEvenementSelect: (state, action) => {
            state.evenementSelect = action.payload
        },
        addParticipants: (state, action) => {
            state.participants = action.payload
        }
    }
})

export const { addEvenements, addEvenementSelect, addParticipants } = evenementSlice.actions;
export default evenementSlice.reducer;
