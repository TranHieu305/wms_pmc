import PartnerBoardPage from "../services/Partner/pages/PartnerBoardPage";
import PartnerDetailPage from "../services/Partner/pages/PartnerDetailPage";

const partnerRouter = [
	{ path: "/partners", element: <PartnerBoardPage /> },
	{ path: "/partners/:partnerId", element: <PartnerDetailPage /> },
];

export default partnerRouter;
