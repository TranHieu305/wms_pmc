import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { ProductCategoryBtnDelete, ProductCategoryBtnEdit } from "./ProductCategoryButton";

function ProductCategoryAction({category}) {
    const items = [
            {
                key: '1',
                label: <ProductCategoryBtnEdit category={category} />,
            },
            {
                key: '2',
                label: <ProductCategoryBtnDelete category={category}/>,
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

export default ProductCategoryAction;