import { Divider } from "antd";
import { useModal } from "../../../shared/components/ModalProvider";
import SharedInput from "../../../shared/components/common/Input";
import { useFormik } from "formik";
import { SharedBtn, SharedForm } from "../../../shared/components/common";
import inputHelper from "../../../shared/utils/inputHelper";
import Enum from "../../../shared/utils/enum";
import { useNavigate } from "react-router-dom";
import partnerApi from "../api/partnerApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useEffect } from "react";

function BtnSavePartner({partner, ...props}) {
    const { showModal } = useModal();

    const navigate = useNavigate();

    const handleSave = (data) => {
        partnerApi.savePartner(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully updated product" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update product" });
            });
    }
    
    const handleClick = () => {
        showModal({
            title: "Create new partner",
            body: (<FormBodySavePartner />),
            onSave: handleSave,
            widthModal: "medium"
        })
    }

    return <SharedBtn.BtnSave label="Add new" onClick={handleClick} {...props} />
}

function FormBodySavePartner({partner, onSave}) {
    const {setModalData} = useModal();

    // TODO: Partner address
    const initialValues = {
        id: partner?.id || 0,
        name: partner?.name || "",
        type: partner?.type || Enum.PartnerType.CUSTOMER,
        description: partner?.description || "",
        email: partner?.email || "",
        phoneNumber: partner?.phoneNumber || "",
        addressName: partner?.addressName || "",
        address: partner?.address || ""
    }

    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: validationLoginSchema,
        onSubmit: (values) => {},
    });

     // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    const partnerTypeOptions = inputHelper.convertEnumToSelectOption(Enum.PartnerType);

    return (  
        <SharedForm.FormBody>
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Name*</SharedInput.Label>
                <SharedInput.Text 
                        placeholder="Name*"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Type*</SharedInput.Label>
                <SharedInput.SelectInput 
                        name="type"
                        showSearch
                        options={partnerTypeOptions}
                        style={{
                            width: '100%',
                        }}
                        onChange={(value) => formik.setFieldValue("type", value)}
                        onBlur={formik.handleBlur}
                        value={formik.values.type}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Email*</SharedInput.Label>
                <SharedInput.Text 
                        placeholder="Email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={formik.touched.email && formik.errors.email}
                    />
            </SharedForm.FormBodyItem>
    
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Phone number*</SharedInput.Label>
                <SharedInput.Text 
                        placeholder="Phone number*"
                        name="phoneNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                        error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />
            </SharedForm.FormBodyItem>
    
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Description</SharedInput.Label>
                <SharedInput.TextAreaCustom 
                        placeholder="Description"
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        error={formik.touched.description && formik.errors.description}
                    />
            </SharedForm.FormBodyItem>
            <Divider orientation="left" orientationMargin={0}>Partner address</Divider>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="addressName">Address name*</SharedInput.Label>
                <SharedInput.Text 
                        placeholder="Address name*"
                        name="addressName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.addressName}
                        error={formik.touched.addressName && formik.errors.addressName}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="address">Address</SharedInput.Label>
                <SharedInput.Text 
                        placeholder="address"
                        name="address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                        error={formik.touched.address && formik.errors.address}
                    />
            </SharedForm.FormBodyItem>
        </SharedForm.FormBody>
        
    );
}

export default BtnSavePartner;