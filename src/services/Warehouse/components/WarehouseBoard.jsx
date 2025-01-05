import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import WarehouseAction from "./WarehouseAction";
import WarehouseStatusTag from "./WarehouseStatusTag";
import SharedIcon from "../../../shared/components/common/Icon";

function WarehouseBoard({warehouses, loading}) {
	const columns = [
		{
			key: "name",
			title: "Name",
			dataIndex: "name",
			render: (text, record) => 
                (<Link to={`${record.id}`}>
                    <Button type="link" icon={<SharedIcon.Warehouse width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.name}
                    </Button>
                </Link>),
            width: "20%"
		},
		{ key: "status", title: "Status", dataIndex: "isActive", width: "20%",
            render: (text, record) => <WarehouseStatusTag warehouse={record}/>
         }, 
		{ key: "address", title: "Address", dataIndex: "address",width: "25%" },
		{ key: "description", title: "Description", dataIndex: "description", width: "25%" },
        // { key: "Responsible_person", title: "Responsible person", dataIndex: "supervisorId" },
		{
		    key: "actions",
		    title: "Action",
		    render: (title, record) => <WarehouseAction warehouse={record} />,
		},
	];

	return (
    <>
        <Table loading={loading} dataSource={warehouses} columns={columns} rowKey="id"></Table>
    </>);
}

export default WarehouseBoard