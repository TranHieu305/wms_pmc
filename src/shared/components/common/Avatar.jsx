import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";

const SingleUser = ({name, avatarUrl}) => {
    return (
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <Avatar
            size={36}
            src={avatarUrl}
            className="bg-purple-500"
          >
            {/* Fallback initials if no avatarUrl is provided */}
            {name.charAt(0).toUpperCase()}
          </Avatar>
    
          {/* Name */}
          <span className="text-gray-800 font-medium">{name}</span>
        </div>
      );
}; 

const MultiUser = ({users}) => {
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
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Tooltip>
      <Avatar style={{ backgroundColor: '#1677ff' }} icon={<UserOutlined />} />
    </Avatar.Group>
        </>
    )
}

const CustomAvatar = {
    SingleUser,
    MultiUser
}

export default CustomAvatar;