import OrderBoardPage from "../services/Order/pages/OrderBoardPage";
import OrderDetailPage from "../services/Order/pages/OrderDetailPage";

const orderRouter = [
	{ path: "/orders", element: <OrderBoardPage /> },
	{ path: "/orders/:orderId", element: <OrderDetailPage /> },
];

export default orderRouter;
