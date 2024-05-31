import { Link } from "react-router-dom";
import addKeyToArrayData from "../../utils/addKeyToData";
import { Table } from "antd";
import ProductActions from "./Actions";

export function ProductBoard({ loading, products }) {
	if (!loading && products) {
		products = addKeyToArrayData(products);
	}

	const tableColumns = [
		{
			key: "name",
			title: "Product name",
			dataIndex: "name",
			render: (title, record) => <Link to={"/products/" + record.id}>{record.name}</Link>,
		},
		{
			key: "uom",
			title: "Unit Of Measure",
			dataIndex: "uom",
		},
		{
			key: "category",
			title: "Category",
			dataIndex: "categoryName",
		},
		{
			key: "actions",
			title: "Actions",
			width: 10,
			align: "right",
			render: (title, record) => <ProductActions product={record} />,
		},
	];
	return <Table loading={loading} dataSource={products} columns={tableColumns} />;
}
