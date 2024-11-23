import { lotMaterialSaveLoader } from "../loaders/lot";
import { LotMaterialSavePage } from "../pages/lot/SavePage";

const lotRouter = [
	{
		path: "/lots/create/material-order/:orderId",
		element: <LotMaterialSavePage />,
		loader: lotMaterialSaveLoader,
	},
];

export default lotRouter;
