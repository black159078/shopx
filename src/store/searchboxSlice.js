import { createSlice } from "@reduxjs/toolkit";

const searchboxSlice = createSlice({
    name:'searchbox',
    initialState:{
        searchtext:""
    },
    reducers:{
        setSearchtext:(state,action)=>{
            state.searchtext = action.payload;
        }
    }
});

export const {setSearchtext} = searchboxSlice.actions;
export default searchboxSlice.reducer;