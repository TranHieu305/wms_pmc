import { Tag } from "antd";
import { PRODUCT_CATEGORY_TYPE } from "../untils/enum";

function ProductCategoryTypeTag({category}) {
    if (!category) {
        return;
    }
    if (category.categoryType === PRODUCT_CATEGORY_TYPE.MATERIAL) {
        return <Tag color="gold">{PRODUCT_CATEGORY_TYPE.MATERIAL}</Tag>
    }
    return <Tag color="blue">{PRODUCT_CATEGORY_TYPE.PRODUCTION}</Tag>
}

export default ProductCategoryTypeTag;