import { Dropdown, Menu, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { ButtonSave } from ".";
import { ButtonDelete } from "./Buttons";

function ProductCategoryActions({ productCategory }) {
	if (!productCategory) {
		return;
	}
	return (
		<Dropdown
			overlay={
				<Menu>
					<Menu.Item key="0">
						<ButtonSave
							productCategory={productCategory}
							update
							label="Edit"
							type="text"
						/>
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item key="3">
						<ButtonDelete productCategory={productCategory}></ButtonDelete>
					</Menu.Item>
				</Menu>
			}
		>
			<Button icon={<EllipsisOutlined />} type="dash"></Button>
		</Dropdown>
	);
}

export default ProductCategoryActions;
