import { Dropdown, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { EllipsisOutlined } from "@ant-design/icons";
import DeleteCustomerButton from "./DeleteModal";

function CustomerActions({ customer }) {
	if (!customer) {
		return;
	}
	return (
		<Dropdown
			overlay={
				<Menu>
					<Menu.Item key="0">
						<Link to={`/customers/${customer.id}/edit`}>Edit</Link>
					</Menu.Item>

					<Menu.Divider />
					<Menu.Item key="3">
						<DeleteCustomerButton customer={customer} />
					</Menu.Item>
				</Menu>
			}
		>
			<Button icon={<EllipsisOutlined />} type="dash"></Button>
		</Dropdown>
	);
}

export default CustomerActions;
