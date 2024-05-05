import convertTimestamp from "../../utils/convertTimestamp";
import { DetailField, DetailSection } from "../ui/detail";

function ProductCategoryDetail({ productCategory }) {
	return (
		<DetailSection>
			<DetailField title="Name">{productCategory.name}</DetailField>
			<DetailField title="Description">{productCategory.description || "---"}</DetailField>
			<DetailField title="Created at">
				{convertTimestamp(productCategory.createdAt)}
			</DetailField>
			<DetailField title="Last modified">
				{convertTimestamp(productCategory.modifiedAt)}
			</DetailField>
		</DetailSection>
	);
}
export default ProductCategoryDetail;
