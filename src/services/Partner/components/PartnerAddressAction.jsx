import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { PartnerAddressBtnDelete, PartnerAddressBtnEdit } from "./PartnerAddressButton";

function PartnerAddressAction({partner, partnerAddress, ...props}) {
    const items = [
        {
            key: '1',
            label: <PartnerAddressBtnEdit partner={partner} partnerAddress={partnerAddress} />,
        },
        {
            key: '2',
            label: <PartnerAddressBtnDelete partnerAddress={partnerAddress}/>,
        },
    ];

    return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottomRight"
            {...props}
        >
            <SharedBtn.BtnAction />
        </Dropdown>
    );
}

export default PartnerAddressAction;