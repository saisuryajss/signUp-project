import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: false,
    extraReducers: {
        START: (state, action) => {
            return true;
        },
        STOP: (state, action) => {
            return false;
        },
        
    }
});


export default loadingSlice.reducer;