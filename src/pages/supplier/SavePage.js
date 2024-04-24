import { Space, Button } from "antd";
import "../../styles/pages/savepage.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SupplierFormCreate } from "../../components/supplier";

function SupplierSavePage() {
	return (
		<div className="save-page">
			<Link to="/suppliers">
				<Button type="dash" icon={<ArrowLeftOutlined />} className="back-button">
					Suppliers
				</Button>
			</Link>

			<Space size={20} direction="vertical" className="page-container">
				<div className="page-title">Add New Supplier</div>
				<SupplierFormCreate />
			</Space>
		</div>
	);
}

export default SupplierSavePage;
