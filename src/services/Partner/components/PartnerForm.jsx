import { Divider } from "antd";
import { useModal } from "../../../shared/components/ModalProvider";
import SharedInput from "../../../shared/components/common/Input";
import { useFormik } from "formik";
import { SharedForm } from "../../../shared/components/common";
import inputHelper from "../../../shared/utils/inputHelper";
import Enum from "../../../shared/utils/enum";
import { useEffect } from "react";

function FormBodyCreatePartner({...props}) {
    const {setModalData} = useModal();

    const initialValues = {
        id: 0,
        name: "",
        type: Enum.PartnerType.CUSTOMER,
        description: "",
        email: "",
        phoneNumber: "",
        addressName: "",
        address: "",
        longitude: 0,
		latitude: 0,
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
                <SharedInput.Location 
                        onSelectLocation={(location) => {
                            formik.setFieldValue("address", location?.address);
                            formik.setFieldValue("longitude", location?.longitude);
                            formik.setFieldValue("latitude", location?.latitude);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                        error={formik.touched.address && formik.errors.address}
                    />
            </SharedForm.FormBodyItem>
        </SharedForm.FormBody>
        
    );
}

function FormBodyUpdatePartner({partner, ...props}) {
    const {setModalData} = useModal();

    const initialValues = {
        id: partner?.id || 0,
        name: partner?.name || "",
        type: partner?.type || Enum.PartnerType.CUSTOMER,
        description: partner?.description || "",
        email: partner?.email || "",
        phoneNumber: partner?.phoneNumber || "",
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
        </SharedForm.FormBody>
        
    );
}

export {FormBodyCreatePartner, FormBodyUpdatePartner}