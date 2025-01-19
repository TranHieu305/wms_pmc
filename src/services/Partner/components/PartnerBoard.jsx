import { Table } from "antd";
import { Link } from "react-router-dom";
import { PartnerTypeTag } from "./PartnerTag";
import partnerActionPermission from "../utils/actionPermission";
import PartnerAction from "./PartnerAction";

function PartnerTable({ partners, loading = true }) {
	const columns = [
		{
			key: "name",
			title: "Name",
			dataIndex: "name",
			render: (text, record) => <Link to={`${record.id}`}>{text}</Link>,
		},
		{ key: "type", title: "Type", dataIndex: "type", width: "10%",
            render: (_, {type}) => <PartnerTypeTag type={type}/>
        },
		{ key: "email", title: "Email", dataIndex: "email", width: "15%" },
		{ key: "phone", title: "Phone number", dataIndex: "phoneNumber", width: "10%" },
		{ key: "description", title: "Description", dataIndex: "description", width: "25%" },
	];

    if (partnerActionPermission.canAction()) {
        columns.push(
            {
                key: "actions",
                title: "Action",
                render: (title, record) => <PartnerAction partner={record} />,
            },
        )
    }

	return (
    <>
        <Table loading={loading} dataSource={partners} columns={columns} rowKey="id"></Table>
    </>);

}

export default PartnerTable;
