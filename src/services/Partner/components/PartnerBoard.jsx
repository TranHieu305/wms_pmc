import { Table } from "antd";
import { Link } from "react-router-dom";

function PartnerTable({ partners, loading = true }) {
    console.log(partners);
	const columns = [
		{
			key: "name",
			title: "Name",
			dataIndex: "name",
			render: (text, record) => <Link to={`${record.id}`}>{text}</Link>,
            width: "20%"
		},
		{ key: "type", title: "Type", dataIndex: "type", width: "10%"},
		{ key: "address", title: "Address", dataIndex: "address", width: "15%" },
		{ key: "email", title: "Email", dataIndex: "email", width: "15%" },
		{ key: "phone", title: "Phone number", dataIndex: "phoneNumber", width: "10%" },
		{ key: "description", title: "Description", dataIndex: "description", width: "20%" },
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
