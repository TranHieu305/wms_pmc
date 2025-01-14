import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import SharedIcon from "../../../shared/components/common/Icon";
import DetailPage from "../../../shared/components/DetailPage";
import { ProducedItemStatusTag } from "./ProducedItemTag";
import { SharedAvatar } from "../../../shared/components/common";
import ProducedItemAction from "./ProducedItemAction";


function ProducedItemBatchBoard({producedItems}) {
    const columns = [
        { key: "name", title: "Product", dataIndex: ["product","name"],
            render: (text, record) => (
                <Link to={`/products/${record.product?.id}`}> 
                <Button type="link" icon={<SharedIcon.Product width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                    {record.product?.name}
                </Button>
            </Link>
            ),
        },
		{ key: "quantity", title: "Quantity", dataIndex: "quantity", width: "15%" },
        { key: "uom", title: "Unit", dataIndex: "uom", width: "15%" },
        { key: "status", title: "Status", dataIndex: "status", width: "15%",
            render: (text, record) => (<ProducedItemStatusTag status={record.status}/>),
         },
        { key: "creator", title: "Creator", dataIndex: "createdBy", width: "10%",
            render: (text, record) => (<SharedAvatar.SingleUser userId={record.createdBy} avatarOnly/>)
         },
        { key: "approvers", title: "Approvers", dataIndex: "approverIds", width: "20%",
            render: (text, record) => (<SharedAvatar.MultiUser userIds={record.approverIds}/>)
         },
        { key: "action", title: "Action", dataIndex: "id", width: "10%",
            render: (text, record) => (<ProducedItemAction producedItem={record} />)
        },
    ];

    return (
        <DetailPage.DetailContainer>
            <Table dataSource={producedItems} columns={columns} rowKey="id"></Table>
        </DetailPage.DetailContainer>
    );
}

export {ProducedItemBatchBoard};