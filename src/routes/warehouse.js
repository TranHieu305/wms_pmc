import { FormCreate, WarehouseBoard } from "../components/warehouse";

const warehouseRouter = [
	{ path: "warehouses", element: <WarehouseBoard /> },
	{ path: "warehouses/create", element: <FormCreate /> },
];

export default warehouseRouter;
