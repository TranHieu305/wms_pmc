import { configureStore } from "@reduxjs/toolkit";
import productCategoryReducer from "./slices/productCategory";
import supplierReducer from "./slices/supplier";
import productReducer from "./slices/product";
import warehouseReducer from "./slices/warehouse";
import productCurrentPriceReducer from "./slices/currentPrice";

const store = configureStore({
	reducer: {
		supplier: supplierReducer,
		warehouse: warehouseReducer,
		product: productReducer,
		productCategory: productCategoryReducer,
		productCurrentPrice: productCurrentPriceReducer,
	},
});

export default store;
