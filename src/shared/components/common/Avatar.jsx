import { Avatar, Tooltip } from "antd";
import { useSelector } from "react-redux";

const SingleUser = ({userId, avatarOnly}) => {
    const users = useSelector((state) => state.users.userList);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return <></>
    }
    if (avatarOnly) {
        return (
            <Tooltip title={user?.fullName || "---"} placement="top">
                <Avatar key={user.id} src={user?.avatarUrl} size={32}>
                    {/* Fallback initials if no avatarUrl */}
                    {!user.avatarUrl && user.username.charAt(0).toUpperCase()}
                </Avatar>
            </Tooltip>
        )
    }
    return (
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <Avatar
            size={32}
            src={user?.avatarUrl}
            className="bg-purple-500"
          >
            {/* Fallback initials if no avatarUrl is provided */}
            {user?.username.charAt(0).toUpperCase() || "U"}
          </Avatar>
    
          {/* Name */}
          <span className="text-gray-800 font-medium">{user?.username || "---"}</span>
        </div>
      );
}; 

const MultiUser = ({userIds}) => {
    const allUsers = useSelector((state) => state.users.userList);
    const users = allUsers.filter(user => userIds.includes(user.id));
    return (
        <>
            <Avatar.Group
                size="large"
                max={{
                    count: 2,
                    style: { color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' },
                    popover: { trigger: 'click' },
                }}
                >
                    {users.map((user, index) => (
                        <div key={index}>
                            <Tooltip title={user?.fullName || "---"} placement="top">
                                <Avatar key={index} src={user.avatarUrl} size={32}>
                                    {/* Fallback initials if no avatarUrl */}
                                    {!user.avatarUrl && user.username.charAt(0).toUpperCase()}
                                </Avatar>
                            </Tooltip>
                        </div>
                    ))}
            </Avatar.Group>
        </>
    )
}

const CustomAvatar = {
    SingleUser,
    MultiUser
}

export default CustomAvatar;