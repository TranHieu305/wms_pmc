import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import partnerApi from "../api/partnerApi";
import DetailPage from "../../../shared/components/DetailPage";
import PartnerAction from "../components/PartnerAction";
import LoadingPage from "../../../shared/components/LoadingPage";
import { Col, Row } from "antd";
import partnerActionPermission from "../utils/actionPermission";
import { useLayoutContext } from "../../../shared/components/AppLayout";
import Enum from "../../../shared/utils/enum";
import PartnerDetail from "../components/PartnerDetail";

function PartnerDetailPage() {
    const { partnerId } = useParams();
    const [partner, setPartner] = useState();
    const navigate = useNavigate();
    const {setSelectedMenuKey, setBreadcrumbItems} = useLayoutContext();

    useEffect(() => {
        setSelectedMenuKey(Enum.Menu.partner.key);
        setBreadcrumbItems([
            {
                title: Enum.Menu.partner.label,
            },
            {
                title: "Partner detail",
            },
        ]);
    }, [setSelectedMenuKey, setBreadcrumbItems]);

    // Get partners
    useEffect(() => {
        const fetchPartners = async () => {
          try {
            const response = await partnerApi.getPartnerDetail(partnerId);
            setPartner(response.data.data); 
          } catch (err) {
            navigate('/');
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } 
        };
    
        fetchPartners();
    }, [partnerId, navigate]);

    // const items = [
    //     {
    //       key: '1',
    //       label: 'Information',
    //     //   children: <PartnerInventory  partner={partner}/>,
    //     },
    //     {
    //       key: '2',
    //       label: 'Order',
    //     //   children: <PartnerHistory partner={partner}/>,
    //     },
    //     {
    //         key: '3',
    //         label: 'Batch',
    //       //   children: <PartnerHistory partner={partner}/>,
    //       },
    // ];

    return (
        <DetailPage.Layout>
            {
                partner ? ( 
                    <>
                        {/* Header */}
                        <DetailPage.Subheader 
                            title={partner.name}
                            id={partner.id}
                            backLink="/partners"
                        >
                            {partnerActionPermission.canAction()
                                && <PartnerAction partner={partner} className="bg-white"/>
                            }
                        </DetailPage.Subheader>
    
                        {/* Content */}
                        {/* <Tabs defaultActiveKey="1" items={items} /> */}
                        <Row gutter={24}>
                                <Col span={12}>
                                    <PartnerDetail.Info partner={partner}/>
                                </Col>
                                <Col span={12}>
                                    <PartnerDetail.Addresses partner={partner}/>
                                </Col>
                        </Row>
                    </>
                    
                ) 
                :  <LoadingPage />
            }
        </DetailPage.Layout>
        );
}

export default PartnerDetailPage;