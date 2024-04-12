import { WarehouseFormCreate } from "../../components/warehouse";
import { Space, Button } from "antd";
import "../../styles/pages/savepage.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function WarehouseSavePage() {
	return (
		<div className="save-page">
			<Link to="/warehouses">
				<Button type="dash" icon={<ArrowLeftOutlined />} className="back-button">
					Warehouses
				</Button>
			</Link>

			<Space size={20} direction="vertical" className="page-container">
				<div className="page-title">Add New Warehouse</div>
				<WarehouseFormCreate />
			</Space>
		</div>
	);
}

export default WarehouseSavePage;
