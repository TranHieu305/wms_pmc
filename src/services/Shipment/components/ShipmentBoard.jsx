import { Table } from "antd";
import { Link } from "react-router-dom";
import dataHelper from "../../../shared/utils/dataHelper";
import { SharedAvatar } from "../../../shared/components/common";
import { ShipmentStatusTag } from "./ShipmentTag";
import ShipmentAction from "./ShipmentAction";
import shipmentActionPermission from "../utils/actionPermission";


function ShipmentBoard({shipments, loading}) {
    const columns = [
		{ key: "name", title: "Shipment Name", dataIndex: "name", 
            render: (text, record) => (
                <Link to={`/shipments/${record.id}`}> 
                    {record.name}
                </Link>
            ),
        },
        { key: "vehicle", title: "Vehicle", dataIndex: "vehicleId", width: "15%",
            render: (text, record) => (<div>{record.vehicle?.name}</div>),
        },
        { key: "status", title: "Status", dataIndex: "status", width: "20%",
            render: (_, {status}) => (<ShipmentStatusTag status={status}/>)
        },
         
		{ key: "date", title: "Date", dataIndex: "date", width: "15%",
            render: (_, {date}) => (<div>{dataHelper.formatDate(date)}</div>)
        },
        { key: "creator", title: "Creator", dataIndex: "createdBy", width: "15%",
            render: (_, {createdBy}) => (<div>{<SharedAvatar.SingleUser userId={createdBy} avatarOnly/>}</div>)
        },
	];

    if (!shipmentActionPermission.viewOnly()) {
        columns.push(
            {
                key: "actions",
                title: "Action",
                render: (_, record) => <ShipmentAction shipment={record} />,
                width: "10%",
            },
        )
    }

    return (
        <>
            <Table loading={loading} dataSource={shipments} columns={columns} rowKey="id"></Table>
        </>
    );
}

export default ShipmentBoard;