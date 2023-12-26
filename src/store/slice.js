import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const base_URL = "https://dummyjson.com/products"

const initialState = {
    productsDataSlice: [],
    isProductsLoading: false,
    hasProductsError: false,
};

export const productsData = createAsyncThunk("fetchProductsData", async () => {
    const res = await fetch(base_URL)
    return res.json()
})

const mainSlice = createSlice({
    name: "productsData",
    initialState,
    reducers: {
        editProductsData: (state, action) => {
            state.productsDataSlice = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(productsData.pending, (state, action) => {
                state.isProductsLoading = true;
                state.hasProductsError = false;
            })
            .addCase(productsData.fulfilled, (state, action) => {
                const answer = action.payload
                state.productsDataSlice = answer.products;
                state.isProductsLoading = false;
                state.hasProductsError = false
            })
            .addCase(productsData.rejected, (state, action) => {
                state.hasProductsError = true
                state.isProductsLoading = false;
            })
    }
});

export const { editProductsData } = mainSlice.actions;

export const getAllProducts = state => state.productsData.productsDataSlice;
export const selectProductsLoading = state => state.productsData.isProductsLoading;
export const selectProductsError = state => state.productsData.hasProductsError;

export default mainSlice.reducer;