import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { Space, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { SupplierDetail } from "../../components/supplier";

function SupplierDetailPage() {
	const data = useLoaderData();
	const supplier = data.data;
	return (
		<div className="save-page">
			<Link to="/suppliers">
				<Button type="dash" icon={<ArrowLeftOutlined />} className="back-button">
					Suppliers
				</Button>
			</Link>

			<Space size={20} direction="vertical" className="page-container">
				<div className="page-title">Supplier: {supplier.name}</div>
				<SupplierDetail supplier={supplier} />
			</Space>
		</div>
	);
}

export default SupplierDetailPage;
