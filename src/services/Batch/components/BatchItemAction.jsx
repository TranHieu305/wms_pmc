import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BatchItemBtnDelete, BatchItemBtnMarkComplete, BatchItemBtnUpdate } from "./BatchItemButton";

function BatchItemAction({batch, item, ...props}) {
    const items = [
        {
            key: 'mark-complete' + item.id,
            label: <BatchItemBtnMarkComplete batch={batch} item={item} key={item.id} type="dash" />,
        },
        {
            key: 'update' + item.id,
            label: <BatchItemBtnUpdate item={item} key={item.id}/>,
        },
        {
            key: 'delete' + item.id,
            label: <BatchItemBtnDelete item={item} key={item.id}/>,
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

export default BatchItemAction;