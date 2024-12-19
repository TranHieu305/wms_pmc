import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BatchBtnDelete, BatchBtnMarkAsDelivered, BatchBtnUpdate } from "./BatchButton";

function BatchAction({batch, ...props}) {
    const items = [
        {
            key: "mark-as-deliverd" + batch.id,
            label: <BatchBtnMarkAsDelivered batch={batch} type="dash"/>,
        },
        {
            key: 'udpate' + batch.id,
            label: <BatchBtnUpdate batch={batch}/>,
        },
        {
            key: 'delete' + batch.id,
            label: <BatchBtnDelete batch={batch}/>,
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

export default BatchAction;