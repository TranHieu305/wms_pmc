import { Button, Table } from "antd";
import ProductAction from "./ProductAction";
import { Link } from "react-router-dom";
import SharedIcon from "../../../shared/components/common/Icon";

function ProductBoard({products, loading}) {
    const columns = [
        { key: "code", title: "Product Code", dataIndex: "code", width: "10%" },
		{ key: "name", title: "Product Name", dataIndex: "name", width: "20%",
            render: (text, record) => (
                <Link to={`${record.id}`}>
                    <Button type="link" icon={<SharedIcon.Product width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.name}
                    </Button>
                </Link>
            ),
        },
		{ key: "productCategory", title: "Category", dataIndex: "productCategory", width: "10%",
            render: (_, {productCategory}) => (<div>{productCategory.name}</div>)
        },
		{ key: "quantity", title: "Quantity", dataIndex: "quantity", width: "10%" },
        { key: "unit", title: "Unit", dataIndex: "uom", width: "10%" },
		{ key: "description", title: "Description", dataIndex: "description", width: "30%" },
		{
		    key: "actions",
		    title: "Action",
		    render: (_, record) => <ProductAction product={record} />,
		},
	];

    return (
        <>
            <Table loading={loading} dataSource={products} columns={columns} rowKey="id"></Table>
        </>
    );
}

export default ProductBoard;