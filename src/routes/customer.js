import { customerDetailLoader } from "../loaders";
import CustomerBoardPage from "../pages/customer/BoardPage";
import CustomerDetailPage from "../pages/customer/DetailPage";
import CustomerSavePage from "../pages/customer/SavePage";

const customerRouter = [
	{ path: "/customers", element: <CustomerBoardPage /> },
	{ path: "/customers/create", element: <CustomerSavePage /> },
	{
		path: "/customers/:customerId/edit",
		element: <CustomerSavePage />,
		loader: customerDetailLoader,
	},
	{
		path: "/customers/:customerId",
		element: <CustomerDetailPage />,
		loader: customerDetailLoader,
	},
];

export default customerRouter;
