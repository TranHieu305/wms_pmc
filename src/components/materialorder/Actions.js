import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";

export default function MaterialOrderActions({ order, label, ...props }) {
	const navigate = useNavigate();
	if (!order) {
		return;
	}
	const actionItems = [
		{
			key: "1",
			label: "Edit",
			onClick: () => navigate("/material-orders/" + order.id + "/edit"),
		},
		{
			key: "2",
			label: "Add lot for order",
			onClick: () => navigate("/lots/create/material-order/" + order.id),
		},
	];
	const menu = (
		<Menu>
			{actionItems.map((item) => (
				<Menu.Item key={item.key} onClick={item.onClick}>
					{item.label}
				</Menu.Item>
			))}
		</Menu>
	);

	if (label) {
		return (
			<Dropdown.Button overlay={menu} {...props}>
				{label}
			</Dropdown.Button>
		);
	}
	return (
		<Dropdown overlay={menu}>
			<Button icon={<EllipsisOutlined />} {...props} type="dash"></Button>
		</Dropdown>
	);
}
