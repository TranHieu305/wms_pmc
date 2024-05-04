import { Table } from "antd";
import addKeyToArrayData from "../../utils/addKeyToData";
import SupplierActions from "../supplier/Actions";

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
					key: "description",
					title: "Description",
					dataIndex: "description",
				},
				{
					key: "actions",
					title: "Action",
					render: (title, record) => <SupplierActions supplier={record} />,
				},
			]}
		></Table>
	);
}

export { ProductCategoryBoard };
