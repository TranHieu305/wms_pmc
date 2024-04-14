import { Table } from "antd";
import { CUSTOMER_API_ENDPOINT } from "../../apis/config";
import { useFetch } from "../../custom_hooks";
import addKeyToArrayData from "../../utils/addKeyToData";
import { Link } from "react-router-dom";
import CustomerActions from "./Actions";

function CustomerBoard() {
	let { data: customers, loading } = useFetch(CUSTOMER_API_ENDPOINT);

	if (!loading && customers) {
		customers = addKeyToArrayData(customers);
	}

	return (
		<Table
			loading={loading}
			dataSource={customers}
			columns={[
				{
					key: "name",
					title: "Customer name",
					dataIndex: "name",
					render: (text, record) => <Link to={`${record.id}`}>{text}</Link>,
				},
				{ key: "address", title: "Address", dataIndex: "address" },
				{ key: "email", title: "Email", dataIndex: "email" },
				{ key: "phone", title: "Phone", dataIndex: "phone" },
				{
					key: "actions",
					title: "Action",
					render: (title, record) => <CustomerActions customer={record} />,
				},
			]}
		></Table>
	);
}

export default CustomerBoard;
