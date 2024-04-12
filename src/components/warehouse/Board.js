import { Table } from "antd";
import { APP_API_ENDPOINT } from "../../apis";
import { useFetch } from "../../custom_hooks";
import addKeyToArrayData from "../../utils/addKeyToData";
import { Link } from "react-router-dom";
import WarehouseActions from "./Actions";

export default function WarehouseBoard() {
	let { data: warehouses, loading } = useFetch(`${APP_API_ENDPOINT}/warehouses`);

	if (!loading && warehouses) {
		warehouses = addKeyToArrayData(warehouses);
	}

	return (
		<Table
			loading={loading}
			dataSource={warehouses}
			columns={[
				{
					key: "name",
					title: "Warehouse name",
					dataIndex: "name",
					render: (text, record) => <Link to={`${record.id}`}>{text}</Link>,
				},
				{ key: "description", title: "Description", dataIndex: "description" },
				{ key: "address", title: "Address", dataIndex: "address" },
				{ key: "supervisor", title: "Supervisor", dataIndex: "supervisor" },
				{
					key: "actions",
					title: "Action",
					render: (title, record) => <WarehouseActions warehouse={record} />,
				},
			]}
		></Table>
	);
}
