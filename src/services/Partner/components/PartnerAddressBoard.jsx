import { Table } from "antd";
import partnerActionPermission from "../utils/actionPermission";
import PartnerAddressAction from "./PartnerAddressAction";

function PartnerAddressBoard({partner}) {
    const addresses = partner.partnerAddresses;

    const columns = [
		{ key: "name", title: "Address Name", dataIndex: "name",},
        { key: "address", title: "Location", dataIndex: "address", width: "60%",},
	]; 
    
    if (partnerActionPermission.canAction()) {
        columns.push(
            {
                key: "actions",
                title: "Action",
                render: (title, record) => <PartnerAddressAction partner={partner} partnerAddress={record} />,
            },
        )
    }
    return <Table dataSource={addresses} columns={columns} rowKey="id"></Table>
}

export default PartnerAddressBoard;