import addKeyToArrayData from "../../utils/addKeyToData";
import { Link } from "react-router-dom";
import { Table } from "antd";
import FormatHelper from "../../utils/FormatHelper";
import { MaterialOrderStatusTag } from "./Details";
import MaterialOrderActions from "./Actions";
import { useSelector } from "react-redux";

export default function MaterialOrderBoard({ orders }) {
	// Get supplier from Redux store
	const supplierStore = useSelector((state) => state.supplier);

	const supplierFilter = supplierStore.suppliers.map((sup) => {
		return {
			text: sup.name,
			value: sup.name,
		};
	});
	if (orders) {
		orders = addKeyToArrayData(orders);
	}

	const tableColumns = [
		{
			key: "name",
			title: "Order name",
			dataIndex: "name",
			render: (title, record) => (
				<Link to={"/material-orders/" + record.id}>{record.name}</Link>
			),
		},
		{
			title: "Supplier",
			key: "uom",
			dataIndex: "partnerName",
			filters: supplierFilter,
			onFilter: (value, record) => record.partnerName.includes(value),
			filterSearch: true,
			render: (title, record) => (
				<Link to={"/suppliers/" + record.partnerName}>{record.partnerName}</Link>
			),
		},
		{
			key: "status",
			title: "Status",
			dataIndex: "status",
			render: (title, record) => <MaterialOrderStatusTag status={record.status} />,
		},

		{
			key: "Total Cost",
			title: "Total",
			dataIndex: "totalOrderCost",
			align: "left",
			render: (title, record) => (
				<p>
					{FormatHelper.formatCurrency(
						record.totalOrderCost + record.totalOrderCost * record.tax
					)}
				</p>
			),
		},
		{
			key: "orderDate",
			title: "Order Date",
			dataIndex: "orderDate",
			render: (title, record) => <p>{FormatHelper.formatDate(record.orderDate)}</p>,
		},
		{
			key: "actions",
			title: "Actions",
			width: 10,
			align: "right",
			render: (title, record) => <MaterialOrderActions order={record} />,
		},
	];
	return <Table dataSource={orders} columns={tableColumns} />;
}
