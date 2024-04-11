import { Button, Dropdown, Menu, Table } from "antd";
import { API_BASE_URL } from "../../apis";
import { useFetch } from "../../custom_hooks";
import addKeyToArrayData from "../../utils/addKeyToData";
import { EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function WarehouseBoard() {
	let { data: warehouses, loading } = useFetch(`${API_BASE_URL}/warehouses`);

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
				},
				{ key: "description", title: "Description", dataIndex: "description" },
				{ key: "address", title: "Address", dataIndex: "address" },
				{ key: "supervisor", title: "Supervisor", dataIndex: "supervisor" },
				{
					key: "actions",
					title: "Action",
					render: () => (
						<Dropdown
							overlay={
								<Menu>
									<Menu.Item key="0">
										<Link>1st menu item</Link>
									</Menu.Item>
									<Menu.Item key="1">
										<Link>2nd menu item</Link>
									</Menu.Item>
									<Menu.Divider />
									<Menu.Item key="3" disabled>
										<Link>1st menu item</Link>
									</Menu.Item>
								</Menu>
							}
						>
							<Button icon={<EllipsisOutlined />} type="dash"></Button>
						</Dropdown>
					),
				},
			]}
		></Table>
	);
}
