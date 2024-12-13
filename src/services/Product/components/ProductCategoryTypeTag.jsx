import { Tag } from "antd";
import Enum from "../../../shared/utils/enum";

function ProductCategoryTypeTag({category}) {
    if (!category) {
        return;
    }
    if (category.categoryType === Enum.CategoryType.MATERIAL) {
        return <Tag color="gold">{Enum.CategoryType.MATERIAL}</Tag>
    }
    return <Tag color="blue">{Enum.CategoryType.PRODUCTION}</Tag>
}

export default ProductCategoryTypeTag;