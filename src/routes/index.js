import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../pages/layout";
import warehouseRouter from "./warehouse";

const appRouter = createBrowserRouter([
	{
		index: "/",
		element: <RootLayout />,
		children: [...warehouseRouter],
	},
]);

export default appRouter;
