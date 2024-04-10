import { FormCreate } from "../../components/warehouse";
import { Space, Button } from "antd";
import "../../styles/pages/savepage.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

function WarehouseSavePage() {
	return (
		<div className="save-page">
			<Button type="dash" icon={<ArrowLeftOutlined />} className="back-button">
				Warehouses
			</Button>
			<Space size={20} direction="vertical" className="page-container">
				<div className="page-title">Add New Warehouse</div>
				<FormCreate />
			</Space>
		</div>
	);
}

export default WarehouseSavePage;
