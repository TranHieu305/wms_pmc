import { Table } from "antd";
import { API_BASE_URL } from "../../apis";
import { useFetch } from "../../custom_hooks";

export default function WarehouseBoard() {
	const { data: warehouses, error, loading } = useFetch(`${API_BASE_URL}/warehouses`);
	return (
		<Table
			loading={loading}
			dataSource={warehouses}
			columns={[
				{
					key: "name",
					title: "Warehouse name",
					dataIndex: "name",
					width: "50%",
				},
				{ key: "description", title: "Description", dataIndex: "description" },
				{ key: "address", title: "Address", dataIndex: "address" },
				{ key: "supervisor", title: "Supervisor", dataIndex: "supervisor" },
			]}
		></Table>
	);
}
