import WarehouseBoardPage from "../pages/warehouse/BoardPage";
import WarehouseSavePage from "../pages/warehouse/SavePage";

const warehouseRouter = [
	{ path: "warehouses", element: <WarehouseBoardPage /> },
	{ path: "warehouses/create", element: <WarehouseSavePage /> },
];

export default warehouseRouter;
