import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'app',
    initialState: {
        login: false,
        token: '',
        language: ['italian','english','german'],
        current: 0,
        session: 0
    },
    reducers:{
        setLogin: (state, action) => {
            state.login = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setCurrent: (state, action) => {
            state.current = action.payload;
        },
        setSession: (state, action) => {
            state.session = action.payload;
        }
    }
});

export const { setLogin, setToken, setCurrent, setSession } = slice.actions;
export default slice.reducer;
