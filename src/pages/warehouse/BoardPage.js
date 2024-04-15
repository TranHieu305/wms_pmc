import { Space, Button } from "antd";
import "../../styles/board.css";
import { PlusOutlined } from "@ant-design/icons";
import { useLoaderData, useNavigate } from "react-router-dom";
import { WarehouseBoard } from "../../components/warehouse";
import { LiaWarehouseSolid } from "react-icons/lia";

function WarehouseBoardPage() {
	const loaderData = useLoaderData();
	const warehouses = loaderData.data;
	console.log(warehouses.length);
	const navigate = useNavigate();

	const handleCreate = () => {
		navigate("create");
	};

	const warehouseCounts = warehouses.length;
	const activeWarehouseCounts = warehouses.filter(
		(warehouse) => warehouse.status === "active"
	).length;

	return (
		<div className="board">
			{/* Board header */}
			<Space size={15} direction="vertical" className="board-container">
				<div className="board-header">
					<div className="board-title">Warehouse Structure</div>
					<div className="board-action">
						{/* <Search placeholder="Search warehouse" className="board-search"></Search> */}
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={handleCreate}
							className="board-button"
						>
							Create Warehouse
						</Button>
					</div>
				</div>

				{/* Board summary */}
				<div className="board-summary">
					<div className="summary-header">
						<LiaWarehouseSolid size={30} />
						Warehouse Info
					</div>
					<div className="summary-content">
						<div className="content-item">All warehouses: {warehouseCounts}</div>
						<div className="content-item">
							Active warehouses: {activeWarehouseCounts}
						</div>
					</div>
				</div>

				{/* Board main */}
				<WarehouseBoard />
			</Space>
		</div>
	);
}

export default WarehouseBoardPage;
