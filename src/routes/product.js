import { productDetailLoader, productsLoader } from "../loaders/product";
import ProductBoardPage from "../pages/product/BoardPage";
import ProductDetailPage from "../pages/product/DetailPage";

const productRouter = [
	{ path: "/products", element: <ProductBoardPage />, loader: productsLoader },
	{ path: "/products/:productId", element: <ProductDetailPage />, loader: productDetailLoader },
];

export default productRouter;
