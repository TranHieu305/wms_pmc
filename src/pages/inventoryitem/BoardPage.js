import { useLoaderData } from "react-router-dom";
import { InventoryItemBoard } from "../../components/inventoryitem";
import { BoardLayout, BoardLayoutContent } from "../../components/layout";
import addKeyToArrayData from "../../utils/addKeyToData";
import { useSelector } from "react-redux";

export default function InventoryItemBoardPage() {
	let { inventoryItems, lots } = useLoaderData();

	const warehouseStore = useSelector((state) => state.warehouse);
	const warehouses = warehouseStore.warehouses;

	const productStore = useSelector((state) => state.product);
	const products = productStore.products;

	inventoryItems = addKeyToArrayData(inventoryItems);

	return (
		<BoardLayout title="Inventory Items">
			<BoardLayoutContent>
				<InventoryItemBoard
					inventoryItems={inventoryItems}
					lots={lots}
					warehouses={warehouses}
					products={products}
				/>
			</BoardLayoutContent>
		</BoardLayout>
	);
}
