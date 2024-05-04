import { Table } from "antd";
import addKeyToArrayData from "../../utils/addKeyToData";
import ProductCategoryActions from "./Actions";

function ProductCategoryBoard({ loading, categories }) {
	if (!loading && categories) {
		categories = addKeyToArrayData(categories);
	}
	return (
		<Table
			loading={loading}
			dataSource={categories}
			columns={[
				{
					key: "name",
					title: "Category name",
					dataIndex: "name",
				},
				{
					key: "actions",
					title: "Actions",
					width: 10,
					align: "right",
					render: (title, record) => <ProductCategoryActions productCategory={record} />,
				},
			]}
		></Table>
	);
}

export { ProductCategoryBoard };
