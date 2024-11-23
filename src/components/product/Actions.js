import { Button, Dropdown, Menu } from "antd";
import { ButtonDelete, ButtonSave } from "./Buttons";
import { EllipsisOutlined } from "@ant-design/icons";

export default function ProductActions({ product, label, ...props }) {
	if (!product) {
		return;
	}

	const menu = (
		<Menu>
			<Menu.Item key="0">
				<ButtonSave product={product} label="Edit" type="text" />
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="3">
				<ButtonDelete product={product}></ButtonDelete>
			</Menu.Item>
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
