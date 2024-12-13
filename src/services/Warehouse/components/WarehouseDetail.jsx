import { Divider } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { ProductWarehouseActionForWarehouse } from "../../Product/components/ProductWarehouseHistoryAction";
import SharedIcon from "../../../shared/components/common/Icon";

function Infor({warehouse}) {
    return (
        <DetailPage.DetailContainer>
            <DetailPage.InforCard>
                <h2 className="text-base font-semibold text-gray-800 mb-4">Information</h2>
                <Divider />

                {/* Info Items */}
                <div className="space-y-4">
                    <DetailPage.InforItem label="Name" value={warehouse.name}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Address" value={warehouse.address}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Description" value={warehouse.description}></DetailPage.InforItem>
                </div>
            </DetailPage.InforCard>
        </DetailPage.DetailContainer>
    )
}

function Inventory({warehouse, productWarehouses, loading}) {
    const columns = [
        { key: "code", title: "Product Code", dataIndex: ["product", "code"], width: "20%",
            render: (text, record) => (<div>{record.product.code}</div>)
        },
		{ key: "name", title: "Product Name", dataIndex: ["product","name"], width: "20%",
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
        { key: "unit", title: "Unit", dataIndex: "uom", width: "20%",
            render: (text, record) => (<div>{record.product.uom}</div>)
        },
		{ key: "quantity", title: "Quantity on hand", dataIndex: ["product","quantity"], width: "20%",
            render: (text, record) => (<div>{record.quantityOnHand}</div>)
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

const WarehouseDetail = {
    Infor,
    Inventory
}

export default WarehouseDetail;