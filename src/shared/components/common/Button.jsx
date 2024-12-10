import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

function BtnSave({label, ...props}) {
    return(
        <Button 
            className="bg-green-500 hover:bg-green-600 text-white border-none rounded-md"
            icon={<PlusOutlined />}
            {...props}
        >
            {label}
        </Button>
    )
   
}

function BtnAction({...props}) {
    return <Button icon={<EllipsisOutlined />} {...props}></Button>
}

function BtnDelete({label, ...props}) {
    return <Button type="dash" danger {...props}>{label || "Delete"}</Button>
}

function BtnEdit({label, ...props}) {
    return <Button type="dash" {...props}>{label || "Edit"}</Button>
}

const SharedBtn = {
    BtnSave,
    BtnAction,
    BtnDelete,
    BtnEdit
}

export default SharedBtn;