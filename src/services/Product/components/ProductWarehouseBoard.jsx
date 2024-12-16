import { useEffect, useState } from "react";
import productWarehouseApi from "../api/productWarehouseApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import SharedIcon from "../../../shared/components/common/Icon";

function ProductWarehouseForProductBoard({product}) {
    const [productWarehouses, setProductWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);
    

    // Get product warehouses
    useEffect(() => {
        const fetchProductWarehouse = async (product) => {
          try {
            const response = await productWarehouseApi.getByProductId(product.id);
            setProductWarehouses(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchProductWarehouse(product);
    }, [product]);

    const columns = [
		{ key: "name", title: "Warehouse Name", dataIndex: ["warehouse","name"], width: "50%",
            render: (text, record) => (
                <Link to={`/products/${record.product.id}`}> 
                    <Button type="link" icon={<SharedIcon.Warehouse width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.warehouse.name}
                    </Button>
                </Link>
            ),
        },
		{ key: "quantity", title: "Quantity on hand", dataIndex: ["warehouse","quantity"], width: "50%",
            render: (text, record) => (<div>{record.quantityOnHand}</div>)
        },
	];

    return (
    <>    
        <div>
            <h2 className="text-base font-semibold text-gray-800 p-4">Inventory</h2>
        </div>
        <Table loading={loading} dataSource={productWarehouses} columns={columns} rowKey="id"></Table>
    </>);

}

export default ProductWarehouseForProductBoard;