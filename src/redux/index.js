import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";
import productCategoryReducer from "./slices/productCategory";

const store = configureStore({
	reducer: { counter: counterReducer, productCategory: productCategoryReducer },
});

export default store;
