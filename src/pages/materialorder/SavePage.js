import { MaterialOrderFormSave } from "../../components/materialorder";
import { Space, Button } from "antd";
import "../../styles/pages/savepage.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function MaterialOrderSavePage() {
	return (
		<div className="save-page">
			<Link to="/warehouses">
				<Button type="dash" icon={<ArrowLeftOutlined />} className="back-button">
					Material orders
				</Button>
			</Link>

			<Space size={20} direction="vertical" className="page-container">
				<div className="page-title">Create New Material Order</div>
				<MaterialOrderFormSave />
			</Space>
		</div>
	);
}

export default MaterialOrderSavePage;
