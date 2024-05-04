import { Dropdown, Menu, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { ProductCategoryFormSave } from ".";

function ProductCategoryActions({ productCategory }) {
	if (!productCategory) {
		return;
	}
	return (
		<Dropdown
			overlay={
				<Menu>
					<Menu.Item key="0">
						<ProductCategoryFormSave productCategory={productCategory} update />
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item key="3">Delete</Menu.Item>
				</Menu>
			}
		>
			<Button icon={<EllipsisOutlined />} type="dash"></Button>
		</Dropdown>
	);
}

export default ProductCategoryActions;
