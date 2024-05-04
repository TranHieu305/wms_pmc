import { useDispatch, useSelector } from "react-redux";
import { BoardLayout, BoardLayoutAction, BoardLayoutContent } from "../../components/layout";
import { ProductCategoryBoard } from "../../components/productcategory";
import { useEffect } from "react";
import { fetchProductCategories } from "../../redux/slices/productCategory";

function ProductCategoryBoardPage() {
	const productCategoryStore = useSelector((state) => state.productCategory);

	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchProductCategories());
			} catch (error) {
				console.error("Error fetching product categories:", error);
			}
		};
		fetchData();
	}, [dispatch]);

	console.log(productCategoryStore);

	return (
		<BoardLayout title="Product Categories">
			<BoardLayoutAction>BoardLayoutActions</BoardLayoutAction>
			<BoardLayoutContent>
				<ProductCategoryBoard
					categories={productCategoryStore.productCategories}
					loading={productCategoryStore.loading}
				/>
			</BoardLayoutContent>
		</BoardLayout>
	);
}

export default ProductCategoryBoardPage;