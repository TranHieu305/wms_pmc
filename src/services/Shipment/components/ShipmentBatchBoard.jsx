import { Table } from "antd";
import { Link } from "react-router-dom";
import ShipmentBatchAction from "./ShipmentBatchAction";
import { ShipmentBatchStatusTag } from "./ShipmentTag";

function ShipmentBatchBoard ({shipment}) {
    const shipmentBatches = shipment.shipmentBatches || [];

    const columns = [
		{ key: "name", title: "Batch name", dataIndex: ["batch","name"],
            render: (text, record) => <Link to={`/batches/${record.batch?.id}`}>{record.batch?.name}</Link>,
        },
        { key: "address", title: "Address", dataIndex: ["partnerAddress","address"], width: "30%",
            render: (text, record) => <div>{record.partnerAddress?.address || "---"}</div>,
        },
        { key: "status", title: "Status", dataIndex: "status", width: "10%",
            render: (_, {status}) => (<ShipmentBatchStatusTag status={status}/>)
         },
		{ key: "order", title: "Shipment order", dataIndex: "shipmentOrder", width: "20%" },
        {
            key: "actions",
            title: "Action",
            render: (_, record) => <ShipmentBatchAction shipment={shipment} shipmentBatch={record} />, 
            width: "10%"
        },
	];
   
    return <Table dataSource={shipmentBatches} columns={columns} rowKey="id"></Table>
}

export default ShipmentBatchBoard;