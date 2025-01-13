import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../services/Auth/pages/LoginPage";
import warehouseRouter from "./warehouse";
import productRouter from "./product";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import AppLayout from "../shared/components/AppLayout";
import partnerRouter from "./partner";
import orderRouter from "./order";
import batchRouter from "./batch";
import userRouter from "./user";
import inventoryItemRouter from "./inventoryItem";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllUsers } from "../redux/slices/user";
import vehicleRouter from "./vehicle";
import shipmentRouter from "./shipment";

const appRouter = createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		index: "/",
		element: (
			<ProtectedRoute>
				<InitData>
					<AppLayout />
				</InitData>
			</ProtectedRoute>
		),
		children: [
			...partnerRouter,
			...warehouseRouter,
			...productRouter,
			...orderRouter,
			...batchRouter,
			...userRouter,
			...inventoryItemRouter,
			...vehicleRouter,
			...shipmentRouter,
		],
	},
]);

function InitData({ children }) {
	const dispatch = useDispatch();
	const userStatus = useSelector((state) => state.users.status);

	useEffect(() => {
		if (userStatus === "idle") {
			dispatch(fetchAllUsers()); // Fetch users when the app starts
		}
	}, [dispatch, userStatus]);
	return <>{children}</>;
}

export default appRouter;
