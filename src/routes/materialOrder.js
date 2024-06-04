import {
	materialOrderDetailLoader,
	materialOrderLoader,
	orderCreateLoader,
} from "../loaders/order";
import { MaterialOrderDetailPage } from "../pages/materialorder";
import MaterialOrderBoardPage from "../pages/materialorder/BoardPage";
import MaterialOrderSavePage from "../pages/materialorder/SavePage";

const materialOrderRouter = [
	{ path: "/material-orders", element: <MaterialOrderBoardPage />, loader: materialOrderLoader },
	{
		path: "/material-orders/create",
		element: <MaterialOrderSavePage />,
		loader: orderCreateLoader,
	},
	{
		path: "/material-orders/:orderId/edit",
		element: <MaterialOrderSavePage />,
		loader: materialOrderDetailLoader,
	},
	{
		path: "/material-orders/:orderId",
		element: <MaterialOrderDetailPage />,
		loader: materialOrderDetailLoader,
	},
];

export default materialOrderRouter;
