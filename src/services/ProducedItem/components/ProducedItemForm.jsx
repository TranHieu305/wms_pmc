import { useSelector } from "react-redux";
import { useModal } from "../../../shared/components/ModalProvider";
import { useEffect, useState } from "react";
import inputHelper from "../../../shared/utils/inputHelper";
import { useFormik } from "formik";
import { producedItemSaveValidationSchema } from "../utils/validation";
import { SharedForm, SharedInput } from "../../../shared/components/common";
import { Col, Row } from "antd";

function FormCreateFromBatchItem({batchItem, setBeforeSave, ...props}) {
    const {setModalData} = useModal();

    const users = useSelector((state) => state.users.userList);
    const loadingUsers = useSelector((state) => state.users.status === 'loading');
    const [approversText, setApproversText] = useState('');
    const [manufacturerText, setManufacturerText] = useState('');

    const initialValues = {
        quantity: 0,
        batchItemId: batchItem.id,
        approverIds: [],
        manufacturerIds: []
    }

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: producedItemSaveValidationSchema,
		onSubmit: (values) => {},
	});

    // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    // BeforSave: validate
    useEffect(() => {
        if (setBeforeSave) {
            setBeforeSave(() => formik.submitForm());
        }
    }, [setBeforeSave, formik]);

    return (
        <SharedForm.FormBody>
            {/* Product */}
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Product</SharedInput.Label>
                <SharedInput.Text
                        value={batchItem?.product?.name || "---"}
                        disabled
                    />
            </SharedForm.FormBodyItem>

            <Row gutter={24}>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="quantity">Quantity</SharedInput.Label>
                        <SharedInput.Text
                                type="number"
                                name="quantity"
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.quantity && formik.errors.quantity}
                            />
                    </SharedForm.FormBodyItem>
                </Col>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="name">Unit</SharedInput.Label>
                        <SharedInput.Text
                                value={batchItem?.product?.uom || "---"}
                                disabled
                            />
                    </SharedForm.FormBodyItem>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                            <SharedInput.Label forName="manufacturerIds">Manufacturers</SharedInput.Label>
                            <SharedInput.UserMention
                                name="manufacturerIds"
                                placeholder="Please choose manufacturers"
                                loading={loadingUsers}
                                value={manufacturerText}
                                onChange={(value) => {
                                    formik.setFieldValue("manufacturerIds", inputHelper.convertUserMentionsToIds(value, users))
                                    setManufacturerText(value);
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.manufacturerIds && formik.errors.manufacturerIds}
                            />
                    </SharedForm.FormBodyItem>	
                </Col>

                <Col span={12}>
                    <SharedForm.FormBodyItem>
                            <SharedInput.Label forName="approverIds">Approvers</SharedInput.Label>
                            <SharedInput.UserMention
                                name="approverIds"
                                placeholder="Please choose approvers"
                                loading={loadingUsers}
                                value={approversText}
                                onChange={(value) => {
                                    formik.setFieldValue("approverIds", inputHelper.convertUserMentionsToIds(value, users))
                                    setApproversText(value);
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.approverIds && formik.errors.approverIds}
                            />
                    </SharedForm.FormBodyItem>	
                </Col>
            </Row>
        </SharedForm.FormBody>
    )
}

export {FormCreateFromBatchItem}