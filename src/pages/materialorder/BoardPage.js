import { Space } from "antd";
import "../../styles/board.css";
import { PlusOutlined } from "@ant-design/icons";
import { useLoaderData, useNavigate } from "react-router-dom";
import { LiaWarehouseSolid } from "react-icons/lia";
import { MaterialOrderBoard } from "../../components/materialorder";
import { ButtonSave } from "../../components/materialorder/Buttons";

function MaterialOrderBoardPage() {
	const orders = useLoaderData();
	const navigate = useNavigate();

	const handleCreate = () => {
		navigate("create");
	};

	const warehouseCounts = orders.length;
	const activeMaterialOrderCounts = orders.filter((order) => order.status === "active").length;

	return (
		<div className="board">
			{/* Board header */}
			<Space size={15} direction="vertical" className="board-container">
				{/* Board summary */}
				<div className="board-summary">
					<div className="summary-header">
						<LiaWarehouseSolid size={30} />
						MaterialOrder Info
					</div>
					<div className="summary-content">
						<div className="content-item">All warehouses: {warehouseCounts}</div>
						<div className="content-item">
							Active warehouses: {activeMaterialOrderCounts}
						</div>
					</div>
				</div>
				<div className="board-action">
					<ButtonSave
						type="primary"
						icon={<PlusOutlined />}
						onClick={handleCreate}
						className="board-button"
						label="Create New Order"
					></ButtonSave>
				</div>
				{/* Board main */}
				<MaterialOrderBoard orders={orders} />
			</Space>
		</div>
	);
}

export default MaterialOrderBoardPage;
