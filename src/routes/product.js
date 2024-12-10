import ProductCategoryBoardPage from "../services/Product/pages/ProductCategoryBoardPage";

const productRouter = [
	// { path: "/products", element: <ProductBoardPage />, loader: productsLoader },
	// { path: "/products/:productId", element: <ProductDetailPage />, loader: productDetailLoader },

	{ path: "/product-categories", element: <ProductCategoryBoardPage /> },
];

export default productRouter;
