import { Space, Button } from "antd";
import "../../styles/pages/savepage.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CustomerFormCreate } from "../../components/customer";

function CustomerSavePage() {
	return (
		<div className="save-page">
			<Link to="/customers">
				<Button type="dash" icon={<ArrowLeftOutlined />} className="back-button">
					Customers
				</Button>
			</Link>

			<Space size={20} direction="vertical" className="page-container">
				<div className="page-title">Add New Customer</div>
				<CustomerFormCreate />
			</Space>
		</div>
	);
}

export default CustomerSavePage;
