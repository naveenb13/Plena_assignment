import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./slice";

const store = configureStore({
    reducer: {
        productsData: mainReducer,
    },
});

export default store;