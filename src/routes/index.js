import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../pages/layout";
import warehouseRouter from "./warehouse";
import customerRouter from "./customer";

const appRouter = createBrowserRouter([
	{
		index: "/",
		element: <RootLayout />,
		children: [...warehouseRouter, ...customerRouter],
	},
]);

export default appRouter;
