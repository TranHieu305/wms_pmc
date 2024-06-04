import { Tag } from "antd";
import { PRODUCT_TYPE } from "../../utils/constants";

function ProductDetail({ product }) {
	if (!product) {
		return;
	}
	return <p>Hello</p>;
}

function ProductTypeTag({ type }) {
	if (type === PRODUCT_TYPE.MATERIAL) {
		return <Tag color="orange">Material</Tag>;
	} else return <Tag color="geekblue">Production</Tag>;
}

export { ProductDetail, ProductTypeTag };
