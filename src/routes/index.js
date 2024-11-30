import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../services/Auth/pages/LoginPage";
import warehouseRouter from "./warehouse";
import customerRouter from "./customer";
import materialOrderRouter from "./materialOrder";
import supplierRouter from "./supplier";
import productCategoryRouter from "./productCategory";
import productRouter from "./product";
import inventoryItemRouter from "./inventoryItem";
import lotRouter from "./lot";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import PageLayout from "../shared/components/PageLayout";

const appRouter = createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		index: "/",
		element: (
			<ProtectedRoute>
				<PageLayout />
			</ProtectedRoute>
		),
		children: [
			// ...warehouseRouter,
			// ...customerRouter,
			// ...materialOrderRouter,
			// ...supplierRouter,
			// ...productCategoryRouter,
			// ...productRouter,
			// ...inventoryItemRouter,
			// ...lotRouter,
		],
	},
]);

export default appRouter;
