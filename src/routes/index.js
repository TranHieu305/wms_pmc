import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../pages/layout";
import warehouseRouter from "./warehouse";
import customerRouter from "./customer";
import materialOrderRouter from "./materialOrder";
import supplierRouter from "./supplier";
import productCategoryRouter from "./productCategory";
import productRouter from "./product";
import inventoryItemRouter from "./inventoryItem";
import lotRouter from "./lot";

const appRouter = createBrowserRouter([
	{
		index: "/",
		element: <RootLayout />,
		children: [
			...warehouseRouter,
			...customerRouter,
			...materialOrderRouter,
			...supplierRouter,
			...productCategoryRouter,
			...productRouter,
			...inventoryItemRouter,
			...lotRouter,
		],
	},
]);

export default appRouter;
