import { Table } from "antd";
import VehicleAction from "./VehicleAction";
import VehicleStatusTag from "./VehicleStatusTag";

function VehicleBoard({vehicles, loading}) {
	const columns = [
		{
			key: "name",
			title: "Name",
			dataIndex: "name",
		},
		{ key: "licensePlate", title: "License Plate", dataIndex: "licensePlate",width: "15%" },
        { key: "loadCapacity", title: "Load Capacity", dataIndex: "loadCapacity",width: "15%" },
        { key: "status", title: "Status", dataIndex: "isActive", width: "20%",
            render: (text, record) => <VehicleStatusTag status={record.status}/>
         }, 
		{ key: "description", title: "Description", dataIndex: "description", width: "25%" },
		{
		    key: "actions",
		    title: "Action",
		    render: (title, record) => <VehicleAction vehicle={record} />,
            width: "10%"
		},
	];

	return (
    <>
        <Table loading={loading} dataSource={vehicles} columns={columns} rowKey="id"></Table>
    </>);
}

export default VehicleBoard