import ProductBoardPage from "../services/Product/pages/ProductBoardPage";
import ProductCategoryBoardPage from "../services/Product/pages/ProductCategoryBoardPage";
import ProductDetailPage from "../services/Product/pages/ProductDetailPage";

const productRouter = [
	{ path: "/products", element: <ProductBoardPage /> },
	{ path: "/products/:productId", element: <ProductDetailPage /> },

	{ path: "/product-categories", element: <ProductCategoryBoardPage /> },
];

export default productRouter;
