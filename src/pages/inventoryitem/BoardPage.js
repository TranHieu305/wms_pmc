import { useLoaderData } from "react-router-dom";
import { InventoryItemBoard } from "../../components/inventoryitem";
import { BoardLayout, BoardLayoutContent } from "../../components/layout";
import addKeyToArrayData from "../../utils/addKeyToData";

export default function InventoryItemBoardPage() {
	let inventoryItems = useLoaderData();
	inventoryItems = addKeyToArrayData(inventoryItems);

	return (
		<BoardLayout title="Inventory Items">
			<BoardLayoutContent>
				<InventoryItemBoard inventoryItems={inventoryItems} />
			</BoardLayoutContent>
		</BoardLayout>
	);
}
