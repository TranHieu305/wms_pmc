import { useEffect, useState } from "react";
import partnerApi from "../api/partnerApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import PartnerTable from "../components/PartnerBoard.jsx";
import SharedIcon from "../../../shared/components/common/Icon.jsx";
import BtnSavePartner from "../components/PartnerButton.jsx";
import BoardPage from "../../../shared/components/BoardPage.jsx";

function PartnerBoardPage() {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    
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
    <>
        {/* Subheader */}
        <BoardPage.Subheader 
            icon={(<SharedIcon.Partner width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Partner>)}
            title = "All Partner"
        >
            <BtnSavePartner />
        </BoardPage.Subheader >
       
        {/* Table */}
        <PartnerTable partners={partners} loading={loading}></PartnerTable>
    </>)
}

export default PartnerBoardPage;