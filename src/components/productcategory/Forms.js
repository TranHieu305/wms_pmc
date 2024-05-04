import axios from "axios";
import { PRODUCT_CATEGORY_API_ENDPOINT } from "../../apis/config";
import { useFormik } from "formik";
import { validationProductCategorySchema } from "../../validations";
import InputGlobal from "../ui/input";
import { Button } from "antd";
import { useState } from "react";
import { FormModal } from "../ui/modal";
import { notificationError, notificationSuccess } from "../../utils/notification";
import { useDispatch } from "react-redux";
import { productCategoryActions } from "../../redux/slices/productCategory";

function FormSave({ productCategory, update = false }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const dispatch = useDispatch();

	const initialValues = {
		id: productCategory?.id || 0,
		name: productCategory?.name || "",
		description: productCategory?.description || "",
	};

	const axiosMethod = productCategory ? axios.put : axios.post;

	function handleOpen() {
		setIsModalOpen(true);
	}

	async function handleSave(values) {
		setConfirmLoading(true);

		try {
			const response = await axiosMethod(PRODUCT_CATEGORY_API_ENDPOINT, values);
			const { data: productCategory } = response.data;
			if (!update) {
				dispatch(productCategoryActions.add(productCategory));
				notificationSuccess({
					message: "Create sucessfully",
				});
			} else {
				dispatch(productCategoryActions.update(productCategory));
				notificationSuccess({
					message: "Update sucessfully",
				});
			}
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

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationProductCategorySchema,
		onSubmit: handleSave,
	});

	return (
		<>
			<Button type="primary" onClick={handleOpen}>
				Open Modal
			</Button>
			<FormModal
				title="Create New Product Category"
				open={isModalOpen}
				confirmLoading={confirmLoading}
				textSubmit="Create"
				onCancel={handleCancel}
				onSubmit={formik.handleSubmit}
			>
				<InputGlobal
					label="Product Category Name*"
					key="name"
					id="name"
					name="name"
					placeholder="Product Category name*"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
					error={formik.touched.name && formik.errors.name}
				/>
				<InputGlobal
					label="Product Category Description"
					key="description"
					id="description"
					name="description"
					placeholder="Product Category description"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					error={formik.touched.description && formik.errors.description}
				/>
			</FormModal>
		</>
	);
}

export default FormSave;
