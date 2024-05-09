import axios from "axios";
import { PRODUCT_CATEGORY_API_ENDPOINT } from "../../apis/config";
import { useFormik } from "formik";
import { validationProductCategorySchema } from "../../validations";
import InputGlobal from "../ui/input";
import { Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import { FormModal } from "../ui/modal";
import { ButtonModalConfirm } from "../ui/button";
import { notificationError, notificationSuccess } from "../../utils/notification";
import { useDispatch } from "react-redux";
import { productCategoryActions } from "../../redux/slices/productCategory";
import ProductCategoryDetail from "./Detail";

function ButtonSave({ label, productCategory, ...props }) {
	console.log(productCategory);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const dispatch = useDispatch();

	const [initialValues, setInitialValues] = useState({
		id: productCategory?.id || 0,
		name: productCategory?.name || "",
		description: productCategory?.description || "",
	});

	useEffect(() => {
		setInitialValues({
			id: productCategory?.id || 0,
			name: productCategory?.name || "",
			description: productCategory?.description || "",
		});
	}, [productCategory]);

	const axiosMethod = productCategory ? axios.put : axios.post;

	function handleOpen() {
		setIsModalOpen(true);
	}

	async function handleSave(values) {
		setConfirmLoading(true);

		try {
			const response = await axiosMethod(PRODUCT_CATEGORY_API_ENDPOINT, values); // call api
			const { data: productCategory } = response.data;
			if (!productCategory) {
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

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationProductCategorySchema,
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

function ButtonDelete({ label = "Delete", productCategory }) {
	const dispatch = useDispatch();

	async function handleConfirm() {
		try {
			await axios.delete(PRODUCT_CATEGORY_API_ENDPOINT + `/${productCategory.id}`);
			dispatch(productCategoryActions.delete(productCategory));
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
					Confirm to delete product category: <b>{productCategory.name}</b>
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

function ButtonDetail({ productCategory }) {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button key={productCategory.name} type="link" onClick={showDrawer}>
				{productCategory.name}
			</Button>
			<Drawer
				key={productCategory.name}
				title="Product Category Detail"
				onClose={onClose}
				open={open}
			>
				<ProductCategoryDetail productCategory={productCategory} />
			</Drawer>
		</>
	);
}

export { ButtonSave, ButtonDelete, ButtonDetail };
