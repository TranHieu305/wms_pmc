import { Table } from "antd";
import { Link } from "react-router-dom";
import WarehouseAction from "./WarehouseAction";
import warehouseActionPermission from "../utils/actionPermission";

function WarehouseBoard({warehouses, loading}) {
	const columns = [
		{
			key: "name",
			title: "Name",
			dataIndex: "name",
			render: (text, record) => 
                (<Link to={`/warehouses/${record.id}`}>{record.name}</Link>),
		},
		// { key: "status", title: "Status", dataIndex: "isActive", width: "20%",
        //     render: (text, record) => <WarehouseStatusTag warehouse={record}/>
        //  }, 
		{ key: "address", title: "Address", dataIndex: "address",width: "25%" },
		{ key: "description", title: "Description", dataIndex: "description", width: "25%" },
        // { key: "Responsible_person", title: "Responsible person", dataIndex: "supervisorId" },
	];
    if (warehouseActionPermission.canAction()) {
        columns.push(
            {
                key: "actions",
                title: "Action",
                render: (title, record) => <WarehouseAction warehouse={record} />,
                width: "10%"
            },
        )
    }

	return (
    <>
        <Table loading={loading} dataSource={warehouses} columns={columns} rowKey="id"></Table>
    </>);
}

export default WarehouseBoard