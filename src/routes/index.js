import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../services/Auth/pages/LoginPage";
import warehouseRouter from "./warehouse";
import customerRouter from "./customer";
import materialOrderRouter from "./materialOrder";
import supplierRouter from "./supplier";
import productRouter from "./product";
import inventoryItemRouter from "./inventoryItem";
import lotRouter from "./lot";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import AppLayout from "../shared/components/AppLayout";
import partnerRouter from "./partner";

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

			// ...customerRouter,
			// ...materialOrderRouter,
			// ...supplierRouter,
			// ...inventoryItemRouter,
			// ...lotRouter,
		],
	},
]);

export default appRouter;
