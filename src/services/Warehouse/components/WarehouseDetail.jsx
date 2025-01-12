import { Divider, List, Typography } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { ProductWarehouseActionForWarehouse } from "../../Product/components/ProductWarehouseHistoryAction";
import SharedIcon from "../../../shared/components/common/Icon";
import Enum from "../../../shared/utils/enum";
import { SharedAvatar, SharedTag } from "../../../shared/components/common";
import dataHelper from "../../../shared/utils/dataHelper";

function Info({warehouse}) {
    return (
        <DetailPage.DetailContainer>
            <DetailPage.InfoCard>
                <DetailPage.InfoCardTitle>Information</DetailPage.InfoCardTitle>
                <Divider />

                {/* Info Items */}
                <div className="space-y-4">
                    <DetailPage.InfoItem label="Name" value={warehouse.name}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Address" value={warehouse.address}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Responsible person" >
                        <SharedAvatar.SingleUser name="hieu.tran"/>
                    </DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Description" value={warehouse.description}></DetailPage.InfoItem>
                </div>
            </DetailPage.InfoCard>
        </DetailPage.DetailContainer>
    )
}

function Inventory({warehouse, productWarehouses, loading}) {
    const columns = [
        { key: "code", title: "Product Code", dataIndex: ["product", "code"], width: "20%",
            render: (text, record) => (<div>{record.product.code}</div>)
        },
		{ key: "name", title: "Product Name", dataIndex: ["product","name"], width: "30%",
            render: (text, record) => (
                <Link to={`/products/${record.product.id}`}> 
                    <Button type="link" icon={<SharedIcon.Product width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.product.name}
                    </Button>
                </Link>
            ),
        },
		{ key: "productCategory", title: "Category", dataIndex: ["product","productCategory"], width: "20%",
            render: (text, record) => (<div>{record.product.productCategory.name}</div>)
        },
		{ key: "quantity", title: "Quantity on hand", dataIndex: ["product","quantity"], width: "20%",
            render: (text, record) => (<div>{record.quantityOnHand}</div>)
        },
        { key: "unit", title: "Unit", dataIndex: "uom", width: "10%",
            render: (text, record) => (<div>{record.product.uom}</div>)
        },
	];

    return (
        <DetailPage.DetailContainer>
            <div className="flex items-center justify-between p-6">
                <div>
                   <h2 className="text-base font-semibold text-gray-800">Inventory</h2>
                </div>
                <ProductWarehouseActionForWarehouse warehouse={warehouse} />
            </div>

                
            <Table loading={loading} dataSource={productWarehouses} columns={columns} rowKey="id"></Table>
        </DetailPage.DetailContainer>
    );
}

function History({histories, loading}) {
    return (
        <DetailPage.DetailContainer>
            <List 
                className="p-5"
                itemLayout="horizontal"
                dataSource={histories}
                renderItem={(item, index) => (
                    <List.Item
                        key={item.id}
                        extra={
                            <div className="flex flex-col items-start gap-2">
                                <SharedTag.InventoryAction action={item.inventoryAction} className="block"/>
                                <span>{dataHelper.formatDateTime(item.createdAt)}</span>
                            </div>
                        }
                        >
                        <List.Item.Meta
                            avatar={
                                item.processType === Enum.ProcessType.MANUAL ?
                                <SharedIcon.User width={50} height={50} fill="rgba(99, 115, 129, 1)" /> :
                                <SharedIcon.Setting width={50} height={50} fill="rgba(99, 115, 129, 1)" />
                            }
                            title={<Typography.Title level={5}>{item.description}</Typography.Title>}
                            description={
                                <div className="font-semibold">
                                    Product: {item.product.name} - Quantity: {item.quantity} {item.product.uom}
                                </div>}
                        />
                    </List.Item>
                )}

                loading={loading}
                pagination={{
                    pageSize: 10,
                  }}
            />
        </DetailPage.DetailContainer>
    );
}

const WarehouseDetail = {
    Info,
    Inventory,
    History
}

export default WarehouseDetail;