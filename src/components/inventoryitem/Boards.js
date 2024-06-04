import { Link } from "react-router-dom";
import DataHelper from "../../utils/DataHelper";
import FormatHelper from "../../utils/FormatHelper";
import { Table } from "antd";

export function InventoryItemBoard({ inventoryItems, lots, warehouses, products }) {
	const productFilter = products.map((product) => {
		return {
			text: product.name,
			value: product.id,
		};
	});

	const warehouseFilter = warehouses.map((warehouse) => {
		return {
			text: warehouse.name,
			value: warehouse.id,
		};
	});

	const tableColumns = [
		{
			title: "Product",
			key: "product",
			dataIndex: "productId",
			filters: productFilter,
			onFilter: (value, record) => record.productId === value,
			filterSearch: true,
			render: (title, record) => (
				<Link to={"/products/" + record.productId}>
					{DataHelper.findObjNameFromArrById(products, record.productId)}
				</Link>
			),
		},
		{
			title: "Warehouse",
			key: "warehouse",
			dataIndex: "warehouseId",
			filters: warehouseFilter,
			onFilter: (value, record) => record.warehouseId === value,
			filterSearch: true,
			render: (title, record) => (
				<Link to={"/warehouses/" + record.warehouseId}>
					{DataHelper.findObjNameFromArrById(warehouses, record.warehouseId)}
				</Link>
			),
		},
		{
			key: "lot",
			title: "Lot",
			dataIndex: "lot",
			render: (title, record) => (
				<Link to={"/lots/" + record.lotId}>
					{DataHelper.findObjNameFromArrById(lots, record.lotId)}
				</Link>
			),
		},

		{
			key: "quantity",
			title: "Quantity",
			dataIndex: "quantity",
			render: (title, record) => <p>{FormatHelper.formatQuantity(record.quantityOnHand)}</p>,
		},

		{
			key: "uom",
			title: "Uom",
			dataIndex: "lotId",
			render: (title, record) => (
				<p>
					{DataHelper.findObjFromArrById(products, record.productId)
						? DataHelper.findObjFromArrById(products, record.productId).uom
						: "---"}
				</p>
			),
		},
		{
			key: "unitPrice",
			title: "Unit Price",
			dataIndex: "unitPrice",
			align: "left",
			render: (title, record) => <p>{FormatHelper.formatCurrency(record.unitPrice)}</p>,
		},
		{
			key: "datetimeReceived",
			title: "Received Date",
			dataIndex: "datetimeReceived",
			render: (title, record) => <p>{FormatHelper.formatDate(record.datetimeReceived)}</p>,
		},
	];

	return <Table dataSource={inventoryItems} columns={tableColumns} rowKey="key" />;
}
