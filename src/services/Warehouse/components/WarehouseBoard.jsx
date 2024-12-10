import { Table } from "antd";
import { Link } from "react-router-dom";

function WarehouseBoard({warehouses, loading}) {
	const columns = [
		{
			key: "name",
			title: "Name",
			dataIndex: "name",
			render: (text, record) => <Link to={`${record.id}`}>{text}</Link>,
		},
		{ key: "status", title: "Status", dataIndex: "isActive" },
		{ key: "description", title: "Description", dataIndex: "description" },

		{ key: "address", title: "Address", dataIndex: "address" },
		{ key: "Responsible_person", title: "Responsible person", dataIndex: "supervisorId" },
		// {
		//     key: "actions",
		//     title: "Action",
		//     render: (title, record) => <CustomerActions customer={record} />,
		// },
	];

	return (
    <>
        <Table loading={loading} dataSource={warehouses} columns={columns} rowKey="id"></Table>
    </>);
}

export default WarehouseBoard