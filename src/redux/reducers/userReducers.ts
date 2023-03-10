import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        id: 'default',
        name: 'default',
        email: 'default',
        level: {
            admin: false,
            member: false,
            guest: true
        }
    },
    reducers:{
        setId: (state, action) => {
            state.id = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setLevel: (state, action) => {
            state.level = action.payload;
        }
    }
});

export const { setId, setName, setEmail, setLevel } = slice.actions;
export default slice.reducer;
