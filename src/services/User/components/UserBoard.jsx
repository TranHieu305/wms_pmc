import { Avatar, Table, Tag, Typography } from "antd";
import UserAction from "./UserAction";
import { UserOutlined } from "@ant-design/icons";
import userActionPermission from "../utils/actionPermission";


function UserBoard({users, loading}) {
    const columns = [
		{ key: "name", title: "User", dataIndex: "username", width: "30%",
            render: (text, record) => <UserName user={record} />,
        },
		{ key: "email", title: "Email", dataIndex: "email", width: "20%",
        },
        { key: "phone", title: "Phone number", dataIndex: "phoneNumber", width: "20%" },
		{ key: "role", title: "Role", dataIndex: "role", width: "10%",},
		{ key: "status", title: "Status", dataIndex: "status", width: "10%",
            render: (_, record) => <UserStatus status={record.status} />
        },
		
	];

    if (userActionPermission.canAction()) {
        columns.push(
            {
                key: "actions",
                title: "Action",
                render: (_, record) => <UserAction user={record} />,
            },
        )
    }

    return (
        <>
            <Table loading={loading} dataSource={users} columns={columns} rowKey="id"></Table>
        </>
    );
}

function UserStatus({status}) {
    if (status === "ACTIVE") {
        return <Tag color="success">Active</Tag>;
    }
    return <Tag color="error">Disabled</Tag>;
}

function UserName({user}) {
    return (
        <div className="flex items-center gap-3">
        {/* Avatar */}
        <Avatar size="large" icon={<UserOutlined />}/>

        {/* User Details */}
        <div>
            <Typography.Text strong>{user.fullName}</Typography.Text>
            <br />
            <Typography.Text type="secondary">{user.username}</Typography.Text>
        </div>
    </div>
    )
}

export default UserBoard;