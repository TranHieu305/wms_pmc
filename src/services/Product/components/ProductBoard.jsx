import { Table } from "antd";
import ProductAction from "./ProductAction";

function ProductBoard({products, loading}) {
    const columns = [
        { key: "code", title: "Product Code", dataIndex: "code", width: "10%" },
		{ key: "name", title: "Product Name", dataIndex: "name", width: "20%" },
		{ key: "productCategory", title: "Categopry", dataIndex: "productCategory", width: "10%",
            render: (_, {productCategory}) => (<div>{productCategory.name}</div>)
        },
        { key: "unit", title: "Unit", dataIndex: "uom", width: "10%" },
		{ key: "quantity", title: "Quantity", dataIndex: "quantity", width: "10%" },
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