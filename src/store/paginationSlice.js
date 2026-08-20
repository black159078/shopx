import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchalldata = createAsyncThunk('/products/fetchproducts',async()=>{
    const {data} = await axios.get('http://localhost:5000/api/products');
    // console.log(data);
    return data;
});

const paginationSlice = createSlice({
    name:'products',
    initialState:{
        datas:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchalldata.pending,(state)=>{
                state.loading = true;
            })
            .addCase(fetchalldata.fulfilled,(state,action)=>{
                state.loading = false;
                state.datas = action.payload;
            })
            .addCase(fetchalldata.rejected,(state,action)=>{
                state.loading = true;
                state.error = action.error.message;
            })
    }
}) 

export default paginationSlice.reducer;