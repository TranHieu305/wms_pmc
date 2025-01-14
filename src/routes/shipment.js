import ShipmentBoardPage from "../services/Shipment/pages/ShipmentBoardPage";
import ShipmentDetailPage from "../services/Shipment/pages/ShipmentDetailPage";

const shipmentRouter = [
	{ path: "/shipments", element: <ShipmentBoardPage /> },

	{
		path: "/shipments/:shipmentId",
		element: <ShipmentDetailPage />,
	},
];

export default shipmentRouter;
