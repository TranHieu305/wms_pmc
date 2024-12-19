import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { UserBtnDelete, UserBtnUpdate } from "./UserButton";

function UserAction({user, ...props}) {
    const items = [
        {
            key: 'edit' + user.id,
            label: <UserBtnUpdate user={user} />,
        },
        {
            key: 'delete' + user.id,
            label: <UserBtnDelete user={user}/>,
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

export default UserAction;