import { Dropdown, Menu, Button } from "antd";
import DeleteWarehouseButton from "./DeleteModal";
import { Link } from "react-router-dom";
import { EllipsisOutlined } from "@ant-design/icons";

function WarehouseActions({ warehouse }) {
	return (
		<Dropdown
			overlay={
				<Menu>
					<Menu.Item key="0">
						<Link to={`${warehouse.id}/edit`}>Edit</Link>
					</Menu.Item>

					<Menu.Divider />
					<Menu.Item key="3">
						<DeleteWarehouseButton warehouse={warehouse} />
					</Menu.Item>
				</Menu>
			}
		>
			<Button icon={<EllipsisOutlined />} type="dash"></Button>
		</Dropdown>
	);
}

export default WarehouseActions;
