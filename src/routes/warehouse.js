import WarehouseBoardPage from "../services/Warehouse/pages/WarehouseBoardPage";
import WarehouseDetailPage from "../services/Warehouse/pages/WarehouseDetailPage";

const warehouseRouter = [
	{ path: "/warehouses", element: <WarehouseBoardPage /> },

	{
		path: "/warehouses/:warehouseId",
		element: <WarehouseDetailPage />,
	},
];

export default warehouseRouter;
