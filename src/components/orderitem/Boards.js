import { Table } from "antd";
import FormatHelper from "../../utils/FormatHelper";
import "./index.css";

function OrderItemBoardInOrderDetail({ itemList }) {
	const columns = [
		{
			title: "Product Name",
			dataIndex: "productName",
			key: "productName",
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "quantity",
			align: "left",
		},
		{
			title: "Uom",
			dataIndex: "productUom",
			key: "productUom",
			align: "left",
		},

		{
			title: "Unit Price",
			dataIndex: "productPrice",
			key: "productPrice",
			align: "right",
			render: (text, record) => <div>{FormatHelper.formatCurrency(record.productPrice)}</div>,
		},
		{
			title: "Amount",
			dataIndex: "totalCost",
			key: "totalCost",
			align: "right",
			render: (text, record) => <div>{FormatHelper.formatCurrency(record.totalCost)}</div>,
		},
	];
	return (
		<Table className="order-item-board" dataSource={itemList} columns={columns} rowKey="key" />
	);
}
export { OrderItemBoardInOrderDetail };
