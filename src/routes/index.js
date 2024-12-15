import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../services/Auth/pages/LoginPage";
import warehouseRouter from "./warehouse";
import productRouter from "./product";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import AppLayout from "../shared/components/AppLayout";
import partnerRouter from "./partner";
import orderRouter from "./order";

const appRouter = createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		index: "/",
		element: (
			<ProtectedRoute>
				<AppLayout />
			</ProtectedRoute>
		),
		children: [
			...partnerRouter,
			...warehouseRouter,
			...productRouter,
			...orderRouter,
			// ...customerRouter,
			// ...materialOrderRouter,
			// ...supplierRouter,
			// ...inventoryItemRouter,
			// ...lotRouter,
		],
	},
]);

export default appRouter;
