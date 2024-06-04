import { useSelector } from "react-redux";
import { BoardLayout, BoardLayoutAction, BoardLayoutContent } from "../../components/layout";
import { ButtonSave, ProductCategoryBoard } from "../../components/productcategory";
import addKeyToArrayData from "../../utils/addKeyToData";

function ProductCategoryBoardPage() {
	// Get categories from Redux
	const productCategoryStore = useSelector((state) => state.productCategory);

	const categories = addKeyToArrayData(productCategoryStore.productCategories);

	return (
		<BoardLayout title="Product Categories">
			<BoardLayoutAction>
				<ButtonSave label="Create New" type="primary" />
			</BoardLayoutAction>
			<BoardLayoutContent>
				<ProductCategoryBoard categories={categories} />
			</BoardLayoutContent>
		</BoardLayout>
	);
}

export default ProductCategoryBoardPage;
