import axios from "axios";
import { useState } from "react";
import { PRODUCT_PRICE_API_ENDPOINT } from "../../utils/constants/apiEndpoint";
import { notificationError, notificationSuccess } from "../../utils/notification";
import { useFormik } from "formik";
import { validationProductPriceSchema } from "../../validations";
import { Button } from "antd";
import { FormModal } from "../ui/modal";
import InputGlobal, { SelectGlobal } from "../ui/input";
import { ButtonModalConfirm } from "../ui/button";

function ButtonSave({ label, product, productPrice, partners, ...props }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const isCreate = productPrice ? false : true;

	const partnerOptions = partners
		? partners.map((partner) => {
				return { label: partner.name, value: partner.id };
		  })
		: [];
	partnerOptions.push({ label: "---Please select partner---", value: 0 });

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
		productId: product.id,
		partnerId: productPrice.partnerId || 0,
		price: productPrice.price || 0,
		description: product?.description || "",
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
					label="Product Price Description"
					key="description"
					id="description"
					name="description"
					placeholder="Product Price description"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					error={formik.touched.description && formik.errors.description}
				/>
			</FormModal>
		</>
	);
}
