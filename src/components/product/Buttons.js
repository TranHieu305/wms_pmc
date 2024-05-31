import axios from "axios";
import { useState } from "react";
import { PRODUCT_API_ENDPOINT } from "../../utils/constants";
import { notificationError, notificationSuccess } from "../../utils/notification";
import { useFormik } from "formik";
import { validationProductSchema } from "../../validations";
import { Button } from "antd";
import { FormModal } from "../ui/modal";
import InputGlobal, { SelectGlobal } from "../ui/input";
import { ButtonModalConfirm } from "../ui/button";

function ButtonSave({ label, product, categories, ...props }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const isCreate = product ? false : true;
	const categoryOptions = categories
		? categories.map((category) => {
				return { label: category.name, value: category.id };
		  })
		: [];
	categoryOptions.push({ label: "---Please select category---", value: 0 });

	function handleOpen() {
		setIsModalOpen(true);
	}

	async function handleSave(values) {
		setConfirmLoading(true);

		try {
			// Call api
			if (isCreate) {
				await axios.post(PRODUCT_API_ENDPOINT, values);
			} else {
				await axios.put(PRODUCT_API_ENDPOINT, values);
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
		id: product?.id || 0,
		name: product?.name || "",
		description: product?.description || "",
		uom: product?.uom || "",
		categoryId: product?.categoryId || categoryOptions[0].value,
		code: 0,
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationProductSchema,
		onSubmit: handleSave,
	});

	return (
		<>
			<Button onClick={handleOpen} {...props}>
				{label}
			</Button>
			<FormModal
				title="Create New Product Category"
				open={isModalOpen}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				onSubmit={formik.handleSubmit}
			>
				<InputGlobal
					label="Product Name*"
					key="name"
					id="name"
					name="name"
					placeholder="Product name*"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
					error={formik.touched.name && formik.errors.name}
				/>
				<InputGlobal
					label="Product Uom*"
					key="uom"
					id="uom"
					name="uom"
					placeholder="Product uom*"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.uom}
					error={formik.touched.uom && formik.errors.uom}
				/>
				<SelectGlobal
					label="Product Category"
					key="categoryId"
					value={formik.values.categoryId}
					onChange={(value) => formik.setFieldValue("categoryId", value)}
					options={categoryOptions}
					onBlur={formik.handleBlur}
					error={formik.touched.categoryId && formik.errors.categoryId}
				/>
				<InputGlobal
					label="Product Description"
					key="description"
					id="description"
					name="description"
					placeholder="Product description"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					error={formik.touched.description && formik.errors.description}
				/>
			</FormModal>
		</>
	);
}

function ButtonDelete({ label = "Delete", product }) {
	async function handleConfirm() {
		try {
			await axios.delete(PRODUCT_API_ENDPOINT + `/${product.id}`);
			notificationSuccess({
				message: "Delete sucessfully",
			});
		} catch (error) {
			notificationError({
				message: "Delete failed",
				description: error.response.data.message,
			});
		}
	}
	return (
		<ButtonModalConfirm
			title="Confirm delete"
			content={
				<p>
					Confirm to delete product: <b>{product.name}</b>
				</p>
			}
			type="text"
			danger
			typeConfirm="delete"
			okText="Delete"
			onConfirm={handleConfirm}
		>
			Delete
		</ButtonModalConfirm>
	);
}

export { ButtonSave, ButtonDelete };
