import { Table } from "antd";
import { CUSTOMER_API_ENDPOINT, SUPPLIER_API_ENDPOINT } from "../../apis/config";
import { useFetch } from "../../custom_hooks";
import addKeyToArrayData from "../../utils/addKeyToData";
import { Link } from "react-router-dom";
import SupplierActions from "./Actions";

function SupplierBoard() {
	let { data: suppliers, loading } = useFetch(SUPPLIER_API_ENDPOINT);

	if (!loading && suppliers) {
		suppliers = addKeyToArrayData(suppliers);
	}

	return (
		<Table
			loading={loading}
			dataSource={suppliers}
			columns={[
				{
					key: "name",
					title: "Supplier name",
					dataIndex: "name",
					render: (text, record) => <Link to={`${record.id}`}>{text}</Link>,
				},
				{ key: "address", title: "Address", dataIndex: "address" },
				{ key: "email", title: "Email", dataIndex: "email" },
				{ key: "phone", title: "Phone", dataIndex: "phone" },
				{
					key: "actions",
					title: "Action",
					render: (title, record) => <SupplierActions supplier={record} />,
				},
			]}
		></Table>
	);
}

export default SupplierBoard;
