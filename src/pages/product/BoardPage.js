import { useLoaderData } from "react-router-dom";
// import { BoardLayout, BoardLayoutAction, BoardLayoutContent } from "../../components/layout";
import { ButtonSave, ProductBoard } from "../../components/product";

export default function ProductBoardPage() {
	const loaderData = useLoaderData();
	const { products, categories } = loaderData;

	return (
		<></>
		// <BoardLayout title="Products">
		// 	<BoardLayoutAction>
		// 		<ButtonSave label="Create New" categories={categories} type="primary" />
		// 	</BoardLayoutAction>
		// 	<BoardLayoutContent>
		// 		<ProductBoard products={products} categories={categories} />
		// 	</BoardLayoutContent>
		// </BoardLayout>
	);
}
