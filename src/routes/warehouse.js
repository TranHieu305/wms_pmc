import { warehouseDetailLoader, warehouseListLoader } from "../loaders";
import WarehouseBoardPage from "../pages/warehouse/BoardPage";
import WarehouseDetailPage from "../pages/warehouse/DetailPage";
import WarehouseSavePage from "../pages/warehouse/SavePage";

const warehouseRouter = [
	{ path: "/warehouses", element: <WarehouseBoardPage />, loader: warehouseListLoader },
	{ path: "/warehouses/create", element: <WarehouseSavePage /> },
	{
		path: "/warehouses/:warehouseId/edit",
		element: <WarehouseSavePage />,
		loader: warehouseDetailLoader,
	},
	{
		path: "/warehouses/:warehouseId",
		element: <WarehouseDetailPage />,
		loader: warehouseDetailLoader,
	},
];

export default warehouseRouter;
