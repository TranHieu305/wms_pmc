import { Dropdown, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { EllipsisOutlined } from "@ant-design/icons";
import DeleteSupplierButton from "./DeleteModal";

function SupplierActions({ supplier }) {
	if (!supplier) {
		return;
	}
	return (
		<Dropdown
			overlay={
				<Menu>
					<Menu.Item key="0">
						<Link to={`/suppliers/${supplier.id}/edit`}>Edit</Link>
					</Menu.Item>

					<Menu.Divider />
					<Menu.Item key="3">
						<DeleteSupplierButton supplier={supplier} />
					</Menu.Item>
				</Menu>
			}
		>
			<Button icon={<EllipsisOutlined />} type="dash"></Button>
		</Dropdown>
	);
}

export default SupplierActions;
