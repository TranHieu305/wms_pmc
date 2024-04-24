import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../pages/layout";
import warehouseRouter from "./warehouse";
import customerRouter from "./customer";
import materialOrderRouter from "./materialOrder";

const appRouter = createBrowserRouter([
	{
		index: "/",
		element: <RootLayout />,
		children: [...warehouseRouter, ...customerRouter, ...materialOrderRouter],
	},
]);

export default appRouter;
