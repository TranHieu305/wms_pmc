import axios from "axios";
import { useState } from "react";
import { PRODUCT_PRICE_API_ENDPOINT } from "../../utils/constants/apiEndpoint";
import { notificationError, notificationSuccess } from "../../utils/notification";
import { useFormik } from "formik";
import { validationProductPriceSchema } from "../../validations";
import { Button, DatePicker } from "antd";
import { FormModal } from "../ui/modal";
import InputGlobal, { SelectGlobal } from "../ui/input";
import DataHelper from "../../utils/DataHelper";
import moment from "moment-timezone";
import FormatHelper from "../../utils/FormatHelper";

function ButtonSaveProductPrice({ label, product, productPrice, partners, ...props }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const isCreate = productPrice ? false : true;

	const partnerOptions = DataHelper.getOptionsFromArr(partners);

	function handleOpen() {
		setIsModalOpen(true);
	}

	async function handleSave(values) {
		setConfirmLoading(true);

		try {
			// Call api
			if (isCreate) {
				await axios.post(PRODUCT_PRICE_API_ENDPOINT, values);
			} else {
				await axios.put(PRODUCT_PRICE_API_ENDPOINT, values);
			}
			// Handle success
			if (isCreate) {
				notificationSuccess({
					message: "Create sucessfully",
				});
			} else {
				notificationSuccess({
					message: "Update sucessfully",
				});
			}
			formik.resetForm();
			// window.location.reload();
			setIsModalOpen(false);
		} catch (error) {
			notificationError({
				message: "Create failed",
				description: error.response.data.message,
			});
		}
		setConfirmLoading(false);
	}

	function handleCancel() {
		setIsModalOpen(false);
		formik.resetForm();
	}

	const initialValues = {
		id: productPrice?.id || 0,
		productId: product?.id || 0,
		partnerId: productPrice?.partnerId || 0,
		price: productPrice?.price || 0,
		description: product?.description || "",
		dateApply: null,
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationProductPriceSchema,
		onSubmit: handleSave,
	});

	return (
		<>
			<Button onClick={handleOpen} {...props}>
				{label}
			</Button>
			<FormModal
				title="Create New Product Price"
				open={isModalOpen}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				onSubmit={formik.handleSubmit}
			>
				<InputGlobal
					label="Product Name"
					key="name"
					id="name"
					value={product.name}
					disabled
				/>
				<InputGlobal label="Uom" key="uom" id="uom" value={product.uom} disabled />
				<SelectGlobal
					label="Partner Name"
					key="partner"
					value={formik.values.partnerId}
					onChange={(value) => formik.setFieldValue("partnerId", value)}
					options={partnerOptions}
				/>
				<InputGlobal
					label="Unit Price"
					key="price"
					id="price"
					name="price"
					placeholder="Product Unit Price"
					type="number"
					value={formik.values.price}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{/* <InputGlobal
					label="Product Price Description"
					key="description"
					id="description"
					name="description"
					placeholder="Product Price description"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					error={formik.touched.description && formik.errors.description}
				/> */}
				<label>
					<strong>Apply Date</strong>
				</label>
				<DatePicker
					key="applyDate"
					id="applyDate"
					format="DD/MM/YYYY"
					value={
						formik.values.applyDate
							? moment(formik.values.applyDate, "DD/MM/YYYY")
							: null
					}
					style={{ width: "100%" }}
					onChange={(date, dateString) =>
						formik.setFieldValue("dateApply", date ? date.format("DD/MM/YYYY") : null)
					}
				/>
			</FormModal>
		</>
	);
}

export default ButtonSaveProductPrice;
