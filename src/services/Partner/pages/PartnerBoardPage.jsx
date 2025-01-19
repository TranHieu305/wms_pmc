import { useEffect, useState } from "react";
import partnerApi from "../api/partnerApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import PartnerTable from "../components/PartnerBoard.jsx";
import SharedIcon from "../../../shared/components/common/Icon.js";
import BtnSavePartner from "../components/PartnerButton.jsx";
import BoardPage from "../../../shared/components/BoardPage.jsx";
import orderActionPermission from "../../Order/utils/actionPermission.js";
import { useLayoutContext } from "../../../shared/components/AppLayout";
import Enum from "../../../shared/utils/enum";

function PartnerBoardPage() {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setSelectedMenuKey, setBreadcrumbItems} = useLayoutContext();

    useEffect(() => {
        setSelectedMenuKey(Enum.Menu.partner.key);
        setBreadcrumbItems([
            {
                title: Enum.Menu.partner.label,
            },
        ]);
    }, [setSelectedMenuKey, setBreadcrumbItems]);
    
    // Get all partners
    useEffect(() => {
        const fetchPartners = async () => {
          try {
            const response = await partnerApi.getAllPartners();
            setPartners(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchPartners();
    }, []);

    return (
    <BoardPage.ContentContainer>
        {/* Subheader */}
        <BoardPage.Subheader 
            icon={(<SharedIcon.Partner width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Partner>)}
            title = "All Partner"
        >
            {orderActionPermission.canAdd() && <BtnSavePartner />}
        </BoardPage.Subheader >
       
        {/* Table */}
        <BoardPage.BoardContainer>
            <PartnerTable partners={partners} loading={loading}></PartnerTable>

        </BoardPage.BoardContainer>
    </BoardPage.ContentContainer>)
}

export default PartnerBoardPage;