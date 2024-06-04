import { Dropdown, Menu } from "antd";
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
	return (
		<Dropdown.Button overlay={menu} {...props}>
			{label}
		</Dropdown.Button>
	);
}
