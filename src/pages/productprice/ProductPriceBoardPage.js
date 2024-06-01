import { BoardLayoutAction, BoardLayoutContent } from "../../components/layout";
import { ProductPriceBoard } from "../../components/productprice";

/**
 * Price Board Page in Product Detail Page
 *
 * @param {*} param0
 * @returns
 */
export default function ProductPriceBoardPage({ productPrices, partners, product }) {
	return (
		<>
			<BoardLayoutAction>
				{/* <ButtonSave label="Create New" categories={categories} type="primary" /> */}
			</BoardLayoutAction>
			<BoardLayoutContent>
				<ProductPriceBoard
					productPrices={productPrices}
					partners={partners}
					product={product}
				/>
			</BoardLayoutContent>
		</>
	);
}
