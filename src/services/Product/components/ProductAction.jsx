import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { ProductBtnDelete, ProductBtnEdit } from "./ProductButton";

function ProductAction({product}) {
    const items = [
            {
                key: '1',
                label: <ProductBtnEdit product={product} />,
            },
            {
                key: '2',
                label: <ProductBtnDelete product={product}/>,
            },
        ];

        return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottomRight"
        >
            <SharedBtn.BtnAction />
        </Dropdown>
        );
}

export default ProductAction;