import { Table } from "antd";
import addKeyToArrayData from "../../utils/addKeyToData";

/**
 * Price Board in Product Detail Page
 *
 * @param {*} param0
 * @returns
 */
export function ProductPriceBoard({ productPrices, partners, product }) {
	productPrices = addKeyToArrayData(productPrices);

	const tableColumns = [
		{
			key: "Supplier",
			title: "Supplier",
			dataIndex: "partnerId",
		},
		{
			key: "price",
			title: "Price",
			dataIndex: "price",
		},
	];
	return <Table dataSource={productPrices} columns={tableColumns} />;
}
