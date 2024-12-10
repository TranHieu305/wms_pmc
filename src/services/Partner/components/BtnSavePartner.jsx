import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useModal } from "../../../shared/components/ModalProvider";
import SharedInput from "../../../shared/components/common/Input";
import { useFormik } from "formik";

function BtnSavePartner({partner}) {
    const { showModal } = useModal();
    
    const handleClick = () => {
        showModal({
            title: "Create new partner",
            body: (<FormBodySavePartner />),
            onSave: () => {console.log("save")}
        })
    }

    return(
    <Button
        className="bg-green-500 hover:bg-green-600 text-white border-none rounded-md"
        icon={<PlusOutlined />}
        onClick={handleClick}
    >
    Add new
    </Button>)
}

function FormBodySavePartner({partner, onSave}) {
    // TODO: Partner address
    const initialValues = {
        name: partner?.name || "",
        type: partner?.type || "customer",
        description: partner?.description || "",
        email: partner?.email || "",
        phoneNumber: partner?.phoneNumber || "",
        // addressName: partner?.addressName || "",
        // address: partner?.
    }

    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: validationLoginSchema,
        onSubmit: onSave
    });

    return (  
    <Flex vertical gap={16}>
        <div>
           <SharedInput.Label forName="name">Name*</SharedInput.Label>
           <SharedInput.Text 
                    placeholder="Name*"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                    name="name"
                    onChange={formik.handleChange}
					onBlur={formik.handleBlur}
                    value={formik.values.name}
                    error={formik.touched.name && formik.errors.name}
                />
        </div>
        <div>
           <SharedInput.Label forName="name">Type*</SharedInput.Label>
           <SharedInput.Text 
                    placeholder="Type*"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                    name="type"
                    onChange={formik.handleChange}
					onBlur={formik.handleBlur}
                    value={formik.values.type}
                    error={formik.touched.type && formik.errors.type}
                />
        </div>
        <div>
           <SharedInput.Label forName="name">Description</SharedInput.Label>
           <SharedInput.Text 
                    placeholder="Description"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                    name="email"
                    onChange={formik.handleChange}
					onBlur={formik.handleBlur}
                    value={formik.values.description}
                    error={formik.touched.description && formik.errors.description}
                />
        </div>
        <div>
           <SharedInput.Label forName="name">Email*</SharedInput.Label>
           <SharedInput.Text 
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                    name="email"
                    onChange={formik.handleChange}
					onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email}
                />
        </div>
        <div>
           <SharedInput.Label forName="name">Phone number*</SharedInput.Label>
           <SharedInput.Text 
                    placeholder="Phone number*"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                    name="phoneNumber"
                    onChange={formik.handleChange}
					onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                    error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
        </div>
       
    </Flex>);
}

export default BtnSavePartner;