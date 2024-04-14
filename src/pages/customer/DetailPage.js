import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { Space, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CustomerDetail } from "../../components/customer";

function CustomerDetailPage() {
	const data = useLoaderData();
	const customer = data.data;
	return (
		<div className="save-page">
			<Link to="/customers">
				<Button type="dash" icon={<ArrowLeftOutlined />} className="back-button">
					Customers
				</Button>
			</Link>

			<Space size={20} direction="vertical" className="page-container">
				<div className="page-title">Customer: {customer.name}</div>
				<CustomerDetail customer={customer} />
			</Space>
		</div>
	);
}

export default CustomerDetailPage;
