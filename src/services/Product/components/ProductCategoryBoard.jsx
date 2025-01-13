import { Table } from "antd";
import ProductCategoryTypeTag from "./ProductCategoryTypeTag";
import ProductCategoryAction from "./ProductCategoryAction";
import productActionPermission from "../utils/actionPermission";

function ProductCategoryBoard({categories, loading}) {
    const columns = [
		{ key: "name", title: "Name", dataIndex: "name", width: "20%" },
		{ key: "categoryType", title: "Type", dataIndex: "categoryType", width: "20%",
            render: (_, record) => (<ProductCategoryTypeTag category={record} />)
        },
		{ key: "description", title: "Description", dataIndex: "description", width: "50%" },
		
	];

    if (productActionPermission.canAction()) {
        columns.push(
            {
                key: "actions",
                title: "Action",
                render: (_, record) => <ProductCategoryAction category={record} />,
            },
        )
    }

    return (
        <>
            <Table loading={loading} dataSource={categories} columns={columns} rowKey="id"></Table>
        </>
    );
}

export default ProductCategoryBoard;