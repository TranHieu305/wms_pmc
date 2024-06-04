import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import appRouter from "./routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSuppliers } from "./redux/slices/supplier";
import { fetchProductCategories } from "./redux/slices/productCategory";
import { fetchProducts } from "./redux/slices/product";
import { fetchWarehouses } from "./redux/slices/warehouse";
import { fetchProductPrices } from "./redux/slices/currentPrice";

function App() {
	// Init Redux store
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			try {
				await Promise.all([
					dispatch(fetchProducts()),
					dispatch(fetchSuppliers()),
					dispatch(fetchWarehouses()),
					dispatch(fetchProductPrices()),
					dispatch(fetchProductCategories()),
				]);
			} catch (error) {
				console.error("Error init store", error);
			}
		};
		fetchData();
	}, [dispatch]);

	return (
		<div className="app">
			<RouterProvider router={appRouter}> </RouterProvider>
		</div>
	);
}

export default App;
