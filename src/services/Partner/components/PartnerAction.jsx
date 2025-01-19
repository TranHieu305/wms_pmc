import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BtnDeletePartner, BtnUpdatePartner } from "./PartnerButton";

function PartnerAction({partner, ...props}) {
    const items = [
            {
                key: 'update' + partner.id,
                label: <BtnUpdatePartner partner={partner} />,
            },
            {
                key: 'delete' + partner.id,
                label: <BtnDeletePartner partner={partner}/>,
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

export default PartnerAction;