import { Button } from "antd";
import { useFormik } from "formik";
import InputGlobal from "../ui/input";
import { notificationError, notificationSuccess } from "../../utils/notification";
import axios from "axios";
import { SUPPLIER_API_ENDPOINT } from "../../apis/config";
import { validationSupplierSchema } from "../../validations";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function FormCreate() {
	const navigate = useNavigate();
	const data = useLoaderData();
	const supplier = data?.data;

	const initialValues = {
		id: supplier?.id || 0,
		name: supplier?.name || "",
		description: supplier?.description || "",
		address: supplier?.address || "",
		email: supplier?.email || "",
		phone: supplier?.phone || "",
	};

	const axiosMethod = supplier ? axios.put : axios.post;

	function handleCreate(values) {
		axiosMethod(SUPPLIER_API_ENDPOINT, values)
			.then((response) => {
				notificationSuccess({ description: "Successfully created supplier" });
				setTimeout(() => navigate("/suppliers"), 1000);
			})
			.catch((err) => {
				notificationError({ description: "Cannot create supplier" });
			});
	}

	function handleCancel() {
		navigate("/suppliers");
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSupplierSchema,
		onSubmit: handleCreate,
	});
	return (
		<div className="form-wrapper">
			<form onSubmit={formik.handleSubmit} className="form">
				<InputGlobal
					label="Supplier Name*"
					key="name"
					id="name"
					name="name"
					placeholder="Supplier name*"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
					error={formik.touched.name && formik.errors.name}
				/>
				<InputGlobal
					label="Description"
					key="description"
					id="description"
					name="description"
					placeholder="Supplier description"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					error={formik.touched.description && formik.errors.description}
				/>

				<InputGlobal
					label="Email*"
					key="email"
					id="email"
					name="email"
					placeholder="Supplier email*"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
					error={formik.touched.email && formik.errors.email}
				/>
				<InputGlobal
					label="Phone number*"
					key="phone"
					id="phone"
					name="phone"
					placeholder="Supplier phone*"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.phone}
					error={formik.touched.phone && formik.errors.phone}
				/>

				<InputGlobal
					label="Address"
					key="address"
					id="address"
					name="address"
					placeholder="Supplier address"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.address}
					error={formik.touched.address && formik.errors.address}
				/>

				<div className="action-wrapper">
					<Button type="dash" htmlType="cancel" onClick={handleCancel}>
						Cancel
					</Button>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
}
