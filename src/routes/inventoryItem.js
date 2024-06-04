import { inventoryItemLoader } from "../loaders/inventoryItem";
import InventoryItemBoardPage from "../pages/inventoryitem/BoardPage";

const inventoryItemRouter = [
	{ path: "/inventory-items", element: <InventoryItemBoardPage />, loader: inventoryItemLoader },
];

export default inventoryItemRouter;
