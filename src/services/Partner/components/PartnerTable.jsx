import { Table } from "antd";
import { Link } from "react-router-dom";

function PartnerTable({ partners, loading = true }) {
	const columns = [
		{
			key: "name",
			title: "Name",
			dataIndex: "name",
			render: (text, record) => <Link to={`${record.id}`}>{text}</Link>,
		},
		{ key: "type", title: "Type", dataIndex: "type" },
		{ key: "description", title: "Description", dataIndex: "description" },

		{ key: "address", title: "Address", dataIndex: "address" },
		{ key: "email", title: "Email", dataIndex: "email" },
		{ key: "phone", title: "Phone number", dataIndex: "phone_number" },
		// {
		//     key: "actions",
		//     title: "Action",
		//     render: (title, record) => <CustomerActions customer={record} />,
		// },
	];

	return (
    <>
        <Table loading={loading} dataSource={partners} columns={columns} rowKey="id"></Table>
    </>);

}

export default PartnerTable;
