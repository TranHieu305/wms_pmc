import { useLoaderData } from "react-router-dom";
import { WarehouseDetail } from "../../components/warehouse";
import { Link } from "react-router-dom";
import { Space, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

function WarehouseDetailPage() {
	const data = useLoaderData();
	const warehouse = data.data;
	return (
		<div className="save-page">
			<Link to="/warehouses">
				<Button type="dash" icon={<ArrowLeftOutlined />} className="back-button">
					Warehouses
				</Button>
			</Link>

			<Space size={20} direction="vertical" className="page-container">
				<div className="page-title">Warehouse: {warehouse.name}</div>
				<WarehouseDetail warehouse={warehouse} />
			</Space>
		</div>
	);
}

export default WarehouseDetailPage;
