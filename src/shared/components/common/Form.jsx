import { Flex } from "antd"

const FormBody = ({children, ...props}) => {
    return(<Flex vertical gap={16} {...props}>{children}</Flex>)
}

const FormBodyItem = ({children, ...props}) => {
    return(<div {...props}>{children}</div>)
}

const SharedForm = {
    FormBody,
    FormBodyItem
}

export default SharedForm