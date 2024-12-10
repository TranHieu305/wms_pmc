import { useEffect, useState } from "react";
import partnerApi from "../api/partnerApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import PartnerTable from "../components/PartnerTable.jsx";
import SharedIcon from "../../../shared/components/common/Icon.jsx";
import BtnSavePartner from "../components/BtnSavePartner.jsx";

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
        <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-2">
                <SharedIcon.Partner width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Partner>
                <span className="text-lg font-semibold text-gray-800">Partner</span>
             </div>

            <div className="flex items-center space-x-2">
            <BtnSavePartner />
            </div>
    </div>
        {/* Table */}
        <PartnerTable partners={partners} loading={loading}></PartnerTable>;
    </>)
}

export default PartnerBoardPage;