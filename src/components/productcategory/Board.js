import { Table } from "antd";
import addKeyToArrayData from "../../utils/addKeyToData";
import ProductCategoryActions from "./Actions";
import { ProductTypeTag } from "../product/Details";
import { PRODUCT_TYPE } from "../../utils/constants";

function ProductCategoryBoard({ loading, categories }) {
	if (!loading && categories) {
		categories = addKeyToArrayData(categories);
	}

	const categoryFilter = [
		{
			text: "Production",
			value: PRODUCT_TYPE.PRODUCTION,
		},
		{
			text: "Material",
			value: PRODUCT_TYPE.MATERIAL,
		},
	];

	return (
		<Table
			loading={loading}
			dataSource={categories}
			columns={[
				{
					key: "name",
					title: "Category name",
					dataIndex: "name",
					width: "30%",
				},
				{
					key: "description",
					title: "Description",
					dataIndex: "description",
					width: "40%",
					render: (title, record) => <p key={record.id}>{title ? title : "---"}</p>,
				},
				{
					key: "type",
					title: "Type",
					dataIndex: "productType",
					width: "10%",
					filters: categoryFilter,
					onFilter: (value, record) => record.productType === value,
					render: (title, record) => <ProductTypeTag key={record.id} type={title} />,
				},
				{
					key: "actions",
					title: "Actions",
					align: "right",
					render: (title, record) => (
						<ProductCategoryActions key={record.id} productCategory={record} />
					),
				},
			]}
		></Table>
	);
}

export { ProductCategoryBoard };
