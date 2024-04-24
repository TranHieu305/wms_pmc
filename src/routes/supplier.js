import { supplierDetailLoader } from "../loaders";
import SupplierBoardPage from "../pages/supplier/BoardPage";
import SupplierDetailPage from "../pages/supplier/DetailPage";
import SupplierSavePage from "../pages/supplier/SavePage";

const supplierRouter = [
	{ path: "/suppliers", element: <SupplierBoardPage /> },
	{ path: "/suppliers/create", element: <SupplierSavePage /> },
	{
		path: "/suppliers/:supplierId/edit",
		element: <SupplierSavePage />,
		loader: supplierDetailLoader,
	},
	{
		path: "/suppliers/:supplierId",
		element: <SupplierDetailPage />,
		loader: supplierDetailLoader,
	},
];

export default supplierRouter;
